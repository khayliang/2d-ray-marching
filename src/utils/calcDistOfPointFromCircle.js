export default (point, circleCenter, radius) => {
  const {x: px, y: py} = point
  const {x, y} = circleCenter

  const dx = Math.abs(x - px)
  const dy = Math.abs(y - py)

  const dist = Math.sqrt(dx * dx + dy * dy) - radius

  return dist
}
