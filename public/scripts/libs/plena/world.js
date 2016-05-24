var Entity = (function () {
    function Entity() {
    }
    Entity.prototype.getGrix = function () {
        return this.grix;
    };
    Entity.prototype.getX = function () {
        return this.x;
    };
    Entity.prototype.getY = function () {
        return this.y;
    };
    Entity.prototype.update = function () {
    };
    Entity.prototype.render = function () {
        this.grix.moveTo(this.x, this.y);
        this.grix.render();
    };
    return Entity;
})();
//# sourceMappingURL=world.js.map