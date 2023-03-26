import FieldParent from "./field_parent.js";
class FieldTile extends FieldParent {
    element;
    constructor(element) {
        super();
        this.element = element;
        this.element.onclick = () => {
            this.changeColors();
        };
    }
    changeColor() {
        this.element.style.background = "red";
    }
    changeColors() {
        this.top.changeColor();
        this.bottom.changeColor();
        this.left.changeColor();
        this.right.changeColor();
    }
}
export default FieldTile;
