import { Ball } from "./lib/objects/Ball";
import { projectPoint, transformPoint } from "./utils";

export class Colors {
  constructor() {
    this.steps = {
      h: 10,
      s: 10,
      l: 10,
    };
    this.maxValues = {
      h: 360,
      s: 100,
      l: 100,
    };

    this.ballRadius = 100;
    this.stepSizes = this.getStepSizes();
    this.colors = this.getColors();
  }

  animate({ ctx, camera, vpX, vpY }) {
    const points = [];

    this.colors.forEach((hGroup, hIdx) => {
      hGroup.forEach((sGroup, lIdx) => {
        sGroup.forEach((lItem, sIdx) => {
          const hGroupXOffset = hIdx * this.ballRadius * this.steps.h;

          const point = {
            x: hGroupXOffset + sIdx * this.ballRadius * 2,
            z: lIdx * this.ballRadius * 2,
            y: 0,
            color: lItem,
          };

          points.push(point);
        });
      });
    });

    const objectsToDraw = [];

    points.forEach((p) => {
      const tp = transformPoint(p, camera);

      if (tp) {
        objectsToDraw.push({ obj: p, z: tp.z });
      }
    });

    objectsToDraw.sort((a, b) => b.z - a.z);

    objectsToDraw.forEach(({ obj }) => {
      const ball = new Ball({ ctx, camera, vpX, vpY });
      ball.radius = this.ballRadius;
      ball.steps = 6;
      ball.x = obj.x;
      ball.z = obj.z;
      ball.color = obj.color;
      ball.animate({ ctx });
    });
  }

  getStepSizes() {
    const stepSizes = {
      h: this.maxValues.h / this.steps.h,
      s: this.maxValues.s / this.steps.s,
      l: this.maxValues.l / this.steps.l,
    };

    return stepSizes;
  }

  getColors() {
    const colors = [];

    for (let i = 1; i <= this.steps.h; i++) {
      const h = i * this.stepSizes.h;
      const hGroup = [];

      for (let j = 1; j <= this.steps.s; j++) {
        const s = j * this.stepSizes.s;
        const sGroup = [];

        for (let k = 1; k <= this.steps.l; k++) {
          const l = k * this.stepSizes.l;
          const color = `hsl(${h}, ${s}%, ${l}%)`;

          sGroup.push(color);
        }

        hGroup.push(sGroup);
      }

      colors.push(hGroup);
    }

    return colors;
  }
}
