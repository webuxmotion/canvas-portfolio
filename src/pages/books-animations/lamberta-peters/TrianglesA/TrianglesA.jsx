import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Point3d } from "./Point3d";
import { Triangle } from "./Triangle";

export default function TrianglesA({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let points = [],
      triangles = [],
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      angleX = 0,
      angleY = 0.01,
      angleZ = 0;

    points[0] = new Point3d(-50, -250, 100);
    points[1] = new Point3d(50, -250, 100);
    points[2] = new Point3d(200, 250, 100);
    points[3] = new Point3d(100, 250, 100);
    points[4] = new Point3d(50, 100, 100);
    points[5] = new Point3d(-50, 100, 100);
    points[6] = new Point3d(-100, 250, 100);
    points[7] = new Point3d(-200, 250, 100);
    points[8] = new Point3d(0, -150, 100);
    points[9] = new Point3d(50, 0, 100);
    points[10] = new Point3d(-50, 0, 100);

    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
      point.setCenter(0, 0, 100);
    });

    triangles[0] = new Triangle(points[0], points[1], points[8], "#4BA75E");
    triangles[1] = new Triangle(points[1], points[9], points[8], "#54B1F9");
    triangles[2] = new Triangle(points[1], points[2], points[9], "#54B1F9");
    triangles[3] = new Triangle(points[2], points[4], points[9], "#54B1F9");
    triangles[4] = new Triangle(points[2], points[3], points[4], "#54B1F9");
    triangles[5] = new Triangle(points[4], points[5], points[9], "#54B1F9");
    triangles[6] = new Triangle(points[9], points[5], points[10], "#54B1F9");
    triangles[7] = new Triangle(points[5], points[6], points[7], "#54B1F9");
    triangles[8] = new Triangle(points[5], points[7], points[10], "#54B1F9");
    triangles[9] = new Triangle(points[0], points[10], points[7], "#54B1F9");
    triangles[10] = new Triangle(points[0], points[8], points[10], "#54B1F9");

    function move(point) {
      point.rotate(angleX, angleY, angleZ);
    }

    function draw(triangle) {
      triangle.draw(ctx);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(move);
      triangles.forEach(draw);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
