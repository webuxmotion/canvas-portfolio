export class Camera {
  constructor() {
    this.angle = Math.PI + Math.PI / 2;
    this.thrust = 0;
    this.vr = 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this._halfWidth = 250;
  }

  update() {
    this.angle += this.vr;

    const ax = Math.cos(this.angle) * this.thrust;
    const ay = Math.sin(this.angle) * this.thrust;
    this.vx += ax;
    this.vz += ay;

    if (Math.abs(this.vx) > 0.01) {
      this.vx *= 0.993;
      this.x += this.vx;
    }
    if (Math.abs(this.vz) > 0.01) {
      this.vz *= 0.993;
      this.z += this.vz;
    }
    this.y += this.vy;
  }

  get p1() {
    return {
      x: this.x + Math.cos(this.angle + Math.PI / 2) * this._halfWidth,
      z: this.z + Math.sin(this.angle + Math.PI / 2) * this._halfWidth,
    };
  }

  get p2() {
    return {
      x: this.x + Math.cos(this.angle - Math.PI / 2) * this._halfWidth,
      z: this.z + Math.sin(this.angle - Math.PI / 2) * this._halfWidth,
    };
  }
}