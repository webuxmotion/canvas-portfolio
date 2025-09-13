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
    camera.vy = 0;
  } else if (keys.ArrowLeft) {
    camera.vy = 0.03;
  } else if (keys.ArrowRight) {
    camera.vy = -0.03;
  }

  if ((!keys.KeyW && !keys.KeyS) || (keys.KeyW && keys.KeyS)) {
    camera.thrust = 0;
  } else if (keys.KeyW) {
    camera.thrust = -0.2;
  } else if (keys.KeyS) {
    camera.thrust = 0.2;
  }

  if ((!keys.ArrowUp && !keys.ArrowDown) || (keys.ArrowUp && keys.ArrowDown)) {
    camera.vx = 0;
  } else if (keys.ArrowUp) {
    camera.vx = 0.03;
  } else if (keys.ArrowDown) {
    camera.vx = -0.03;
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