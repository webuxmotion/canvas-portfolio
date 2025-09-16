import Canvas from "@/components/Canvas/Canvas";
import { useRef, useEffect } from "react";
import { generatePoints, generateTriangles } from "./utils";

export default function RotateAround({ size = 500 }) {
  const canvasRef = useRef(null);

  let animationFrameId;
  let rotateSelf = false;

  function handleRotateClick() {
    rotateSelf = !rotateSelf;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let vpX = canvas.width / 2,
      vpY = canvas.height / 2;

    let points = generatePoints();
    let moveSpeed = 50,
      offsetX = 0,
      offsetY = 0,
      angleX = 0,
      angleY = 0.01;

    points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
      point.setCenter(0, 0, 200);
    });

    let triangles = generateTriangles(points);

    window.addEventListener(
      "keydown",
      function (event) {
        if (rotateSelf) {
          if (event.keyCode === 37) {
            //left
            offsetX += -moveSpeed;
          } else if (event.keyCode === 39) {
            //right
            offsetX += moveSpeed;
          } else if (event.keyCode === 38) {
            //up
            offsetY += -moveSpeed;
          } else if (event.keyCode === 40) {
            //down
            offsetY += moveSpeed;
          }
          points.forEach(function (point) {
            point.setCenter(offsetX, offsetY, 200);
          });
        } else {
          if (event.keyCode === 37) {
            //left
            offsetX = -moveSpeed;
          } else if (event.keyCode === 39) {
            //right
            offsetX = moveSpeed;
          } else if (event.keyCode === 38) {
            //up
            offsetY = -moveSpeed;
          } else if (event.keyCode === 40) {
            //down
            offsetY = moveSpeed;
          }
          points.forEach(function (point) {
            point.x += offsetX;
            point.y += offsetY;
          });
        }
      },
      false
    );

    function move(point) {
      point.rotateX(angleX);
      point.rotateY(angleY);
    }

    function draw(triangle) {
      triangle.draw(ctx);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(move);
      triangles.forEach(draw);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Canvas ref={canvasRef} width={size} height={size} />
      <button onClick={handleRotateClick}>Rotate around origin</button>
      <button onClick={handleRotateClick}>Rotate around self</button>
      <p>Use keys: "Left" and "Right" to move object</p>
    </div>
  );
}
