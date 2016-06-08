module Model {
    export namespace Nation {
        export function absorbPollution(timeInJ: number, nation: INation, world: IWorld): number {
            return Math.max(0, nation.pollution - 30 * timeInJ)
        }

        export function energyNed(timeInJ: number, nation: INation, world: IWorld): number {
            let prods: Technologies.Cons[] = Technologies.mostUsed(18, (tech: Technologies.Tech): boolean => {
                return (tech as Technologies.Cons).getEfficient && tech.getDevelopmentLevel() >= 1  ? true : false
            }) as Technologies.Cons[]

            let deg = 1

            for (let prod of prods) deg += prod.getEfficient(prod.getDevelopmentLevel())

            return 100 * deg
        }

        export function pollutionAddResDeg(timeInJ: number, nation: INation, world: IWorld): [number, number, number] {
            let energyNeed = energyNed(timeInJ, nation, world)
            let pollution = 0
            let resources = 0
            let sustainable = 0

            let prods: Technologies.Prod[] = Technologies.mostUsed(18, (tech: Technologies.Tech): boolean => {
                return (tech as Technologies.Prod).getPower && tech.getDevelopmentLevel() >= 1 ? true : false
            }) as Technologies.Prod[]

            prods.push(Technologies.getTech(Technologies.COAL) as Technologies.Prod)

            prods.sort((a: Technologies.Prod, b: Technologies.Prod): number => {
                return a.getPollution(b.getDevelopmentLevel()) - b.getPollution(b.getDevelopmentLevel())
            })

            let stop = false

            for (let p of prods) {
                let oldenergy = energyNeed
                energyNeed -= p.getPower(p.getDevelopmentLevel())
                if (energyNeed < 0) {
                    energyNeed = 0
                    stop = true
                }

                if (p.getPollution(p.getDevelopmentLevel()) < 5) sustainable += (oldenergy - energyNeed)

                let mining = Technologies.getTech(Technologies.EFFICIENT_MINING).getDevelopmentLevel()

                let prods: Technologies.Cons[] = Technologies.mostUsed(18, (tech: Technologies.Tech): boolean => {
                    return (tech as Technologies.Cons).getEfficient && tech.getDevelopmentLevel() >= 1 ? true : false
                }) as Technologies.Cons[]

                let deg = 1

                for (let prod of prods) deg += prod.getPollution(prod.getDevelopmentLevel())

                resources += (p.getResources(p.getDevelopmentLevel()) * (oldenergy - energyNeed) * timeInJ) / (100 + mining*20)
                pollution += p.getPollution(p.getDevelopmentLevel()) * (oldenergy - energyNeed) * timeInJ * deg 
                if (stop) break;
            }

            console.log(pollution, resources)

            return [pollution, resources, sustainable]
        }

        export function temperature(timeInJ: number, nation: INation, world: IWorld): number {
            return nation.landType.termperature + (nation.pollution/20000)
        }

        export function tax(timeInJ: number, nation: INation, world: IWorld): number {
            return (timeInJ * nation.population * NationDefaults.TAX)
        }
        export function taxScinece(timeInJ: number, nation: INation, world: IWorld): number {
            let sus = nation.sustainable
            let resdiff = 1-(nation.landType.resourcesEDensity - nation.resourcesE * 1000) / nation.landType.resourcesEDensity

            console.log(resdiff)

            return 0.05 * resdiff * (1 - sus / 100)
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
        export const ENERGY_PER_CAPITA = 10000 //kwh
    }

    export const TERRAIN = ["rivers", "ocean", "forrests", "mountains", "desert", "plains", "tropical forrest", "tundra"];
    export enum Terrain { //all tarrain types
        Rivers, Ocean, Forrests, Mountains, Dessert, Plains, Tropical, Snowy
    }
}