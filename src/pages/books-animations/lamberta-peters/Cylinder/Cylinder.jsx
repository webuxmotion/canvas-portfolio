import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Triangle } from "../lib/Triangle";
import { Point3d } from "../lib/Point3d";

export default function Cylinder({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let points = [],
      triangles = [],
      numFaces = 20,
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      angleX = 0,
      angleY = 0.01;

    for (var angle, xpos, ypos, i = 0, idx = 0; i < numFaces; i++) {
      angle = ((Math.PI * 2) / numFaces) * i;
      xpos = Math.cos(angle) * 200;
      ypos = Math.sin(angle) * 200;
      points[idx] = new Point3d(xpos, ypos, -100);
      points[idx + 1] = new Point3d(xpos, ypos, 100);
      idx += 2;
    }
    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
      point.setCenter(0, 0, 200);
    });

    for (i = 0, idx = 0; i < numFaces - 1; i++) {
      triangles[idx] = new Triangle(
        points[idx],
        points[idx + 3],
        points[idx + 1],
        "#54B1F9"
      );
      triangles[idx + 1] = new Triangle(
        points[idx],
        points[idx + 2],
        points[idx + 3],
        "#54B1F9"
      );
      idx += 2;
    }

    triangles[idx] = new Triangle(
      points[idx],
      points[1],
      points[idx + 1],
      "#54B1F9"
    );
    triangles[idx + 1] = new Triangle(
      points[idx],
      points[0],
      points[1],
      "#4BA75E"
    );

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

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
