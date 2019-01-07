import { Component } from './BaseComponent'
import Names from './constant/names'
import { Coordinate } from '@src/types/attack/path'

type NAME_TYPE = Names.POSITION
export const NAME = Names.POSITION

export interface PositionComponent extends Component<NAME_TYPE> {
  data: Coordinate
}

export const createPositionComponent = (
  x: number,
  y: number
): PositionComponent => ({
  name: NAME,
  data: {
    x,
    y
  }
})
