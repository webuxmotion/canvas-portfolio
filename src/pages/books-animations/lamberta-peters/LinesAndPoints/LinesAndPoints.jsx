import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Point3D } from "./utils/Point3D";
import { generatePoints } from "./utils/generatePoints";

export default function LinesAndPoints({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const vpX = canvas.width / 2;
    const vpY = canvas.height / 2;
    const angleX = 0.01;
    const angleY = 0.01;
    const angleZ = 0.01;

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
      point.rotateX(angleX);
      point.rotateY(angleY);
      point.rotateZ(angleZ);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(move);
      camPoints.forEach(move);

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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
