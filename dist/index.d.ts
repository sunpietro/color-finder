interface ColorFinderMethods {
    findClosestColor: (color: string) => string;
    checkColorsSimilarity: (color1: string, color2: string) => number;
    updateColorsLibrary: (colors: string[]) => void;
}
declare const ColorFinder: (colors: string[]) => ColorFinderMethods;
export default ColorFinder;
