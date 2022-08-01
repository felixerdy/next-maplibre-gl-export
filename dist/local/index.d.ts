import english from "./en";
import french from "./fr";
import finnish from "./fi";
import swedish from "./sv";
import spanish from "./es";
import german from "./de";
declare type Translation = {
    PageSize: string;
    PageOrientation: string;
    Format: string;
    DPI: string;
    Generate: string;
    Title: string;
};
export { english, french, finnish, swedish, spanish, german, Translation };
