import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Point3d } from "./Point3d";
import { Triangle } from "./Triangle";
import utils from "./utils";

export default function Cube() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let points = [],
      triangles = [],
      mouse = utils.captureMouse(canvas),
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      angleX = 0,
      angleY = -0.01;

    points[0] = new Point3d(-100, -100, -100);
    points[1] = new Point3d(100, -100, -100);
    points[2] = new Point3d(100, 100, -100);
    points[3] = new Point3d(-100, 100, -100);

    points[4] = new Point3d(-100, -100, 100);
    points[5] = new Point3d(100, -100, 100);
    points[6] = new Point3d(100, 100, 100);
    points[7] = new Point3d(-100, 100, 100);

    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
      point.setCenter(0, 0, 50);
    });

    //front
    triangles[0] = new Triangle(points[0], points[1], points[2], "#4BA75E");
    triangles[1] = new Triangle(points[0], points[2], points[3], "#54B1F9");
    //top
    triangles[2] = new Triangle(points[0], points[5], points[1], "#54B1F9");
    triangles[3] = new Triangle(points[0], points[4], points[5], "#54B1F9");
    //back
    triangles[4] = new Triangle(points[4], points[6], points[5], "#54B1F9");
    triangles[5] = new Triangle(points[4], points[7], points[6], "#54B1F9");
    //bottom
    triangles[6] = new Triangle(points[3], points[2], points[6], "#54B1F9");
    triangles[7] = new Triangle(points[3], points[6], points[7], "#54B1F9");
    //right
    triangles[8] = new Triangle(points[1], points[5], points[6], "#54B1F9");
    triangles[9] = new Triangle(points[1], points[6], points[2], "#54B1F9");
    //left
    triangles[10] = new Triangle(points[4], points[0], points[3], "#54B1F9");
    triangles[11] = new Triangle(points[4], points[3], points[7], "#54B1F9");

    function move(point) {
      point.rotateX(angleX);
      point.rotateY(angleY);
    }

    function draw(triangle) {
      triangle.draw(ctx);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      angleX = (mouse.y - vpY) * 0.0001;
      angleY = (mouse.x - vpX) * 0.0001;

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
