var Model;
(function (Model) {
    var Nation;
    (function (Nation) {
        function absorbPollution(timeInJ, nation, world) {
            return Math.max(0, nation.pollution - 30 * timeInJ);
        }
        Nation.absorbPollution = absorbPollution;
        function energyNed(timeInJ, nation, world) {
            var prods = Technologies.mostUsed(18, function (tech) {
                return tech.getEfficient && tech.getDevelopmentLevel() >= 1 ? true : false;
            });
            var deg = 1;
            for (var _i = 0; _i < prods.length; _i++) {
                var prod = prods[_i];
                deg += prod.getEfficient(prod.getDevelopmentLevel());
            }
            return 100 * deg;
        }
        Nation.energyNed = energyNed;
        function pollutionAddResDeg(timeInJ, nation, world) {
            var energyNeed = energyNed(timeInJ, nation, world);
            var pollution = 0;
            var resources = 0;
            var sustainable = 0;
            var prods = Technologies.mostUsed(18, function (tech) {
                return tech.getPower && tech.getDevelopmentLevel() >= 1 ? true : false;
            });
            prods.push(Technologies.getTech(Technologies.COAL));
            prods.sort(function (a, b) {
                return a.getPollution(b.getDevelopmentLevel()) - b.getPollution(b.getDevelopmentLevel());
            });
            var stop = false;
            for (var _i = 0; _i < prods.length; _i++) {
                var p = prods[_i];
                var oldenergy = energyNeed;
                energyNeed -= p.getPower(p.getDevelopmentLevel());
                if (energyNeed < 0) {
                    energyNeed = 0;
                    stop = true;
                }
                if (p.getPollution(p.getDevelopmentLevel()) < 5)
                    sustainable += (oldenergy - energyNeed);
                var mining = Technologies.getTech(Technologies.EFFICIENT_MINING).getDevelopmentLevel();
                var prods_1 = Technologies.mostUsed(18, function (tech) {
                    return tech.getEfficient && tech.getDevelopmentLevel() >= 1 ? true : false;
                });
                var deg = 1;
                for (var _a = 0; _a < prods_1.length; _a++) {
                    var prod = prods_1[_a];
                    deg += prod.getPollution(prod.getDevelopmentLevel());
                }
                resources += (p.getResources(p.getDevelopmentLevel()) * (oldenergy - energyNeed) * timeInJ) / (100 + mining * 20);
                pollution += p.getPollution(p.getDevelopmentLevel()) * (oldenergy - energyNeed) * timeInJ * deg;
                if (stop)
                    break;
            }
            console.log(pollution, resources);
            return [pollution, resources, sustainable];
        }
        Nation.pollutionAddResDeg = pollutionAddResDeg;
        function temperature(timeInJ, nation, world) {
            return nation.landType.termperature + (nation.pollution / 20000);
        }
        Nation.temperature = temperature;
        function tax(timeInJ, nation, world) {
            return (timeInJ * nation.population * NationDefaults.TAX);
        }
        Nation.tax = tax;
        function taxScinece(timeInJ, nation, world) {
            var sus = nation.sustainable;
            var resdiff = 1 - (nation.landType.resourcesEDensity - nation.resourcesE * 1000) / nation.landType.resourcesEDensity;
            console.log(resdiff);
            return 0.05 * resdiff * (1 - sus / 100);
        }
        Nation.taxScinece = taxScinece;
    })(Nation = Model.Nation || (Model.Nation = {}));
    var NationDefaults;
    (function (NationDefaults) {
        NationDefaults.SIZE = 400000; //km^2 (germany)
        NationDefaults.POPULATION = 50; //n/km^2
        NationDefaults.TAX = 20000; //dollar/(n*j) where n is population
        NationDefaults.TERRAIN = []; //default terrain types
        NationDefaults.TEMPERATURE = 15; //degrees
        NationDefaults.WINDY = 20; //km/h
        NationDefaults.SUNNY = 40; //%h
        NationDefaults.FERTILE = 100;
        NationDefaults.RESOURCES_NATURE_PERKM = 100; //not implemented
        NationDefaults.RESOURCES_ENERGY_PERKM = 2000000; //kwh/km^2
        NationDefaults.ENERGY_PER_CAPITA = 10000; //kwh
    })(NationDefaults = Model.NationDefaults || (Model.NationDefaults = {}));
    Model.TERRAIN = ["rivers", "ocean", "forrests", "mountains", "desert", "plains", "tropical forrest", "tundra"];
    (function (Terrain) {
        Terrain[Terrain["Rivers"] = 0] = "Rivers";
        Terrain[Terrain["Ocean"] = 1] = "Ocean";
        Terrain[Terrain["Forrests"] = 2] = "Forrests";
        Terrain[Terrain["Mountains"] = 3] = "Mountains";
        Terrain[Terrain["Dessert"] = 4] = "Dessert";
        Terrain[Terrain["Plains"] = 5] = "Plains";
        Terrain[Terrain["Tropical"] = 6] = "Tropical";
        Terrain[Terrain["Snowy"] = 7] = "Snowy";
    })(Model.Terrain || (Model.Terrain = {}));
    var Terrain = Model.Terrain;
})(Model || (Model = {}));
//# sourceMappingURL=model.js.map