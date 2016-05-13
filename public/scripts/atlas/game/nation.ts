namespace Nation {
    let pollution

    export function init() {
        socket.on('pollution', setPollution)
    }

    export function update() {
        setPollution(Model.Pollution.absorbPollution(pollution, 0, LandType.NONE))

        socket.emit('pollution', pollution)
    }

    function setPollution(poll: number) {
        this.pollution = poll
    }

    export function getPollution() {
        return pollution
    }

    export enum LandType {
        NONE
    }
}