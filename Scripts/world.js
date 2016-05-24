var Model = require('./model');
var data = {
    pollution: Model.INIT_POLL,
    seaLevel: Model.INIT_SEA,
    temperature: 0,
    time: 0
};
var io;
//setting up world
function setup(server) {
    io = server;
}
exports.setup = setup;
//setup player for world
function addListner(socket) {
    socket.on('pollution', equalizePoll(socket));
}
exports.addListner = addListner;
//update the world
function update(delta) {
    data.temperature = Model.temperature(data);
    data.seaLevel = Model.seaLevel(data);
    data.time += delta;
    sendDataToClinets();
}
exports.update = update;
//send all the variables to the clinet
function sendDataToClinets() {
    io.emit("gameData", data);
}
/*
 *  variable updating functions
 */
function equalizePoll(socket) {
    var _this = this;
    return function (nationPoll) {
        var newPoll = Model.equalizePoll(_this.pollution, nationPoll);
        _this.pollution = newPoll[0];
        socket.emit('pollution', newPoll[1]);
    };
}
//# sourceMappingURL=world.js.map