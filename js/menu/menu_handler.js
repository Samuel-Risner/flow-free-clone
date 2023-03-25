import LevelBuilder from "./level_builder.js";
/**
 * Takes care of switching between menus.
 */
class MenuHandler {
    /**
     * The names of all the menus the user can access. The menu names should be capitalized to allow corresponding functions to be linked to them.
     */
    menuNames;
    /**
     * The elements of the menus the user can access.
     */
    menuElements;
    /**
     * Each sub array corresponds to a menu from "this.menuNames" and "this.menuElements" and contains all the buttons that redirect to the corresponding menu.
     */
    buttonElements;
    /**
     * The menu which the user is looking at. The number corresponds to the index of "this.menuElements".
     */
    currentMenu;
    levelBuilder;
    constructor() {
        this.currentMenu = 0;
        this.menuNames = [
            "Main",
            "Custom",
            "Level",
            "Build"
        ];
        this.menuElements = [];
        this.buttonElements = [];
        // Get the menu elements and setup the buttons which change the menu which the user is currently looking at.
        for (let i = 0; i < this.menuNames.length; i++) {
            const id = this.menuNames[i]; // The menu name.
            const menuElement = document.getElementById(`menu${id}`);
            this.menuElements.push(menuElement);
            // Get the buttons that redirect to the menu.
            const buttonElementList = document.getElementsByName(`goTo${id}Menu`);
            this.buttonElements.push(buttonElementList);
            // Add functionality to the buttons.
            for (const buttonElement of buttonElementList) {
                buttonElement.onclick = () => {
                    this.menuElements[this.currentMenu].hidden = true;
                    this.currentMenu = i;
                    this.menuElements[this.currentMenu].hidden = false;
                };
            }
        }
        this.levelBuilder = new LevelBuilder();
    }
}
export default MenuHandler;
