const utils = {};

utils.colorToRGB = function (color, alpha) {
  //number in octal format or string prefixed with #
  if (typeof color === "string" && color[0] === "#") {
    color = window.parseInt(color.slice(1), 16);
  }
  alpha = alpha === undefined ? 1 : alpha;
  //parse hex values
  var r = (color >> 16) & 0xff,
    g = (color >> 8) & 0xff,
    b = color & 0xff,
    a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
  //only use 'rgba' if needed
  if (a === 1) {
    return "rgb(" + r + "," + g + "," + b + ")";
  } else {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
};

export default utils;
