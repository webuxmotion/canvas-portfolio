import { useRef, useEffect } from "react";
import Canvas from "../../../components/Canvas/Canvas";
import { Ball } from "./Ball";
import {
  generatePoints,
  transformPoint,
} from "./utils";
import { Camera } from "./Camera";
import { initKeysControl } from "./keysControl";

export default function TimeBased() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fl = 300;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;

    const camera = new Camera();
    camera.y = 400;
    camera.z = -200;
    initKeysControl({ camera });

    const points = generatePoints();

    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000; // in seconds
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const objectsToDraw = [];

      points.forEach((point) => {
        const newCross = [];

        point.forEach(p => {
          const tp = transformPoint(p, camera);

          if (tp) newCross.push(tp);
        });

        if (newCross.length === 5) {
          const cross = [];

          newCross.forEach(item => {
            const scale = fl / (fl + item.z);

            const p = { 
              x2d: vpX + item.x * scale,
              y2d: vpY + (item.y + camera.y) * scale,
              scale
            };

            cross.push(p);
          });

          objectsToDraw.push({ cross, z: newCross[newCross.length - 1].z });
        }
      });

      objectsToDraw.sort((a, b) => b.z - a.z);

      objectsToDraw.forEach(({ cross }) => {
        const cp = cross[4];

        let lForHsl = 80 * cp.scale;
        if (lForHsl < 7) lForHsl = 7;
        
        ctx.beginPath();
        ctx.fillStyle = `hsl(200, 20%, ${lForHsl}%)`;
        ctx.arc(cp.x2d, cp.y2d, 10 * cp.scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `hsl(200, 20%, ${lForHsl}%)`;

        ctx.beginPath();
        ctx.moveTo(cross[0].x2d, cross[0].y2d);
        ctx.lineTo(cross[1].x2d, cross[1].y2d);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cross[2].x2d, cross[2].y2d);
        ctx.lineTo(cross[3].x2d, cross[3].y2d);
        ctx.stroke();
      });

      camera.update(deltaTime);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(lastTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={1000} height={1000} />;
}