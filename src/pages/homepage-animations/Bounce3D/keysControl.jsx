const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  KeyW: false,
  KeyS: false,
};

function keyHandler({ camera }) {
  if (
    (!keys.ArrowLeft && !keys.ArrowRight) ||
    (keys.ArrowLeft && keys.ArrowRight)
  ) {
    camera.vr = 0;
  } else if (keys.ArrowLeft) {
    camera.vr = -0.03;
  } else if (keys.ArrowRight) {
    camera.vr = 0.03;
  }

  if ((!keys.KeyW && !keys.KeyS) || (keys.KeyW && keys.KeyS)) {
    camera.vy = 0;
  } else if (keys.KeyW) {
    camera.vy = 4;
  } else if (keys.KeyS) {
    camera.vy = -4;
  }

  if ((!keys.ArrowUp && !keys.ArrowDown) || (keys.ArrowUp && keys.ArrowDown)) {
    camera.thrust = 0;
  } else if (keys.ArrowUp) {
    camera.thrust = -0.2;
  } else if (keys.ArrowDown) {
    camera.thrust = 0.2;
  }
}

const handleKeyDown = ({ e, camera }) => {
  if (keys.hasOwnProperty(e.code)) {
    keys[e.code] = true;
    keyHandler({ camera });
  }
};

const handleKeyUp = ({ e, camera }) => {
  if (keys.hasOwnProperty(e.code)) {
    keys[e.code] = false;
    keyHandler({ camera });
  }
};

export const initKeysControl = ({ camera }) => {
  window.addEventListener("keydown", (e) => handleKeyDown({ e, camera }));
  window.addEventListener("keyup", (e) => handleKeyUp({ e, camera }));
};

export const disableKeysControl = () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
}
