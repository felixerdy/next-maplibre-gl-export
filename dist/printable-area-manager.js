"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_generator_1 = require("./map-generator");
class PrintableAreaManager {
    constructor(map) {
        var _a, _b, _c;
        this.map = map;
        if (this.map === undefined) {
            return;
        }
        this.mapResize = this.mapResize.bind(this);
        this.map.on('resize', this.mapResize);
        const clientWidth = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getCanvas().clientWidth;
        const clientHeight = (_b = this.map) === null || _b === void 0 ? void 0 : _b.getCanvas().clientHeight;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0px';
        svg.style.left = '0px';
        svg.setAttribute('width', `${clientWidth}px`);
        svg.setAttribute('height', `${clientHeight}px`);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('style', 'fill:#888888;stroke-width:0');
        path.setAttribute('fill-opacity', '0.5');
        svg.append(path);
        (_c = this.map) === null || _c === void 0 ? void 0 : _c.getCanvasContainer().appendChild(svg);
        this.svgCanvas = svg;
        this.svgPath = path;
    }
    mapResize() {
        this.generateCutOut();
    }
    updateArea(width, height) {
        this.width = width;
        this.height = height;
        this.unit = map_generator_1.Unit.mm;
        this.generateCutOut();
    }
    generateCutOut() {
        var _a, _b;
        if (this.map === undefined
            || this.svgCanvas === undefined
            || this.svgPath === undefined) {
            return;
        }
        const width = this.toPixels(this.width);
        const height = this.toPixels(this.height);
        const clientWidth = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getCanvas().clientWidth;
        const clientHeight = (_b = this.map) === null || _b === void 0 ? void 0 : _b.getCanvas().clientHeight;
        const startX = clientWidth / 2 - width / 2;
        const endX = startX + width;
        const startY = clientHeight / 2 - height / 2;
        const endY = startY + height;
        this.svgCanvas.setAttribute('width', `${clientWidth}px`);
        this.svgCanvas.setAttribute('height', `${clientHeight}px`);
        this.svgPath.setAttribute('d', `M 0 0 L ${clientWidth} 0 L ${clientWidth} ${clientHeight} L 0 ${clientHeight} M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY} L ${endX} ${startY}`);
    }
    destroy() {
        if (this.svgCanvas !== undefined) {
            this.svgCanvas.remove();
            this.svgCanvas = undefined;
        }
        if (this.map !== undefined) {
            this.map = undefined;
        }
    }
    toPixels(length, conversionFactor = 96) {
        if (this.unit === map_generator_1.Unit.mm) {
            conversionFactor /= 25.4;
        }
        return conversionFactor * length;
    }
}
exports.default = PrintableAreaManager;
//# sourceMappingURL=printable-area-manager.js.map