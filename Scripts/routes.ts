import express = require('express');
import world = require('./world');

let gamePlaying: boolean = false
let potentialPlayers: SocketIO.Socket[] = []

export function setup(app: express.Express, io: SocketIO.Server) {
    app.get('/', displayGame)
    app.get('/example/*', displayExample)

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
    if (!gamePlaying) {
        socket.join('game')
        potentialPlayers.push(socket)

        let length = potentialPlayers.length

        console.log("Players in waiting: " + length)

        if (length == 6) {
            gamePlaying = true
            world.start(potentialPlayers, socket.server)
        }

        socket.on("disconnect", function () {
            if (!gamePlaying) {
                let index = potentialPlayers.indexOf(socket)
                if (index > -1) potentialPlayers.splice(index, 1)
            } else {
                //handle player disconnecting during game
            }
        })
    } else {
        //display room full, please wait till next game
    }
}