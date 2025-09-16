import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Ball } from "../lib/Ball";
import { colors } from "../lib/colors";

export default function MultipleTargets({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let ball = new Ball(),
      handles = [],
      numHandles = 10,
      spring = 0.03,
      friction = 0.9;
    ball.color = colors.secondary;

    for (let handle, i = 0; i < numHandles; i++) {
      handle = new Ball();
      handle.radius = 10;
      handle.x = Math.random() * canvas.width;
      handle.y = Math.random() * canvas.height;
      handles.push(handle);
    }

    function applyHandle(handle) {
      let dx = handle.x - ball.x,
        dy = handle.y - ball.y;
      ball.vx += dx * spring;
      ball.vy += dy * spring;
    }

    function drawHandle(handle) {
      ctx.moveTo(ball.x, ball.y);
      ctx.lineTo(handle.x, handle.y);
      ctx.stroke();
      handle.draw(ctx);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      handles.forEach(applyHandle);
      ball.vx *= friction;
      ball.vy *= friction;
      ball.x += ball.vx;
      ball.y += ball.vy;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "white";
      handles.forEach(drawHandle);
      ctx.restore();
      ball.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
