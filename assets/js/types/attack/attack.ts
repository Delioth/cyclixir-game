import Path, { ExamplePath } from './path'
import Effect from './effect'

export default interface Attack {
    paths: Path[]
    effects: Effect[]
    discretePaths?: boolean // Are Paths discrete, or are they boundaries?

    // Maybe some flags or a collection of flags
}

export const createAttack = (
    paths: Path[],
    effects: Effect[],
    discretePaths: boolean = true
): Attack => ({ paths, effects, discretePaths })

export const ExampleAttack: Attack = {
    paths: [ExamplePath],
    effects: [],
    discretePaths: true,
}
