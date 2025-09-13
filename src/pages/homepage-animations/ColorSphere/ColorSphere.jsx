import { useRef, useEffect } from "react";
import Canvas from "../../../components/Canvas/Canvas";
import { Ball } from "./Ball";
import {
  generatePoints,
  transformPoint,
  updatePoints,
} from "./utils";
import { Camera } from "./Camera";
import { initKeysControl } from "./keysControl";

export default function ColorSphere() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fl = 250;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;

    const camera = new Camera();
    initKeysControl({ camera });

    const points = generatePoints();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updatePoints(points);

      const objectsToDraw = [];

      points.forEach((point) => {
        const newPoint = transformPoint(point, camera);

        if (newPoint) {
          const ball = new Ball();

          const scale = fl / (fl + newPoint.z);
          ball.scaleX = ball.scaleY = scale;
          ball.radius = 30;
          ball.x = vpX + newPoint.x * scale;
          ball.y = vpY + (newPoint.y + camera.y) * scale;
          ball.color = `hsl(${point.h}, 100%, ${scale * 100}%)`;

          objectsToDraw.push({ ball, z: newPoint.z });
        }
      });

      objectsToDraw.sort((a, b) => b.z - a.z);
      objectsToDraw.forEach(({ ball }) => ball.draw(ctx));

      camera.update(camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}