import Example from "./Example/Example";
import LinesAndBalls from "./LinesAndBalls/LinesAndBalls";
import LinesAndPoints from "./LinesAndPoints/LinesAndPoints";
import Matrices from "./Matrices/Matrices";
import NormalToPlane from "./NormalToPlane/NormalToPlane";
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
];