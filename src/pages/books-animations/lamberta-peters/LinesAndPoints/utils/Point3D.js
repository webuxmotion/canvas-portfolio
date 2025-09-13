export class Point3D {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.fl = 250;   // focal length
    this.vpX = 0;    // vanishing point X
    this.vpY = 0;    // vanishing point Y
    this.cX = 0;     // center X
    this.cY = 0;     // center Y
    this.cZ = 0;     // center Z
  }

  setVanishingPoint(vpX, vpY) {
    this.vpX = vpX;
    this.vpY = vpY;
  }

  setCenter(cX, cY, cZ) {
    this.cX = cX;
    this.cY = cY;
    this.cZ = cZ;
  }

  rotateX(angleX) {
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const y1 = this.y * cosX - this.z * sinX;
    const z1 = this.z * cosX + this.y * sinX;

    this.y = y1;
    this.z = z1;
  }

  rotateY(angleY) {
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    const x1 = this.x * cosY - this.z * sinY;
    const z1 = this.z * cosY + this.x * sinY;

    this.x = x1;
    this.z = z1;
  }

  rotateZ(angleZ) {
    const cosZ = Math.cos(angleZ);
    const sinZ = Math.sin(angleZ);

    const x1 = this.x * cosZ - this.y * sinZ;
    const y1 = this.y * cosZ + this.x * sinZ;

    this.x = x1;
    this.y = y1;
  }

  getScreenX() {
    const scale = this.fl / (this.fl + this.z + this.cZ);
    return this.vpX + (this.cX + this.x) * scale;
  }

  getScreenY() {
    const scale = this.fl / (this.fl + this.z + this.cZ);
    return this.vpY + (this.cY + this.y) * scale;
  }
}