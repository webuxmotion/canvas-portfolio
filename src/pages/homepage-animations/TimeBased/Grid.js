import { projectPoint, transformPoint } from "./utils";

export class Grid {
  constructor() {
    this.points = this.generatePoints();
    this.objectsToDraw = [];
  }

  draw(ctx) {
    this.objectsToDraw.forEach(({ cross }) => {
      const cp = cross[4];

      let lForHsl = 80 * cp.scale;
      if (lForHsl < 7) lForHsl = 7;

      ctx.beginPath();
      ctx.fillStyle = `hsl(40, 80%, ${lForHsl}%)`;
      ctx.arc(cp.x2d, cp.y2d, 20 * cp.scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `hsl(40, 80%, ${lForHsl}%)`;

      ctx.beginPath();
      ctx.moveTo(cross[0].x2d, cross[0].y2d);
      ctx.lineTo(cross[1].x2d, cross[1].y2d);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cross[2].x2d, cross[2].y2d);
      ctx.lineTo(cross[3].x2d, cross[3].y2d);
      ctx.stroke();
    });
  }

  sort() {
    this.objectsToDraw.sort((a, b) => b.z - a.z);
  }

  project({ camera, vpX, vpY }) {
    const objectsToDraw = [];

    this.points.forEach((point) => {
      const newCross = [];

      point.forEach((p) => {
        const tp = transformPoint(p, camera);

        if (tp) newCross.push(tp);
      });

      if (newCross.length === 5) {
        const cross = [];

        newCross.forEach((item) => {
          const pp = projectPoint(item, camera, vpX, vpY);

          cross.push(pp);
        });

        objectsToDraw.push({ cross, z: newCross[newCross.length - 1].z });
      }
    });

    this.objectsToDraw = objectsToDraw;
  }

  generatePoints(rows = 50, cols = 50) {
    return generatePoints(rows, cols);
  }
}

function generatePoints(rows = 30, cols = 30) {
  const points = [];
  const step = 250;
  const halfStep = step / 2;
  const crosses = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * step;
      const y = 0;
      const z = r * step;

      points.push({
        x,
        y,
        z,
      });
    }
  }

  points.forEach((point) => {
    const l1 = [
      {
        x: point.x - halfStep,
        y: 0,
        z: point.z,
      },
      {
        x: point.x + halfStep,
        y: 0,
        z: point.z,
      },
    ];

    const l2 = [
      {
        x: point.x,
        y: 0,
        z: point.z - halfStep,
      },
      {
        x: point.x,
        y: 0,
        z: point.z + halfStep,
      },
    ];

    crosses.push([...l1, ...l2, point]);
  });

  return crosses;
}
