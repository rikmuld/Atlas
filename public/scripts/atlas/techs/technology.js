var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Technologies;
(function (Technologies) {
    Technologies.catagories = [];
    Technologies.techs = Array(18);
    Technologies.BATTERIES = 0;
    Technologies.H2_STORAGE = 1;
    Technologies.GREEN_CITY = 2;
    Technologies.GREEN_FOOD = 3;
    Technologies.GREEN_HOUSING = 4;
    Technologies.GREEN_TRANSPORT = 5;
    Technologies.BIOFEUL = 6;
    Technologies.NUCLEAR_FISSON = 7;
    Technologies.NUCLEAR_FUSION = 8;
    Technologies.COAL = 9;
    Technologies.GAS = 10;
    Technologies.OIL = 11;
    Technologies.EFFICIENT_FOOD = 12;
    Technologies.EFFICIENT_MINING = 13;
    Technologies.EFFICIENT_TRANSPORT = 14;
    Technologies.HYDRO = 15;
    Technologies.SOLAR = 16;
    Technologies.WIND = 17;
    var LEVELS = "ⅠⅡⅢⅣⅤ";
    var WIND_DESC = 'Wind energy is energy generated from the wind by huge multi blade rotors that drive emission-free turbines on the shore. On the other hand, storing is still a problem for wind energy. Furthermore, horizon pollution is something to think of as well.';
    var SOLAR_DESC = 'Solar energy is energy generated from the sunlight through big solar panel farms. A downside to this technology is it\'s irregular production of energy and the problems with storing the energy.';
    var HYDRO_DESC = 'Hydropower uses water to generate energy through big installations in dams and mountains. Even though water is being used, it is not consumed. Polluting gases such as methane and carbon dioxide are being released in the reservoir. You need mountains or rivers in your nations for this technology.';
    var COAL_DESC = 'Coal is generally abundant, cheap, easy to store, and easy to use. However, coal is the dirtiest form of energy production in terms of CO2 emissions. The only way to significantly reduce CO2 emissions while still using coal is through expensive carbon capture and storage (CCS) technologies.';
    var OIL_DESC = 'Oil is the most used technology in transportation, but is causes heavy pollution. Although investing in it might give you a big advantage. You will be able to raise your production speed, lower the rate at which you burn through natural resources. Moneywise this could be decent, environment wise it questionable.';
    var GAS_DESC = 'Natural gas is the cleanest-burning and most energy efficient fossil fuel. However, the extraction of natural gas is often harmful to the environment, especially when techniques such as fracking are used.';
    var NUCLEAR_FUS_DESC = 'Nuclear fusion generates power the same way as the sun, by fusing atoms. This technology could solve all energy problems, the technology is safe, very clean, and resources will last for bilions of years. The problemn however is that this technology still needs a lot of expensive researach which might take decades.';
    var NUCLEAR_FIS_DESC = 'Nuclear fission, or nuclear power as it is mostly known, uses nuclear reactions to product energy. Nucleaer power is a lot more clean then fossile fuels and resources won\'t run out anytime soon. Nuclear power has a bad public image though, due to the radioactive waist and prior exploding power plants.';
    var BIOFUEL_DESC = 'Biofuel is fuel that is produced through contemporary biological processes. Investing in biofuel will decrease the amount of fossil fuels that are being used. Downsides to this technology is a lot more expensive and still now entirely clean.';
    var BATTERIES_DESC = 'Developing battery technologeis will be a very costly operation, but they are expected to become the holy grail of energy storage. With batteries energy loss in grids can be minimized, and technologies consuming electricity (such as electric cars) will become more efficient.';
    var H2O_STORAGE_DESC = 'Chesmical storage is storing power with molocules such as hydrogen. Cemical storage is cheaper then developing new battiery technoloiges due to the exiting infrastrucutre. Devloping chemical storage can reduce the energy loss in energy grids, but have less potential then new batteries.';
    var GREEN_FOOD_DESC = 'The food that is used to sustain a population has a significantly negative environmental impact. Primarily, meat production is a major contributor to climate change. Green food technologies minimize the energy and carbon footprint associated with food production.';
    var GREEN_CITY_DESC = 'More then half of the population life in cities. Green city technologies aim to make a city more sustainable, this will reduce the carbon foodprint of your population and reduce the smog in cities which might lead to a happier population. Remodeling cities however, is no cheap investment to make.';
    var GREEN_HOUSING_DESC = 'Green housing employs features such as good insulation, small surface area of the house, and ventilation to minimize the environmental impact of housing. Thus, houses will require less energy for heating, cooling, construction, and destruction.';
    var GREEN_TRANSPORTATION_DESC = 'Transportation is accountable for 25% of the world\'s energy demand. Making this sector greener, thus using less energy, or renewable resources as fuels would have quite some effect on the total energy market.';
    var EFFICIENT_MINING_DESC = 'Efficient mining technoloiges will enable you to get more resources out of the ground in your country and it will also cost less energy to mine your resources. Furthemore you are generating less pollution with your mining.';
    var EFFICIENT_TRANSPORTATION_DESC = 'Researching in efficient transportation will increase the speed of transport and lower the price the consumers have to pay for it. This might go with a little more pollution and a bit more energy consumption, but a big happiness improvement will be the result.';
    var EFFICIENT_FOOD_DESC = 'Efficient food maximizes the food production rate. by increasing the food supply, it decreases the food prices for the population. However, such an increase in efficiency requires a greater investment from the player and it would increase the energy and pollution footprint of the food production.';
    function update(delta) {
        for (var _i = 0; _i < Technologies.techs.length; _i++) {
            var tech = Technologies.techs[_i];
            if (tech)
                tech.update(delta);
        }
    }
    Technologies.update = update;
    function init() {
        console.log("Loading Technologies");
        Technologies.icons = Grix.fromSprite(Textures.iconSprite);
        Technologies.xp = Grix.shape();
        Technologies.xp.circle(200, 0, 0, 0, true, 100, 100);
        Technologies.xp.drawmode(gl.TRIANGLE_FAN, 0);
        var ind = [0];
        for (var i = 1; i < 101; i++) {
            Technologies.xp.drawmode(gl.TRIANGLE_FAN, i);
            Technologies.xp.addIndicie(ind.concat([0]), i);
            ind.push(i);
        }
        Technologies.xp.populate();
        Technologies.fossile_fuels = new TechCatagory("Fossile Fuels", new Color("98A3A3"));
        Technologies.clean_energy = new TechCatagory("Clean Energy", new Color("34495E"));
        Technologies.renewable_energy = new TechCatagory("Renewable Energy", new Color("3478B6"));
        Technologies.storage = new TechCatagory("Storage", new Color("16A085"));
        Technologies.consumption_green = new TechCatagory("Green Use", new Color("2ECC71"));
        Technologies.conumption_efficient = new TechCatagory("Efficient Use", new Color("E67E22"));
        new Batteries("Batteries", BATTERIES_DESC, getStarRating(0, 0, 0), Technologies.storage);
        new H2Storage("Cemical Storage", H2O_STORAGE_DESC, getStarRating(0, 0, 0), Technologies.storage);
        new GreenTransport("Sustainable Transportation", GREEN_TRANSPORTATION_DESC, getStarRating(0, 0, 0), Technologies.consumption_green);
        new GreenFood("Sustainable Food Production", GREEN_FOOD_DESC, getStarRating(0, 0, 0), Technologies.consumption_green);
        new GreenCity("Sustainable Cities", GREEN_CITY_DESC, getStarRating(0, 0, 0), Technologies.consumption_green);
        new GreenHousing("Sustainable Housing", GREEN_HOUSING_DESC, getStarRating(0, 0, 0), Technologies.consumption_green);
        new EfficientFood("Efficient Food Production", EFFICIENT_FOOD_DESC, getStarRating(0, 0, 0), Technologies.conumption_efficient);
        new EfficientTransport("Efficient Transport", EFFICIENT_TRANSPORTATION_DESC, getStarRating(0, 0, 0), Technologies.conumption_efficient);
        new EfficientMining("Efficient Mining", EFFICIENT_MINING_DESC, getStarRating(0, 0, 0), Technologies.conumption_efficient);
        new Coal("Coal", COAL_DESC, getStarRating(0, 0, 0), Technologies.fossile_fuels);
        new Oil("Oil", OIL_DESC, getStarRating(0, 0, 0), Technologies.fossile_fuels);
        new Gas("Natural Gas", GAS_DESC, getStarRating(0, 0, 0), Technologies.fossile_fuels);
        new Wind("Wind Turbines", WIND_DESC, getStarRating(0, 0, 0), Technologies.renewable_energy);
        new Solar("Solar Panels", SOLAR_DESC, getStarRating(0, 0, 0), Technologies.renewable_energy);
        new Hydro("Hydro Power", HYDRO_DESC, getStarRating(0, 0, 0), Technologies.renewable_energy);
        new NuclearFission("Nuclear Fission", NUCLEAR_FIS_DESC, getStarRating(0, 0, 0), Technologies.clean_energy);
        new BioFuel("Bio Fuel", BIOFUEL_DESC, getStarRating(0, 0, 0), Technologies.clean_energy);
        new NuclearFusion("Nuclear Fusion", NUCLEAR_FUS_DESC, getStarRating(0, 0, 0), Technologies.clean_energy);
    }
    Technologies.init = init;
    function renderFiller(x, y, scale) {
        Technologies.xp.scaleTo(scale * 1.1, scale * 1.1);
        var col = Color.Gray.black(0.3);
        Technologies.xp.setColor(col);
        Technologies.xp.setPivotMove(0.5, 0.5);
        Technologies.xp.moveTo(x, y);
        Technologies.xp.setIndex([0]);
        Technologies.xp.render();
    }
    Technologies.renderFiller = renderFiller;
    function getTech(id) {
        return Technologies.techs[id];
    }
    Technologies.getTech = getTech;
    function mostUsed(num) {
        var techsret = new PriorityQueue(compareTechs, true);
        techsret.insertArray(Technologies.techs);
        var rets = [];
        for (var i = 0; i < num; i++)
            rets.push(techsret.dequeue());
        return rets.filter(hasResearched);
    }
    Technologies.mostUsed = mostUsed;
    function compareTechs(a, b) {
        var level = a.getDevelopmentLevel() - b.getDevelopmentLevel();
        return level == 0 ? a.getResearchPercent() - b.getResearchPercent() : level;
    }
    function hasResearched(value, index, arr) {
        return value.getDevelopmentLevel() > 0 || value.getResearchPercent() > 0;
    }
    var TechCatagory = (function () {
        function TechCatagory(name, color) {
            this.techs = [];
            this.color = color;
            this.name = name;
            Technologies.catagories.push(this);
        }
        TechCatagory.prototype.addTech = function (technology) {
            this.techs.push(technology.getId());
        };
        TechCatagory.prototype.getColor = function () {
            return this.color;
        };
        TechCatagory.prototype.getTechIDs = function () {
            return this.techs;
        };
        TechCatagory.prototype.getName = function () {
            return this.name;
        };
        return TechCatagory;
    })();
    var Technology = (function () {
        function Technology(id, texture, name, description, starRating, catagory) {
            this.developmentLevel = 0;
            this.id = id;
            this.texture = texture;
            this.name = name;
            this.description = description;
            this.starRating = starRating;
            this.catagory = catagory;
            this.development = 0;
            catagory.addTech(this);
            console.log("Setting up: " + name + " in " + catagory.getName());
            Technologies.techs[id] = this;
        }
        Technology.prototype.getDescription = function () {
            return this.description;
        };
        Technology.prototype.getName = function () {
            return this.name;
        };
        Technology.prototype.getResearchPercent = function () {
            return this.development / this.getResearchNeeded(this.developmentLevel + 1);
        };
        Technology.prototype.render = function (x, y, scale, rxp) {
            if (rxp === void 0) { rxp = true; }
            if (rxp) {
                Technologies.xp.scaleTo(scale * 1.1, scale * 1.1);
                var col = this.catagory.getColor();
                var color = new Color(col.r() * 0.7, col.g() * 0.7, col.b() * 0.7);
                Technologies.xp.setColor(color);
                Technologies.xp.setPivotMove(0.5, 0.5);
                Technologies.xp.moveTo(x, y);
                Technologies.xp.rotateDeg(-90);
                Technologies.xp.setIndex([0]);
                Technologies.xp.render();
                var level = this.getResearchPercent();
                Technologies.xp.setIndex([Math.floor(level * 100) + 1]);
                color = new Color(col.r() * 1.3, col.g() * 1.3, col.b() * 1.3);
                Technologies.xp.setColor(color);
                Technologies.xp.render();
            }
            Plena.forceRender();
            Technologies.icons.activeImg(this.getTexture());
            Technologies.icons.scaleTo(scale, scale);
            Technologies.icons.setPivotMove(0.5, 0.5);
            Technologies.icons.moveTo(x, y);
            Technologies.icons.render();
            if (rxp && this.developmentLevel > 0) {
                Plena.forceRender();
                OrchestraBot.freeText.scaleTo(scale * 2, scale * 2);
                OrchestraBot.freeText.setPivotMove(0.5, 0.5);
                OrchestraBot.freeText.moveTo(x - [1, 4, 7, 8, 6][this.developmentLevel - 1], y - 6 + (Technologies.icons.getHeight() * scale) / 2);
                OrchestraBot.freeText.freeText(LEVELS[this.developmentLevel - 1]);
            }
        };
        Technology.prototype.getTexture = function () {
            return Textures.getTechIcon(this.texture);
        };
        Technology.prototype.getId = function () {
            return this.id;
        };
        Technology.prototype.getStars = function () {
            return this.starRating;
        };
        Technology.prototype.isInResearch = function () {
            return this.inResearch;
        };
        Technology.prototype.enableResearch = function (level) {
            if (this.canResearch(level)) {
                this.inResearch = true;
                this.researchLevel = level;
            }
        };
        Technology.prototype.stopResearch = function () {
            this.inResearch = false;
        };
        Technology.prototype.update = function (deltaInY) {
            if (this.inResearch) {
                this.research(this.researchLevel, deltaInY);
            }
        };
        Technology.prototype.getResearchLevel = function () {
            return this.researchLevel;
        };
        Technology.prototype.research = function (level, deltaInY) {
            if (this.canResearch(level)) {
                Nation.subMoney(this.getResearchCost(level) * deltaInY);
                this.development += deltaInY;
                if (this.canUpgrade()) {
                    this.developmentLevel += 1;
                    this.development = 0;
                }
            }
            else {
                this.inResearch = false;
            }
        };
        Technology.prototype.canResearch = function (level) {
            return this.developmentLevel < 5 && this.getResearchCost(level) * (1 / 12) < Nation.getMoney();
        };
        Technology.prototype.canResearchFull = function (level) {
            if (this.developmentLevel >= 5)
                return Researchable.MAXXED;
            else if (this.getResearchCost(level) * (1 / 12) > Nation.getMoney())
                return Researchable.NO_MONEY;
            //land type
            return Researchable.ALLOWED;
        };
        Technology.prototype.canUpgrade = function () {
            return this.development > this.getResearchNeeded(this.developmentLevel + 1);
        };
        Technology.prototype.getDevelopmentLevel = function () {
            return this.developmentLevel;
        };
        return Technology;
    })();
    (function (Researchable) {
        Researchable[Researchable["ALLOWED"] = 0] = "ALLOWED";
        Researchable[Researchable["NO_MONEY"] = 1] = "NO_MONEY";
        Researchable[Researchable["MAXXED"] = 2] = "MAXXED";
        Researchable[Researchable["LAND_PROBLEMS"] = 3] = "LAND_PROBLEMS";
    })(Technologies.Researchable || (Technologies.Researchable = {}));
    var Researchable = Technologies.Researchable;
    function getStarRating(green, money, resources) {
        return { green: green, money: money, resources: resources };
    }
    var Batteries = (function (_super) {
        __extends(Batteries, _super);
        function Batteries(name, description, starRating, catagory) {
            _super.call(this, Technologies.BATTERIES, 0, name, description, starRating, catagory);
        }
        Batteries.prototype.getResearchNeeded = function (level) {
            return 0.1 * level;
        };
        Batteries.prototype.getResearchCost = function (level) {
            return 1000000000000;
        };
        return Batteries;
    })(Technology);
    var H2Storage = (function (_super) {
        __extends(H2Storage, _super);
        function H2Storage(name, description, starRating, catagory) {
            _super.call(this, Technologies.H2_STORAGE, 5, name, description, starRating, catagory);
        }
        H2Storage.prototype.getResearchNeeded = function (level) {
            return 0.01 * level;
        };
        H2Storage.prototype.getResearchCost = function (level) {
            return 1;
        };
        return H2Storage;
    })(Technology);
    var GreenCity = (function (_super) {
        __extends(GreenCity, _super);
        function GreenCity(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_CITY, 15, name, description, starRating, catagory);
        }
        GreenCity.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        GreenCity.prototype.getResearchCost = function (level) {
            return 1;
        };
        return GreenCity;
    })(Technology);
    var GreenFood = (function (_super) {
        __extends(GreenFood, _super);
        function GreenFood(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_FOOD, 16, name, description, starRating, catagory);
        }
        GreenFood.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        GreenFood.prototype.getResearchCost = function (level) {
            return 1;
        };
        return GreenFood;
    })(Technology);
    var GreenHousing = (function (_super) {
        __extends(GreenHousing, _super);
        function GreenHousing(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_HOUSING, 17, name, description, starRating, catagory);
        }
        GreenHousing.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        GreenHousing.prototype.getResearchCost = function (level) {
            return 1;
        };
        return GreenHousing;
    })(Technology);
    var GreenMining = (function (_super) {
        __extends(GreenMining, _super);
        function GreenMining(name, description, starRating, catagory) {
            _super.call(this, GREEN_MINING, 18, name, description, starRating, catagory);
        }
        GreenMining.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        GreenMining.prototype.getResearchCost = function (level) {
            return 1;
        };
        return GreenMining;
    })(Technology);
    var GreenTransport = (function (_super) {
        __extends(GreenTransport, _super);
        function GreenTransport(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_TRANSPORT, 19, name, description, starRating, catagory);
        }
        GreenTransport.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        GreenTransport.prototype.getResearchCost = function (level) {
            return 1;
        };
        return GreenTransport;
    })(Technology);
    var BioFuel = (function (_super) {
        __extends(BioFuel, _super);
        function BioFuel(name, description, starRating, catagory) {
            _super.call(this, Technologies.BIOFEUL, 1, name, description, starRating, catagory);
        }
        BioFuel.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        BioFuel.prototype.getResearchCost = function (level) {
            return 1;
        };
        return BioFuel;
    })(Technology);
    var NuclearFission = (function (_super) {
        __extends(NuclearFission, _super);
        function NuclearFission(name, description, starRating, catagory) {
            _super.call(this, Technologies.NUCLEAR_FISSON, 6, name, description, starRating, catagory);
        }
        NuclearFission.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        NuclearFission.prototype.getResearchCost = function (level) {
            return 1;
        };
        return NuclearFission;
    })(Technology);
    var NuclearFusion = (function (_super) {
        __extends(NuclearFusion, _super);
        function NuclearFusion(name, description, starRating, catagory) {
            _super.call(this, Technologies.NUCLEAR_FUSION, 11, name, description, starRating, catagory);
        }
        NuclearFusion.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        NuclearFusion.prototype.getResearchCost = function (level) {
            return 1;
        };
        return NuclearFusion;
    })(Technology);
    var Oil = (function (_super) {
        __extends(Oil, _super);
        function Oil(name, description, starRating, catagory) {
            _super.call(this, Technologies.OIL, 12, name, description, starRating, catagory);
        }
        Oil.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        Oil.prototype.getResearchCost = function (level) {
            return 1;
        };
        return Oil;
    })(Technology);
    var Coal = (function (_super) {
        __extends(Coal, _super);
        function Coal(name, description, starRating, catagory) {
            _super.call(this, Technologies.COAL, 2, name, description, starRating, catagory);
        }
        Coal.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        Coal.prototype.getResearchCost = function (level) {
            return 1;
        };
        return Coal;
    })(Technology);
    var Gas = (function (_super) {
        __extends(Gas, _super);
        function Gas(name, description, starRating, catagory) {
            _super.call(this, Technologies.GAS, 7, name, description, starRating, catagory);
        }
        Gas.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        Gas.prototype.getResearchCost = function (level) {
            return 1;
        };
        return Gas;
    })(Technology);
    var EfficientFood = (function (_super) {
        __extends(EfficientFood, _super);
        function EfficientFood(name, description, starRating, catagory) {
            _super.call(this, Technologies.EFFICIENT_FOOD, 3, name, description, starRating, catagory);
        }
        EfficientFood.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        EfficientFood.prototype.getResearchCost = function (level) {
            return 1;
        };
        return EfficientFood;
    })(Technology);
    var EfficientMining = (function (_super) {
        __extends(EfficientMining, _super);
        function EfficientMining(name, description, starRating, catagory) {
            _super.call(this, Technologies.EFFICIENT_MINING, 8, name, description, starRating, catagory);
        }
        EfficientMining.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        EfficientMining.prototype.getResearchCost = function (level) {
            return 1;
        };
        return EfficientMining;
    })(Technology);
    var EfficientTransport = (function (_super) {
        __extends(EfficientTransport, _super);
        function EfficientTransport(name, description, starRating, catagory) {
            _super.call(this, Technologies.EFFICIENT_TRANSPORT, 13, name, description, starRating, catagory);
        }
        EfficientTransport.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        EfficientTransport.prototype.getResearchCost = function (level) {
            return 1;
        };
        return EfficientTransport;
    })(Technology);
    var Hydro = (function (_super) {
        __extends(Hydro, _super);
        function Hydro(name, description, starRating, catagory) {
            _super.call(this, Technologies.HYDRO, 4, name, description, starRating, catagory);
        }
        Hydro.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        Hydro.prototype.getResearchCost = function (level) {
            return 1;
        };
        return Hydro;
    })(Technology);
    var Solar = (function (_super) {
        __extends(Solar, _super);
        function Solar(name, description, starRating, catagory) {
            _super.call(this, Technologies.SOLAR, 9, name, description, starRating, catagory);
        }
        Solar.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        Solar.prototype.getResearchCost = function (level) {
            return 1;
        };
        return Solar;
    })(Technology);
    var Wind = (function (_super) {
        __extends(Wind, _super);
        function Wind(name, description, starRating, catagory) {
            _super.call(this, Technologies.WIND, 14, name, description, starRating, catagory);
        }
        Wind.prototype.getResearchNeeded = function (level) {
            return Math.pow(level, 1.5);
        };
        Wind.prototype.getResearchCost = function (level) {
            return 1;
        };
        return Wind;
    })(Technology);
})(Technologies || (Technologies = {}));
//# sourceMappingURL=technology.js.map