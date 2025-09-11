import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import BouncingBall from "./pages/BouncingBall/BouncingBall";
import Index from "./pages/Index/Index";
import SpaceShip from "./pages/SpaceShip/SpaceShip";
import WaterFire from "./pages/WaterFire/WaterFire";
import Example from "./pages/Example/Example";
import Perspective from "./pages/Perspective/Perspective";
import CubeWalk from "./pages/CubeWalk/CubeWalk";
import RotatingCamera from "./pages/RotatingCamera/RotatingCamera";

export const animations = [
  {
    id: "example",       
    component: Example,
    codeSource: "Example"
  },
  {
    id: "bouncing-ball",       
    component: BouncingBall,
    codeSource: "BouncingBall"
  },
  {
    id: "space-ship",       
    component: SpaceShip,
    codeSource: "SpaceShip"
  },
  {
    id: "water-fire",       
    component: WaterFire,
    codeSource: "WaterFire"
  },
  {
    id: "perspective",       
    component: Perspective,
    codeSource: "Perspective"
  },
  {
    id: "cube-walk",       
    component: CubeWalk,
    codeSource: "CubeWalk"
  },
  {
    id: "rotating-camera",       
    component: RotatingCamera,
    codeSource: "RotatingCamera"
  },
];

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Index />} />

          {animations.map((anim) => {
            const Page = anim.component;
            return (
              <Route
                key={anim.id}
                path={`/${anim.id}`} 
                element={<Page />} 
              />
            );
          })}
        </Routes>
      </main>
    </>
  );
}

export default App;