export class Colors {
  constructor() {
    this.steps = {
      h: 10,
      s: 10,
      l: 10,
    };
    this.maxValues = {
      h: 360,
      s: 100,
      l: 100,
    };

    this.stepSizes = this.getStepSizes();
    this.colors = this.getColors();
  }

  getStepSizes() {
    const stepSizes = {
      h: this.maxValues.h / this.steps.h,
      s: this.maxValues.s / this.steps.s,
      l: this.maxValues.l / this.steps.l,
    };

    return stepSizes;
  }

  getColors() {
    const colors = [];

    for (let i = 1; i <= this.steps.h; i++) {
      const h = i * this.stepSizes.h;
      const hGroup = [];

      for (let j = 1; j <= this.steps.s; j++) {
        const s = j * this.stepSizes.s;
        const sGroup = [];

        for (let k = 1; k <= this.steps.l; k++) {
          const l = k * this.stepSizes.l;
          const color = `hsl(${h}, ${s}%, ${l}%)`;

          sGroup.push(color);
        }

        hGroup.push(sGroup);
      }

      colors.push(hGroup);
    }

    return colors;
  }
}
