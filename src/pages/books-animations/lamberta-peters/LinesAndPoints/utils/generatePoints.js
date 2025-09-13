import { Point3D } from "./Point3D";

export function generatePoints({ vpX, vpY }) {
  const size = 200;
  const half = size / 2;

  const frontSideCorners = [
    [-half, -half],
    [half, -half],
    [half, half],
    [-half, half],
    [-half, -half],
  ];

  function generateFrontPoints(depth) {
    const frontPoints = frontSideCorners.map((el) => {
      const point = [...el];
      point.push(depth);

      return point;
    });

    return frontPoints;
  }

  const points1 = generateFrontPoints(0);

  const allPoints = [...points1];

  const points = [];
  for (const point of allPoints) {
    const newPoint = new Point3D(
      point[0],
      point[1],
      point[2]
    );

    newPoint.setVanishingPoint(vpX, vpY);
    points.push(newPoint);
  }

  return points;
}
