export function isBallContainsMouse(ball, mouse) {
  const dx = mouse.x - ball.x;
  const dy = mouse.y - ball.y;
  const hypot = Math.hypot(dx, dy);

  return hypot < ball.radius;
}
