interface IWorld {
    pollution: number
    seaLevel: number
    temperature: number
    time: number
}

module World {
    let data: IWorld
    let deltaTime: number

    export function init() {
        console.log("Binding remote world")

        socket.on('gameData', update)
    }

    function update(world: IWorld) {
        if (data) {
            let oldTime = data.time
            data = world
            deltaTime = data.time - oldTime

            Nation.update(deltaTime)
        } else data = world
    }
    
    export function ready():boolean {
        return deltaTime? true:false
    }

    export function tickTime(): number {
        return deltaTime
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
