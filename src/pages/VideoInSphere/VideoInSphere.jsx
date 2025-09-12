import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ball } from "./Ball";
import {
  closestPointOnLine,
  drawVideoQuad,
  generatePoints,
  pointSide,
  transformPoint,
  updatePoints,
} from "./utils";

export default function VideoInSphere() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  let videoObject = null;

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fl = 250;
    let vpX = canvas.width / 2;
    let vpY = canvas.height / 2;

    const rect3D = [
      { x: -400, y: -200, z: 1000 },
      { x: 400, y: -200, z: 1000 },
      { x: 400, y: 200, z: 1000 },
      { x: -400, y: 200, z: 1000 },
    ];

    const points = generatePoints();

    let camAngle = Math.PI + Math.PI / 2;
    let vr = 0;
    let vx = 0;
    let vy = 0;
    let vz = 0;
    let thrust = 0;

    const camera = {
      x: 0,
      y: 0,
      z: 0,
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

      if ((!keys.KeyW && !keys.KeyS) || (keys.KeyW && keys.KeyS)) {
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
          ball.color = `hsl(${point.h}, 100%, ${scale * 100}%)`;

          objectsToDraw.push({ ball, z: newPoint.z });
        }
      });

      const projectedRect = rect3D
        .map((p) => transformPoint(p, camera, camAngle, fl, vpX, vpY))
        .filter(Boolean);

      if (
        projectedRect.length === 4 &&
        videoRef.current &&
        !videoRef.current.paused
      ) {
        // Transform points relative to camera to get correct depth
        const cameraZs = rect3D.map((p) => {
          const tp = transformPoint(p, camera, camAngle, fl, vpX, vpY, true); // camera-space coordinates
          return tp ? tp.z : 0;
        });

        const avgZ = cameraZs.reduce((a, b) => a + b, 0) / cameraZs.length;
        const minZ = Math.min(...cameraZs);

        // Only draw video if camera hasn't reached it
        if (minZ > 0) {
          videoObject = {
            draw: () =>
              drawVideoQuad(
                ctx,
                videoRef.current,
                projectedRect[0],
                projectedRect[1],
                projectedRect[2],
                projectedRect[3],
                4
              ),
            z: avgZ,
          };
        } else {
          videoObject = null; // hide video
        }
      }

      const allObjects = [...objectsToDraw];
      if (videoObject) allObjects.push(videoObject);

      allObjects.sort((a, b) => b.z - a.z);
      allObjects.forEach((obj) => {
        if (obj?.ball) {
          obj.ball.draw(ctx);
        } else {
          obj.draw();
        }
      });

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

  return (
    <>
      <video
        ref={videoRef}
        src="/videos/animations/water-fire.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />
      <Canvas ref={canvasRef} width={1300} height={500} />
    </>
  );
}
