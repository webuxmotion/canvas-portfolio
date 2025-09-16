import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Point3D } from "./utils/Point3D";
import { generatePoints } from "./utils/generatePoints";
import { disableKeysControl, initKeysControl } from "./utils/keysControl";
import { Ball3D } from "./utils/Ball3D";
import { getRelativeCoords } from "./utils/utils";

export default function RotateCamera({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const vpX = canvas.width / 2;
    const vpY = canvas.height / 2;
    const camera = {
      vx: 0,
      vy: 0,
      vz: 0,
      thrust: 0,
    };
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    const tPoints = [
      [-100, -100, 100],
      [100, -100, 100],
      [100, 100, 100],
      [-100, 100, 100],
      [-100, -100, 200],
      [100, -100, 200],
      [100, 100, 200],
      [-100, 100, 200],
    ];

    const tPoints3D = [];
    tPoints.forEach((tP) => {
      const tP3D = new Point3D(tP[0], tP[1], tP[2]);
      tP3D.setVanishingPoint(vpX, vpY);
      tPoints3D.push(tP3D);
    });

    initKeysControl({ camera });

    const points = generatePoints({ vpX, vpY });
    const camPoints = [];

    const camPosition = new Point3D(0, 0, 0);
    camPosition.setVanishingPoint(vpX, vpY);
    camPoints.push(camPosition);

    const camTarget = new Point3D(0, 0, 200);
    camTarget.setVanishingPoint(vpX, vpY);
    camPoints.push(camTarget);

    function draw(point, i) {
      if (i !== 0) {
        ctx.lineTo(point.getScreenX(), point.getScreenY());
      }
    }

    function move(point) {
      const vx = Math.cos(angleY - Math.PI / 2) * camera.thrust;
      const vy = Math.sin(angleY - Math.PI / 2) * camera.thrust;

      point._x += vx;
      point._z += vy;

      point.rotate(angleX, angleY, angleZ);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      tPoints3D.forEach((tP3D) => {
        const rel = getRelativeCoords(
          camPoints[0],
          camPoints[1],
          tP3D
        );
        const relPoint3D = new Point3D(rel.x, rel.y, rel.z);
        relPoint3D.setVanishingPoint(vpX, vpY);

        const ballRel = new Ball3D(5);
        ballRel.scaleX = ballRel.scaleY = relPoint3D.getScale();
        ballRel.x = relPoint3D.getScreenX();
        ballRel.y = relPoint3D.getScreenY();
        ballRel.draw(ctx);
      });

      points.forEach(move);
      camPoints.forEach(move);

      angleX += camera.vx;
      angleY += camera.vy;
      angleZ += camera.vz;

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.moveTo(points[0].getScreenX(), points[0].getScreenY());
      points.forEach(draw);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.moveTo(camPoints[0].getScreenX(), camPoints[0].getScreenY());
      camPoints.forEach(draw);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      disableKeysControl();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
