import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Ball } from "./Ball";
import { useMouse } from "@/hooks/useMouse";
import utils from "./utils";

export default function CircleInArray() {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gridSize = 23;
    const balls = [];
    const ballActiveColor = "#54B1F9";
    const ballIdleColor = "#252424";

    for (let i = 0; i < gridSize * gridSize; i++) {
      const ball = new Ball();
      ball.radius = 10;
      ball.color = ballIdleColor;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;

      balls.push(ball);
    }

    function getCircularNeighbors(cx, cy, radius, gridSize) {
      const neighbors = [];

      for (let x = cx - radius; x <= cx + radius; x++) {
        for (let y = cy - radius; y <= cy + radius; y++) {
          // stay inside grid
          if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) continue;

          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist <= radius) {
            neighbors.push({ x, y });
          }
        }
      }

      return neighbors;
    }

    let near = null;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball, idx) => {
        const col = idx % gridSize;
        const row = Math.floor(idx / gridSize);
        const spacing = ball.radius * 2 + 2;

        ball.x = (col * spacing + spacing) - 14;
        ball.y = (row * spacing + spacing) - 14;

        if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
          // Example: 20x20 grid, center (5,5), radius 3
          near = getCircularNeighbors(col, row, 6, gridSize);
        }
      });

      balls.forEach((ball) => {
        ball.color = ballIdleColor;
      });

      if (near) {
        near.forEach(point => {
          const offsetByRow = point.y * gridSize;

          const idx = offsetByRow + point.x;

          balls[idx].color = ballActiveColor;
        });
      }

      balls.forEach((ball) => {
        ball.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}
