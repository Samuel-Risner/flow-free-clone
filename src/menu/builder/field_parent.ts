import FieldEnd from "./field_end.js";

abstract class FieldParent {

    // @ts-ignore
    protected top: FieldParent;
    // @ts-ignore
    protected bottom: FieldParent;
    // @ts-ignore
    protected left: FieldParent;
    // @ts-ignore
    protected right: FieldParent;

    constructor() {
    }

    setTop(top: FieldParent) {
        this.top = top;
    }

    setBottom(bottom: FieldParent) {
        this.bottom = bottom;
    }

    setLeft(left: FieldParent) {
        this.left = left;
    }

    setRight(right: FieldParent) {
        this.right = right;
    }

    changeColor() {

    }

    changeColors() {
        
    }
}

export default FieldParent;
