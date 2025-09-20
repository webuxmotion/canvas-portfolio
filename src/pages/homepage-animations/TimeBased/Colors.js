export class Colors {
    constructor() {
        this.steps = {
            h: 20,
            s: 10,
            l: 10
        };
        this.maxValues = {
            h: 360,
            s: 100,
            l: 100
        };

        this.stepSizes = this.getStepSizes();
        this.colors = this.getColors();
    }

    animate(props) {
        
    }

    getStepSizes() {
        const stepSizes = {
            h: this.maxValues.h / this.steps.h,
            s: this.maxValues.s / this.steps.s,
            l: this.maxValues.l / this.steps.l,
        }

        return stepSizes;
    }

    getColors() {
        const colors = [];
        for (let i = 0; i < this.steps.h; i++) {
            const h = i * this.stepSizes.h;
            const color = `hsl(${h}, 100, 100)`;
            colors.push(color);
        }

        console.log(colors);
    }
}