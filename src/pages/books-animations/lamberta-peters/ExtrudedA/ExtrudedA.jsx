import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { generatePoints, generateTriangles } from "./utils";

export default function ExtrudedA({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let points = generatePoints(),
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      angleX = 0,
      angleY = 0.01;

    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
      point.setCenter(0, 0, 200);
    });

    const triangles = generateTriangles(points);

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
