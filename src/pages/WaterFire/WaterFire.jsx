import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ball } from "./Ball";

function WaterFire() {
  const canvasRef = useRef(null);

  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gravity = 0.2;
    const fireColors = [
      "rgba(255, 245, 204, 0.5)", // pale white-yellow
      "rgba(255, 217, 102, 0.5)", // bright yellow
      "rgba(255, 140, 66, 0.5)", // orange
      "rgba(233, 79, 30, 0.5)", // red-orange
      "rgba(124, 10, 2, 0.5)", // dark ember red
    ];
    const waterColors = [
      "rgba(204, 245, 255, 0.5)", // very pale cyan
      "rgba(102, 217, 255, 0.5)", // light blue
      "rgba(66, 140, 255, 0.5)", // medium blue
      "rgba(30, 79, 233, 0.5)", // deep blue
      "rgba(2, 10, 124, 0.5)", // dark navy
    ];
    let palette = fireColors;
    let word = "fire";
    const totalBalls = 1000;
    const balls = generateBalls({ canvas, totalBalls, palette });
    let showMask = true;

    document.querySelectorAll(".js-pick-mode").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target.dataset.mode == "fire") {
          palette = fireColors;
          word = "fire";
        } else if (e.target.dataset.mode == "water") {
          palette = waterColors;
          word = "water";
        } else if (e.target.dataset.mode == "toggle-mask") {
          showMask = !showMask;
        }
      });
    });

    let x = canvas.width / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => {
        draw({ ball, canvas, palette, gravity, ctx });
      });

      if (showMask) {
        ctx.globalCompositeOperation = "destination-atop";

        ctx.font = "bold 200px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#1F1F1F";
        ctx.textBaseline = "middle";
        ctx.fillText(word, canvas.width / 2, canvas.height / 2);

        ctx.globalCompositeOperation = "source-over";
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div>
      <Canvas ref={canvasRef} width={500} height={500} />
      <button className="js-pick-mode" data-mode="fire">
        Fire
      </button>
      <button className="js-pick-mode" data-mode="water">
        Water
      </button>
      <button className="js-pick-mode" data-mode="toggle-mask">
        Toggle mask
      </button>
    </div>
  );
}

export default WaterFire;

function generateBalls({ canvas, totalBalls, palette }) {
  const balls = [];

  for (let i = 0; i < totalBalls; i++) {
    const ball = new Ball();

    setBallParams({ ball, canvas, palette });

    balls.push(ball);
  }

  return balls;
}

function setBallParams({ ball, canvas, palette }) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height;
  ball.vx = Math.random() * 6 - 3;
  ball.vy = Math.random() * -10 - 10;
  ball.radius = 50;

  const colorIndex = Math.floor(Math.random() * palette.length);
  ball.color = palette[colorIndex];
}

function draw({ ball, canvas, palette, gravity, ctx }) {
  if (
    ball.x - ball.radius > canvas.width ||
    ball.x + ball.radius < 0 ||
    ball.y - ball.radius * 10 > canvas.height ||
    ball.y + ball.radius < 0
  ) {
    setBallParams({ ball, canvas, palette });
  }

  ball.vy += gravity;
  ball.x += ball.vx;
  ball.y += ball.vy;

  ball.draw(ctx);
}
