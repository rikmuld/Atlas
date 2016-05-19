interface IWorld {
    pollution: number
    seaLevel: number
    temperature: number
    time: number
}

module World {
    let data: IWorld

    export function init() {
        socket.on('gameData', update)
    }

    function update(world: IWorld) {
        data = world
    }

    export function getTime(): number {
        return data.time
    }

    export function getPollution(): number {
        return data.pollution
    }

    export function getTemperature(): number {
        return data.temperature
    }

    export function getSea(): number {
        return data.seaLevel
    }

    export function getWorld(): IWorld {
        return data
    }
}
