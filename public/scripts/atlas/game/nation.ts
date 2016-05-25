interface INation {
    pollution?: number
    temperature?: number
    id: number
    landType: LandType
    money?: number
}

namespace Nation {
    let data: INation

    export function init(city: number) {
        data = { id: city, landType: new LandType() }
        console.log("Creating nation")

        socket.on('pollution', setPollution)
    }

    export function update() {
        setPollution(Model.Nation.absorbPollution(data, World.getWorld()))
        setTemp(Model.Nation.temperature(data, World.getWorld()))

        socket.emit('pollution', data.pollution)
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
}

class LandType {
    size = Model.NationDefaults.SIZE
    terrain = Model.NationDefaults.TERRAIN
    sunny = Model.NationDefaults.SUNNY
    windy = Model.NationDefaults.WINDY
    fertile = Model.NationDefaults.FERTILE
    termperature = Model.NationDefaults.TEMPERATURE
    resourcesN = Model.NationDefaults.RESOURCES_NATURE
    resroucesE = Model.NationDefaults.RESOURCES_ENERGY

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
                this.resourcesN *= mod
                break
            case Vars.ResourcesE:
                this.resroucesE *= mod
                break
        }
    }
}

enum Vars {
    Size, Sunny, Windy, Fertile, Temperature, ResourcesN, ResourcesE
}