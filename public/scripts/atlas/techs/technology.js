var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Technologies;
(function (Technologies) {
    Technologies.catagories = [];
    Technologies.techs = Array(19);
    Technologies.BATTERIES = 0;
    Technologies.H2_STORAGE = 1;
    Technologies.GREEN_CITY = 2;
    Technologies.GREEN_FOOD = 3;
    Technologies.GREEN_HOUSING = 4;
    Technologies.GREEN_MINING = 5;
    Technologies.GREEN_TRANSPORT = 6;
    Technologies.BIOFEUL = 7;
    Technologies.NUCLEAR_FISSON = 8;
    Technologies.NUCLEAR_FUSION = 9;
    Technologies.COAL = 10;
    Technologies.GAS = 11;
    Technologies.OIL = 12;
    Technologies.EFFICIENT_FOOD = 13;
    Technologies.EFFICIENT_MINING = 14;
    Technologies.EFFICIENT_TRANSPORT = 15;
    Technologies.HYDRO = 16;
    Technologies.SOLAR = 17;
    Technologies.WIND = 18;
    function init() {
        console.log("Loading Technologies");
        Technologies.fossile_fuels = new TechCatagory("Fossile Fuels", new Color("98A3A3"));
        Technologies.clean_energy = new TechCatagory("Clean Energy", new Color("34495E"));
        Technologies.renewable_energy = new TechCatagory("Renewable Energy", new Color("3478B6"));
        Technologies.storage = new TechCatagory("Storage", new Color("16A085"));
        Technologies.consumption_green = new TechCatagory("Green Use", new Color("2ECC71"));
        Technologies.conumption_efficient = new TechCatagory("Efficient Use", new Color("E67E22"));
        new Batteries("Batteries", "Batteries", getStarRating(0, 0, 0), Technologies.storage);
        new H2Storage("H2Storage", "H2Storage", getStarRating(0, 0, 0), Technologies.storage);
        new GreenTransport("GreenTransport", "GreenTransport", getStarRating(0, 0, 0), Technologies.consumption_green);
        new GreenFood("GreenFood", "GreenFood", getStarRating(0, 0, 0), Technologies.consumption_green);
        new GreenCity("GreenCity", "GreenCity", getStarRating(0, 0, 0), Technologies.consumption_green);
        new GreenHousing("GreenHousing", "GreenHousing", getStarRating(0, 0, 0), Technologies.consumption_green);
        new GreenMining("GreenMining", "GreenMining", getStarRating(0, 0, 0), Technologies.consumption_green);
        new EfficientFood("EfficientFood", "EfficientFood", getStarRating(0, 0, 0), Technologies.conumption_efficient);
        new EfficientMining("EfficientMining", "EfficientMining", getStarRating(0, 0, 0), Technologies.conumption_efficient);
        new EfficientTransport("EfficientTransport", "EfficientTransport", getStarRating(0, 0, 0), Technologies.conumption_efficient);
        new Coal("Coal", "Coal", getStarRating(0, 0, 0), Technologies.fossile_fuels);
        new Oil("Oil", "Oil", getStarRating(0, 0, 0), Technologies.fossile_fuels);
        new Gas("Gas", "Gas", getStarRating(0, 0, 0), Technologies.fossile_fuels);
        new Wind("Wind", "Wind", getStarRating(0, 0, 0), Technologies.renewable_energy);
        new Solar("Solar", "Solar", getStarRating(0, 0, 0), Technologies.renewable_energy);
        new Hydro("Hydro", "Hydro", getStarRating(0, 0, 0), Technologies.renewable_energy);
        new NuclearFission("NuclearFission", "NuclearFission", getStarRating(0, 0, 0), Technologies.clean_energy);
        new BioFuel("BioFuel", "BioFuel", getStarRating(0, 0, 0), Technologies.clean_energy);
        new NuclearFusion("NuclearFusion", "NuclearFusion", getStarRating(0, 0, 0), Technologies.clean_energy);
    }
    Technologies.init = init;
    function getTech(id) {
        return Technologies.techs[id];
    }
    Technologies.getTech = getTech;
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
        Technology.prototype.update = function () {
            if (this.isInResearch) {
                this.research(this.researchLevel);
            }
        };
        Technology.prototype.getResearchLevel = function () {
            return this.researchLevel;
        };
        Technology.prototype.research = function (level) {
            if (this.canResearch(level)) {
                //Nation.removeMoney(this.getResearchCost(level))
                this.development += this.getResearchSpeed(level);
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
            //this.developmentLevel < 4 && this.getResearchCost(level) > Nation.getMoney()
        };
        Technology.prototype.canUpgrade = function () {
            return this.development > this.getResearchNeeded(this.developmentLevel + 1);
        };
        Technology.prototype.getDevelopmentLevel = function () {
            return this.developmentLevel;
        };
        return Technology;
    })();
    function getStarRating(green, money, resources) {
        return { green: green, money: money, resources: resources };
    }
    var Batteries = (function (_super) {
        __extends(Batteries, _super);
        function Batteries(name, description, starRating, catagory) {
            _super.call(this, Technologies.BATTERIES, 0, name, description, starRating, catagory);
        }
        Batteries.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        Batteries.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        Batteries.prototype.getResearchCost = function (level) {
            return 0;
        };
        return Batteries;
    })(Technology);
    var H2Storage = (function (_super) {
        __extends(H2Storage, _super);
        function H2Storage(name, description, starRating, catagory) {
            _super.call(this, Technologies.H2_STORAGE, 5, name, description, starRating, catagory);
        }
        H2Storage.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        H2Storage.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        H2Storage.prototype.getResearchCost = function (level) {
            return 0;
        };
        return H2Storage;
    })(Technology);
    var GreenCity = (function (_super) {
        __extends(GreenCity, _super);
        function GreenCity(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_CITY, 15, name, description, starRating, catagory);
        }
        GreenCity.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        GreenCity.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        GreenCity.prototype.getResearchCost = function (level) {
            return 0;
        };
        return GreenCity;
    })(Technology);
    var GreenFood = (function (_super) {
        __extends(GreenFood, _super);
        function GreenFood(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_FOOD, 16, name, description, starRating, catagory);
        }
        GreenFood.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        GreenFood.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        GreenFood.prototype.getResearchCost = function (level) {
            return 0;
        };
        return GreenFood;
    })(Technology);
    var GreenHousing = (function (_super) {
        __extends(GreenHousing, _super);
        function GreenHousing(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_HOUSING, 17, name, description, starRating, catagory);
        }
        GreenHousing.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        GreenHousing.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        GreenHousing.prototype.getResearchCost = function (level) {
            return 0;
        };
        return GreenHousing;
    })(Technology);
    var GreenMining = (function (_super) {
        __extends(GreenMining, _super);
        function GreenMining(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_MINING, 18, name, description, starRating, catagory);
        }
        GreenMining.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        GreenMining.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        GreenMining.prototype.getResearchCost = function (level) {
            return 0;
        };
        return GreenMining;
    })(Technology);
    var GreenTransport = (function (_super) {
        __extends(GreenTransport, _super);
        function GreenTransport(name, description, starRating, catagory) {
            _super.call(this, Technologies.GREEN_TRANSPORT, 19, name, description, starRating, catagory);
        }
        GreenTransport.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        GreenTransport.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        GreenTransport.prototype.getResearchCost = function (level) {
            return 0;
        };
        return GreenTransport;
    })(Technology);
    var BioFuel = (function (_super) {
        __extends(BioFuel, _super);
        function BioFuel(name, description, starRating, catagory) {
            _super.call(this, Technologies.BIOFEUL, 1, name, description, starRating, catagory);
        }
        BioFuel.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        BioFuel.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        BioFuel.prototype.getResearchCost = function (level) {
            return 0;
        };
        return BioFuel;
    })(Technology);
    var NuclearFission = (function (_super) {
        __extends(NuclearFission, _super);
        function NuclearFission(name, description, starRating, catagory) {
            _super.call(this, Technologies.NUCLEAR_FISSON, 6, name, description, starRating, catagory);
        }
        NuclearFission.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        NuclearFission.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        NuclearFission.prototype.getResearchCost = function (level) {
            return 0;
        };
        return NuclearFission;
    })(Technology);
    var NuclearFusion = (function (_super) {
        __extends(NuclearFusion, _super);
        function NuclearFusion(name, description, starRating, catagory) {
            _super.call(this, Technologies.NUCLEAR_FUSION, 11, name, description, starRating, catagory);
        }
        NuclearFusion.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        NuclearFusion.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        NuclearFusion.prototype.getResearchCost = function (level) {
            return 0;
        };
        return NuclearFusion;
    })(Technology);
    var Oil = (function (_super) {
        __extends(Oil, _super);
        function Oil(name, description, starRating, catagory) {
            _super.call(this, Technologies.OIL, 12, name, description, starRating, catagory);
        }
        Oil.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        Oil.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        Oil.prototype.getResearchCost = function (level) {
            return 0;
        };
        return Oil;
    })(Technology);
    var Coal = (function (_super) {
        __extends(Coal, _super);
        function Coal(name, description, starRating, catagory) {
            _super.call(this, Technologies.COAL, 2, name, description, starRating, catagory);
        }
        Coal.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        Coal.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        Coal.prototype.getResearchCost = function (level) {
            return 0;
        };
        return Coal;
    })(Technology);
    var Gas = (function (_super) {
        __extends(Gas, _super);
        function Gas(name, description, starRating, catagory) {
            _super.call(this, Technologies.GAS, 7, name, description, starRating, catagory);
        }
        Gas.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        Gas.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        Gas.prototype.getResearchCost = function (level) {
            return 0;
        };
        return Gas;
    })(Technology);
    var EfficientFood = (function (_super) {
        __extends(EfficientFood, _super);
        function EfficientFood(name, description, starRating, catagory) {
            _super.call(this, Technologies.EFFICIENT_FOOD, 3, name, description, starRating, catagory);
        }
        EfficientFood.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        EfficientFood.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        EfficientFood.prototype.getResearchCost = function (level) {
            return 0;
        };
        return EfficientFood;
    })(Technology);
    var EfficientMining = (function (_super) {
        __extends(EfficientMining, _super);
        function EfficientMining(name, description, starRating, catagory) {
            _super.call(this, Technologies.EFFICIENT_MINING, 8, name, description, starRating, catagory);
        }
        EfficientMining.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        EfficientMining.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        EfficientMining.prototype.getResearchCost = function (level) {
            return 0;
        };
        return EfficientMining;
    })(Technology);
    var EfficientTransport = (function (_super) {
        __extends(EfficientTransport, _super);
        function EfficientTransport(name, description, starRating, catagory) {
            _super.call(this, Technologies.EFFICIENT_TRANSPORT, 13, name, description, starRating, catagory);
        }
        EfficientTransport.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        EfficientTransport.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        EfficientTransport.prototype.getResearchCost = function (level) {
            return 0;
        };
        return EfficientTransport;
    })(Technology);
    var Hydro = (function (_super) {
        __extends(Hydro, _super);
        function Hydro(name, description, starRating, catagory) {
            _super.call(this, Technologies.HYDRO, 4, name, description, starRating, catagory);
        }
        Hydro.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        Hydro.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        Hydro.prototype.getResearchCost = function (level) {
            return 0;
        };
        return Hydro;
    })(Technology);
    var Solar = (function (_super) {
        __extends(Solar, _super);
        function Solar(name, description, starRating, catagory) {
            _super.call(this, Technologies.SOLAR, 9, name, description, starRating, catagory);
        }
        Solar.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        Solar.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        Solar.prototype.getResearchCost = function (level) {
            return 0;
        };
        return Solar;
    })(Technology);
    var Wind = (function (_super) {
        __extends(Wind, _super);
        function Wind(name, description, starRating, catagory) {
            _super.call(this, Technologies.WIND, 14, name, description, starRating, catagory);
        }
        Wind.prototype.getResearchNeeded = function (level) {
            return 0;
        };
        Wind.prototype.getResearchSpeed = function (level) {
            return 0;
        };
        Wind.prototype.getResearchCost = function (level) {
            return 0;
        };
        return Wind;
    })(Technology);
})(Technologies || (Technologies = {}));
//# sourceMappingURL=technology.js.map