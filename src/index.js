import { Application, Graphics, InteractionManager } from 'pixi.js'
import buildCircles from './buildCircles'
import buildRectangles from './buildRectangles'
import calcDistOfPointFromCircle from './utils/calcDistOfPointFromCircle'
import calcDistOfPointFromRect from './utils/calcDistOfPointFromRect'

const mapSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const threshold = 0.0001
const startCoords = { x: 0, y: 0 }
const maxMarches = 100

const app = new Application(mapSize)
app.ticker.maxFPS = 60

const ray = new Graphics()

const objects = [...buildRectangles(10, mapSize, 200, 200), ...buildCircles(10, mapSize, 100)]

objects.forEach((obj) => app.stage.addChild(obj.graphic))
app.stage.addChild(ray)

document.body.appendChild(app.view)

let mousePresent = false
const interaction = new InteractionManager(app.renderer)

interaction.on('mouseout', () => {
  mousePresent = false
})
interaction.on('mouseover', () => {
  mousePresent = true
})

app.ticker.add(() => {
  ray.clear()
  if (mousePresent) {
    const mouseCoords = {
      x: interaction.mouse.global.x,
      y: interaction.mouse.global.y,
    }

    const angle = Math.atan2(mouseCoords.y - startCoords.y, mouseCoords.x - startCoords.x)

    let marchedCoords = { ...startCoords }

    let count = 0
    while (mousePresent) {
      count += 1
      if (count > maxMarches) break

      if (marchedCoords.x - mouseCoords.x > 0 && marchedCoords.y - mouseCoords.y > 0) {
        break
      }

      let dist = Infinity

      objects.forEach((obj) => {
        const { type, coords, size } = obj
        if (type === 'rect') {
          dist = Math.min(dist, calcDistOfPointFromRect(marchedCoords, coords, size))
        } else {
          dist = Math.min(dist, calcDistOfPointFromCircle(marchedCoords, coords, size))
        }
      })

      if (dist < threshold) {
        break
      } else {
        ray.lineStyle(1, 0xffffff).drawCircle(marchedCoords.x, marchedCoords.y, dist).endFill()

        const dx = dist * Math.cos(angle)
        const dy = dist * Math.sin(angle)
        marchedCoords = {
          x: marchedCoords.x + dx,
          y: marchedCoords.y + dy,
        }
      }
    }

    ray
      .lineStyle(1, 0xffffff)
      .moveTo(startCoords.x, startCoords.y)
      .lineTo(marchedCoords.x, marchedCoords.y)
  }
})
