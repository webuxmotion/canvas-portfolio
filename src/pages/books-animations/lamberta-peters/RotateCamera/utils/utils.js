function normalize(v) {
  const len = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function getRelativeCoords(camPos, camTarget, worldPoint) {
  // Use transformed coords
  const forward = normalize([
    camTarget.x - camPos.x,
    camTarget.y - camPos.y,
    camTarget.z - camPos.z,
  ]);

  const up = [0, 1, 0]; // world up
  let right = cross(forward, up);
  right = normalize(right);

  let newUp = cross(right, forward);

  const vec = [
    worldPoint.x - camPos.x,
    worldPoint.y - camPos.y,
    worldPoint.z - camPos.z,
  ];

  return {
    x: -dot(vec, right),
    y: dot(vec, newUp),
    z: dot(vec, forward),
  };
}