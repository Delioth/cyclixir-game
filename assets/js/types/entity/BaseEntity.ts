import { Component, ComponentData } from './component/BaseComponent'

export default interface Entity<T extends Component<string>> {
    id: number
    components: { [componentName in keyof T]: ComponentData }
}

/**
 * Quick utility to build basic entities - makes Entity constructors look much nicer
 * Generic type should be the list of component names you have
 * @param id
 * @param components
 */
export const buildEntity = <T extends Component<string>>(
    id: number,
    ...components: T[]
): Entity<T> => {
    return {
        id: id,
        components: components.reduce(
            (
                keyedComponentCollection: {
                    [componentName in keyof T]: ComponentData
                },
                component: T
            ) => {
                // Merge bundled components into a keyed object
                keyedComponentCollection[component.name] = component.data
                return keyedComponentCollection
            },
            // Start with an Empty Object and tell compiler it's the right type
            <{ [componentName in keyof T]: ComponentData }>{}
        ),
    }
}
