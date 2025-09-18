export class FPS {
  constructor(smoothing = 0.9, updateInterval = 500) {
    this.lastTime = performance.now();
    this.fps = 0;
    this.smoothing = smoothing;

    this.lastDisplayTime = performance.now();
    this.displayFps = 0;
    this.updateInterval = updateInterval; // ms
  }

  update() {
    const now = performance.now();
    const delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    const currentFps = 1 / delta;
    this.fps = this.fps * this.smoothing + currentFps * (1 - this.smoothing);

    // Only refresh visible FPS value at set interval
    if (now - this.lastDisplayTime >= this.updateInterval) {
      this.displayFps = Math.round(this.fps);
      this.lastDisplayTime = now;
    }

    return this.displayFps;
  }

  getFPS() {
    return Math.round(this.displayFps);
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`FPS: ${this.getFPS()}`, 10, 20);
    ctx.restore();
  }
}
