module Technologies {
    export type TechCat = TechCatagory
    export type Tech = Technology

    export let catagories: TechCatagory[] = []
    export let techs: Technology[] = Array(19)

    export let storage: TechCatagory
    export let consumption_green: TechCatagory
    export let conumption_efficient: TechCatagory
    export let fossile_fuels: TechCatagory
    export let renewable_energy: TechCatagory
    export let clean_energy: TechCatagory

    export let BATTERIES = 0
    export let H2_STORAGE = 1
    export let GREEN_CITY = 2
    export let GREEN_FOOD = 3
    export let GREEN_HOUSING = 4
    export let GREEN_MINING = 5
    export let GREEN_TRANSPORT = 6
    export let BIOFEUL = 7
    export let NUCLEAR_FISSON = 8
    export let NUCLEAR_FUSION = 9
    export let COAL = 10
    export let GAS = 11
    export let OIL = 12
    export let EFFICIENT_FOOD = 13
    export let EFFICIENT_MINING = 14
    export let EFFICIENT_TRANSPORT = 15
    export let HYDRO = 16
    export let SOLAR = 17
    export let WIND = 18

    export function init() {
        console.log("Loading Technologies")

        fossile_fuels = new TechCatagory("Fossile Fuels", new Color("98A3A3"))
        clean_energy = new TechCatagory("Clean Energy", new Color("34495E"))
        renewable_energy = new TechCatagory("Renewable Energy", new Color("3478B6"))
        storage = new TechCatagory("Storage", new Color("16A085"))
        consumption_green = new TechCatagory("Green Use", new Color("2ECC71"))
        conumption_efficient = new TechCatagory("Efficient Use", new Color("E67E22"))

        new Batteries("Batteries", "Batteries", getStarRating(0, 0, 0), storage)
        new H2Storage("H2Storage", "H2Storage", getStarRating(0, 0, 0), storage)
        new GreenTransport("GreenTransport", "GreenTransport", getStarRating(0, 0, 0), consumption_green)
        new GreenFood("GreenFood", "GreenFood", getStarRating(0, 0, 0), consumption_green)
        new GreenCity("GreenCity", "GreenCity", getStarRating(0, 0, 0), consumption_green)
        new GreenHousing("GreenHousing", "GreenHousing", getStarRating(0, 0, 0), consumption_green)
        new GreenMining("GreenMining", "GreenMining", getStarRating(0, 0, 0), consumption_green)
        new EfficientFood("EfficientFood", "EfficientFood", getStarRating(0, 0, 0), conumption_efficient)
        new EfficientMining("EfficientMining", "EfficientMining", getStarRating(0, 0, 0), conumption_efficient)
        new EfficientTransport("EfficientTransport", "EfficientTransport", getStarRating(0, 0, 0), conumption_efficient)
        new Coal("Coal", "Coal", getStarRating(0, 0, 0), fossile_fuels)
        new Oil("Oil", "Oil", getStarRating(0, 0, 0), fossile_fuels)
        new Gas("Gas", "Gas", getStarRating(0, 0, 0), fossile_fuels)
        new Wind("Wind", "Wind", getStarRating(0, 0, 0), renewable_energy)
        new Solar("Solar", "Solar", getStarRating(0, 0, 0), renewable_energy)
        new Hydro("Hydro", "Hydro", getStarRating(0, 0, 0), renewable_energy)
        new NuclearFission("NuclearFission", "NuclearFission", getStarRating(0, 0, 0), clean_energy)
        new BioFuel("BioFuel", "BioFuel", getStarRating(0, 0, 0), clean_energy)
        new NuclearFusion("NuclearFusion", "NuclearFusion", getStarRating(0, 0, 0), clean_energy)
    }

    export function getTech(id: number): Technology {
        return techs[id]
    }

    class TechCatagory {
        private color: Col
        private name: string
        private techs: number[] = []

        constructor(name: string, color: Col) {
            this.color = color
            this.name = name

            catagories.push(this)
        }

        addTech(technology: Technology) {
            this.techs.push(technology.getId())
        }

        getColor(): Col {
            return this.color
        }

        getTechIDs(): number[] {
            return this.techs
        }

        getName(): string {
            return this.name
        }
    }

    abstract class Technology {
        private description: string
        private name: string
        private texture: number
        private id: number

        private starRating: StarRating
        private catagory: TechCatagory

        private inResearch: boolean
        private researchLevel: number
        private development: number
        private developmentLevel: number = 0

        constructor(id: number, texture: number, name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            this.id = id
            this.texture = texture
            this.name = name
            this.description = description

            this.starRating = starRating
            this.catagory = catagory

            catagory.addTech(this)

            console.log("Setting up: " + name + " in " + catagory.getName())
            techs[id] = this
        }

        getDescription(): string {
            return this.description
        }

        getName(): string {
            return this.name
        }

        getTexture(): string {
            return Textures.getTechIcon(this.texture)
        }

        getId(): number {
            return this.id
        }

        getStars(): StarRating {
            return this.starRating
        }

        isInResearch(): boolean {
            return this.inResearch
        }

        enableResearch(level: number) {
            if (this.canResearch(level)) {
                this.inResearch = true
                this.researchLevel = level
            }
        }

        update() {
            if (this.isInResearch) {
                this.research(this.researchLevel)
            }
        }

        getResearchLevel(): number {
            return this.researchLevel
        }

        research(level: number) {
            if (this.canResearch(level)) {
                //Nation.removeMoney(this.getResearchCost(level))
                this.development += this.getResearchSpeed(level)
                if (this.canUpgrade()) {
                    this.developmentLevel += 1
                    this.development = 0
                    //OrchestraBot.setActiveBottext(TECH UPGFRADE)
                }
            } else {
                this.inResearch = false
                //OrchestraBot.setActiveBottext(RESEARCHE STOPPED)
            }
        }

        abstract getResearchNeeded(level: number): number
        abstract getResearchSpeed(level: number): number
        abstract getResearchCost(level: number): number

        canResearch(level: number) {
            //this.developmentLevel < 4 && this.getResearchCost(level) > Nation.getMoney()
        }

        canUpgrade(): boolean {
            return this.development > this.getResearchNeeded(this.developmentLevel + 1)
        }

        getDevelopmentLevel(): number {
            return this.developmentLevel
        }
    }

    interface StarRating {
        green: number
        money: number
        resources: number
    }

    function getStarRating(green: number, money: number, resources: number): StarRating {
        return { green: green, money: money, resources: resources }
    }

    class Batteries extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(BATTERIES, 0, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class H2Storage extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(H2_STORAGE, 5, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class GreenCity extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_CITY, 15, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class GreenFood extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_FOOD, 16, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class GreenHousing extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_HOUSING, 17, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class GreenMining extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_MINING, 18, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class GreenTransport extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_TRANSPORT, 19, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class BioFuel extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(BIOFEUL, 1, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class NuclearFission extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(NUCLEAR_FISSON, 6, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class NuclearFusion extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(NUCLEAR_FUSION, 11, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class Oil extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(OIL, 12, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class Coal extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(COAL, 2, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class Gas extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GAS, 7, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class EfficientFood extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_FOOD, 3, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class EfficientMining extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_MINING, 8, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class EfficientTransport extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_TRANSPORT, 13, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class Hydro extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(HYDRO, 4, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class Solar extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(SOLAR, 9, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }

    class Wind extends Technology {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(WIND, 14, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return 0
        }

        getResearchSpeed(level: number): number {
            return 0
        }

        getResearchCost(level: number): number {
            return 0
        }
    }
}