import { colors } from "@/pages/books-animations/lamberta-peters/lib/colors";
import { projectPoint, transformPoint } from "./utils";
import { Ball } from "./lib/objects/Ball";
import { Colors } from "./Colors";

export class Spring {
  constructor({ camera, vpX, vpY, ctx }) {
    this.camera = camera;
    this.vpX = vpX;
    this.vpY = vpY;
    this.ctx = ctx;

    this.objects = [
      new Ball({ camera, vpX, vpY }),
      new Colors(),
    ];
  }

  animate(deltaTime) {
    this.objects.forEach(obj => {
      //obj.x += 1;
      obj.steps = 10;
      obj.animate({ ctx: this.ctx });
    });
  }
}
