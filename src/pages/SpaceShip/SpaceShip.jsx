import { useRef, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { Ship } from "./Ship";

function SpaceShip() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const ship = new Ship();
    ship.x = canvas.width / 2;
    ship.y = canvas.height / 2;

    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      ArrowDown: false,
    };

    let vr = 0;
    let vx = 0;
    let vy = 0;
    let thrust = 0;
    let speed = 0;

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

      if (!keys.ArrowUp) {
        thrust = 0;
        ship.showFlame = false;
      } else {
        thrust = 0.05;
        ship.showFlame = true;
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

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ship.rotation += vr;
      const angle = ship.rotation;
      const ax = Math.cos(angle) * thrust;
      const ay = Math.sin(angle) * thrust;
      vx += ax;
      vy += ay;

      if (Math.abs(vx) > 0.01) {
        vx *= 0.994;
        ship.x += vx;
      }
      if (Math.abs(vy) > 0.01) {
        vy *= 0.994;
        ship.y += vy;
      }
      speed = Math.sqrt(vx * vx + vy * vy);

      // screen wrapping
      const halfWidth = ship.width / 2;
      if (ship.x - halfWidth > canvas.width) {
        ship.x = 0 - halfWidth;
      } else if (ship.x + halfWidth < 0) {
        ship.x = canvas.width + halfWidth;
      }
      const halfHeight = ship.height / 2;
      if (ship.y + halfHeight < 0) {
        ship.y = canvas.height + halfHeight;
      } else if (ship.y - halfHeight > canvas.height) {
        ship.y = 0 - halfHeight;
      }

      ship.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} width={500} height={500} />;
}

export default SpaceShip;
