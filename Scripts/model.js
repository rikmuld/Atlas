exports.INIT_SEA = 0, exports.INIT_POLL = 0;
function seaLevel(world) {
    return world.seaLevel;
}
exports.seaLevel = seaLevel;
function temperature(world) {
    return world.temperature;
}
exports.temperature = temperature;
function equalizePoll(world, nation) {
    return [world.pollution, nation];
}
exports.equalizePoll = equalizePoll;
//# sourceMappingURL=model.js.map