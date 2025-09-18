import { colors } from "@/pages/books-animations/lamberta-peters/lib/colors";
import { projectPoint, transformPoint } from "./utils";
import { Ball } from "./lib/objects/Ball";

export class Spring {
  constructor({ camera, vpX, vpY, ctx }) {
    this.camera = camera;
    this.vpX = vpX;
    this.vpY = vpY;
    this.ctx = ctx;
    this.framePoints = this.genFramePoints();
    this.frameDrawObjects = [];
    this.circlePoint = { x: 500 + 1200, y: -500, z: 0 };
    this.circle = {
      steps: 20,
      radius: 100,
      objects: [],
      vx: Math.random() * 20 - 10,
      vy: Math.random() * 20 - 10,
      bounds: {
        left: 1000,
        right: 0,
        top: -1000,
        bottom: 0
      }
    };
    this.circle.points = this.genCirclePoints();

    this.objects = [
      new Ball({ camera, vpX, vpY }),
    ];
  }

  animate(deltaTime) {
    this.project({ camera: this.camera, vpX: this.vpX, vpY: this.vpY });
    this.draw(this.ctx);

    this.objects.forEach(obj => {
      obj.x += 1;
      obj.animate({ ctx: this.ctx });
    });
  }

  draw(ctx) {

    this.frameDrawObjects.forEach(({ item }) => {

      ctx.strokeStyle = `white`;

      ctx.beginPath();
      ctx.moveTo(item[0].x2d, item[0].y2d);
      ctx.lineTo(item[1].x2d, item[1].y2d);
      ctx.stroke();
    });

    this.circle.objects.forEach(({ item }) => {
      ctx.save();
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(item[0].x2d, item[0].y2d);
      ctx.lineTo(item[1].x2d, item[1].y2d);
      ctx.stroke();
      ctx.restore();
    });

    this.circlePoint.x += this.circle.vx;
    this.circlePoint.y += this.circle.vy;

    if (this.circlePoint.x + this.circle.radius > this.circle.bounds.left) {
      this.circle.vx *= -1;
    } else if (this.circlePoint.x - this.circle.radius < this.circle.bounds.right) {
      this.circle.vx *= -1;
    }

    if (this.circlePoint.y - this.circle.radius < this.circle.bounds.top) {
      this.circle.vy *= -1;
    } else if (this.circlePoint.y + this.circle.radius > this.circle.bounds.bottom) {
      this.circle.vy *= -1;
    }

    this.circle.points = this.genCirclePoints();
  }

  project({ camera, vpX, vpY }) {

    const frameDrawObjects = [];

    const lines = [];

    for (let i = 0; i < this.framePoints.length; i += 2) {
      const line = [this.framePoints[i], this.framePoints[i + 1]];

      lines.push(line);
    }

    lines.forEach((line) => {
      const tLine = [];

      line.forEach((p) => {
        const tp = transformPoint(p, camera);

        if (tp) tLine.push(tp);
      });

      if (tLine.length === 2) {
        const pLine = [];

        tLine.forEach((item) => {
          const pp = projectPoint(item, camera, vpX, vpY);

          pLine.push(pp);
        });

        frameDrawObjects.push({ item: pLine, z: tLine[tLine.length - 1].z });
      }
    });

    this.frameDrawObjects = frameDrawObjects;

    const circleLines = [];
    const circleObjects = [];

    this.circle.points.forEach((point, idx) => {
      let line;

      if (this.circle.points.length === idx + 1) {
        line = [point, this.circle.points[0]];
      } else {
        line = [point, this.circle.points[idx + 1]];
      }

      circleLines.push(line);
    });

    circleLines.forEach((line) => {
      const tLine = [];

      line.forEach((p) => {
        const tp = transformPoint(p, camera);

        if (tp) tLine.push(tp);
      });

      if (tLine.length === 2) {
        const pLine = [];

        tLine.forEach((item) => {
          const pp = projectPoint(item, camera, vpX, vpY);

          pLine.push(pp);
        });

        circleObjects.push({ item: pLine, z: tLine[tLine.length - 1].z });
      }
    });

    this.circle.objects = circleObjects;
  }

  genFramePoints() {
    const A = { x: 1200, y: 0, z: 2000};
    const B = { x: 2200, y: 0, z: 2000};
    const C = { x: 2200, y: -1000, z: 2000};
    const D = { x: 1200, y: -1000, z: 2000};

    const points = [A, B, B, C, C, D, D, A];

    return points;
  }

  genCirclePoints() {
    const { x, y, z } = this.circlePoint;
    const angleStep = Math.PI * 2 / this.circle.steps;

    const points = [];

    for (let i = 0; i < this.circle.steps; i++) {
      const point = { 
        x: x + Math.cos(angleStep * i) * this.circle.radius, 
        y: y + Math.sin(angleStep * i) * this.circle.radius, 
        z: z + 2000
      };

      points.push(point);
    }

    return points;
  }
}
