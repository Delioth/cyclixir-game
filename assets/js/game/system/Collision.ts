import { Sprite } from 'pixi.js'

type Coordinate = { x: number; y: number }
// LINE/LINE Collision
function lineLine(
  line1point1: Coordinate,
  line1point2: Coordinate,
  line2point1: Coordinate,
  line2point2: Coordinate
) {
  // calculate the direction of the lines
  let uA: number =
    ((line2point2.x - line2point1.x) * (line1point1.y - line2point1.y) -
      (line2point2.y - line2point1.y) * (line1point1.x - line2point1.x)) /
    ((line2point2.y - line2point1.y) * (line1point2.x - line1point1.x) -
      (line2point2.x - line2point1.x) * (line1point2.y - line1point1.y))
  let uB: number =
    ((line1point2.x - line1point1.x) * (line1point1.y - line2point1.y) -
      (line1point2.y - line1point1.y) * (line1point1.x - line2point1.x)) /
    ((line2point2.y - line2point1.y) * (line1point2.x - line1point1.x) -
      (line2point2.x - line2point1.x) * (line1point2.y - line1point1.y))

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    // optionally, draw a circle where the lines meet - these statements aren't
    let intersectionX: number =
      line1point1.x + uA * (line1point2.x - line1point1.x)
    let intersectionY: number =
      line1point1.y + uA * (line1point2.y - line1point1.y)
    // Draw or something

    return true
  }
  return false
}

// LINE/RECTANGLE Collision
function lineRect(
  point1: Coordinate,
  point2: Coordinate,
  // Bottom left corner
  rectangleBottomLeft: Coordinate,
  width: number,
  height: number
) {
  // check if the line has hit any of the rectangle's sides
  // uses the Line/Line function below
  let left: boolean = lineLine(point1, point2, rectangleBottomLeft, {
    x: rectangleBottomLeft.x,
    y: rectangleBottomLeft.y + height
  })
  let right: boolean = lineLine(
    point1,
    point2,
    { x: rectangleBottomLeft.x + width, y: rectangleBottomLeft.y },
    { x: rectangleBottomLeft.x + width, y: rectangleBottomLeft.y + height }
  )
  let top: boolean = lineLine(point1, point2, rectangleBottomLeft, {
    x: rectangleBottomLeft.x + width,
    y: rectangleBottomLeft.y
  })
  let bottom: boolean = lineLine(
    point1,
    point2,
    { x: rectangleBottomLeft.x, y: rectangleBottomLeft.y + height },
    { x: rectangleBottomLeft.x + width, y: rectangleBottomLeft.y + height }
  )

  // if ANY of the above are true, the line
  // has hit the rectangle
  if (left || right || top || bottom) {
    return true // Could be valuable to expand this into "which side" was hit at a later date?
  }
  return false
}

// Slight adjustment to make it work out of the box with a Sprite
export function lineSprite(
  point1: Coordinate,
  point2: Coordinate,
  sprite: Sprite
) {
  // Turns out a pixi sprite conforms to the Coordinate interface!
  return lineRect(
    point1,
    point2,
    sprite as Coordinate,
    sprite.width,
    sprite.height
  )
}
