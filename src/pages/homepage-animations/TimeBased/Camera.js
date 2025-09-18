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
    this.fl = 300;
    this.friction = 0.982;

    this._halfWidth = 250;
  }

  update(deltaTime) {
    this.angle += this.vr * deltaTime;

    const ax = Math.cos(this.angle) * this.thrust;
    const ay = Math.sin(this.angle) * this.thrust;

    
    this.vx += ax * deltaTime;
    this.vz += ay * deltaTime;

    const frictionFactor = Math.pow(this.friction, deltaTime * 60);

    if (Math.abs(this.vx) > 0.01) {
      this.vx *= frictionFactor;
      this.x += this.vx * deltaTime;
    }
    if (Math.abs(this.vz) > 0.01) {
      this.vz *= frictionFactor;
      this.z += this.vz * deltaTime;
    }
    this.y += this.vy * deltaTime;
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