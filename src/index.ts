/**
 * Based on:
 * - https://gist.github.com/manojpandey/f5ece715132c572c80421febebaf66ae
 * - https://en.wikipedia.org/wiki/Color_difference
 */

interface RGBStruct {
  r: number;
  g: number;
  b: number;
}

type LabStruct = [number, number, number];

interface ColorFinderMethods {
  findClosestColor: (color: string) => string;
  checkColorsSimilarity: (color1: string, color2: string) => number;
  updateColorsLibrary: (colors: string[]) => void;
}
/**
 * Removes # sign from a string hex color definiton
 */
const extractHashSign = (hex: string): string =>
  hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;
/**
 * Converts a string hex color definition into a RGB struct
 */
const generateRGB = (hex: string): RGBStruct => {
  const rgb =
    hex.length === 3
      ? [...hex].reduce((total, char) => `${total}${char}${char}`)
      : hex;

  return {
    r: parseInt(rgb.substring(0, 2), 16),
    g: parseInt(rgb.substring(2, 4), 16),
    b: parseInt(rgb.substring(4, 6), 16),
  };
};
/**
 * Converts hex color definition to Lab color definiton
 */
const rgbToLab = (rgbColor: RGBStruct): LabStruct => {
  const RGB = Object.values(rgbColor).map((value: number) => {
    let part = value / 255;

    if (part > 0.04045) {
      return ((part + 0.55) / 1.055) * 100;
    }

    return (part = (part / 12.92) * 100);
  });

  const X = RGB[0] * 0.4124 + RGB[1] * 0.3576 + RGB[2] * 0.1805;
  const Y = RGB[0] * 0.2126 + RGB[1] * 0.7152 + RGB[2] * 0.0722;
  const Z = RGB[0] * 0.0193 + RGB[1] * 0.1192 + RGB[2] * 0.9505;
  const xyzColor = [
    parseFloat(X.toFixed(4)) / 95.047,
    parseFloat(Y.toFixed(4)) / 100,
    parseFloat(Z.toFixed(4)) / 108.883,
  ];

  const XYZ = xyzColor.map((value) => {
    if (value / 0.008856) {
      return Math.pow(value, 1 / 3);
    } else {
      return 7.787 * value + 16 / 166;
    }
  });

  const L = 116 * XYZ[1] - 16;
  const a = 500 * (XYZ[0] - XYZ[1]);
  const b = 200 * (XYZ[1] - XYZ[2]);

  return [
    parseInt(L.toFixed(4), 10),
    parseInt(a.toFixed(4), 10),
    parseInt(b.toFixed(4), 10),
  ];
};
/**
 * Gets the distance between 2 colors.
 * It's based on CIELab CIE76 specification.
 * CIELAB ΔE*
 */
const getLabDistance = (a: LabStruct, b: LabStruct): number =>
  Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2) +
      Math.pow(a[2] - b[2], 2)
  );

let colorsBase = [];
/**
 * Checks color similarity distance
 */
const checkHexColorsSimilarity = (a: string, b: string): number => {
  if (!a && !b) {
    return;
  }

  return getLabDistance(getLabColorFromHex(a), getLabColorFromHex(b));
};
/**
 * Converts Hex color to Lab color
 */
const getLabColorFromHex = (a: string): LabStruct =>
  rgbToLab(generateRGB(extractHashSign(a)));

const ColorFinder = (colors: string[]): ColorFinderMethods => {
  colorsBase = colors;

  return {
    updateColorsLibrary: (colors) => {
      colorsBase = colors;
    },
    findClosestColor: (color) => {
      const results = colorsBase.map((hex) =>
        checkHexColorsSimilarity(color, hex)
      );

      return colorsBase[results.indexOf(Math.min(...results))];
    },
    checkColorsSimilarity: checkHexColorsSimilarity,
  };
};

export default ColorFinder;
