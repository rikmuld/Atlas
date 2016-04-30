declare let io
let socket: SocketIO.Adapter = io()

let pollution:number

function setupClient() {
    World.init()
    Nation.init()
}

function render(delta: number) {

}

function updateClient(delta: number) {

}

function updateServer() {

}

Plena.init(setupClient, render, updateClient)

module Nation {
    let pollution
    
    export function init() {
        socket.on('pollution', setPollution)
    }

    export function update() {
        setPollution(Model.Pollution.absorbPollution(pollution, 0, LandType.NONE))

        socket.emit('pollution', pollution)
    }

    function setPollution(poll: number) {
        this.pollution = poll
    }

    export function getPollution() {
        return pollution
    }

    export enum LandType {
        NONE
    }
}

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

        updateServer()
    }

    function getTime(): number {
        return time
    }

    function getPollution(): number {
        return pollution
    }

    function getTemperature(): number {
        return temperature
    }

    function getSea(): number {
        return seaLevel
    }
}

module Model {
    export module Pollution {
        export function absorbPollution(pollution: number, landSize: number, landType: Nation.LandType):number {
            return pollution
        }
    }
}