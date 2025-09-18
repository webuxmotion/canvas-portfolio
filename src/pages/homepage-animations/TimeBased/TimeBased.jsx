import { useRef, useEffect } from "react";
import Canvas from "../../../components/Canvas/Canvas";
import { Camera } from "./Camera";
import { initKeysControl } from "./keysControl";
import { Grid } from "./Grid";
import { Bounce } from "./Bounce";
import { FPS } from "./FPS";
import { Spring } from "./Spring";

export default function TimeBased() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;
    const fpsCounter = new FPS();

    const camera = new Camera();
    camera.x = 1000;
    camera.y = 400;
    camera.z = -500;
    initKeysControl({ camera });

    const grid = new Grid();
    const bounce = new Bounce();
    const spring = new Spring({ camera, vpX, vpY, ctx });

    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000; // in seconds
      lastTime = currentTime;
      fpsCounter.update();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      grid.project({ camera, vpX, vpY });
      grid.sort();
      grid.draw(ctx);

      bounce.project({ camera, vpX, vpY });
      bounce.sort();
      bounce.draw(ctx);

      spring.animate(deltaTime);

      camera.update(deltaTime);

      fpsCounter.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={1000} height={700} />;
}
