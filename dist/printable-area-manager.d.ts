import { Map as MaplibreMap } from 'maplibre-gl';
export default class PrintableAreaManager {
    private map;
    private width;
    private height;
    private unit;
    private svgCanvas;
    private svgPath;
    constructor(map: MaplibreMap | undefined);
    private mapResize;
    updateArea(width: number, height: number): void;
    private generateCutOut;
    destroy(): void;
    private toPixels;
}
