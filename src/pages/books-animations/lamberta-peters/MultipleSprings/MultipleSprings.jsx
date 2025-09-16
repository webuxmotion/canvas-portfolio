import Canvas from "@/components/Canvas/Canvas";
import { useMouse } from "@/hooks/useMouse";
import { useRef, useEffect } from "react";
import { Ball } from "../lib/Ball";

export default function MultipleSprings() {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let ball0 = new Ball(),
      ball1 = new Ball(),
      ball2 = new Ball(),
      spring = 0.03,
      friction = 0.9,
      gravity = 2;

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

      move(ball0, mouse.x, mouse.y);
      move(ball1, ball0.x, ball0.y);
      move(ball2, ball1.x, ball1.y);

      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(ball0.x, ball0.y);
      ctx.lineTo(ball1.x, ball1.y);
      ctx.lineTo(ball2.x, ball2.y);
      ctx.strokeStyle = "white";
      ctx.stroke();

      ball0.draw(ctx);
      ball1.draw(ctx);
      ball2.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
