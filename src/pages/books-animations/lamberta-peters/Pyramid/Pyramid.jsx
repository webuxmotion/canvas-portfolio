import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Triangle } from "../lib/Triangle";
import { Point3d } from "../lib/Point3d";

export default function Pyramid() {
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
      angleY = 0.01;

    //pyramid
    points[0] = new Point3d(0, -100, 0);
    points[1] = new Point3d(100, 100, -100);
    points[2] = new Point3d(-100, 100, -100);
    points[3] = new Point3d(-100, 100, 100);
    points[4] = new Point3d(100, 100, 100);

    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
      point.setCenter(0, 0, 100);
    });

    triangles[0] = new Triangle(points[0], points[1], points[2], "#4BA75E");
    triangles[1] = new Triangle(points[0], points[2], points[3], "#54B1F9");
    triangles[2] = new Triangle(points[0], points[3], points[4], "#54B1F9");
    triangles[3] = new Triangle(points[0], points[4], points[1], "#54B1F9");
    triangles[4] = new Triangle(points[1], points[3], points[2], "#54B1F9");
    triangles[5] = new Triangle(points[1], points[4], points[3], "#54B1F9");

    function move(point) {
      point.rotateX(angleX);
      point.rotateY(angleY);
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

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
