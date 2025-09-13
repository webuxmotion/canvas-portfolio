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

export function generatePoints(count = 1000, radius = 1000) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const h = Math.random() * 255;
    const theta = Math.acos(2 * Math.random() - 1); // polar angle
    const phi = Math.random() * Math.PI * 2;        // azimuth angle

    points.push({
      theta,
      phi,
      radius,
      speedTheta: (Math.random() - 0.5) * 0.001,
      speedPhi: (Math.random() - 0.5) * 0.001,
      h,
    });
  }

  return points;
}

export function updatePoints(points) {
  for (const p of points) {
    p.theta += p.speedTheta;
    p.phi += p.speedPhi;

    if (p.theta < 0) p.theta += Math.PI;
    if (p.theta > Math.PI) p.theta -= Math.PI;
    if (p.phi < 0) p.phi += Math.PI * 2;
    if (p.phi > Math.PI * 2) p.phi -= Math.PI * 2;

    p.x = p.radius * Math.sin(p.theta) * Math.cos(p.phi);
    p.y = p.radius * Math.sin(p.theta) * Math.sin(p.phi);
    p.z = 1500 + p.radius * Math.cos(p.theta);
  }
}

export function transformPoint(p, camera) {
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

  return newPoint;
}