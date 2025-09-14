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

utils.captureMouse = function (element) {
  var mouse = { x: 0, y: 0, event: null },
    body_scrollLeft = document.body.scrollLeft,
    element_scrollLeft = document.documentElement.scrollLeft,
    body_scrollTop = document.body.scrollTop,
    element_scrollTop = document.documentElement.scrollTop,
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener(
    "mousemove",
    function (event) {
      var x, y;

      if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
      } else {
        x = event.clientX + body_scrollLeft + element_scrollLeft;
        y = event.clientY + body_scrollTop + element_scrollTop;
      }
      x -= offsetLeft;
      y -= offsetTop;

      mouse.x = x;
      mouse.y = y;
      mouse.event = event;
    },
    false
  );

  return mouse;
};

export default utils;
