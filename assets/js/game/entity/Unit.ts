import Entity, { buildEntity } from '@type/entity/BaseEntity'
import {
    createHealthComponent,
    HealthComponent,
} from '@type/entity/component/HealthComponent'
import Names from '@src/types/entity/component/constant/names'
import {
    createAttackComponent,
    AttackComponent,
} from '@src/types/entity/component/AttackComponent'

type Components = HealthComponent | AttackComponent

class Unit implements Entity<Components> {
    public components

    constructor(public id: number, healthValue: number = 10) {
        return buildEntity<Components>(
            id,
            createHealthComponent(healthValue),
            createAttackComponent()
        )
    }
}

export default Unit

const Bill = new Unit(10, 100) // TEMP
