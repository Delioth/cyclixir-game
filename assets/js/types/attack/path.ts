export interface Coordinate {
  x: number
  y: number
}

export type TimeFunction = (time?: number) => number
export type TimeToCollisionSegment = (
  time?: number
) => { start: Coordinate; end: Coordinate }

export default interface Path {
  initial: Coordinate
  direction: TimeFunction
  magnitude: TimeFunction
  width: TimeFunction
  duration: number
  delay?: number
}

export const createPath = (
  x: number,
  y: number,
  direction: TimeFunction,
  magnitude: TimeFunction,
  width: TimeFunction,
  duration: number,
  delay: number = 0
): Path => ({
  initial: {
    x,
    y
  },
  direction,
  magnitude,
  width,
  duration,
  delay
})

export const ExamplePath: Path = {
  initial: { x: 0, y: 0 },
  direction: time => 0,
  width: time => 5 + time / 5,
  magnitude: time => 100 + time,
  duration: 2
}

export interface NewPath {
  getCollisionSegmentForDelta: TimeToCollisionSegment
  isFinished: () => boolean
}

export function createNewPath(
  initial: Coordinate,
  angle: TimeFunction,
  speed: TimeFunction,
  duration: number
): NewPath {
  let x = initial.x
  let y = initial.y
  let oldX, oldY
  let direction = angle(0)
  let velocity = speed(0)
  let t = 0
  let getCollisionSegmentForDelta = (delta: number) => {
    oldX = x
    oldY = y
    t = Math.min(t + delta, duration)
    direction = angle(t)
    velocity = speed(t)
    x = velocity * Math.cos(direction)
    y = velocity * Math.sin(direction)
    return { start: { x: oldX, y: oldY }, end: { x, y } }
  }
  return { getCollisionSegmentForDelta, isFinished: () => duration == t }
}
