module Model {
    export namespace Nation {
        export function absorbPollution(nation: INation, world: IWorld): number {
            return 0 //add calculuation
        }

        export function temperature(nation: INation, world: IWorld): number {
            return nation.landType.termperature//add calculuation
        }

        export function tax(timeInJ: number, nation: INation, world: IWorld): number {
            return (timeInJ * nation.population * NationDefaults.TAX)
        }
    }

    export namespace NationDefaults {
        export const SIZE = 400000 //km^2 (germany)
        export const POPULATION = 50 //n/km^2
        export const TAX = 20000 //dollar/(n*j) where n is population
        export const TERRAIN = [] //default terrain types
        export const TEMPERATURE = 15 //degrees
        export const WINDY = 20 //km/h
        export const SUNNY = 40 //%h
        export const FERTILE = 100
        export const RESOURCES_NATURE_PERKM = 100 //not implemented
        export const RESOURCES_ENERGY_PERKM = 2000000 //kwh/km^2
    }

    export const TERRAIN = ["rivers", "ocean", "forrests", "mountains", "desert", "plains", "tropical forrest", "tundra"];
    export enum Terrain { //all tarrain types
        Rivers, Ocean, Forrests, Mountains, Dessert, Plains, Tropical, Snowy
    }
}