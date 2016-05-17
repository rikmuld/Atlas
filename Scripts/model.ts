import { IWorld } from './world'

export const
    INIT_SEA = 0,
    INIT_POLL = 0

export function seaLevel(world: IWorld): number {
    return world.seaLevel
}

export function temperature(world: IWorld): number {
    return world.temperature
}

export function equalizePoll(world: IWorld, nation: number): [number, number] {
    return [world.pollution, nation]
}