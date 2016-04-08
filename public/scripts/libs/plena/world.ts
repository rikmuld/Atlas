class Entity {
    private grix: Grix;

    private x: number;
    private y: number;

    getGrix(): Grix {
        return this.grix;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    update() {

    }

    render() {
        this.grix.moveTo(this.x, this.y)
        this.grix.render();
    }
}