import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Point3d } from "./Point3d";

export default function SpinningE() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let points = [],
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      angleX = 0,
      angleY = -0.01;
     
    points[0] = new Point3d(-150, -250, 110);
    points[1] = new Point3d(150, -250, 90);
    points[2] = new Point3d(150, -150, 110);
    points[3] = new Point3d(-50, -150, 90);
    points[4] = new Point3d(-50, -50, 110);
    points[5] = new Point3d(50, -50, 90);
    points[6] = new Point3d(50, 50, 110);
    points[7] = new Point3d(-50, 50, 90);
    points[8] = new Point3d(-50, 150, 110);
    points[9] = new Point3d(150, 150, 90);
    points[10] = new Point3d(150, 250, 110);
    points[11] = new Point3d(-150, 250, 90);

    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
      point.setCenter(0, 0, 100);
    });

    function move(point) {
      point.rotateX(angleX);
      point.rotateY(angleY);
    }

    function draw(point, i) {
      if (i !== 0) {
        ctx.lineTo(point.getScreenX(), point.getScreenY());
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(move);
      ctx.beginPath();
      ctx.moveTo(points[0].getScreenX(), points[0].getScreenY());
      points.forEach(draw);
      ctx.closePath();
      ctx.fillStyle = "#54B1F9";
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
