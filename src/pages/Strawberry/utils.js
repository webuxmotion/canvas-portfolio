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

function randomStrawberryHue() {
  const r = Math.random();
  if (r < 0.5) {
    return 340 + r * 40; // 340–360
  } else {
    return (r - 0.5) * 40; // 0–20
  }
}

export function generatePoints(count = 1000, radius = 1000) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const h = randomStrawberryHue();
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
    p.y = 100 + p.radius * Math.sin(p.theta) * Math.sin(p.phi);
    p.z = 1500 + p.radius * Math.cos(p.theta);

    p.y += p.y * Math.sin(p.phi);
  }
}