import Cube from "./Cube/Cube";
import Example from "./Example/Example";
import ExtrudedA from "./ExtrudedA/ExtrudedA";
import LinesAndBalls from "./LinesAndBalls/LinesAndBalls";
import LinesAndPoints from "./LinesAndPoints/LinesAndPoints";
import Matrices from "./Matrices/Matrices";
import NormalToPlane from "./NormalToPlane/NormalToPlane";
import Pyramid from "./Pyramid/Pyramid";
import RotateCamera from "./RotateCamera/RotateCamera";
import SpinningE from "./SpinningE/SpinningE";
import Square from "./Square/Square";
import TrianglesA from "./TrianglesA/TrianglesA";

export const animationsList = [
    {
        id: "example",
        component: Example
    },
    {
        id: "lines-and-balls",
        component: LinesAndBalls
    },
    {
        id: "lines-and-points",
        component: LinesAndPoints
    },
    {
        id: "rotate-camera",
        component: RotateCamera
    },
    {
        id: "square",
        component: Square
    },
    {
        id: "matrices",
        component: Matrices
    },
    {
        id: "normal-to-plane",
        component: NormalToPlane
    },
    {
        id: "spinning-e",
        component: SpinningE
    },
    {
        id: "triangles-a",
        component: TrianglesA
    },
    {
        id: "cube",
        component: Cube
    },
    {
        id: "pyramid",
        component: Pyramid
    },
    {
        id: "extruded-a",
        component: ExtrudedA
    },
];