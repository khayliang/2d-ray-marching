export default function getRandomXY(bounds) {
  return {
    x: Math.random() * bounds.width,
    y: Math.random() * bounds.height,
  }
}
