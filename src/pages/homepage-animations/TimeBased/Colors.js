import { Ball } from "./lib/objects/Ball";


export class Colors {
    constructor() {
        this.steps = {
            h: 50,
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

    animate({ ctx, camera, vpX, vpY }) {

        this.colors.forEach((color, idx) => {
            const ball = new Ball({ ctx, camera, vpX, vpY });
            ball.steps = 12;
            ball.radius = 100;
            ball.x = 3000 + -idx * 220;
            ball.z = -1000;
            ball.color = color;
            ball.animate({ ctx});
        });
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
            const color = `hsl(${h}, 100%, 70%)`;
            colors.push(color);
        }

        return colors;
    }
}