import Canvas from "@/components/Canvas/Canvas";
import { useMouse } from "@/hooks/useMouse";
import { useRef, useEffect } from "react";
import { Ball } from "../lib/Ball";

export default function ManySprings({ size = 500 }) {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let spring = 0.03,
      friction = 0.83,
      gravity = 1;
    let balls = [];
    let ballsNum = 10;

    for (let i = 0; i < ballsNum; i++) {
      const ball = new Ball();
      ball.x = canvas.width;
      ball.radius = 10;
      balls.push(ball);
    }

    function move(ball, targetX, targetY) {
      ball.vx += (targetX - ball.x) * spring;
      ball.vy += (targetY - ball.y) * spring;
      ball.vy += gravity;
      ball.vx *= friction;
      ball.vy *= friction;
      ball.x += ball.vx;
      ball.y += ball.vy;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball, idx) => {
        if (idx === 0) {
          move(ball, mouse.x, mouse.y);
        } else {
          move(ball, balls[idx - 1].x, balls[idx - 1].y);
        }
      });

      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      balls.forEach((ball) => {
        ctx.lineTo(ball.x, ball.y);
      });
      ctx.strokeStyle = "white";
      ctx.stroke();

      balls.forEach((ball) => {
        ball.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
