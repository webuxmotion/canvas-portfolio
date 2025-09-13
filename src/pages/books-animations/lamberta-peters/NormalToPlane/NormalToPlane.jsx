import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Ball } from "./Ball";
import { disableKeysControl, initKeysControl } from "./keysControl";

export default function NormalToPlane() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const camera = {
      vr: 0,
      angle: 0,
    };
    initKeysControl({ camera });

    let fl = 250;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;
    let projectedPoints = [];

    const plane = {
      A: { x: 0, y: 0, z: 0 },
      B: { x: 0, y: -100, z: 0 },
      C: { x: 100, y: 0, z: 0 },
    };

    function transformPoints() {
      const AB = {
        x: plane.B.x - plane.A.x,
        y: plane.B.y - plane.A.y,
        z: plane.B.z - plane.A.z,
      };

      const AC = {
        x: plane.C.x - plane.A.x,
        y: plane.C.y - plane.A.y,
        z: plane.C.z - plane.A.z,
      };

      const normal = {
        x: AB.y * AC.z - AB.z * AC.y,
        y: AB.z * AC.x - AB.x * AC.z,
        z: AB.x * AC.y - AB.y * AC.x,
      };

      const len = Math.hypot(normal.x, normal.y, normal.z);
      normal.x /= len;
      normal.y /= len;
      normal.z /= len;

      const size = 100;
      const depth = -200;
      const points = [
        { x: -size, y: -size, z: -depth },
        { x: size, y: -size, z: -depth },
        { x: size, y: size, z: -depth },
        { x: -size, y: size, z: -depth },
      ];

      // Normalize AB to get local X-axis:
      const lenAB = Math.hypot(AB.x, AB.y, AB.z);
      const xAxis = { x: AB.x / lenAB, y: AB.y / lenAB, z: AB.z / lenAB };
      // Make Y-axis orthogonal (Gram–Schmidt):
      const dotACx = AC.x * xAxis.x + AC.y * xAxis.y + AC.z * xAxis.z;
      let yAxis = {
        x: AC.x - dotACx * xAxis.x,
        y: AC.y - dotACx * xAxis.y,
        z: AC.z - dotACx * xAxis.z,
      };
      const lenY = Math.hypot(yAxis.x, yAxis.y, yAxis.z);
      yAxis.x /= lenY;
      yAxis.y /= lenY;
      yAxis.z /= lenY;
      // Now we have orthonormal basis (xAxis, yAxis, normal).
      // Compute vector from A to D:

      points.forEach((point) => {
        const AD = {
          x: point.x - plane.A.x,
          y: point.y - plane.A.y,
          z: point.z - plane.A.z,
        };
        // Project AD onto basis vectors to get local coordinates:
        const localD = {
          x: AD.x * xAxis.x + AD.y * xAxis.y + AD.z * xAxis.z, // coordinate along AB
          y: AD.x * yAxis.x + AD.y * yAxis.y + AD.z * yAxis.z, // coordinate along AC (orthogonalized)
          z: AD.x * normal.x + AD.y * normal.y + AD.z * normal.z, // distance from plane
        };

        projectedPoints.push(localD);
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      projectedPoints = [];
      transformPoints();

      projectedPoints.forEach((point) => {
        const ball = new Ball();

        const scale = fl / (fl + point.z);
        ball.scaleX = ball.scaleY = scale;
        ball.radius = 10;
        ball.x = vpX + point.x * scale;
        ball.y = vpY + point.y * scale;
        ball.color = `hsl(200, 100%, ${scale * 100}%)`;

        ball.draw(ctx);
      });

      const vx = Math.cos(camera.angle) * 100;
      const vy = Math.sin(camera.angle) * 100;

      camera.angle += camera.vr;
      plane.C.x = vx;
      plane.C.z = vy;
      

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      disableKeysControl();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
