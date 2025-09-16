import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { disableKeysControl, initKeysControl } from "./keysControl";

export default function Matrices({ size = 500 }) {
  const canvasRef = useRef(null);

  // --- Math helpers ---
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const normalize = (v) => {
    const len = Math.hypot(v[0], v[1], v[2]);
    return len > 0 ? [v[0] / len, v[1] / len, v[2] / len] : [0, 0, 0];
  };

  const multiplyMatrixAndPoint = (m, p) => {
    const [x, y, z, w] = p;
    return [
      m[0] * x + m[4] * y + m[8] * z + m[12] * w,
      m[1] * x + m[5] * y + m[9] * z + m[13] * w,
      m[2] * x + m[6] * y + m[10] * z + m[14] * w,
      m[3] * x + m[7] * y + m[11] * z + m[15] * w,
    ];
  };

  const lookAt = (eye, target, up) => {
    const zAxis = normalize([
      eye[0] - target[0],
      eye[1] - target[1],
      eye[2] - target[2],
    ]);
    const xAxis = normalize(cross(up, zAxis));
    const yAxis = cross(zAxis, xAxis);

    return [
      xAxis[0],
      yAxis[0],
      zAxis[0],
      0,
      xAxis[1],
      yAxis[1],
      zAxis[1],
      0,
      xAxis[2],
      yAxis[2],
      zAxis[2],
      0,
      -dot(xAxis, eye),
      -dot(yAxis, eye),
      -dot(zAxis, eye),
      1,
    ];
  };

  const perspective = (fov, aspect, near, far) => {
    const f = 1 / Math.tan((fov * Math.PI) / 180 / 2);
    return [
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (far + near) / (near - far),
      -1,
      0,
      0,
      (2 * far * near) / (near - far),
      0,
    ];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let camZ = -300;
    let camX = 0;

    const camera = {
      x: 0,
      y: 0,
      z: -100,
      vr: 0,
      vy: 0,
      thrust: 0,
    };

    initKeysControl({ camera });

    // --- Scene points ---
    const squarePoints = [
      [-100, -100, 100],
      [100, -100, 100],
      [100, 100, 100],
      [-100, 100, 100],
    ];

    let animationFrameId;
    let angle = 0;

    let vx = 0;
    let vz = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      angle += camera.vr;

      const ax = Math.cos(angle + Math.PI / 2) * camera.thrust;
      const ay = Math.sin(angle + Math.PI / 2) * camera.thrust;
      vx += ax;
      vz += ay;

      if (Math.abs(vx) > 0.01) {
        vx *= 0.99;
        camera.x += vx;
      }
      if (Math.abs(vz) > 0.01) {
        vz *= 0.99;
        camera.z += vz;
      }
      camera.y += camera.vy;

      const cameraPos = [camera.x, camera.y, camera.z];
      const forward = [Math.sin(angle), 0, Math.cos(angle)];
      const target = [camera.x + forward[0], camera.y, camera.z + forward[2]];
      const up = [0, 1, 0];

      const viewMatrix = lookAt(cameraPos, target, up);
      const projMatrix = perspective(
        90,
        canvas.width / canvas.height,
        0.1,
        1000
      );

      const transformed = squarePoints.map((p) => {
        const worldPoint = [...p, 1];
        let cameraSpace = multiplyMatrixAndPoint(viewMatrix, worldPoint);
        let clipSpace = multiplyMatrixAndPoint(projMatrix, cameraSpace);

        // perspective divide
        const ndc = clipSpace.map((v) => v / clipSpace[3]);

        // map NDC [-1,1] → screen space
        return [
          (ndc[0] + 1) * 0.5 * canvas.width,
          (1 - ndc[1]) * 0.5 * canvas.height,
        ];
      });

      // draw points
      transformed.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // connect square edges
      ctx.strokeStyle = "cyan";
      ctx.beginPath();
      transformed.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

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
