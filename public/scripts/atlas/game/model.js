var Model;
(function (Model) {
    var Nation;
    (function (Nation) {
        function absorbPollution(nation, world) {
            return 0; //add calculuation
        }
        Nation.absorbPollution = absorbPollution;
        function temperature(nation, world) {
            return nation.landType.termperature; //add calculetion, take into account world temperature
        }
        Nation.temperature = temperature;
    })(Nation = Model.Nation || (Model.Nation = {}));
    var NationDefaults;
    (function (NationDefaults) {
        NationDefaults.SIZE = 100; //fill in
        NationDefaults.TERRAIN = []; //default terrain types
        NationDefaults.TEMPERATURE = 15; //degrees
        NationDefaults.WINDY = 100; //relative, also three below
        NationDefaults.SUNNY = 100;
        NationDefaults.FERTILE = 100;
        NationDefaults.RESOURCES_NATURE = 100; //fill in
        NationDefaults.RESOURCES_ENERGY = 100; //fill in
    })(NationDefaults = Model.NationDefaults || (Model.NationDefaults = {}));
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