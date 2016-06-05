var Nation;
(function (Nation) {
    var data;
    function init(city) {
        data = { id: city, landType: new LandType() };
        console.log("Creating nation");
        data.resourcesN = data.landType.resourcesNDensity * data.landType.size;
        data.resourcesE = data.landType.resourcesEDensity * data.landType.size;
        data.population = data.landType.size * Model.NationDefaults.POPULATION;
        data.money = data.population * Model.NationDefaults.TAX;
        data.temperature = data.landType.termperature;
        data.fertile = data.landType.fertile;
        socket.on('pollution', setPollution);
    }
    Nation.init = init;
    function update(time) {
        setPollution(Model.Nation.absorbPollution(data, World.getWorld()));
        setTemp(Model.Nation.temperature(data, World.getWorld()));
        data.money += Model.Nation.tax(time, data, World.getWorld());
        socket.emit('pollution', data.pollution);
    }
    Nation.update = update;
    function subMoney(money) {
        data.money -= money;
    }
    Nation.subMoney = subMoney;
    function getMoney() {
        return data.money;
    }
    Nation.getMoney = getMoney;
    function setPollution(poll) {
        data.pollution = poll;
    }
    function setTemp(temp) {
        data.temperature = temp;
    }
    function getPollution() {
        return data.pollution;
    }
    Nation.getPollution = getPollution;
    function getLandData() {
        return data.landType;
    }
    Nation.getLandData = getLandData;
    function getCityID() {
        return data.id;
    }
    Nation.getCityID = getCityID;
    function getTemperatire() {
        return data.temperature;
    }
    Nation.getTemperatire = getTemperatire;
    function getData() {
        return data;
    }
    Nation.getData = getData;
})(Nation || (Nation = {}));
var LandType = (function () {
    function LandType() {
        this.size = Model.NationDefaults.SIZE;
        this.terrain = Model.NationDefaults.TERRAIN;
        this.sunny = Model.NationDefaults.SUNNY;
        this.windy = Model.NationDefaults.WINDY;
        this.fertile = Model.NationDefaults.FERTILE;
        this.termperature = Model.NationDefaults.TEMPERATURE;
        this.resourcesNDensity = Model.NationDefaults.RESOURCES_NATURE_PERKM;
        this.resourcesEDensity = Model.NationDefaults.RESOURCES_ENERGY_PERKM;
        Modifier.init();
        var mods = Modifier.getRandomMods(8, 3);
        for (var _i = 0; _i < mods.length; _i++) {
            var mod = mods[_i];
            mod.act(this);
        }
    }
    LandType.prototype.setVar = function (varr, mod) {
        switch (varr) {
            case Vars.Size:
                this.size *= mod;
                break;
            case Vars.Sunny:
                this.sunny *= mod;
                break;
            case Vars.Windy:
                this.windy *= mod;
                break;
            case Vars.Fertile:
                this.fertile *= mod;
                break;
            case Vars.Temperature:
                this.termperature *= mod;
                break;
            case Vars.ResourcesN:
                this.resourcesNDensity *= mod;
                break;
            case Vars.ResourcesE:
                this.resourcesEDensity *= mod;
                break;
        }
    };
    return LandType;
})();
var Vars;
(function (Vars) {
    Vars[Vars["Size"] = 0] = "Size";
    Vars[Vars["Sunny"] = 1] = "Sunny";
    Vars[Vars["Windy"] = 2] = "Windy";
    Vars[Vars["Fertile"] = 3] = "Fertile";
    Vars[Vars["Temperature"] = 4] = "Temperature";
    Vars[Vars["ResourcesN"] = 5] = "ResourcesN";
    Vars[Vars["ResourcesE"] = 6] = "ResourcesE";
})(Vars || (Vars = {}));
//# sourceMappingURL=nation.js.map