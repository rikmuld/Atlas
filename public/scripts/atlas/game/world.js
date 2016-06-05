var World;
(function (World) {
    var data;
    var deltaTime;
    function init() {
        console.log("Binding remote world");
        socket.on('gameData', update);
    }
    World.init = init;
    function update(world) {
        if (data) {
            var oldTime = data.time;
            data = world;
            deltaTime = data.time - oldTime;
            Nation.update(deltaTime);
        }
        else
            data = world;
    }
    function ready() {
        return deltaTime ? true : false;
    }
    World.ready = ready;
    function tickTime() {
        return deltaTime;
    }
    World.tickTime = tickTime;
    function getTime() {
        return data.time;
    }
    World.getTime = getTime;
    function getPollution() {
        return data.pollution;
    }
    World.getPollution = getPollution;
    function getTemperature() {
        return data.temperature;
    }
    World.getTemperature = getTemperature;
    function getSea() {
        return data.seaLevel;
    }
    World.getSea = getSea;
    function getWorld() {
        return data;
    }
    World.getWorld = getWorld;
})(World || (World = {}));
//# sourceMappingURL=world.js.map