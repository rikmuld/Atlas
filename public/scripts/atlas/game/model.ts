module Model {
    export namespace Nation {
        export function absorbPollution(nation: INation, world: IWorld): number {
            return 0 //add calculuation
        }

        export function temperature(nation: INation, world: IWorld): number {
            return nation.landType.termperature //add calculetion, take into account world temperature
        }
    }

    export namespace NationDefaults {
        export const SIZE = 100 //fill in
        export const TERRAIN = [] //default terrain types
        export const TEMPERATURE = 15 //degrees
        export const WINDY = 100 //relative, also three below
        export const SUNNY = 100
        export const FERTILE = 100
        export const RESOURCES_NATURE = 100 //fill in
        export const RESOURCES_ENERGY = 100 //fill in
    }

    export enum Terrain { //all tarrain types
        Rivers, Ocean, Forrests, Mountains, Dessert, Plains, Tropical, Snowy
    }
}