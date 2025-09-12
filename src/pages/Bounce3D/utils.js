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

export function transformPoint(p, camera, fl, vpX, vpY) {
  const closest = closestPointOnLine(
    camera.p1.x,
    camera.p1.z,
    camera.p2.x,
    camera.p2.z,
    p.x,
    p.z
  );

  const side = pointSide(
    camera.p1.x,
    camera.p1.z,
    camera.p2.x,
    camera.p2.z,
    p.x,
    p.z
  );

  if (side !== "right") return null;

  const dx = camera.x - closest.x;
  const dy = camera.z - closest.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  distance = closest.t > 0.5 ? distance : -distance;

  const dx2 = p.x - closest.x;
  const dy2 = p.z - closest.y;
  let distanceForZ = Math.sqrt(dx2 * dx2 + dy2 * dy2);

  const newPoint = {
    x: distance,
    y: p.y,
    z: distanceForZ,
  };

  const scale = fl / (fl + newPoint.z);
  return {
    x: vpX + newPoint.x * scale,
    y: vpY + (newPoint.y + camera.y) * scale,
    z: newPoint.z,
  };
}
