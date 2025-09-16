import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { generateBox } from "./utils/generateBox";

export default function LinesAndBalls({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const balls = generateBox();
    const fl = 250;
    const vpX = canvas.width / 2;
    const vpY = canvas.height / 2;
    let angleX = 0.02;
    let angleY;

    function rotateX(ball, angle) {
      var cos = Math.cos(angle),
        sin = Math.sin(angle),
        y1 = ball.ypos * cos - ball.zpos * sin,
        z1 = ball.zpos * cos + ball.ypos * sin;
      ball.ypos = y1;
      ball.zpos = z1;
    }

    function rotateY(ball, angle) {
      var cos = Math.cos(angle),
        sin = Math.sin(angle),
        x1 = ball.xpos * cos - ball.zpos * sin,
        z1 = ball.zpos * cos + ball.xpos * sin;
      ball.xpos = x1;
      ball.zpos = z1;
    }

    function setPerspective(ball) {
      if (ball.zpos > -fl) {
        var scale = fl / (fl + ball.zpos);
        ball.scaleX = ball.scaleY = scale;
        ball.x = vpX + ball.xpos * scale;
        ball.y = vpY + ball.ypos * scale;
        ball.visible = true;
      } else {
        ball.visible = false;
      }
    }
    function move(ball, i) {
      rotateY(ball, angleX);

      setPerspective(ball);
      //don't draw line to first ball
      if (i !== 0) {
        ctx.lineTo(balls[i].x, balls[i].y);
      }
    }

    function drawBall(ball) {
      if (ball.visible) {
        ball.draw(ctx);
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();

      ctx.moveTo(balls[0].x, balls[0].y);
      balls.forEach(move);
      ctx.strokeStyle = "white";
      ctx.stroke();
      balls.forEach(drawBall);

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
