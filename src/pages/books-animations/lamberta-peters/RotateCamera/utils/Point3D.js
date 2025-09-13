export class Point3D {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this._x = x;
    this._y = y;
    this._z = z;
    this.fl = 250; // focal length
    this.vpX = 0; // vanishing point X
    this.vpY = 0; // vanishing point Y
    this.cX = 0; // center X
    this.cY = 0; // center Y
    this.cZ = 0; // center Z
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

    const y1 = this._y * cosX - this._z * sinX;
    const z1 = this._z * cosX + this._y * sinX;

    this.y = y1;
    this.z = z1;
  }

  rotateY(angleY) {
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    const x1 = this._x * cosY - this._z * sinY;
    const z1 = this._z * cosY + this._x * sinY;

    this.x = x1;
    this.z = z1;
  }

  rotateZ(angleZ) {
    const cosZ = Math.cos(angleZ);
    const sinZ = Math.sin(angleZ);

    const x1 = this._x * cosZ - this._y * sinZ;
    const y1 = this._y * cosZ + this._x * sinZ;

    this.x = x1;
    this.y = y1;
  }

  rotate(angleX, angleY, angleZ) {
    let x = this._x;
    let y = this._y;
    let z = this._z;

    // --- Rotate around X ---
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    let y1 = y * cosX - z * sinX;
    let z1 = z * cosX + y * sinX;
    y = y1;
    z = z1;

    // --- Rotate around Y ---
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    let x1 = x * cosY - z * sinY;
    z1 = z * cosY + x * sinY;
    x = x1;
    z = z1;

    // --- Rotate around Z ---
    const cosZ = Math.cos(angleZ);
    const sinZ = Math.sin(angleZ);
    x1 = x * cosZ - y * sinZ;
    y1 = y * cosZ + x * sinZ;

    // Save transformed position
    this.x = x1;
    this.y = y1;
    this.z = z1;
  }

  getScale() {
    return this.fl / (this.fl + this.z + this.cZ);
  }

  getScreenX() {
    const scale = this.getScale();
    return this.vpX + (this.cX + this.x) * scale;
  }

  getScreenY() {
    const scale = this.getScale();
    return this.vpY + (this.cY + this.y) * scale;
  }
}
