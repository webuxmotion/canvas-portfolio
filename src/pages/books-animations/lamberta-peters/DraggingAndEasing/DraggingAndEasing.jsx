import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Ball } from "../lib/Ball";
import { useMouse } from "@/hooks/useMouse";
import { colors } from "../lib/colors";
import { isBallContainsMouse } from "./utils";

export default function DraggingAndEasing({ size = 500 }) {
  const canvasRef = useRef(null);
  const mouse = useMouse(canvasRef);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // easing
    let easing = 0.05,
      targetX = canvas.width / 2,
      targetY = canvas.height / 2;
    // easing.

    let ball = new Ball();
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    let isMouseDown = false;
    let moveDx = 0;
    let moveDy = 0;

    canvas.addEventListener("mousedown", function () {
      if (isBallContainsMouse(ball, mouse)) {
        isMouseDown = true;
        moveDx = mouse.x - ball.x;
        moveDy = mouse.y - ball.y;
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mousemove", onMouseMove);
      }
    });

    function onMouseUp() {
      isMouseDown = false;
      moveDx = 0;
      moveDy = 0;
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
    }

    function onMouseMove() {
      ball.x = mouse.x - moveDx;
      ball.y = mouse.y - moveDy;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let drawMouseCursor = false;

      if (isBallContainsMouse(ball, mouse)) {
        ball.color = colors.secondary;
        drawMouseCursor = true;
      } else {
        ball.color = colors.primary;
      }

      // easing
      if (!isMouseDown) {
        var vx = (targetX - ball.x) * easing,
          vy = (targetY - ball.y) * easing;

        if (!(vx < 0.01 && vx > -0.01)) {
          ball.x += vx;
          ball.y += vy;
        }
      }
      // easing.

      ball.draw(ctx);

      if (drawMouseCursor) {
        const cursorBall = new Ball();
        cursorBall.x = mouse.x;
        cursorBall.y = mouse.y;
        cursorBall.color = "white";
        cursorBall.radius = 5;
        cursorBall.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
