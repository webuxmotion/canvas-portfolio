export class Point3d {
  constructor(x, y, z) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
    this.z = z === undefined ? 0 : z;
    this.fl = 250;
    this.vpX = 0;
    this.vpY = 0;
    this.cX = 0;
    this.cY = 0;
    this.cZ = 0;
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
    var cosX = Math.cos(angleX),
      sinX = Math.sin(angleX),
      y1 = this.y * cosX - this.z * sinX,
      z1 = this.z * cosX + this.y * sinX;
    this.y = y1;
    this.z = z1;
  }
  rotateY(angleY) {
    var cosY = Math.cos(angleY),
      sinY = Math.sin(angleY),
      x1 = this.x * cosY - this.z * sinY,
      z1 = this.z * cosY + this.x * sinY;
    this.x = x1;
    this.z = z1;
  }
  rotateZ(angleZ) {
    var cosZ = Math.cos(angleZ),
      sinZ = Math.sin(angleZ),
      x1 = this.x * cosZ - this.y * sinZ,
      y1 = this.y * cosZ + this.x * sinZ;
    this.x = x1;
    this.y = y1;
  }

  rotate(angleX, angleY, angleZ) {
    const cosX = Math.cos(angleX),
      sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY),
      sinY = Math.sin(angleY);
    const cosZ = Math.cos(angleZ),
      sinZ = Math.sin(angleZ);

    // Precompute matrix components
    const m00 = cosY * cosZ;
    const m01 = cosZ * sinX * sinY - cosX * sinZ;
    const m02 = sinX * sinZ + cosX * cosZ * sinY;

    const m10 = cosY * sinZ;
    const m11 = cosX * cosZ + sinX * sinY * sinZ;
    const m12 = cosX * sinY * sinZ - cosZ * sinX;

    const m20 = -sinY;
    const m21 = cosY * sinX;
    const m22 = cosX * cosY;

    // Apply rotation to this point
    const x1 = this.x * m00 + this.y * m01 + this.z * m02;
    const y1 = this.x * m10 + this.y * m11 + this.z * m12;
    const z1 = this.x * m20 + this.y * m21 + this.z * m22;

    this.x = x1;
    this.y = y1;
    this.z = z1;
  }

  rotateAround(point, angleX, angleY, angleZ) {
    // Step 1: translate so pivot becomes origin
    this.x -= point.x;
    this.y -= point.y;
    this.z -= point.z;

    // Step 2: apply rotation
    this.rotate(angleX, angleY, angleZ);

    // Step 3: translate back
    this.x += point.x;
    this.y += point.y;
    this.z += point.z;
  }

  getScreenX() {
    var scale = this.fl / (this.fl + this.z + this.cZ);
    return this.vpX + (this.cX + this.x) * scale;
  }
  getScreenY() {
    var scale = this.fl / (this.fl + this.z + this.cZ);
    return this.vpY + (this.cY + this.y) * scale;
  }
}
