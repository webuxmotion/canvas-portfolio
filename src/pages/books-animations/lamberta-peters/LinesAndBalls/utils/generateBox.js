import { Ball3D } from "./Ball3D";

export function generateBox() {
    const size = 200;
    const half = size / 2;

    const frontSideCorners = [
        [-half, -half],
        [half, -half],
        [half, half],
        [-half, half]
    ];

    function generateFrontPoints(depth) {
        const frontPoints = frontSideCorners.map(el => {
            const point = [...el];
            point.push(depth);

            return point;
        });

        return frontPoints;
    }

    const points1 = generateFrontPoints(-half);
    const points2 = generateFrontPoints(half);

    const allPoints = [...points1, ...points2];

    const balls = [];
    for (const point of allPoints) {
        const ball = new Ball3D(3, "#fff");
        ball.xpos = point[0];
        ball.ypos = point[1];
        ball.zpos = point[2];
        balls.push(ball);
    }

    return balls;
}