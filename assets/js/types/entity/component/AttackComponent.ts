import { Component } from './BaseComponent'
import Attack from '@type/attack/attack'
import Names from './constant/names'

type NAME_TYPE = Names.ATTACK
export const NAME = Names.ATTACK

export interface AttackComponent extends Component<NAME_TYPE> {
  data: { attacks: Attack[] }
}

export const createAttackComponent = (
  ...attacks: Attack[]
): AttackComponent => ({
  name: NAME,
  data: {
    attacks: [...attacks]
  }
})
