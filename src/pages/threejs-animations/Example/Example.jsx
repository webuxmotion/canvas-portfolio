import Canvas from "@/components/Canvas/Canvas";
import { colors } from "@/pages/books-animations/lamberta-peters/lib/colors";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Colors } from "./Colors";
import Stats from "stats.js";

export default function Example() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const stats = new Stats();
    stats.showPanel(0); // 0 = fps, 1 = ms, 2 = memory
    document.body.appendChild(stats.dom);

    // Scene and camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // sky blue

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 20);
    camera.lookAt(5, 5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Cube
    const geometry = new THREE.BoxGeometry();

    const colorsObj = new Colors();
    colorsObj.colors.forEach((hGroup, hIdx) => {
      hGroup.forEach((sGroup, sIdx) => {
        sGroup.forEach((lItem, lIdx) => {
          const hGroupXOffset = hIdx * 1.1 * colorsObj.steps.h;

          const point = {
            x: hGroupXOffset + sIdx,
            z: lIdx * 1.1,
            y: lIdx,
            color: lItem,
          };
          const material = new THREE.MeshStandardMaterial({
            color: point.color,
          });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.x = point.x;
          cube.position.y = point.y;
          cube.position.z = point.z;
          scene.add(cube);
        });
      });
    });

    // Ground
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshStandardMaterial({ color: colors.primary });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Grid
    const grid = new THREE.GridHelper(20, 20, 0xffffff, colors.primary);
    scene.add(grid);

    // Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Movement state
    const move = { forward: false, backward: false, left: false, right: false };
    const speed = 0.5;

    const keyDownHandler = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          move.forward = true;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          move.backward = true;
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          move.left = true;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          move.right = true;
          break;
      }
    };

    const keyUpHandler = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          move.forward = false;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          move.backward = false;
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          move.left = false;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          move.right = false;
          break;
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    const rotationSpeed = 0.03;
    // Animate
    let animationFrameId;
    const animate = () => {
      stats.begin(); // start measuring
      animationFrameId = requestAnimationFrame(animate);

      // Rotate cube
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      // Move camera
      const forwardVec = new THREE.Vector3();
      camera.getWorldDirection(forwardVec);
      forwardVec.y = 0; // keep movement horizontal
      forwardVec.normalize();

      const rightVec = new THREE.Vector3();
      rightVec.crossVectors(camera.up, forwardVec).normalize();

      // Rotate camera left/right
      if (move.left) camera.rotation.y += rotationSpeed;
      if (move.right) camera.rotation.y -= rotationSpeed;

      if (move.forward) camera.position.addScaledVector(forwardVec, speed);
      if (move.backward) camera.position.addScaledVector(forwardVec, -speed);

      renderer.render(scene, camera);
      stats.end(); // stop measuring
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      document.body.removeChild(stats.dom);
    };
  }, []);

  return <Canvas ref={canvasRef} width={1000} height={800} />;
}
