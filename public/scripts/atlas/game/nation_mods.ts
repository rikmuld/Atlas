abstract class Modifier {
    static varModifiers: Modifier[]
    static terModifiers: Modifier[]

    static init() {
        let larger = new VarMod(Vars.Size, 25, 10)
        let smaller = new VarMod(Vars.Size, -25, 10)
        let colder = new VarMod(Vars.Temperature, -25, 10)
        let hotter = new VarMod(Vars.Temperature, 25, 10)
        let windy = new VarMod(Vars.Windy, 25, 10)
        let nowind = new VarMod(Vars.Windy, -25, 10)
        let sunny = new VarMod(Vars.Sunny, 25, 10)
        let nosun = new VarMod(Vars.Sunny, -25, 10)
        let plentifullNature = new VarMod(Vars.ResourcesN, 25, 10)
        let scarseNature = new VarMod(Vars.ResourcesN, -25, 10)
        let plentifullEnergy = new VarMod(Vars.ResourcesE, 25, 10)
        let scarseEnergy = new VarMod(Vars.ResourcesE, -25, 10)
        let fertile = new VarMod(Vars.Fertile, 25, 10)
        let desolete = new VarMod(Vars.Fertile, -25, 10)

        let mountains = new TerrainMod(Model.Terrain.Mountains, plentifullNature)
        let rivers = new TerrainMod(Model.Terrain.Rivers, fertile)
        let ocean = new TerrainMod(Model.Terrain.Ocean, windy)
        let forrests = new TerrainMod(Model.Terrain.Forrests, plentifullNature, fertile)
        let deserts = new TerrainMod(Model.Terrain.Dessert, plentifullEnergy, scarseNature, sunny, desolete, hotter)
        let plains = new TerrainMod(Model.Terrain.Plains, larger)
        let tropical = new TerrainMod(Model.Terrain.Tropical, smaller, hotter, fertile)
        let snowy = new TerrainMod(Model.Terrain.Snowy, colder, desolete)

        Modifier.varModifiers = [larger, smaller, colder, hotter, windy, nowind, sunny, nosun, plentifullNature, scarseNature, plentifullEnergy, plentifullEnergy, fertile, desolete]
        Modifier.terModifiers = [mountains, ocean, forrests, deserts, plains, tropical, snowy]
    }

    static getRandomMods(vars: number, terrain: number): Modifier[] {
        let modsV = Modifier.varModifiers.slice()
        let modsT = Modifier.terModifiers.slice()

        let retMods: Modifier[] = []
        for (let i = 0; i < vars; i++) {
            let random = Math.floor(Math.random() * modsV.length)
            retMods.push(modsV.splice(random, 1)[0])
        }
        for (let i = 0; i < terrain; i++) {
            let random = Math.floor(Math.random() * modsT.length)
            retMods.push(modsT.splice(random, 1)[0])
        }

        return retMods
    }

    abstract act(type: LandType)
}

abstract class EnumMod<T> extends Modifier {
    value: T

    constructor(value: T) {
        super()

        this.value = value
    }

    protected getMod(): T {
        return this.value
    }
}

abstract class IntMod extends Modifier {
    magnitude: number
    certain: number

    constructor(magnitude: number, certain: number) {
        super()

        this.magnitude = magnitude
        this.certain = certain
    }

    protected getMod(): number {
        return 1 + ((this.magnitude - this.certain / 2) + Math.random() * this.certain) / 100
    }
}

class VarMod extends IntMod {
    varr: Vars

    constructor(varr: Vars, magnitude: number, certain: number) {
        super(magnitude, certain)

        this.varr = varr
    }

    act(type: LandType) { type.setVar(this.varr, this.getMod()) }
}

class TerrainMod extends EnumMod<Model.Terrain> {
    mods: Modifier[]

    constructor(value: Model.Terrain, ...mods: Modifier[]) {
        super(value)

        this.mods = mods
    }

    act(type: LandType) {
        type.terrain.push(this.getMod())

        for (let mod of this.mods) {
            mod.act(type)
        }
    }
}