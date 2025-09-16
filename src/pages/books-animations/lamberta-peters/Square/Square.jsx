import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { Point3D } from "./utils/Point3D";
import { Camera } from "./utils/Camera";
import { disableKeysControl, initKeysControl } from "./utils/keysControl";
import { transformPoint } from "./utils/utils";
import { Ball } from "./utils/Ball";

export default function Square({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const camera = new Camera();
    initKeysControl({ camera });

    let points = [],
      fl = 250,
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      angleX = 0,
      angleY = 0.05;

    points[0] = new Point3D(-100, -100, 100);
    points[1] = new Point3D(100, -100, 100);
    points[2] = new Point3D(100, 100, 100);
    points[3] = new Point3D(-100, 100, 100);

    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
    });

    function move(point) {
      point.rotateX(angleX);
      point.rotateY(angleY);
    }

    function draw(point, i) {
      if (i !== 0) {
        ctx.lineTo(point.getScreenX(), point.getScreenY());
      }
    }

    let objectsToDraw = [];

    function drawInCamera(point) {
      const newPoint = transformPoint(point, camera);

      if (newPoint) {
        const ball = new Ball();

        const scale = fl / (fl + newPoint.z);
        ball.scaleX = ball.scaleY = scale;
        ball.radius = 30;
        ball.x = vpX + newPoint.x * scale;
        ball.y = vpY + (newPoint.y + camera.y) * scale;
        ball.color = `hsl(200, 100%, ${scale * 100}%)`;

        objectsToDraw.push({ ball, z: newPoint.z });
      }
    }

    function drawOnCamAndUpdate() {
      objectsToDraw = [];
      points.forEach(drawInCamera);
      objectsToDraw.sort((a, b) => b.z - a.z);
      objectsToDraw.forEach(({ ball }) => ball.draw(ctx));
      camera.update();
    }

    function drawLines() {
      ctx.beginPath();
      ctx.moveTo(points[0].getScreenX(), points[0].getScreenY());
      points.forEach(draw);
      ctx.strokeStyle = "white";
      ctx.closePath();
      ctx.stroke();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(move);

      drawLines();

      drawOnCamAndUpdate();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      disableKeysControl();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={size} height={size} />;
}
