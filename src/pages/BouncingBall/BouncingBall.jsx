import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ball } from "./Ball";

function BouncingBall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const ball = new Ball();
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = Math.random() * 20 - 10;
    ball.vy = Math.random() * 20 - 10;
    let bounce = -0.7;

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
        ball.vx *= bounce;
      } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx *= bounce;
      }

      if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy *= bounce;
      } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy *= bounce;
      }

      ball.draw(ctx);

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}

export default BouncingBall;
