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

export function generatePoints(rows = 30, cols = 30) {
  const points = [];
  const step = 200;
  const halfStep = step / 2;
  const crosses = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * step;
      const y = 0;
      const z = r * step;

      points.push({
        x,
        y,
        z,
      });
    }
  }

  points.forEach(point => {

    const l1 = [
      {
        x: point.x - halfStep,
        y: 0,
        z: point.z
      },
      {
        x: point.x + halfStep,
        y: 0,
        z: point.z
      }
    ];

    const l2 = [
      {
        x: point.x,
        y: 0,
        z: point.z - halfStep
      },
      {
        x: point.x,
        y: 0,
        z: point.z + halfStep
      }
    ];

    crosses.push([...l1, ...l2, point]);
  });

  return crosses;
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
