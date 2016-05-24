var World = require('./world');
var frame = 0;
var io;
function setupPlayer(socket) {
    World.addListner(socket);
}
exports.setupPlayer = setupPlayer;
function setupGame(server) {
    io = server;
    World.setup(io);
}
exports.setupGame = setupGame;
function update(delta) {
    if (frame++ > 60)
        frame = 0;
    else if (frame == 60) {
        World.update(delta);
        console.log("Ticking!!! " + delta);
    }
}
exports.update = update;
//# sourceMappingURL=atlas.js.map