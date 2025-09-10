import { forwardRef } from "react";
import styles from "./Canvas.module.scss";

const Canvas = forwardRef(({ width = 500, height = 500 }, ref) => {
  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      className={styles.canvas}
    />
  );
});

export default Canvas;