import { Point3d } from "../lib/Point3d";
import { Triangle } from "../lib/Triangle";

export function generatePoints() {
  const points = [];

  //first set
  points[0] = new Point3d(-50, -250, -50);
  points[1] = new Point3d(50, -250, -50);
  points[2] = new Point3d(200, 250, -50);
  points[3] = new Point3d(100, 250, -50);
  points[4] = new Point3d(50, 100, -50);
  points[5] = new Point3d(-50, 100, -50);
  points[6] = new Point3d(-100, 250, -50);
  points[7] = new Point3d(-200, 250, -50);
  points[8] = new Point3d(0, -150, -50);
  points[9] = new Point3d(50, 0, -50);
  points[10] = new Point3d(-50, 0, -50);
  //second set
  points[11] = new Point3d(-50, -250, 50);
  points[12] = new Point3d(50, -250, 50);
  points[13] = new Point3d(200, 250, 50);
  points[14] = new Point3d(100, 250, 50);
  points[15] = new Point3d(50, 100, 50);
  points[16] = new Point3d(-50, 100, 50);
  points[17] = new Point3d(-100, 250, 50);
  points[18] = new Point3d(-200, 250, 50);
  points[19] = new Point3d(0, -150, 50);
  points[20] = new Point3d(50, 0, 50);
  points[21] = new Point3d(-50, 0, 50);

  return points;
}

export function generateTriangles(points) {
  const triangles = [];

  triangles[0] = new Triangle(points[0], points[1], points[8], "#4BA75E");
  triangles[1] = new Triangle(points[1], points[9], points[8], "#54B1F9");
  triangles[2] = new Triangle(points[1], points[2], points[9], "#54B1F9");
  triangles[3] = new Triangle(points[2], points[4], points[9], "#54B1F9");
  triangles[4] = new Triangle(points[2], points[3], points[4], "#54B1F9");
  triangles[5] = new Triangle(points[4], points[5], points[9], "#54B1F9");
  triangles[6] = new Triangle(points[9], points[5], points[10], "#54B1F9");
  triangles[7] = new Triangle(points[5], points[6], points[7], "#54B1F9");
  triangles[8] = new Triangle(points[5], points[7], points[10], "#54B1F9");
  triangles[9] = new Triangle(points[0], points[10], points[7], "#54B1F9");
  triangles[10] = new Triangle(points[0], points[8], points[10], "#54B1F9");

  triangles[11] = new Triangle(points[11], points[19], points[12], "#54B1F9");
  triangles[12] = new Triangle(points[12], points[19], points[20], "#54B1F9");
  triangles[13] = new Triangle(points[12], points[20], points[13], "#54B1F9");
  triangles[14] = new Triangle(points[13], points[20], points[15], "#54B1F9");
  triangles[15] = new Triangle(points[13], points[15], points[14], "#54B1F9");
  triangles[16] = new Triangle(points[15], points[20], points[16], "#54B1F9");
  triangles[17] = new Triangle(points[20], points[21], points[16], "#54B1F9");
  triangles[18] = new Triangle(points[16], points[18], points[17], "#54B1F9");
  triangles[19] = new Triangle(points[16], points[21], points[18], "#54B1F9");
  triangles[20] = new Triangle(points[11], points[18], points[21], "#54B1F9");
  triangles[21] = new Triangle(points[11], points[21], points[19], "#54B1F9");

  triangles[22] = new Triangle(points[0], points[11], points[1], "#54B1F9");
  triangles[23] = new Triangle(points[11], points[12], points[1], "#54B1F9");
  triangles[24] = new Triangle(points[1], points[12], points[2], "#54B1F9");
  triangles[25] = new Triangle(points[12], points[13], points[2], "#54B1F9");
  triangles[26] = new Triangle(points[3], points[2], points[14], "#54B1F9");
  triangles[27] = new Triangle(points[2], points[13], points[14], "#54B1F9");
  triangles[28] = new Triangle(points[4], points[3], points[15], "#54B1F9");
  triangles[29] = new Triangle(points[3], points[14], points[15], "#54B1F9");
  triangles[30] = new Triangle(points[5], points[4], points[16], "#54B1F9");
  triangles[31] = new Triangle(points[4], points[15], points[16], "#54B1F9");
  triangles[32] = new Triangle(points[6], points[5], points[17], "#54B1F9");
  triangles[33] = new Triangle(points[5], points[16], points[17], "#54B1F9");
  triangles[34] = new Triangle(points[7], points[6], points[18], "#54B1F9");
  triangles[35] = new Triangle(points[6], points[17], points[18], "#54B1F9");
  triangles[36] = new Triangle(points[0], points[7], points[11], "#54B1F9");
  triangles[37] = new Triangle(points[7], points[18], points[11], "#54B1F9");
  triangles[38] = new Triangle(points[8], points[9], points[19], "#54B1F9");
  triangles[39] = new Triangle(points[9], points[20], points[19], "#54B1F9");
  triangles[40] = new Triangle(points[9], points[10], points[20], "#54B1F9");
  triangles[41] = new Triangle(points[10], points[21], points[20], "#54B1F9");
  triangles[42] = new Triangle(points[10], points[8], points[21], "#54B1F9");
  triangles[43] = new Triangle(points[8], points[19], points[21], "#54B1F9");

  return triangles;
}