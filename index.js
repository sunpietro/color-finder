(function(global) {
  const extractHashSign = hex =>
    hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;
  const generateRGB = hex => {
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  };
  const calculateColorPercentile = struct => {
    const r = (struct.r / 255) * 100;
    const g = (struct.g / 255) * 100;
    const b = (struct.b / 255) * 100;

    return Math.round((r + g + b) / 3);
  };
  global.colorDistanceChecker = (a, b) => {
    if (!a && !b) {
      return;
    }

    const aPerc = calculateColorPercentile(generateRGB(extractHashSign(a)));
    const bPerc = calculateColorPercentile(generateRGB(extractHashSign(b)));

    return Math.abs(aPerc - bPerc);
  };
})(window);
