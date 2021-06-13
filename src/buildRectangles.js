import { Graphics } from 'pixi.js'
import getRandomPastel from './utils/getRandomPastel'
import getRandomXY from './utils/getRandomXY'

export default (amt, mapBounds, maxWidth, maxHeight) => {
  const rects = []
  for (let i = 0; i !== amt; i += 1) {
    const rect = new Graphics()
    const rectCoords = getRandomXY(mapBounds)
    const randomXY = getRandomXY({ width: maxWidth, height: maxHeight })
    const rectSize = {
      width: randomXY.x,
      height: randomXY.y,
    }
    rect
      .beginFill(getRandomPastel())
      .drawRect(rectCoords.x, rectCoords.y, rectSize.width, rectSize.height)
      .endFill()

    const obj = {
      type: 'rect',
      graphic: rect,
      coords: rectCoords,
      size: rectSize,
    }

    rects.push(obj)
  }
  return rects
}
