import { projectPoint, transformPoint } from "../../utils";

export class Ball {
  constructor({ ctx, camera, vpX, vpY }) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.ctx = ctx;
    this.radius = 300;
    this.steps = 50;
    this.color = "white";
    this.vx = 0;
    this.vy = 0;
    this.vpX = vpX;
    this.vpY = vpY;
    this.camera = camera;
    this.points = [];
    this.objects = [];
  }

  animate({ camera, vpX, vpY, ctx }) {
    this.points = this.genPoints();

    let tPoints = [];
    let pPoints = [];

    this.points.forEach((p) => {
      const tp = transformPoint(p, this.camera);

      if (tp) {
        tPoints.push(tp);
      }
    });

    if (tPoints.length === this.steps) {
      tPoints.forEach((tP) => {
        const pp = projectPoint(tP, this.camera, this.vpX, this.vpY);

        pPoints.push(pp);
      });
    }

    this.objects = pPoints;

    this.draw({ ctx });
  }

  draw({ ctx }) {
    ctx.beginPath();

    console.log(this.color);
    if (this.objects.length > 0) {
      ctx.moveTo(this.objects[0].x2d, this.objects[0].y2d);
      for (let i = 1; i < this.objects.length; i++) {
        ctx.lineTo(this.objects[i].x2d, this.objects[i].y2d);
      }
      ctx.closePath(); // closes back to the first point

      ctx.fillStyle = this.color;

      ctx.fill();
      ctx.stroke();
    }
  }

  genPoints() {
    const angleStep = (Math.PI * 2) / this.steps;

    const points = [];

    for (let i = 0; i < this.steps; i++) {
      const point = {
        x: this.x + Math.cos(angleStep * i) * this.radius,
        y: this.y + Math.sin(angleStep * i) * this.radius,
        z: this.z + 2000,
      };

      points.push(point);
    }

    return points;
  }
}
