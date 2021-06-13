import { Application, Graphics } from 'pixi.js'

import getRandomPastel from './utils/getRandomPastel'

const mapSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

const getRandomXY = (bounds) => ({
  x: Math.random() * bounds.width,
  y: Math.random() * bounds.height
})

const buildRectangles = (amt, mapBounds, maxWidth, maxHeight) => {
  const rects = []
  for (let i = 0; i != amt; i += 1){
    const rect = new Graphics()
    const rectCoords = getRandomXY(mapBounds)
    const rectSize = getRandomXY({width: maxWidth, height: maxHeight})
    rect.beginFill(getRandomPastel())
      .drawRect(rectCoords.x, rectCoords.y, rectSize.x, rectSize.y)
      .endFill()
    rects.push(rect)
  }
  return rects
}

const buildCircles = (amt, mapBounds, maxRadius) => {
  const circles = []
  for (let i = 0; i != amt; i += 1){
    const circle = new Graphics()
    const circleCoords = getRandomXY(mapBounds)
    const circleRadius = Math.random() * maxRadius
    circle.beginFill(getRandomPastel())
      .drawCircle(circleCoords.x, circleCoords.y, circleRadius)
      .endFill()
      circles.push(circle)
  }
  return circles
}

const app = new Application(mapSize)

const objects = [
  ...buildRectangles(10, mapSize, 200, 200),
  ...buildCircles(10, mapSize, 100)
]

objects.forEach((obj) => app.stage.addChild(obj))

document.body.appendChild(app.view)
