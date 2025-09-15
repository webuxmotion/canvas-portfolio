import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Ball } from "../lib/Ball";
import { useMouse } from "@/hooks/useMouse";

export default function Springing() {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;
  let useGravity = false;

  function handleToggleGravityClick() {
    useGravity = !useGravity;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let isMouseEnterCanvas = false;

    let ball = new Ball(),
      spring = 0.03,
      friction = 0.9,
      targetX = canvas.width / 2,
      targetY = canvas.height / 2,
      gravity = 2,
      vx = 0,
      vy = 0;

    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;

    function setRandomTarget() {
      targetX = Math.random() * canvas.width;
      targetY = Math.random() * canvas.height;
    }

    function isAnimationSettled() {
      const speed = Math.sqrt(vx * vx + vy * vy);

      return speed < 0.1; // tolerance thresholds
    }

    setRandomTarget();

    const handleEnter = () => (isMouseEnterCanvas = true);
    const handleLeave = () => (isMouseEnterCanvas = false);

    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMouseEnterCanvas) {
        targetX = mouse.x;
        targetY = mouse.y;
      }

      var dx = targetX - ball.x,
        dy = targetY - ball.y,
        ax = dx * spring,
        ay = dy * spring;

      vx += ax;
      vy += ay;
      vx *= friction;
      vy *= friction;
      if (useGravity) {
        vy += gravity;
      }

      if (isAnimationSettled()) {
        if (!isMouseEnterCanvas) {
          setRandomTarget();
        }
      } else {
        ball.x += vx;
        ball.y += vy;
      }

      if (useGravity) {
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(ball.x, ball.y);
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      ball.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Canvas ref={canvasRef} width={500} height={500} />
      <button onClick={handleToggleGravityClick}>Toggle gravity</button>
    </div>
  );
}
