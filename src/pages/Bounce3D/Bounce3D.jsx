import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ball3D } from "./Ball3D";
import { disableKeysControl, initKeysControl } from "./keysControl";
import { Camera } from "./Camera";
import { transformPoint } from "./utils";
import { Ball } from "./Ball";

export default function Bounce3D() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const camera = new Camera();

    initKeysControl({ camera });

    let balls = [],
      numBalls = 50,
      fl = 250,
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      top = -100,
      bottom = 100,
      left = -100,
      right = 100,
      front = -100,
      back = 100;

    for (let ball, i = 0; i < numBalls; i++) {
      ball = new Ball3D(15);
      ball.radius = 10;
      ball.vx = Math.random() * 10 - 5;
      ball.vy = Math.random() * 10 - 5;
      ball.vz = Math.random() * 10 - 5;
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

      if (ball.zpos > -fl) {
        var scale = fl / (fl + ball.zpos);
        ball.scaleX = ball.scaleY = scale;
        ball.x = vpX + ball.xpos * scale;
        ball.y = vpY + ball.ypos * scale;
        ball.visible = true;
      } else {
        ball.visible = false;
      }
    }

    function draw(ball) {
      ball.draw(ctx);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach(move);

      const objectsToDraw = [];

      balls.forEach(ball => {
        const point = transformPoint({ x: ball.xpos, y: ball.ypos, z: ball.zpos }, camera, fl, vpX, vpY);

        if (point) {
          objectsToDraw.push({ point, z: point.z });
        }
      });

      objectsToDraw.sort((a, b) => b.z - a.z);
      objectsToDraw.forEach(({ point }) => {
        const ball = new Ball();
        ball.x = point.x;
        ball.y = point.y;
        ball.radius = 5;

        ball.draw(ctx);
      }); 

      camera.update();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      disableKeysControl();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
