export interface Component<N extends string> {
    name: N
    data: ComponentData
}

export type ComponentData = { [dataKey: string]: any }

export type ComponentMap = {}
