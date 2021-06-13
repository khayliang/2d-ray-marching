import { Graphics } from 'pixi.js'
import getRandomPastel from './utils/getRandomPastel'
import getRandomXY from './utils/getRandomXY'

export default function buildCircles(amt, mapBounds, maxRadius) {
  const circles = []
  for (let i = 0; i !== amt; i += 1) {
    const circle = new Graphics()
    const circleCoords = getRandomXY(mapBounds)
    const circleRadius = Math.random() * maxRadius
    circle
      .beginFill(getRandomPastel())
      .drawCircle(circleCoords.x, circleCoords.y, circleRadius)
      .endFill()

    const obj = {
      type: 'circle',
      graphic: circle,
      coords: circleCoords,
      size: circleRadius,
    }

    circles.push(obj)
  }
  return circles
}
