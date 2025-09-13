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
  const h = 200;

  for (let i = 0; i < count; i++) {
    
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

export function transformPoint(p, camera, camAngle, fl, vpX, vpY) {
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

// draw a small triangle from a portion of the video
export function drawTriangleGrid(ctx, img, p0, p1, p2, sx, sy, sw, sh) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.closePath();
  ctx.clip();

  ctx.transform(
    (p1.x - p0.x) / sw, (p1.y - p0.y) / sw,
    (p2.x - p0.x) / sh, (p2.y - p0.y) / sh,
    p0.x, p0.y
  );

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  ctx.restore();
}

// draw the full video on the 4-point quadrilateral using grid subdivision
export function drawVideoQuad(ctx, img, p0, p1, p2, p3, gridSize = 20) {
  const w = img.videoWidth / gridSize;
  const h = img.videoHeight / gridSize;

  for (let i = 0; i < gridSize; i++) {
    const t0 = i / gridSize;
    const t1 = (i + 1) / gridSize;

    const leftStart = {
      x: p0.x + (p3.x - p0.x) * t0,
      y: p0.y + (p3.y - p0.y) * t0,
    };
    const leftEnd = {
      x: p0.x + (p3.x - p0.x) * t1,
      y: p0.y + (p3.y - p0.y) * t1,
    };
    const rightStart = {
      x: p1.x + (p2.x - p1.x) * t0,
      y: p1.y + (p2.y - p1.y) * t0,
    };
    const rightEnd = {
      x: p1.x + (p2.x - p1.x) * t1,
      y: p1.y + (p2.y - p1.y) * t1,
    };

    for (let j = 0; j < gridSize; j++) {
      const s0 = j / gridSize;
      const s1 = (j + 1) / gridSize;

      const topLeft = {
        x: leftStart.x + (rightStart.x - leftStart.x) * s0,
        y: leftStart.y + (rightStart.y - leftStart.y) * s0,
      };
      const topRight = {
        x: leftStart.x + (rightStart.x - leftStart.x) * s1,
        y: leftStart.y + (rightStart.y - leftStart.y) * s1,
      };
      const bottomLeft = {
        x: leftEnd.x + (rightEnd.x - leftEnd.x) * s0,
        y: leftEnd.y + (rightEnd.y - leftEnd.y) * s0,
      };
      const bottomRight = {
        x: leftEnd.x + (rightEnd.x - leftEnd.x) * s1,
        y: leftEnd.y + (rightEnd.y - leftEnd.y) * s1,
      };

      // draw the two triangles
      drawTriangleGrid(ctx, img, topLeft, topRight, bottomRight, s0 * img.videoWidth, t0 * img.videoHeight, w, h);
      drawTriangleGrid(ctx, img, topLeft, bottomRight, bottomLeft, s0 * img.videoWidth, t0 * img.videoHeight, w, h);
    }
  }
}