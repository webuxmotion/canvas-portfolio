export class HueOscillator {
  constructor(start = 0, min = 0, max = 254, step = 1) {
    this.value = start;
    this.min = min;
    this.max = max;
    this.step = step;
    this.increasing = true;
  }

  update() {
    if (this.value >= this.max) {
      this.increasing = false;
    } else if (this.value <= this.min) {
      this.increasing = true;
    }

    this.value += this.increasing ? this.step : -this.step;
    return this.value;
  }
}