import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ball } from "./Ball";

export default function MoveCamera() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fl = 250;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;

    function generatePoints() {
      const points = [];
      const rectSize = 250;
      const zStep = 500;
      for (let i = 100; i > 0; i--) {
        const p1 = { x: -rectSize, y: -rectSize, z: zStep * i };
        const p2 = { x: rectSize, y: -rectSize, z: zStep * i };
        const p3 = { x: rectSize, y: rectSize, z: zStep * i };
        const p4 = { x: -rectSize, y: rectSize, z: zStep * i };
        points.push(...[p1, p2, p3, p4]);
      }
      return points;
    }

    const points = generatePoints();

    let camAngle = 0;
    let vr = 0;

    const camera = {
      x: 0,
      y: 0,
    };

    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
    };

    function keyHandler() {
      if (
        (!keys.ArrowLeft && !keys.ArrowRight) ||
        (keys.ArrowLeft && keys.ArrowRight)
      ) {
        vr = 0;
      } else if (keys.ArrowLeft) {
        vr = -0.03;
      } else if (keys.ArrowRight) {
        vr = 0.03;
      }
    }

    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
        keyHandler();
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
        keyHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      camera.p1 = {
        x: camera.x + Math.cos(camAngle) * 250,
        y: camera.y + Math.sin(camAngle) * 250,
      };
      camera.p2 = {
        x: camera.x + Math.cos(camAngle + Math.PI) * 250,
        y: camera.y + Math.sin(camAngle + Math.PI) * 250,
      };

      points.forEach((point) => {
        const closest = closestPointOnLine(
          camera.p1.x,
          camera.p1.y,
          camera.p2.x,
          camera.p2.y,
          point.x,
          point.z
        );

        const side = pointSide(
          camera.p1.x,
          camera.p1.y,
          camera.p2.x,
          camera.p2.y,
          point.x,
          point.z
        );

        if (side == "right") {
          const dx = camera.x - closest.x;
          const dy = camera.y - closest.y;

          let distance = Math.sqrt(dx * dx + dy * dy);
          distance = closest.t > 0.5 ? distance : -distance;

          const dx2 = point.x - closest.x;
          const dy2 = point.z - closest.y;

          let distanceForZ = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          const newPoint = {
            x: distance,
            y: point.y,
            z: distanceForZ,
          };

          const ball = new Ball();

          const scale = fl / (fl + newPoint.z);
          ball.scaleX = ball.scaleY = scale;
          ball.radius = 100;
          ball.x = vpX + newPoint.x * scale;
          ball.y = vpY + newPoint.y * scale;
          ball.color = `hsl(200, 100%, ${scale * 100}%)`;

          ball.draw(ctx);
        }
      });

      camAngle += vr;
      camera.y += 10;

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

  return { x: cx, y: cy, t };
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