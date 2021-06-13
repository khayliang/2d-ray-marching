export default (point, rectCoords, rectSize) => {
  const { x: px, y: py } = point
  const { width, height } = rectSize

  const x = rectCoords.x + width / 2
  const y = rectCoords.y + height / 2

  const dx = Math.max(Math.abs(px - x) - width / 2, 0)
  const dy = Math.max(Math.abs(py - y) - height / 2, 0)

  return Math.sqrt(dx * dx + dy * dy)
}
