import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Ball } from "../lib/Ball";

export default function SimpleEasing() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let ball = new Ball(),
      easing = 0.05,
      targetX = canvas.width / 2,
      targetY = canvas.height / 2;

    function setRandomBallPosition() {
      ball.x = Math.random() * canvas.width;
      ball.y = Math.random() * canvas.height;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var vx = (targetX - ball.x) * easing,
        vy = (targetY - ball.y) * easing;

      if (vx < 0.01 && vx > -0.01) {
        setRandomBallPosition();
      } else {
        ball.x += vx;
        ball.y += vy;
        ball.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
