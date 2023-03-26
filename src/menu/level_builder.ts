import settings from "./../settings.js";
import FieldTile from "./builder/field_tile.js";
import FieldEnd from "./builder/field_end.js";

class LevelBuilder {

    private widthInput: HTMLInputElement;
    private heightInput: HTMLInputElement;

    private colorTableContainer: HTMLDivElement;
    private colorTable: HTMLTableElement;
    private colors: [[number, number],[number, number]][];

    private applySizeButton: HTMLButtonElement;
    private width: number;
    private height: number;

    private fieldContainer: HTMLDivElement;
    private fieldTable: HTMLTableElement;
    private fieldElements: HTMLTableCellElement[][];
    private field: FieldTile[][];

    constructor() {
        this.widthInput = document.getElementById("levelBuilderWidth") as HTMLInputElement;
        this.heightInput = document.getElementById("levelBuilderHeight") as HTMLInputElement;

        this.colorTableContainer = document.getElementById("levelBuilderColors") as HTMLDivElement;
        this.colorTable = document.createElement("table");
        this.colorTableContainer.appendChild(this.colorTable);
        this.colors = [];

        this.widthInput.max = String(settings.builder.maxWidth);
        this.widthInput.min = String(settings.builder.minWidth);
        this.heightInput.max = String(settings.builder.maxHeight);
        this.heightInput.min = String(settings.builder.minHeight);

        this.applySizeButton = document.getElementById("levelBuilderApplySize") as HTMLButtonElement;
        this.width = 0;
        this.height = 0;
        this.applySizeButton.onclick = () => {
            this.applySize();
        }

        this.fieldContainer = document.getElementById("levelBuilderField") as HTMLTableElement;
        this.fieldTable = document.createElement("table");
        this.fieldElements = [];
        this.field = [];

        this.addWidthHeightValueDisplay();
        this.createColors();
    }

    /**
     * Adds the descriptions for the width and height sliders and adds a function to update the display for the current size.
     */
    private addWidthHeightValueDisplay() {
        function addTo(name: string, element: HTMLInputElement) {
            const minDisplay = document.getElementById(`levelBuilder${name}MinValue`) as HTMLDivElement;
            const maxDisplay = document.getElementById(`levelBuilder${name}MaxValue`) as HTMLDivElement;
            const currentDisplay = document.getElementById(`levelBuilder${name}CurrentValue`) as HTMLDivElement;

            minDisplay.textContent = `min: ${element.min}`;
            maxDisplay.textContent = `max: ${element.max}`;
            currentDisplay.textContent = element.value;

            element.addEventListener("input", () => {
                currentDisplay.textContent = element.value;
            });
        }

        addTo("Width", this.widthInput);
        addTo("Height", this.heightInput);
    }

    /**
     * Resets the field using new sizes from the two input sliders and calls the functions for resetting the color table.
     */
    applySize() {
        // Get the inputs.
        this.width = Number(this.widthInput.value);
        this.height = Number(this.heightInput.value);

        // Remove the old/previous field.
        this.fieldTable.remove();
        this.field = [];
        this.fieldElements = [];

        // Create a new field.

        this.fieldTable = document.createElement("table");
        this.fieldContainer.appendChild(this.fieldTable);
        this.fieldTable.className = "border-collapse";

        for (let h = 0; h < this.height; h++) {
            const tr = document.createElement("tr");
            this.fieldTable.appendChild(tr);

            const fieldElementsRow: HTMLTableCellElement[] = [];
            this.fieldElements.push(fieldElementsRow);

            for (let w = 0; w < this.width; w++) {
                const td = document.createElement("td");
                tr.appendChild(td);

                td.textContent = `w: ${w} h: ${h}`;
                td.className = "border border-white w-10 h-10";

                fieldElementsRow.push(td);
            }
        }

        this.removeColors();
        this.createColors();
        this.createFieldTiles();
    }

