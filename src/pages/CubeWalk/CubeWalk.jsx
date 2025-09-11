import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { useMouse } from "../../hooks/useMouse";
import { Ball } from "./Ball";

export default function CubeWalk() {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fl = 250;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;
    const ballRadius = 50;

    function generatePoints() {
      const points = [];
      const rectSize = 150;
      const zStep = 800;
      for (let i = 1; i >= 0; i--) {
        const p1 = { x: -rectSize, y: -rectSize, z: zStep * i };
        const p2 = { x: rectSize, y: -rectSize, z: zStep * i };
        const p3 = { x: rectSize, y: rectSize, z: zStep * i };
        const p4 = { x: -rectSize, y: rectSize, z: zStep * i };
        points.push(...[p1, p2, p3, p4]);
      }
      return points;
    }

    const points = generatePoints();
    const speed = 10;
    let pointFrom = points[1];
    let pointTo = points[2];
    let animPoint = { x: pointFrom.x, y: pointFrom.y, z: pointFrom.z };

    function updateAnimPoint() {
      // compute vector from current position to target
      const dx = pointTo.x - animPoint.x;
      const dy = pointTo.y - animPoint.y;
      const dz = pointTo.z - animPoint.z;

      // distance to target
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < speed) {
        // reached target, pick new points
        const fromIndex = Math.floor(Math.random() * 4);
        const toIndex = Math.floor(Math.random() * 4 + 4);
        pointFrom = points[fromIndex];
        pointTo = points[toIndex];
        animPoint.x = pointFrom.x;
        animPoint.y = pointFrom.y;
        animPoint.z = pointFrom.z;
        return;
      }

      // normalize vector and multiply by speed
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;
      const vz = (dz / dist) * speed;

      // update position
      animPoint.x += vx;
      animPoint.y += vy;
      animPoint.z += vz;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dx = mouse.x - vpX;
      const dy = mouse.y - vpY;

      updateAnimPoint();

      const ball = new Ball();

      const scale2 = fl / (fl + animPoint.z);
      ball.scaleX = ball.scaleY = scale2;
      ball.x = vpX + (animPoint.x + dx * 2) * scale2;
      ball.y = vpY + (animPoint.y + dy * 2) * scale2;
      ball.radius = ballRadius;
      ball.color = `rgba(27, 179, 255, ${scale2})`;
      ball.draw(ctx);

      points.forEach((point) => {
        const ball = new Ball();

        const scale = fl / (fl + point.z);
        ball.scaleX = ball.scaleY = scale;
        ball.radius = ballRadius;
        ball.x = vpX + (point.x + dx * 2) * scale;
        ball.y = vpY + (point.y + dy * 2) * scale;
        ball.color = `rgba(27, 179, 255, ${scale})`;

        ball.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
