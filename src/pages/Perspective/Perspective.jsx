import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { useMouse } from "../../hooks/useMouse";
import { Ball } from "./Ball";

export default function Perspective() {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fl = 250;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;

    function generatePoints() {
      const points = [];
      const rectSize = 250;
      const zStep = 100;
      for (let i = 50; i > 1; i--) {
        const p1 = { x: -rectSize, y: -rectSize, z: zStep * i };
        const p2 = { x: rectSize, y: -rectSize, z: zStep * i };
        const p3 = { x: rectSize, y: rectSize, z: zStep * i };
        const p4 = { x: -rectSize, y: rectSize, z: zStep * i };
        points.push(...[p1, p2, p3, p4]);
      }
      return points;
    }

    const points = generatePoints();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dx = mouse.x - vpX;
      const dy = mouse.y - vpY;

      points.forEach((point) => {
        const ball = new Ball();

        const scale = fl / (fl + point.z);
        ball.scaleX = ball.scaleY = scale;
        ball.radius = 100;
        ball.x = vpX + ((point.x + dx * 4) * scale);
        ball.y = vpY + ((point.y + dy * 4) * scale);
        ball.color = `hsl(200, 100%, ${scale * 100}%)`;

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
