interface INation {
    pollution?: number
    fertile?: number
    temperature?: number
    id: number
    landType: LandType
    money?: number
    resourcesE?: number
    resourcesN?: number
    population?: number
    happiness?: number
    sustainable?:number
}

namespace Nation {
    let data: INation

    export function init(city: number) {
        data = { id: city, landType: new LandType() }
        console.log("Creating nation")

        data.resourcesN = data.landType.resourcesNDensity/1000
        data.resourcesE = data.landType.resourcesEDensity/1000

        data.pollution = 0
        data.population = data.landType.size * Model.NationDefaults.POPULATION
        data.money = data.population * Model.NationDefaults.TAX * 0.03

        data.temperature = data.landType.termperature
        data.fertile = data.landType.fertile

        data.sustainable = 0
        data.happiness = 1

        socket.on('pollution', setPollution)
    }

    export function update(time:number) {
        setPollution(Model.Nation.absorbPollution(time, data, World.getWorld()))
        setTemp(Model.Nation.temperature(time, data, World.getWorld()))

        data.money += Model.Nation.tax(time, data, World.getWorld()) * Model.Nation.taxScinece(time, data, World.getWorld())

        socket.emit('pollution', data.pollution)

        let polRes = Model.Nation.pollutionAddResDeg(time, data, World.getWorld())

        data.pollution += polRes[0]
        data.resourcesE -= polRes[1]
        data.sustainable = polRes[2]

        Technologies.update(time)
    }

    export function getHappiness():number {
        return data.happiness
    }

    export function subMoney(money: number) {
        data.money -= money
    }

    export function getMoney():number {
        return data.money
    }

    function setPollution(poll: number) {
        data.pollution = poll
    }

    function setTemp(temp: number) {
        data.temperature = temp
    }

    export function getPollution() {
        return data.pollution
    }

    export function getLandData() {
        return data.landType
    }

    export function getCityID() {
        return data.id
    }

    export function getTemperatire() {
        return data.temperature
    }

    export function getData(): INation {
        return data
    }
}

class LandType {
    size = Model.NationDefaults.SIZE
    terrain: Model.Terrain[] = Model.NationDefaults.TERRAIN
    sunny = Model.NationDefaults.SUNNY
    windy = Model.NationDefaults.WINDY
    fertile = Model.NationDefaults.FERTILE
    termperature = Model.NationDefaults.TEMPERATURE
    resourcesNDensity = Model.NationDefaults.RESOURCES_NATURE_PERKM
    resourcesEDensity = Model.NationDefaults.RESOURCES_ENERGY_PERKM

    constructor() {
        Modifier.init()

        let mods = Modifier.getRandomMods(8, 3)
        for (let mod of mods) {
            mod.act(this)
        }
    }

    setVar(varr: Vars, mod: number) {
        switch (varr) {
            case Vars.Size:
                this.size *= mod
                break
            case Vars.Sunny:
                this.sunny *= mod
                break
            case Vars.Windy:
                this.windy *= mod
                break
            case Vars.Fertile:
                this.fertile *= mod
                break
            case Vars.Temperature:
                this.termperature *= mod    
                break
            case Vars.ResourcesN:
                this.resourcesNDensity *= mod
                break
            case Vars.ResourcesE:
                this.resourcesEDensity *= mod
                break
        }
    }
}

enum Vars {
    Size, Sunny, Windy, Fertile, Temperature, ResourcesN, ResourcesE
}