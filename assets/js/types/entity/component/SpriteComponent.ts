import { Component } from './BaseComponent'
import Names from './constant/names'
import { Sprite } from 'pixi.js'

type NAME_TYPE = Names.SPRITE
export const NAME = Names.SPRITE

export interface SpriteComponent extends Component<NAME_TYPE> {
  data: {}
}

export const createRenderComponent = (sprite: Sprite): SpriteComponent => ({
  name: NAME,
  data: {
    spriteReference: sprite
  }
})
