import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ball } from "./Ball";
import { closestPointOnLine, generatePoints, pointSide, updatePoints } from "./utils";

export default function Strawberry() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fl = 250;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;

    const points = generatePoints();

    let camAngle = Math.PI + Math.PI / 2;
    let vr = 0;
    let vx = 0;
    let vy = 0;
    let vz = 0;
    let thrust = 0;

    const camera = {
      x: 0,
      y: -300,
      z: -300,
    };

    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      ArrowDown: false,
      KeyW: false,
      KeyS: false,
    };

    function keyHandler() {
      if (
        (!keys.ArrowLeft && !keys.ArrowRight) ||
        (keys.ArrowLeft && keys.ArrowRight)
      ) {
        vr = 0;
      } else if (keys.ArrowLeft) {
        vr = -0.03;
      } else if (keys.ArrowRight) {
        vr = 0.03;
      }

      if (
        (!keys.KeyW && !keys.KeyS) ||
        (keys.KeyW && keys.KeyS)
      ) {
        vy = 0;
      } else if (keys.KeyW) {
        vy = 4;
      } else if (keys.KeyS) {
        vy = -4;
      }

      if (
        (!keys.ArrowUp && !keys.ArrowDown) ||
        (keys.ArrowUp && keys.ArrowDown)
      ) {
        thrust = 0;
      } else if (keys.ArrowUp) {
        thrust = -0.2;
      } else if (keys.ArrowDown) {
        thrust = 0.2;
      }
    }

    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
        keyHandler();
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
        keyHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updatePoints(points);

      camera.p1 = {
        x: camera.x + Math.cos(camAngle + Math.PI / 2) * 250,
        z: camera.z + Math.sin(camAngle + Math.PI / 2) * 250,
      };
      camera.p2 = {
        x: camera.x + Math.cos(camAngle - Math.PI / 2) * 250,
        z: camera.z + Math.sin(camAngle - Math.PI / 2) * 250,
      };

      const objectsToDraw = [];

      points.forEach((point) => {
        const closest = closestPointOnLine(
          camera.p1.x,
          camera.p1.z,
          camera.p2.x,
          camera.p2.z,
          point.x,
          point.z
        );

        const side = pointSide(
          camera.p1.x,
          camera.p1.z,
          camera.p2.x,
          camera.p2.z,
          point.x,
          point.z
        );

        if (side == "right") {
          const dx = camera.x - closest.x;
          const dy = camera.z - closest.y;

          let distance = Math.sqrt(dx * dx + dy * dy);
          distance = closest.t > 0.5 ? distance : -distance;

          const dx2 = point.x - closest.x;
          const dy2 = point.z - closest.y;

          let distanceForZ = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          const newPoint = {
            x: distance,
            y: point.y,
            z: distanceForZ,
          };

          const ball = new Ball();

          const scale = fl / (fl + newPoint.z);
          ball.scaleX = ball.scaleY = scale;
          ball.radius = 30;
          ball.x = vpX + newPoint.x * scale;
          ball.y = vpY + (newPoint.y + camera.y) * scale;
          const s = 70 + Math.random() * 20;
          ball.color = `hsl(${point.h}, ${s}%, ${scale * 100}%)`;

          objectsToDraw.push({ ball, z: newPoint.z });
        }
      });

      objectsToDraw.sort((a, b) => b.z - a.z);
      objectsToDraw.forEach(({ ball }) => ball.draw(ctx));

      camAngle += vr;

      const ax = Math.cos(camAngle) * thrust;
      const ay = Math.sin(camAngle) * thrust;
      vx += ax;
      vz += ay;

      if (Math.abs(vx) > 0.01) {
        vx *= 0.993;
        camera.x += vx;
      }
      if (Math.abs(vz) > 0.01) {
        vz *= 0.993;
        camera.z += vz;
      }
      camera.y += vy;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}