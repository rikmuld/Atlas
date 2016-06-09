var Atlas = require('./atlas');
var gameloop = require('node-gameloop');
var gamePlaying = false;
var potentialPlayers = [];
var io;
var ROOM_SIZE = 1;
function setup(app, server) {
    app.get('/', displayGame);
    app.get('/example/*', displayExample);
    io = server;
    io.on('connection', preSetupPlayer);
}
exports.setup = setup;
function displayGame(req, res) {
    res.render('atlas');
}
function displayExample(req, res) {
    var index = req.url.indexOf("/example/");
    res.render('example', { example: req.url.substr(index + 9) });
}
function preSetupPlayer(socket) {
    socket.on("requestJoin", playerRequestedJoin(socket));
}
function playerRequestedJoin(socket) {
    return function () {
        if (!gamePlaying) {
            if (joinRoom(socket) == ROOM_SIZE) {
                gamePlaying = true;
                startGame(potentialPlayers, socket.server);
            }
            socket.on("disconnect", playerDisconnected(socket));
        }
        else
            socket.emit('full');
    };
}
function playerDisconnected(socket) {
    return function () {
        if (!gamePlaying) {
            var index = potentialPlayers.indexOf(socket);
            if (index > -1)
                potentialPlayers.splice(index, 1);
        }
        else {
        }
    };
}
function joinRoom(socket) {
    socket.join('game');
    potentialPlayers.push(socket);
    console.log("Players in waiting: " + potentialPlayers.length);
    io.to("game").emit("gameWaiting", potentialPlayers.length);
    return potentialPlayers.length;
}
function startGame(clients, server) {
    Atlas.setupGame(server);
    for (var client = 0; client < ROOM_SIZE; client++) {
        setupPlayer(clients[client], client);
    }
    gameloop.setGameLoop(Atlas.update, 1000 / 60);
    console.log("Server Started!");
}
function setupPlayer(socket, id) {
    Atlas.setupPlayer(socket);
    socket.emit("gameStarted", id);
    console.log("Player setup: " + socket);
}
exports.setupPlayer = setupPlayer;
//# sourceMappingURL=routes.js.map