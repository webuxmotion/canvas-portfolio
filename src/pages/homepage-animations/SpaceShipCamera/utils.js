export function closestPointOnLine(x1, y1, x2, y2, px, py) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);

  const cx = x1 + t * dx;
  const cy = y1 + t * dy;

  return { x: cx, y: cy, t };
}

export function pointSide(x1, y1, x2, y2, px, py) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dxp = px - x1;
  const dyp = py - y1;

  const cross = dx * dyp - dy * dxp;

  if (cross > 0) return "left"; // mouse is on the left side
  else if (cross < 0) return "right"; // mouse is on the right side
  else return "on the line"; // exactly on the line
}

export function generatePoints() {
  const points = [];
  const rectSize = 250;
  const zStep = 500;
  for (let i = 100; i > 0; i--) {
    const p1 = { x: -rectSize, y: -rectSize, z: zStep * i };
    const p2 = { x: rectSize, y: -rectSize, z: zStep * i };
    const p3 = { x: rectSize, y: rectSize, z: zStep * i };
    const p4 = { x: -rectSize, y: rectSize, z: zStep * i };
    points.push(...[p1, p2, p3, p4]);
  }
  return points;
}
