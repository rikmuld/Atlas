var Model;
(function (Model) {
    var Nation;
    (function (Nation) {
        function absorbPollution(nation, world) {
            return 0; //add calculuation
        }
        Nation.absorbPollution = absorbPollution;
        function temperature(nation, world) {
            return nation.landType.termperature; //add calculuation
        }
        Nation.temperature = temperature;
        function tax(timeInJ, nation, world) {
            return (timeInJ * nation.population * NationDefaults.TAX);
        }
        Nation.tax = tax;
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