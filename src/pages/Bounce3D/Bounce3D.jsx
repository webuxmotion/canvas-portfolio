import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ball3D } from "./Ball3D";
import { disableKeysControl, initKeysControl } from "./keysControl";
import { Camera } from "./Camera";
import { transformPoint } from "./utils";
import { Ball } from "./Ball";
import { HueOscillator } from "./HueOscillator";
import { FPS } from "./FPS";
import styles from "./Bounce3D.module.scss";

export default function Bounce3D() {
  const canvasRef = useRef(null);

  let animationFrameId;
  let showGravity = false;
  let gravityReseted = false;

  function toggleGravity() {
    if (showGravity) {
      showGravity = false;
    } else {
      showGravity = true;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fpsCounter = new FPS();

    const camera = new Camera();
    initKeysControl({ camera });

    const hue = new HueOscillator(0);

    let boxSize = 1000;
    let floor = 600;
    let balls = [],
      numBalls = 5000,
      fl = 250,
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      top = -boxSize,
      bottom = boxSize,
      left = -boxSize,
      right = boxSize,
      front = -boxSize,
      back = boxSize;

    let gravity = 0.2,
      bounce = -0.6;

    for (let ball, i = 0; i < numBalls; i++) {
      ball = new Ball3D();
      ball.vx = Math.random() * 6 - 3;
      ball.vy = Math.random() * 6 - 3;
      ball.vz = Math.random() * 6 - 3;
      balls.push(ball);
    }

    function move(ball) {

      ball.xpos += ball.vx;
      ball.ypos += ball.vy;
      ball.zpos += ball.vz;

      if (ball.xpos + ball.radius > right) {
        ball.xpos = right - ball.radius;
        ball.vx *= -1;
      } else if (ball.xpos - ball.radius < left) {
        ball.xpos = left + ball.radius;
        ball.vx *= -1;
      }
      if (ball.ypos + ball.radius > bottom) {
        ball.ypos = bottom - ball.radius;
        ball.vy *= -1;
      } else if (ball.ypos - ball.radius < top) {
        ball.ypos = top + ball.radius;
        ball.vy *= -1;
      }
      if (ball.zpos + ball.radius > back) {
        ball.zpos = back - ball.radius;
        ball.vz *= -1;
      } else if (ball.zpos - ball.radius < front) {
        ball.zpos = front + ball.radius;
        ball.vz *= -1;
      }

      if (showGravity) {
        ball.vy += gravity;

        if (ball.ypos >= floor) {
          ball.ypos = floor;
          ball.vy *= bounce;
        }
        gravityReseted = false;
      } else {
        if (!gravityReseted) {
          gravityReseted = true;

          ball.vy = Math.random() * 6;
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fpsCounter.update();
      const h = hue.update();
      balls.forEach(move);

      const objectsToDraw = [];

      balls.forEach((ball) => {
        const point = transformPoint(
          { x: ball.xpos, y: ball.ypos, z: ball.zpos + 800 },
          camera
        );

        if (point) {
          objectsToDraw.push({ point, z: point.z });
        }
      });

      objectsToDraw.sort((a, b) => b.z - a.z);
      objectsToDraw.forEach(({ point }) => {
        const ball = new Ball();
        const scale = fl / (fl + point.z);
        ball.scaleX = ball.scaleY = scale;
        ball.radius = 30;
        ball.x = vpX + point.x * scale;
        ball.y = vpY + (point.y + camera.y) * scale;
        ball.color = `hsl(${h}, 60%, ${scale * 100}%)`;

        ball.draw(ctx);
      });

      camera.update();

      fpsCounter.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      disableKeysControl();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.bounce3D}>
      <Canvas ref={canvasRef} width={500} height={500} />
      <button onClick={toggleGravity}>Toggle Gravity</button>
    </div>
  );
}
