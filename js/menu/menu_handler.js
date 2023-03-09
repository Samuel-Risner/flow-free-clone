import LevelBuilder from "./level_builder.js";
class MenuHandler {
    menuNames;
    menuElements;
    buttonElements;
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
        for (let i = 0; i < this.menuNames.length; i++) {
            const id = this.menuNames[i];
            const menuElement = document.getElementById(`menu${id}`);
            this.menuElements.push(menuElement);
            const buttonElementList = document.getElementsByName(`goTo${id}Menu`);
            this.buttonElements.push(buttonElementList);
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
