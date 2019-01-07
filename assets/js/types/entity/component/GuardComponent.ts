import { Component } from './BaseComponent'
import Names from './constant/names'

type NAME_TYPE = Names.GUARD
export const NAME = Names.GUARD

export interface GuardComponent extends Component<NAME_TYPE> {
    data: { guarding: boolean; threshold: number }
}

export const createGuardComponent = (
    breakThreshold: number,
    guarding: boolean
): GuardComponent => ({
    name: NAME,
    data: {
        guarding: guarding,
        threshold: breakThreshold,
    },
})
