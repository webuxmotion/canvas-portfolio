import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import BouncingBall from "./pages/BouncingBall/BouncingBall";
import Index from "./pages/Index/Index";
import SpaceShip from "./pages/SpaceShip/SpaceShip";

export const animations = [
  {
    id: "bouncing-ball",       
    component: BouncingBall,
  },
  {
    id: "space-ship",       
    component: SpaceShip,
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