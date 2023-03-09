import settings from "./../settings.js";

class LevelBuilder {

    private widthInput: HTMLInputElement;
    private heightInput: HTMLInputElement;

    private colorTableContainer: HTMLDivElement;
    private colorTable: HTMLTableElement;

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
    }

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

    private applySize() {
        let width = Number(this.widthInput.value);
        let height = Number(this.heightInput.value);

        this.fieldTable.remove();
        this.field = [];

        this.fieldTable = document.createElement("table");
        this.fieldContainer.appendChild(this.fieldTable);
        this.fieldTable.className = "border-collapse";

        for (let h = 0; h < height; h++) {
            let tr = document.createElement("tr");
            this.fieldTable.appendChild(tr);

            for (let w = 0; w < width; w++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = `w: ${w} h: ${h}`;
                td.className = "border border-white w-10 h-10";
            }
        }

        this.width = width;
        this.height = height;
    }
}

export default LevelBuilder;