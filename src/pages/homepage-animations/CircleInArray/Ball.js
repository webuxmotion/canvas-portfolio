export class Ball {
  constructor(props) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.radius = props?.radius || 40;
    this.color = props?.color || "#F05A5A";
    this.vx = 0;
    this.vy = 0;
    this.scaleX = 1;
    this.scaleY = 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  getBounds = function () {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  };
}
