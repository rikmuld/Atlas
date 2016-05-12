module World {
    let seaLevel
    let pollution
    let temperature
    let time

    export function init() {
        socket.on('gameData', update)
    }

    function update(ticks: number, sea: number, temp: number, poll: number) {
        time = ticks
        seaLevel = sea
        temperature = temp
        pollution = poll
    }

    export function getTime(): number {
        return time
    }

    export function getPollution(): number {
        return pollution
    }

    export function getTemperature(): number {
        return temperature
    }

    export function getSea(): number {
        return seaLevel
    }
}
