import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";

export default function Example({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let x = canvas.width / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(x, canvas.height / 2, 20, 0, Math.PI * 2);
      ctx.fill();
      
      x += 1;

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
