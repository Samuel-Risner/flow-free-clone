import settings from "./../settings.js";

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
    private field: number[][];

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

        // Create a new field.

        this.fieldTable = document.createElement("table");
        this.fieldContainer.appendChild(this.fieldTable);
        this.fieldTable.className = "border-collapse";

        for (let h = 0; h < this.height; h++) {
            let tr = document.createElement("tr");
            this.fieldTable.appendChild(tr);

            for (let w = 0; w < this.width; w++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = `w: ${w} h: ${h}`;
                td.className = "border border-white w-10 h-10";
            }
        }

        this.removeColors();
        this.createColors();
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