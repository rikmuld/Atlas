var gameloop = require('node-gameloop')

module Model {
    export module World {
        export const
            INIT_SEA = 0,
            INIT_POLL = 0

        export function seaLevel(temp: number): number {
            return INIT_SEA
        }

        export function temperature(pollution: number): number {
            return 0
        }

        export function equalizePoll(global: number, nation: number): [number, number] {
            return [global, nation]
        }
    }
}

let pollution: number = Model.World.INIT_POLL
let temp: number
let seaLevel: number
let time: number = 0

module Server {
    let frame = 0

    export function setup() {

    }

    export function update(delta: number) {
        if (frame++ > 60) frame = 0
        else if (frame == 60) {
            updateWorld()
            updateClients()
        }

        time += delta
    }
}

let io: SocketIO.Server
let players: SocketIO.Socket[] = []

export function setupPlayer(socket: SocketIO.Socket) {
    socket.on('pollution', equalizePoll(socket))
    socket.emit("gameStarted")

    console.log("Player setup: " + socket)
}

function updateWorld() {
    this.seaLevel = Model.World.seaLevel(this.temp)
    this.temp = Model.World.temperature(this.pollution)

    console.log("Ticking!!!")
}

function updateClients() {
    io.emit("gameData", time, seaLevel, temp, pollution)
}

function equalizePoll(socket: SocketIO.Socket):(number)=>void {
    return (nationPoll: number) => {
        let newPoll = Model.World.equalizePoll(this.pollution, nationPoll)

        this.pollution = newPoll[0]
        socket.emit('pollution', newPoll[1])
    }
}

export function start(clients: SocketIO.Socket[], server: SocketIO.Server) {
    for (let client of clients) setupPlayer(client)

    io = server

    Server.setup()
    gameloop.setGameLoop(Server.update, 1000 / 60)

    console.log("Server Started!")
}