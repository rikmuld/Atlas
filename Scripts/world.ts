import Model = require('./model');

export interface IWorld {
    pollution: number
    seaLevel: number
    temperature: number
    time: number
}

let data: IWorld = {
    pollution: Model.INIT_POLL,
    seaLevel: Model.INIT_SEA,
    temperature: 0,
    time: 0
}

let io: SocketIO.Server

//setting up world
export function setup(server: SocketIO.Server) {
    io = server
}

//setup player for world
export function addListner(socket: SocketIO.Socket) {
    socket.on('pollution', equalizePoll(socket))
}

//update the world
export function update(delta: number) {
    data.temperature = Model.temperature(data)
    data.seaLevel = Model.seaLevel(data)
    data.time += delta

    sendDataToClinets()
}

//send all the variables to the clinet
function sendDataToClinets() {
    io.emit("gameData", data)
}

/*
 *  variable updating functions 
 */

function equalizePoll(socket: SocketIO.Socket): (number) => void {
    return (nationPoll: number) => {
        let newPoll = Model.equalizePoll(data, nationPoll)

        this.pollution = newPoll[0]
        socket.emit('pollution', newPoll[1])
    }
}