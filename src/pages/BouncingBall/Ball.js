export class Ball {
    constructor(props) {
        this.x = 0;
        this.y = 0;
        this.radius = props?.radius || 40;
        this.color = props?.color || "#F05A5A";
        this.vx = 0;
        this.vy = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}