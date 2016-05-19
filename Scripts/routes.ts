import express = require('express');
import World = require('./world');
import Atlas = require('./atlas');
var gameloop = require('node-gameloop')

let gamePlaying: boolean = false
let potentialPlayers: SocketIO.Socket[] = []

let io: SocketIO.Server

const ROOM_SIZE = 6

export function setup(app: express.Express, server: SocketIO.Server) {
    app.get('/', displayGame)
    app.get('/example/*', displayExample)

    io = server 
    io.on('connection', preSetupPlayer)
}

function displayGame(req: express.Request, res: express.Response) {
    res.render('atlas')
}

function displayExample(req: express.Request, res: express.Response) {
    let index = req.url.indexOf("/example/")
    res.render('example', { example: req.url.substr(index + 9) })
}

function preSetupPlayer(socket: SocketIO.Socket) {
    socket.on("requestJoin", playerRequestedJoin(socket))
}

function playerRequestedJoin(socket: SocketIO.Socket): () => void {
    return () => {
        if (!gamePlaying) {
            if (joinRoom(socket) == ROOM_SIZE) {
                gamePlaying = true
                startGame(potentialPlayers, socket.server)
            }

            socket.on("disconnect", playerDisconnected(socket))
        } else socket.emit('full')
    }
}

function playerDisconnected(socket: SocketIO.Socket): () => void {
    return () => {
        if (!gamePlaying) {
            let index = potentialPlayers.indexOf(socket)
            if (index > -1) potentialPlayers.splice(index, 1)
        } else {
            //handle player left game
        }
    }
}

function joinRoom(socket: SocketIO.Socket) {
    socket.join('game')

    potentialPlayers.push(socket)
    console.log("Players in waiting: " + potentialPlayers.length)
    io.to("game").emit("gameWaiting", potentialPlayers.length)

    return potentialPlayers.length
}

function startGame(clients: SocketIO.Socket[], server: SocketIO.Server) {
    for (let client = 0; client < 6; client++) {
        setupPlayer(clients[client], client)
    }

    Atlas.setupGame(server)
    gameloop.setGameLoop(Atlas.update, 1000 / 60)

    console.log("Server Started!")
}

export function setupPlayer(socket: SocketIO.Socket, id:number) {
    Atlas.setupPlayer(socket)
    socket.emit("gameStarted", id)

    console.log("Player setup: " + socket)
}