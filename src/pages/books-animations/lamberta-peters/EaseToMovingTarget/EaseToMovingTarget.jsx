import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Ball } from "../lib/Ball";
import { useMouse } from "@/hooks/useMouse";

export default function EaseToMovingTarget({ size = 500 }) {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let isMouseInside = false;
    const easing = 0.05;
    const targetBall = new Ball();
    targetBall.color = "white";
    targetBall.radius = 6;

    const ball = new Ball();

    function setRandomTarget() {
      targetBall.x = Math.random() * canvas.width;
      targetBall.y = Math.random() * canvas.height;
    }

    setRandomTarget();

    const handleEnter = () => (isMouseInside = true);
    const handleLeave = () => (isMouseInside = false);

    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMouseInside) {
        targetBall.x = mouse.x;
        targetBall.y = mouse.y;
      }

      let vx = (targetBall.x - ball.x) * easing,
        vy = (targetBall.y - ball.y) * easing;

      if (vx < 0.01 && vx > -0.01) {
        if (!isMouseInside) {
          setRandomTarget();
        }
      } else {
        ball.x += vx;
        ball.y += vy;
      }

      ball.draw(ctx);
      targetBall.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
