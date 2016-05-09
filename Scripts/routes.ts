import express = require('express');
import world = require('./world');

let gamePlaying: boolean = false
let potentialPlayers: SocketIO.Socket[] = []

let io: SocketIO.Server

export function setup(app: express.Express, server: SocketIO.Server) {
    app.get('/', displayGame)
    app.get('/example/*', displayExample)

    io = server 
    io.on('connection', setupPlayer)
}

function displayGame(req: express.Request, res: express.Response) {
    res.render('atlas')
}

function displayExample(req: express.Request, res: express.Response) {
    let index = req.url.indexOf("/example/")
    res.render('example', { example: req.url.substr(index + 9) })
}

function setupPlayer(socket: SocketIO.Socket) {
    socket.on("requestJoin", function(){
        if (!gamePlaying) {
            socket.join('game')
            potentialPlayers.push(socket)

            let length = potentialPlayers.length

            console.log("Players in waiting: " + length)
            io.to("game").emit("gameWaiting", length)

            if (length == 1) {
                gamePlaying = true
                world.start(potentialPlayers, socket.server)
            }

            socket.on("disconnect", function () {
                if (!gamePlaying) {
                    let index = potentialPlayers.indexOf(socket)
                    if (index > -1) potentialPlayers.splice(index, 1)
                } else {

                }
            })
        } else {
            socket.emit('full')
        }
    })
}