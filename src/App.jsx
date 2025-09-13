import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index/Index";
import homepageAnimations from "./pages/homepage-animations";
import Books from "./pages/Books/Books";
import React from "react";
import LambertaPetersRoutes from "./pages/books-animations/lamberta-peters/LambertaPetersRoutes";

const {
  BouncingBall,
  SpaceShip,
  WaterFire,
  Example,
  Perspective,
  CubeWalk,
  RotatingCamera,
  MoveCamera,
  SpaceShipCamera,
  ColorSphere,
  Strawberry,
  VideoInSphere,
  Bounce3D,
} = homepageAnimations;

export const animations = [
  { id: "example", component: Example, codeSource: "Example" },
  { id: "bouncing-ball", component: BouncingBall, codeSource: "BouncingBall" },
  { id: "space-ship", component: SpaceShip, codeSource: "SpaceShip" },
  { id: "water-fire", component: WaterFire, codeSource: "WaterFire" },
  { id: "perspective", component: Perspective, codeSource: "Perspective" },
  { id: "cube-walk", component: CubeWalk, codeSource: "CubeWalk" },
  {
    id: "rotating-camera",
    component: RotatingCamera,
    codeSource: "RotatingCamera",
  },
  { id: "move-camera", component: MoveCamera, codeSource: "MoveCamera" },
  {
    id: "space-ship-camera",
    component: SpaceShipCamera,
    codeSource: "SpaceShipCamera",
  },
  { id: "color-sphere", component: ColorSphere, codeSource: "ColorSphere" },
  { id: "strawberry", component: Strawberry, codeSource: "Strawberry" },
  {
    id: "video-in-sphere",
    component: VideoInSphere,
    codeSource: "VideoInSphere",
  },
  { id: "bounce-3d", component: Bounce3D, codeSource: "Bounce3D" },
];

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/books-animations" element={<Books />} />

          {LambertaPetersRoutes()}

          {animations.map((anim) => {
            const Page = anim.component;
            return (
              <Route key={anim.id} path={`/${anim.id}`} element={<Page />} />
            );
          })}
        </Routes>
      </main>
    </>
  );
}

export default App;
