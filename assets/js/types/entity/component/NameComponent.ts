import { Component } from './BaseComponent'
import Names from './constant/names'

type NAME_TYPE = Names.NAME
export const NAME = Names.NAME

export interface NameComponent extends Component<NAME_TYPE> {
  data: { value: string }
}

export const createNameComponent = (name: string): NameComponent => ({
  name: NAME,
  data: {
    value: name
  }
})