    private createFieldTiles() {
        // Please note that the minimum width and height should both be at least 3.

        // Create the end element. The neighbors of the end element are irrelevant.
        const end = new FieldEnd();
        end.setTop(end);
        end.setBottom(end);
        end.setLeft(end);
        end.setRight(end);

        // Fill the field list with elements, their neighbors will be set in the next steps.
        for (let row = 0; row < this.fieldElements.length; row++) {
            const rowElements: FieldTile[] = [];
            this.field.push(rowElements);

            for (let column = 0; column < this.fieldElements[row].length; column++) {
                rowElements.push(new FieldTile(this.fieldElements[row][column]));
            }
        }

        // Set the neighbors of the elements in the field list.

        /**
         * The first index of the field list.
         */
        let row = 0;
        /**
         * The second index of the field list.
         */
        let column = 0;

        // Top left.
        let temp: FieldTile = this.field[0][0];
        temp.setTop(end);
        temp.setBottom(this.field[1][0]);
        temp.setLeft(end)
        temp.setRight(this.field[0][1])

        // Top right.
        column = this.field[0].length - 1;
        temp = this.field[0][column];
        temp.setTop(end);
        temp.setBottom(this.field[1][column]);
        temp.setLeft(this.field[0][column - 1]);
        temp.setRight(end);

        // Bottom left.
        temp = this.field[this.field.length - 1][0];
        temp.setTop(this.field[this.field.length - 2][0]);
        temp.setBottom(end);
        temp.setLeft(end);
        temp.setRight(this.field[this.field.length - 1][1]);

        // Bottom right.
        temp = this.field[this.field.length - 1][this.field[0].length - 1];
        temp.setTop(this.field[this.field.length - 2][this.field[0].length - 1]);
        temp.setBottom(end);
        temp.setLeft(this.field[this.field.length - 1][this.field[0].length - 2]);
        temp.setRight(end);

        // Top row, excluding start and end.
        for (let column = 1; column < this.fieldElements[0].length - 1; column++) {
            temp = this.field[0][column];
            temp.setTop(end);
            temp.setBottom(this.field[1][column]);
            temp.setLeft(this.field[0][column - 1]);
            temp.setRight(this.field[0][column + 1]);
        }

        // Bottom row, excluding start and end.
        for (let column = 1; column < this.fieldElements[this.field.length - 1].length - 1; column++) {
            temp = this.field[this.field.length - 1][column];
            temp.setTop(this.field[this.field.length - 2][column]);
            temp.setBottom(end);
            temp.setLeft(this.field[this.field.length - 1][column - 1]);
            temp.setRight(this.field[this.field.length - 1][column + 1]);
        }

        // Left column, excluding top and bottom.
        for (let row = 1; row < this.fieldElements.length - 1; row++) {
            temp = this.field[row][0];
            temp.setTop(this.field[row - 1][0]);
            temp.setBottom(this.field[row + 1][0]);
            temp.setLeft(end);
            temp.setRight(this.field[row][1]);
        }
        // Right column, excluding top and bottom.
        for (let row = 1; row < this.fieldElements.length - 1; row++) {
            temp = this.field[row][this.field[row].length - 1];
            temp.setTop(this.field[row - 1][this.field[row].length - 1]);
            temp.setBottom(this.field[row + 1][this.field[row].length - 1]);
            temp.setLeft(this.field[row][this.field[row].length - 2]);
            temp.setRight(end);
        }

        // All the other stuff.
        for (let row = 1; row < this.fieldElements.length - 1; row++) {
            for (let column = 1; column < this.fieldElements[row].length - 1; column++) {
                temp = this.field[row][column];
                temp.setTop(this.field[row - 1][column]);
                temp.setBottom(this.field[row + 1][column]);
                temp.setLeft(this.field[row][column - 1]);
                temp.setRight(this.field[row][column + 1]);
            }
        }

        console.log(this.field);
    }
    
    /**
     * Creates the table containing the available colors to the user.
     */
    private createColors() {
        this.colorTable.className = "mt-auto mb-auto";
        
        for (let i = 0; i < 2; i++) {
            const tr = document.createElement("tr");
            this.colorTable.appendChild(tr);

            for (const color of settings.builder.colors) {
                const td = document.createElement("td");
                tr.appendChild(td);

                const div = document.createElement("div");
                td.appendChild(div);

                div.className = `h-6 w-6 ${color} rounded-full border-2 border-neutral-700`;
            }
        }

        for (const _ of settings.builder.colors) {
            this.colors.push([[-1, -1], [-1, -1]]);
        }
    }

    /**
     * Resets everything connected to colors.
     */
    private removeColors() {
        // Remove.
        this.colorTable.remove()

        // Same as in the constructor.
        this.colorTable = document.createElement("table");
        this.colorTableContainer.appendChild(this.colorTable);
        this.colors = [];
    }
}

export default LevelBuilder;
