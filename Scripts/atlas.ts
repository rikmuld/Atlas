import World = require('./world');

let frame = 0
let io: SocketIO.Server

export function setupPlayer(socket: SocketIO.Socket) {
    World.addListner(socket)
}

export function setupGame(server: SocketIO.Server) {
    io = server

    World.setup(io)
}

export function update(delta:number) {
    if (frame++ > 60) frame = 0
    else if (frame == 60) {
        World.update(delta * 2)

        console.log("Ticking!!! " + delta)
    }
}