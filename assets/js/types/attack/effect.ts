import EntityAction from '@src/enums/EntityAction'

export default interface Effect {
    action: EntityAction
    magnitude: number //??
}

export const createEffect = (
    action: EntityAction,
    magnitude: number
): Effect => ({
    action,
    magnitude,
})

export const ExampleDamageEffect: Effect = {
    action: EntityAction.Damage,
    magnitude: 500,
}
