import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { useMouse } from "../../hooks/useMouse";

export default function RotatingCamera() {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      let text = "";
      let p1 = {
        x: canvas.width / 2 - Math.cos(angle) * 200,
        y: canvas.height / 2 - Math.sin(angle) * 200,
      };
      let p2 = {
        x: canvas.width / 2 - Math.cos(angle + Math.PI) * 200,
        y: canvas.height / 2 - Math.sin(angle + Math.PI) * 200,
      };

      const pointOnLine = closestPointOnLine(
        p1.x,
        p1.y,
        p2.x,
        p2.y,
        mouse.x,
        mouse.y
      );
      ctx.beginPath();
      ctx.arc(pointOnLine.x, pointOnLine.y, 10, 0, Math.PI * 2);
      ctx.fill();

      const dx = mouse.x - pointOnLine.x;
      const dy = mouse.y - pointOnLine.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const side = pointSide(p1.x, p1.y, p2.x, p2.y, mouse.x, mouse.y);

      if (side == "left") {
        text = "Not visible";
      } else {
        text = "Visible";
      }

      ctx.beginPath();
      ctx.font = "40px Verdana";
      ctx.fillText(text, mouse.x + 10, mouse.y + 12);

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
      ctx.fill();

      angle += 0.01;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}

function closestPointOnLine(x1, y1, x2, y2, px, py) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);

  const cx = x1 + t * dx;
  const cy = y1 + t * dy;

  return { x: cx, y: cy };
}

function pointSide(x1, y1, x2, y2, px, py) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dxp = px - x1;
  const dyp = py - y1;

  const cross = dx * dyp - dy * dxp;

  if (cross > 0) return "left"; // mouse is on the left side
  else if (cross < 0) return "right"; // mouse is on the right side
  else return "on the line"; // exactly on the line
}
