//Setup function, ran one time during loading of the game
function setup() {

}

//Render tick function, runs every frame, useually 60 times per second
function render(delta: number) {

}

//Update tick function, runs every frame, useually 60 times per second
function update(delta: number) {
    //we need to decide on a game time/real time ratio, 1d / 0.1s or so (roughly 100y / 1h)?
}

//Setting up webgl library
Plena.init(setup, render, update)

// world and nation interaction, put logic in model module, keep these classes (Nation/World) as small as possible
// if we want to make multiplayer, this will move to the server side, get funcions will be replaced by sockets
class World {
    private pollution: number
    private initalSea: number
    private initalIce: number
    private temp: number
    private seaLevel: number

    constructor() {
        this.pollution = Model.World.INIT_POLL
        this.initalSea = Model.World.INIT_SEA
        this.initalIce = Model.World.INIT_ICE

        this.update()
    }

    update() {
        this.seaLevel = Model.World.seaLevel(this.temp, this.initalSea, this.initalIce)
        this.temp = Model.World.temperature(this.pollution)
    }

    getTemp(): number {
        return this.temp
    }

    getSea(): number {
        return this.seaLevel
    }

    getPoll(): number {
        return this.pollution
    }

    equalizePoll(nationPoll: number, setNationPoll: (poll: number) => void) {
        let newPoll = Model.World.equalizePoll(this.pollution, nationPoll)

        this.pollution = newPoll[0]
        setNationPoll(newPoll[1])
    }
}

class Nation {

}

//put logic below, keep modular and pure (pure as in no interaction with anything, only logic)
// if we want to make multiplayer, Model.World will be placed on the server side
module Model {
    export module World {
        export const
            INIT_ICE = 0,
            INIT_SEA = 0,
            INIT_POLL = 0

        export function seaLevel(temp: number, initSea: number, initIce: number): number {
            return initSea
        }

        export function temperature(pollution: number): number {
            return 0
        }

        export function equalizePoll(global:number, nation:number):[number, number] {
            return [global, nation]
        }
    }
}