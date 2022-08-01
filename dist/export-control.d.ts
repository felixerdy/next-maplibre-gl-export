import { ControlPosition, IControl, Map as MaplibreMap } from "maplibre-gl";
import { Translation } from "./local";
export declare type ExportOptions = {
    PageSize?: any;
    PageOrientation?: string;
    Format?: string;
    DPI?: number;
    Crosshair?: boolean;
    PrintableArea?: boolean;
    Local?: "en" | "fr" | "fi" | "sv" | "es" | "de";
    AllowedSizes?: ("A2" | "A3" | "A4" | "A5" | "A6" | "B2" | "B3" | "B4" | "B5" | "B6")[];
    Filename?: string;
    DefaultTitle?: string;
};
export default class MaplibreExportControl implements IControl {
    private controlContainer;
    private exportContainer;
    private crosshair;
    private printableArea;
    private map?;
    private exportButton;
    private options;
    constructor(options: ExportOptions);
    getDefaultPosition(): ControlPosition;
    getTranslation(): Translation;
    onAdd(map: MaplibreMap): HTMLElement;
    private createTextInput;
    private createSelection;
    onRemove(): void;
    private onDocumentClick;
    private toggleCrosshair;
    private togglePrintableArea;
    private updatePrintableArea;
}
