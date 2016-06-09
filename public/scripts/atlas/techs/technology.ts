module Technologies {
    export type TechCat = TechCatagory
    export type Tech = Technology
    export type Prod = Production
    export type Cons = EfficientGreen

    export let catagories: TechCatagory[] = []
    export let techs: Technology[] = Array(18)

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
    export let GREEN_TRANSPORT = 5
    export let BIOFEUL = 6
    export let NUCLEAR_FISSON = 7
    export let NUCLEAR_FUSION = 8
    export let COAL = 9
    export let GAS = 10
    export let OIL = 11
    export let EFFICIENT_FOOD = 12
    export let EFFICIENT_MINING = 13
    export let EFFICIENT_TRANSPORT = 14
    export let HYDRO = 15
    export let SOLAR = 16
    export let WIND = 17

    const LEVELS = "ⅠⅡⅢⅣⅤ"

    const WIND_DESC = 'Wind energy is energy generated from the wind by huge multi blade rotors that drive emission-free turbines on the shore. On the other hand, storing is still a problem for wind energy. Furthermore, horizon pollution is something to think of as well.'
    const SOLAR_DESC = 'Solar energy is energy generated from the sunlight through big solar panel farms. A downside to this technology is it\'s irregular production of energy and the problems with storing the energy.'
    const HYDRO_DESC = 'Hydropower uses water to generate energy through big installations in dams and mountains. Even though water is being used, it is not consumed. Polluting gases such as methane and carbon dioxide are being released in the reservoir. You need mountains or rivers in your nations for this technology.'

    const COAL_DESC = 'Coal is generally abundant, cheap, easy to store, and easy to use. However, coal is the dirtiest form of energy production in terms of CO2 emissions. The only way to significantly reduce CO2 emissions while still using coal is through expensive carbon capture and storage (CCS) technologies.'
    const OIL_DESC = 'Oil is the most used technology in transportation, but is causes heavy pollution. Although investing in it might give you a big advantage. You will be able to raise your production speed, lower the rate at which you burn through natural resources. Moneywise this could be decent, environment wise it questionable.'
    const GAS_DESC = 'Natural gas is the cleanest-burning and most energy efficient fossil fuel. However, the extraction of natural gas is often harmful to the environment, especially when techniques such as fracking are used.'

    const NUCLEAR_FUS_DESC = 'Nuclear fusion generates power the same way as the sun, by fusing atoms. This technology could solve all energy problems, the technology is safe, very clean, and resources will last for billions of years. The problemn however is that this technology still needs a lot of expensive researach which might take decades.'
    const NUCLEAR_FIS_DESC = 'Nuclear fission, or nuclear power as it is mostly known, uses nuclear reactions to product energy. Nucleaer power is a lot more clean then fossile fuels and resources won\'t run out anytime soon. Nuclear power has a bad public image though, due to the radioactive waist and prior exploding power plants.'
    const BIOFUEL_DESC = 'Biofuel is fuel that is produced through contemporary biological processes. Investing in biofuel will decrease the amount of fossil fuels that are being used. Downsides to this technology is a lot more expensive and still now entirely clean.'

    const BATTERIES_DESC = 'Developing battery technologies will be a very costly operation, but they are expected to become the holy grail of energy storage. With batteries energy loss in grids can be minimized, and technologies consuming electricity (such as electric cars) will become more efficient.'
    const H2O_STORAGE_DESC = 'Chemical storage is storing energy with molocules such as hydrogen. Chemical storage is cheaper than developing new battiery technoloiges due to the exiting infrastrucutre. Devloping chemical storage can reduce the energy loss in energy grids, but have less potential then new batteries.'

    const GREEN_FOOD_DESC = 'The food that is used to sustain a population has a significantly negative environmental impact. Primarily, meat production is a major contributor to climate change. Green food technologies minimize the energy and carbon footprint associated with food production.'
    const GREEN_CITY_DESC = 'More then half of the population life in cities. Green city technologies aim to make a city more sustainable, this will reduce the carbon foodprint of your population and reduce the smog in cities which might lead to a happier population. Remodeling cities however, is no cheap investment to make.'
    const GREEN_HOUSING_DESC = 'Green housing employs features such as good insulation, small surface area of the house, and ventilation to minimize the environmental impact of housing. Thus, houses will require less energy for heating, cooling, construction, and destruction.'
    const GREEN_TRANSPORTATION_DESC = 'Transportation is accountable for 25% of the world\'s energy demand. Making this sector greener, thus using less energy, or renewable resources as fuels would have quite some effect on the total energy market.'

    const EFFICIENT_MINING_DESC = 'Efficient mining technoloiges will enable you to get more resources out of the ground in your country and it will also cost less energy to mine your resources. Furthemore you are generating less pollution with your mining.'
    const EFFICIENT_TRANSPORTATION_DESC = 'Researching in efficient transportation will increase the speed of transport and lower the price the consumers have to pay for it. This might go with a little more pollution and a bit more energy consumption, but a big happiness improvement will be the result.'
    const EFFICIENT_FOOD_DESC = 'Efficient food maximizes the food production rate. by increasing the food supply, it decreases the food prices for the population. However, such an increase in efficiency requires a greater investment from the player and it would increase the energy and pollution footprint of the food production.'

    export let icons: SpriteGrix
    export let xp: ShapeGrix

    export function update(delta: number) {
        for (let tech of techs) if (tech) tech.update(delta)
    }

    export function init() {
        console.log("Loading Technologies")

        icons = Grix.fromSprite(Textures.iconSprite)

        xp = Grix.shape()
        xp.circle(200, 0, 0, 0, true, 100, 100)
        xp.drawmode(gl.TRIANGLE_FAN, 0)
        let ind = [0]

        for (let i = 1; i < 101; i++) {
            xp.drawmode(gl.TRIANGLE_FAN, i)
            xp.addIndicie(ind.concat([0]), i)
            ind.push(i)
        }

        xp.populate()

        fossile_fuels = new TechCatagory("Fossil Fuels", new Color("98A3A3"))
        clean_energy = new TechCatagory("Clean Energy", new Color("34495E"))
        renewable_energy = new TechCatagory("Renewable Energy", new Color("3478B6"))
        storage = new TechCatagory("Storage", new Color("16A085"))
        consumption_green = new TechCatagory("Green Use", new Color("2ECC71"))
        conumption_efficient = new TechCatagory("Efficient Use", new Color("E67E22"))

        new Batteries("Batteries", BATTERIES_DESC, getStarRating(0, 0, 0), storage)
        new H2Storage("Chemical Storage", H2O_STORAGE_DESC, getStarRating(0, 0, 0), storage)
        new GreenTransport("Sustainable Transportation", GREEN_TRANSPORTATION_DESC, getStarRating(0, 0, 0), consumption_green)
        new GreenFood("Sustainable Food Production", GREEN_FOOD_DESC, getStarRating(0, 0, 0), consumption_green)
        new GreenCity("Sustainable Cities", GREEN_CITY_DESC, getStarRating(0, 0, 0), consumption_green)
        new GreenHousing("Sustainable Housing", GREEN_HOUSING_DESC, getStarRating(0, 0, 0), consumption_green)
        new EfficientFood("Efficient Food Production", EFFICIENT_FOOD_DESC, getStarRating(0, 0, 0), conumption_efficient)
        new EfficientTransport("Efficient Transport", EFFICIENT_TRANSPORTATION_DESC, getStarRating(0, 0, 0), conumption_efficient)
        new EfficientMining("Efficient Mining", EFFICIENT_MINING_DESC, getStarRating(0, 0, 0), conumption_efficient)
        new Coal("Coal", COAL_DESC, getStarRating(0, 0, 0), fossile_fuels, 100, 100, 100)
        new Oil("Oil", OIL_DESC, getStarRating(0, 0, 0), fossile_fuels, 80, 125, 100)
        new Gas("Natural Gas", GAS_DESC, getStarRating(0, 0, 0), fossile_fuels, 66, 150, 100)
        new Wind("Wind Turbines", WIND_DESC, getStarRating(0, 0, 0), renewable_energy, 1, 30, 0)
        new Solar("Solar Panels", SOLAR_DESC, getStarRating(0, 0, 0), renewable_energy, 1, 1, 0)
        new Hydro("Hydro Power", HYDRO_DESC, getStarRating(0, 0, 0), renewable_energy, 1, 10, 0)
        new NuclearFission("Nuclear Fission", NUCLEAR_FIS_DESC, getStarRating(0, 0, 0), clean_energy, 5, 1, 0)
        new BioFuel("Bio Fuel", BIOFUEL_DESC, getStarRating(0, 0, 0), clean_energy, 30, 50, 30)
        new NuclearFusion("Nuclear Fusion", NUCLEAR_FUS_DESC, getStarRating(0, 0, 0), clean_energy, 1, 1, 0)
    }

    export function renderFiller(x: number, y: number, scale: number) {
        xp.scaleTo(scale * 1.1, scale * 1.1)

        let col = Color.Gray.black(0.3)

        xp.setColor(col)
        xp.setPivotMove(0.5, 0.5)
        xp.moveTo(x, y)
        xp.setIndex([0])
        xp.render()
    }

    export function getTech(id: number): Technology {
        return techs[id]
    }

    export function mostUsed(num: number, filter?:(tech:Technology)=>boolean): Technology[] {
        let techsret = new PriorityQueue<Technology>(compareTechs, true)
        techsret.insertArray(techs)

        let rets: Technology[] = []

        for (let i = 0; i < num; i++) {
            let tech = techsret.dequeue()
            if (hasResearched(tech) && (!filter || filter(tech))) {
                rets.push(tech)
            }
        }

        return rets
    }

    function compareTechs(a: Technology, b: Technology): number {
        let level = a.getDevelopmentLevel() - b.getDevelopmentLevel()
        return level == 0 ? a.getResearchPercent() - b.getResearchPercent() : level
    }

    function hasResearched(value: Technology): boolean {
        return value.getDevelopmentLevel() > 0 || value.getResearchPercent() > 0
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
        protected developmentLevel: number = 0

        constructor(id: number, texture: number, name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            this.id = id
            this.texture = texture
            this.name = name
            this.description = description

            this.starRating = starRating
            this.catagory = catagory

            this.development = 0

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

        getResearchPercent(): number {
            return this.development / this.getResearchNeeded(this.developmentLevel + 1)
        }

        render(x: number, y: number, scale: number, rxp: boolean = true) {
            if (rxp) {
                xp.scaleTo(scale * 1.1, scale * 1.1)

                let col = this.catagory.getColor()
                let color = new Color(col.r() * 0.7, col.g() * 0.7, col.b() * 0.7)

                xp.setColor(color)
                xp.setPivotMove(0.5, 0.5)
                xp.moveTo(x, y)
                xp.rotateDeg(-90)
                xp.setIndex([0])
                xp.render()

                let level = this.getResearchPercent()
                xp.setIndex([Math.floor(level * 100) + 1])

                color = new Color(col.r() * 1.3, col.g() * 1.3, col.b() * 1.3)
                xp.setColor(color)
                xp.render()
            }

            Plena.forceRender()

            icons.activeImg(this.getTexture())
            icons.scaleTo(scale, scale)
            icons.setPivotMove(0.5, 0.5)
            icons.moveTo(x, y)
            icons.render()

            if (rxp && this.developmentLevel > 0) {
                Plena.forceRender()
                OrchestraBot.freeText.scaleTo(scale*2, scale*2)
                OrchestraBot.freeText.setPivotMove(0.5, 0.5)
                OrchestraBot.freeText.moveTo(x - [6, 7, 9, 10, 8][this.developmentLevel - 1], y - 6 + (icons.getHeight() * scale) / 2)
                OrchestraBot.freeText.freeText(LEVELS[this.developmentLevel - 1])
            }
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

        stopResearch() {
            this.inResearch = false
        }

        update(deltaInY:number) {
            if (this.inResearch) {
                this.research(this.researchLevel, deltaInY)
            }
        }

        getResearchLevel(): number {
            return this.researchLevel
        }

        research(level: number, deltaInY:number) {
            if (this.canResearch(level)) {
                Nation.subMoney(this.getResearchCost(level) * deltaInY)
                this.development += deltaInY
                if (this.canUpgrade()) {
                    this.development -= this.getResearchNeeded(this.developmentLevel + 1)
                    this.developmentLevel += 1
                    if (this.developmentLevel == 5) this.development = 0
                    //OrchestraBot.setActiveBottext(TECH UPGFRADE)
                }
            } else {
                this.inResearch = false
                //OrchestraBot.setActiveBottext(RESEARCHE STOPPED)
            }
        }

        //in years of time
        abstract getResearchNeeded(level: number): number
        //$/year
        abstract getResearchCost(level: number): number

        canResearch(level: number): boolean {
            return this.developmentLevel < 5 && this.getResearchCost(level) * (1/12) < Nation.getMoney()
        }

        canResearchFull(level: number): Researchable {
            if (this.developmentLevel >= 5) return Researchable.MAXXED
            else if (this.getResearchCost(level) * (1 / 12)  > Nation.getMoney()) return Researchable.NO_MONEY
            //land type
            return Researchable.ALLOWED
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

    export enum Researchable {
        ALLOWED, NO_MONEY, MAXXED, LAND_PROBLEMS
    }

    function getStarRating(green: number, money: number, resources: number): StarRating {
        return { green: green, money: money, resources: resources }
    }

    abstract class Production extends Technology {
        protected pollution: number
        protected costMW: number
        protected resources: number

        constructor(id: number, texture: number, name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(id, texture, name, description, starRating, catagory)

            this.pollution = pollution
            this.costMW = costMW
            this.resources = resources
        }

        abstract getPollution(level: number): number;
        abstract getCostMW(level: number): number;
        abstract getResources(level: number): number;
        abstract getPower(level: number): number;
    }

    abstract class EfficientGreen extends Technology {
        constructor(id: number, texture: number, name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(id, texture, name, description, starRating, catagory)
        }

        abstract getPollution(level: number): number;
        abstract getEfficient(level: number): number;
    }

    class Batteries extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(BATTERIES, 0, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [2, 5, 8, 12, 20][level-1]
        }

        getResearchCost(level: number): number {
            return 5000000000
        }

        getPollution(level: number): number {
            return 0
        }

        getEfficient(level: number): number {
            return 0.02 * level
        }
    }

    class H2Storage extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(H2_STORAGE, 5, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [2, 5, 8, 12, 20][level - 1]
        }

        getResearchCost(level: number): number {
            return 2000000000
        }

        getPollution(level: number): number {
            return 0
        }

        getEfficient(level: number): number {
            return 0.01 * level
        }
    }

    class GreenCity extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_CITY, 15, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [2, 5, 8, 12, 20][level - 1]
        }

        getResearchCost(level: number): number {
            return 4000000000
        }

        getPollution(level: number): number {
            return -0.02 * level
        }

        getEfficient(level: number): number {
            return -0.01 * level
        }
    }

    class GreenFood extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_FOOD, 16, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [2, 5, 8, 12, 20][level-1]
        }

        getResearchCost(level: number): number {
            return 8000000000
        }

        getPollution(level: number): number {
            return -0.04 * level
        }

        getEfficient(level: number): number {
            return -0.02 * level
        }
    }

    class GreenHousing extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_HOUSING, 17, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [2, 5, 8, 12, 20][level-1]
        }

        getResearchCost(level: number): number {
            return 8000000000
        }

        getPollution(level: number): number {
            return -0.04 * level
        }

        getEfficient(level: number): number {
            return -0.02 * level
        }
    }

    class GreenTransport extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(GREEN_TRANSPORT, 19, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [2, 5, 8, 12, 20][level-1]
        }

        getResearchCost(level: number): number {
            return 8000000000
        }

        getPollution(level: number): number {
            return -0.05 * level
        }

        getEfficient(level: number): number {
            return -0.02 * level
        }
    }

    class BioFuel extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(BIOFEUL, 1, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 3000000000
        }

        getPollution(level: number): number {
            return this.pollution * (1 - 0.05 * level)
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources * (1 - 0.05 * level)
        }

        getPower(level: number): number {
            return 0.03 * level 
        }
    }

    class NuclearFission extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(NUCLEAR_FISSON, 6, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level - 1]
        }

        getResearchCost(level: number): number {
            return 8000000000
        }

        getPollution(level: number): number {
            return this.pollution
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources
        }

        getPower(level: number): number {
            return 0.07 * level
        }
    }

    class NuclearFusion extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(NUCLEAR_FUSION, 11, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [5, 10, 10, 20, 25][level-1]
        }

        getResearchCost(level: number): number {
            return 20000000000
        }

        getPollution(level: number): number {
            return this.pollution
        }

        getCostMW(level: number): number {
            return [0, 0, this.costMW*5, this.costMW*2, this.costMW][level]
        }

        getResources(level: number): number {
            return this.resources
        }

        getPower(level: number): number {
            return [0, 0, 10, 50, 100][level]
        }

    }

    class Oil extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(OIL, 12, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 2000000000
        }

        getPollution(level: number): number {
            return this.pollution * (1 - 0.05 * level)
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources * (1 - 0.05 * level)
        }

        getPower(level: number): number {
            return 100
        }
    }

    class Coal extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(COAL, 2, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 2000000000
        }

        getPollution(level: number): number {
            return this.pollution * (1 - 0.05 * level)
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources * (1 - 0.05 * level)
        }

        getPower(level: number): number {
            return 100
        }
    }

    class Gas extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(GAS, 7, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 2000000000
        }

        getPollution(level: number): number {
            return this.pollution * (1 - 0.05 * level)
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources * (1 - 0.05 * level)
        }

        getPower(level: number): number {
            return 100
        }
    }

    class EfficientFood extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_FOOD, 3, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 2000000000
        }

        getPollution(level: number): number {
            return 0.02 * level
        }

        getEfficient(level: number): number {
            return 0.01 * level
        }
    }

    class EfficientMining extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_MINING, 8, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 4000000000
        }

        getPollution(level: number): number {
            return 0.02 * level
        }

        getEfficient(level: number): number {
            return 0.01 * level
        }
    }

    class EfficientTransport extends EfficientGreen {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory) {
            super(EFFICIENT_TRANSPORT, 13, name, description, starRating, catagory)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 2000000000
        }

        getPollution(level: number): number {
            return 0.04 * level
        }

        getEfficient(level: number): number {
            return 0.01 * level
        }
    }

    class Hydro extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(HYDRO, 4, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [1, 3, 5, 8, 15][level-1]
        }

        getResearchCost(level: number): number {
            return 6000000000
        }

        getPollution(level: number): number {
            return this.pollution * (1 - 0.05 * level)
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources * (1 - 0.05 * level)
        }

        getPower(level: number): number {
            return 0.05 * level
        }

        canResearch(level: number): boolean {
            return super.canResearch(level) && (Nation.getData().landType.terrain.indexOf(Model.Terrain.Rivers) > -1 || Nation.getData().landType.terrain.indexOf(Model.Terrain.Ocean) > -1)
        }
    }

    class Solar extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(SOLAR, 9, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [3, 6, 9, 12, 18][level-1]
        }

        getResearchCost(level: number): number {
            return 10000000000
        }

        getPollution(level: number): number {
            return this.pollution * (1 - 0.05 * level)
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources * (1 - 0.05 * level)
        }

        getPower(level: number): number {
            return [0.05, 0.10, 0.20, 0.40, 0.60][level] * (1 + (Nation.getData().landType.windy - Model.NationDefaults.SUNNY) * 0.01)
        }
    }

    class Wind extends Production {
        constructor(name: string, description: string, starRating: StarRating, catagory: TechCatagory, pollution: number, costMW: number, resources: number) {
            super(WIND, 14, name, description, starRating, catagory, pollution, costMW, resources)
        }

        getResearchNeeded(level: number): number {
            return [2, 4, 7, 10, 15][level - 1]
        }   

        getResearchCost(level: number): number {
            return 4000000000
        }

        getPollution(level: number): number {
            return this.pollution * (1 - 0.05 * level)
        }

        getCostMW(level: number): number {
            return this.costMW * (1 - 0.05 * level)
        }

        getResources(level: number): number {
            return this.resources * (1 - 0.05 * level)
        }

        getPower(level: number): number {
            return 0.05 * level * (1 + (Nation.getData().landType.windy - Model.NationDefaults.WINDY) * 0.05)
        }
    }
}
