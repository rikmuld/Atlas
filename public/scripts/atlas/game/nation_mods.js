var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Modifier = (function () {
    function Modifier() {
    }
    Modifier.init = function () {
        var larger = new VarMod(Vars.Size, 25, 10);
        var smaller = new VarMod(Vars.Size, -25, 10);
        var colder = new VarMod(Vars.Temperature, -25, 10);
        var hotter = new VarMod(Vars.Temperature, 25, 10);
        var windy = new VarMod(Vars.Windy, 25, 10);
        var nowind = new VarMod(Vars.Windy, -25, 10);
        var sunny = new VarMod(Vars.Sunny, 25, 10);
        var nosun = new VarMod(Vars.Sunny, -25, 10);
        var plentifullNature = new VarMod(Vars.ResourcesN, 25, 10);
        var scarseNature = new VarMod(Vars.ResourcesN, -25, 10);
        var plentifullEnergy = new VarMod(Vars.ResourcesE, 25, 10);
        var scarseEnergy = new VarMod(Vars.ResourcesE, -25, 10);
        var fertile = new VarMod(Vars.Fertile, 25, 10);
        var desolete = new VarMod(Vars.Fertile, -25, 10);
        var mountains = new TerrainMod(Model.Terrain.Mountains, plentifullNature);
        var rivers = new TerrainMod(Model.Terrain.Rivers, fertile);
        var ocean = new TerrainMod(Model.Terrain.Ocean, windy);
        var forrests = new TerrainMod(Model.Terrain.Forrests, plentifullNature, fertile);
        var deserts = new TerrainMod(Model.Terrain.Dessert, plentifullEnergy, scarseNature, sunny, desolete, hotter);
        var plains = new TerrainMod(Model.Terrain.Plains, larger);
        var tropical = new TerrainMod(Model.Terrain.Tropical, smaller, hotter, fertile);
        var snowy = new TerrainMod(Model.Terrain.Snowy, colder, desolete);
        Modifier.varModifiers = [larger, smaller, colder, hotter, windy, nowind, sunny, nosun, plentifullNature, scarseNature, plentifullEnergy, plentifullEnergy, fertile, desolete];
        Modifier.terModifiers = [mountains, ocean, forrests, deserts, plains, tropical, snowy];
    };
    Modifier.getRandomMods = function (vars, terrain) {
        var modsV = Modifier.varModifiers.slice();
        var modsT = Modifier.terModifiers.slice();
        var retMods = [];
        for (var i = 0; i < vars; i++) {
            var random = Math.floor(Math.random() * modsV.length);
            retMods.push(modsV.splice(random, 1)[0]);
        }
        for (var i = 0; i < terrain; i++) {
            var random = Math.floor(Math.random() * modsT.length);
            retMods.push(modsT.splice(random, 1)[0]);
        }
        return retMods;
    };
    return Modifier;
})();
var EnumMod = (function (_super) {
    __extends(EnumMod, _super);
    function EnumMod(value) {
        _super.call(this);
        this.value = value;
    }
    EnumMod.prototype.getMod = function () {
        return this.value;
    };
    return EnumMod;
})(Modifier);
var IntMod = (function (_super) {
    __extends(IntMod, _super);
    function IntMod(magnitude, certain) {
        _super.call(this);
        this.magnitude = magnitude;
        this.certain = certain;
    }
    IntMod.prototype.getMod = function () {
        return 1 + ((this.magnitude - this.certain / 2) + Math.random() * this.certain) / 100;
    };
    return IntMod;
})(Modifier);
var VarMod = (function (_super) {
    __extends(VarMod, _super);
    function VarMod(varr, magnitude, certain) {
        _super.call(this, magnitude, certain);
        this.varr = varr;
    }
    VarMod.prototype.act = function (type) { type.setVar(this.varr, this.getMod()); };
    return VarMod;
})(IntMod);
var TerrainMod = (function (_super) {
    __extends(TerrainMod, _super);
    function TerrainMod(value) {
        var mods = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            mods[_i - 1] = arguments[_i];
        }
        _super.call(this, value);
        this.mods = mods;
    }
    TerrainMod.prototype.act = function (type) {
        type.terrain.push(this.getMod());
        for (var _i = 0, _a = this.mods; _i < _a.length; _i++) {
            var mod = _a[_i];
            mod.act(type);
        }
    };
    return TerrainMod;
})(EnumMod);
//# sourceMappingURL=nation_mods.js.map