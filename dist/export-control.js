"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crosshair_manager_1 = __importDefault(require("./crosshair-manager"));
const printable_area_manager_1 = __importDefault(require("./printable-area-manager"));
const local_1 = require("./local");
const map_generator_1 = __importStar(require("./map-generator"));
class MaplibreExportControl {
    constructor(options) {
        this.options = {
            PageSize: map_generator_1.Size.A4,
            PageOrientation: map_generator_1.PageOrientation.Landscape,
            Format: map_generator_1.Format.PDF,
            DPI: map_generator_1.DPI[300],
            Crosshair: false,
            PrintableArea: false,
            Local: "en",
            AllowedSizes: Object.keys(map_generator_1.Size),
            Filename: "map",
            DefaultTitle: "",
        };
        if (options) {
            this.options = Object.assign(this.options, options);
        }
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }
    getDefaultPosition() {
        const defaultPosition = "top-right";
        return defaultPosition;
    }
    getTranslation() {
        switch (this.options.Local) {
            case "en":
                return local_1.english;
            case "fr":
                return local_1.french;
            case "fi":
                return local_1.finnish;
            case "sv":
                return local_1.swedish;
            case "es":
                return local_1.spanish;
            case "de":
                return local_1.german;
            default:
                return local_1.english;
        }
    }
    onAdd(map) {
        var _a;
        this.map = map;
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.exportContainer = document.createElement("div");
        this.exportContainer.classList.add("maplibregl-export-list");
        this.exportButton = document.createElement("button");
        this.exportButton.classList.add("maplibregl-ctrl-icon");
        this.exportButton.classList.add("maplibregl-export-control");
        this.exportButton.type = "button";
        this.exportButton.addEventListener("click", () => {
            this.exportButton.style.display = "none";
            this.exportContainer.style.display = "block";
            this.toggleCrosshair(true);
            this.togglePrintableArea(true);
        });
        document.addEventListener("click", this.onDocumentClick);
        this.controlContainer.appendChild(this.exportButton);
        this.controlContainer.appendChild(this.exportContainer);
        const table = document.createElement("TABLE");
        table.className = "print-table";
        const sizes = {};
        (_a = this.options.AllowedSizes) === null || _a === void 0 ? void 0 : _a.forEach((size) => {
            const dimensions = map_generator_1.Size[size];
            if (dimensions) {
                sizes[size] = map_generator_1.Size[size];
            }
        });
        const tr1 = this.createSelection(sizes, this.getTranslation().PageSize, "page-size", this.options.PageSize, (data, key) => JSON.stringify(data[key]));
        table.appendChild(tr1);
        const tr2 = this.createSelection(map_generator_1.PageOrientation, this.getTranslation().PageOrientation, "page-orientation", this.options.PageOrientation, (data, key) => data[key]);
        table.appendChild(tr2);
        const tr3 = this.createSelection(map_generator_1.Format, this.getTranslation().Format, "format-type", this.options.Format, (data, key) => data[key]);
        table.appendChild(tr3);
        const tr4 = this.createSelection(map_generator_1.DPI, this.getTranslation().DPI, "dpi-type", this.options.DPI, (data, key) => data[key]);
        table.appendChild(tr4);
        this.exportContainer.appendChild(table);
        table.appendChild(this.createTextInput(this.getTranslation().Title, "titleInput", this.options.DefaultTitle || ""));
        const generateButton = document.createElement("button");
        generateButton.type = "button";
        generateButton.textContent = this.getTranslation().Generate;
        generateButton.classList.add("generate-button");
        generateButton.addEventListener("click", () => {
            const pageSize = (document.getElementById("mapbox-gl-export-page-size"));
            const pageOrientation = (document.getElementById("mapbox-gl-export-page-orientation"));
            const formatType = (document.getElementById("mapbox-gl-export-format-type"));
            const dpiType = (document.getElementById("mapbox-gl-export-dpi-type"));
            const orientValue = pageOrientation.value;
            let pageSizeValue = JSON.parse(pageSize.value);
            if (orientValue === map_generator_1.PageOrientation.Portrait) {
                pageSizeValue = pageSizeValue.reverse();
            }
            const mapGenerator = new map_generator_1.default(map, pageSizeValue, Number(dpiType.value), formatType.value, map_generator_1.Unit.mm, this.options.Filename, document.getElementById("titleInput").value);
            mapGenerator.generate();
        });
        this.exportContainer.appendChild(generateButton);
        return this.controlContainer;
    }
    createTextInput(title, id, defaultValue) {
        const label = document.createElement("label");
        label.textContent = title;
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.id = id;
        inputElement.style.width = "100%";
        if (defaultValue) {
            inputElement.defaultValue = defaultValue;
        }
        const tr1 = document.createElement("TR");
        const tdLabel = document.createElement("TD");
        const tdContent = document.createElement("TD");
        tdContent.style.display = "flex";
        tdLabel.appendChild(label);
        tdContent.appendChild(inputElement);
        tr1.appendChild(tdLabel);
        tr1.appendChild(tdContent);
        return tr1;
    }
    createSelection(data, title, type, defaultValue, converter) {
        const label = document.createElement("label");
        label.textContent = title;
        const content = document.createElement("select");
        content.setAttribute("id", `mapbox-gl-export-${type}`);
        content.style.width = "100%";
        Object.keys(data).forEach((key) => {
            const optionLayout = document.createElement("option");
            optionLayout.setAttribute("value", converter(data, key));
            optionLayout.appendChild(document.createTextNode(key));
            optionLayout.setAttribute("name", type);
            if (defaultValue === data[key]) {
                optionLayout.selected = true;
            }
            content.appendChild(optionLayout);
        });
        content.addEventListener("change", () => {
            this.updatePrintableArea();
        });
        const tr1 = document.createElement("TR");
        const tdLabel = document.createElement("TD");
        const tdContent = document.createElement("TD");
        tdLabel.appendChild(label);
        tdContent.appendChild(content);
        tr1.appendChild(tdLabel);
        tr1.appendChild(tdContent);
        return tr1;
    }
    onRemove() {
        if (!this.controlContainer ||
            !this.controlContainer.parentNode ||
            !this.map ||
            !this.exportButton) {
            return;
        }
        this.exportButton.removeEventListener("click", this.onDocumentClick);
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        document.removeEventListener("click", this.onDocumentClick);
        if (this.crosshair !== undefined) {
            this.crosshair.destroy();
            this.crosshair = undefined;
        }
        this.map = undefined;
    }
    onDocumentClick(event) {
        if (this.controlContainer &&
            !this.controlContainer.contains(event.target) &&
            this.exportContainer &&
            this.exportButton) {
            this.exportContainer.style.display = "none";
            this.exportButton.style.display = "block";
            this.toggleCrosshair(false);
            this.togglePrintableArea(false);
        }
    }
    toggleCrosshair(state) {
        if (this.options.Crosshair === true) {
            if (state === false) {
                if (this.crosshair !== undefined) {
                    this.crosshair.destroy();
                    this.crosshair = undefined;
                }
            }
            else {
                this.crosshair = new crosshair_manager_1.default(this.map);
                this.crosshair.create();
            }
        }
    }
    togglePrintableArea(state) {
        if (this.options.PrintableArea === true) {
            if (state === false) {
                if (this.printableArea !== undefined) {
                    this.printableArea.destroy();
                    this.printableArea = undefined;
                }
            }
            else {
                this.printableArea = new printable_area_manager_1.default(this.map);
                this.updatePrintableArea();
            }
        }
    }
    updatePrintableArea() {
        if (this.printableArea === undefined) {
            return;
        }
        const pageSize = (document.getElementById("mapbox-gl-export-page-size"));
        const pageOrientation = (document.getElementById("mapbox-gl-export-page-orientation"));
        const orientValue = pageOrientation.value;
        let pageSizeValue = JSON.parse(pageSize.value);
        if (orientValue === map_generator_1.PageOrientation.Portrait) {
            pageSizeValue = pageSizeValue.reverse();
        }
        this.printableArea.updateArea(pageSizeValue[0], pageSizeValue[1]);
    }
}
exports.default = MaplibreExportControl;
//# sourceMappingURL=export-control.js.map