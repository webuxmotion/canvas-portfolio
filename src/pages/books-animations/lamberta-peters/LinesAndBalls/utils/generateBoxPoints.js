import { Ball3D } from "./Ball3D";

export function generateBoxPoints() {
    const cubeSize = 200;
    const half = cubeSize / 2;

    const edgePoints = [];

    // Cube corners
    const corners = [
        [-half, -half, -half],
        [half, -half, -half],
        [half, half, -half],
        [-half, half, -half],
        [-half, -half, half],
        [half, -half, half],
        [half, half, half],
        [-half, half, half],
    ];

    // Each edge is a pair of corner indices
    const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // bottom face
        [4, 5], [5, 6], [6, 7], [7, 4], // top face
        [0, 4], [1, 5], [2, 6], [3, 7]  // vertical edges
    ];

    // Create points for balls along edges (for example, one ball per corner)
    for (const [i1, i2] of edges) {
        const start = corners[i1];
        const end = corners[i2];

        // Add start and end points of each edge
        edgePoints.push(start);
        edgePoints.push(end);
    }

    // Create Ball3D instances at these points
    const balls = [];
    for (const point of edgePoints) {
        const ball = new Ball3D(5, "#fff");
        ball.xpos = point[0];
        ball.ypos = point[1];
        ball.zpos = point[2];
        balls.push(ball);
    }

    return balls;
}