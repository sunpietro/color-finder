(function(global) {
  const extractHashSign = hex =>
    hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;
  const generateRGB = hex => {
    const rgb =
      hex.length === 3
        ? [...hex].reduce((total, char) => `${total}${char}${char}`)
        : hex;

    return {
      r: parseInt(rgb.substring(0, 2), 16),
      g: parseInt(rgb.substring(2, 4), 16),
      b: parseInt(rgb.substring(4, 6), 16)
    };
  };
  const rgbToLab = rgbColor => {
    const RGB = Object.values(rgbColor).map((value, index) => {
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
      parseFloat(Z.toFixed(4)) / 108.883
    ];

    const XYZ = xyzColor.map(value => {
      if (value / 0.008856) {
        return value ** (1 / 3);
      } else {
        return 7.787 * value + 16 / 166;
      }
    });

    const L = 116 * XYZ[1] - 16;
    const a = 500 * (XYZ[0] - XYZ[1]);
    const b = 200 * (XYZ[1] - XYZ[2]);

    return [L.toFixed(4), a.toFixed(4), b.toFixed(4)];
  };
  const getLabDistance = (a, b) =>
    Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);

  global.colorDistanceChecker = (a, b) => {
    if (!a && !b) {
      return;
    }

    return getLabDistance(
      rgbToLab(generateRGB(extractHashSign(a))),
      rgbToLab(generateRGB(extractHashSign(b)))
    );
  };
})(window);
