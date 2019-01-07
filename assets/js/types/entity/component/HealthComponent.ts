import { Component } from './BaseComponent'
import Names from './constant/names'

type NAME_TYPE = Names.HEALTH
export const NAME = Names.HEALTH

export interface HealthComponent extends Component<NAME_TYPE> {
  data: { value: number }
}

export const createHealthComponent = (health: number): HealthComponent => ({
  name: NAME,
  data: {
    value: health
  }
})
