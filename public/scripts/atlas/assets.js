var Textures;
(function (Textures) {
    function load() {
        console.log("Registering Assets");
        Textures.worldSprite = Assets.loadSprite("/images/worldUtils.png", Assets.TILE_SHEET);
        Textures.mapImg = Assets.loadImg("/images/worldMap.png", Assets.NORMAL);
        Textures.iconSprite = Assets.loadSprite("/images/techs.png", Assets.TILE_SHEET);
        Textures.nation = Assets.loadImg("/images/nation.png", Assets.NORMAL);
        Textures.cities = Assets.loadSprite("/images/cities.png", Assets.TILE_SHEET);
        Textures.cities.addImgs([NationSprite.CITY_GREEN, NationSprite.CITY_POLLUTED], 0, 0, 901, 433, 2, true);
        Textures.cities.addImg(NationSprite.CLOUDY, 0, 866, 171, 71);
        Textures.cities.addImg(NationSprite.DOCK, 0, 1484, 1254, 612);
        Textures.cities.addImg(NationSprite.BALLOON, 0, 936, 131, 234);
        var names = [];
        for (var name_1 = 0; name_1 < 20; name_1++) {
            names.push(name_1.toString());
        }
        Textures.iconSprite.addImgs(names, 0, 0, 395, 395, 20);
        Textures.worldSprite.addImg(WorldSprite.CLOUDS, 0, 0, 1024, 1024);
        Textures.worldSprite.addImg(WorldSprite.BACK, 1024, 0, 1024, 1024);
        Textures.worldSprite.addImg(WorldSprite.CRESANT, 0, 1024, 1024, 1024);
        Textures.worldSprite.addImg(WorldSprite.DOCK, 1024, 1024, 433, 101);
        Textures.worldSprite.addImg(WorldSprite.BUBBLE, 1024, 1135, 299, 48);
        Textures.worldSprite.addImg(WorldSprite.SPUTNIK, 1536, 1024, 148, 148);
        Textures.worldSprite.addImg(WorldSprite.ICON_WORLD, 1024, 1536, 200, 200);
        Textures.worldSprite.addImg(WorldSprite.ICON_NATIO, 1224, 1536, 200, 200);
        Textures.worldSprite.addImg(WorldSprite.ICON_STORE, 1424, 1536, 200, 200);
        Textures.worldSprite.addImg(WorldSprite.ICON_LEAVE, 1624, 1536, 200, 200);
        Textures.worldSprite.addImg(WorldSprite.DOCK_SIDE, 1025, 1182, 244, 244);
        Textures.worldSprite.addImgs([WorldSprite.ICON_CO2, WorldSprite.ICON_RES, WorldSprite.ICON_TEM, WorldSprite.ICON_HAP], 65 * 21, 65 * 22, 65, 65, 4);
        Textures.fontBig = new Font(Font.CONSOLAS, 48).fill(new Color(250, 250, 250));
        Textures.fontSmall = new Font(Font.CONSOLAS, 40).fill(new Color(250, 250, 250));
        Textures.fontMapSmall = Assets.mkFontMap(Textures.fontSmall, Assets.LETTERS, FontMap.BASIC_KEYS + "ⅠⅡⅢⅣⅤ");
    }
    Textures.load = load;
    var NationSprite;
    (function (NationSprite) {
        NationSprite.CITY_GREEN = "greenCity";
        NationSprite.CITY_POLLUTED = "pollutedCity";
        NationSprite.CLOUDY = "cloudy";
        NationSprite.BALLOON = "balloon";
        NationSprite.DOCK = "dock";
    })(NationSprite = Textures.NationSprite || (Textures.NationSprite = {}));
    var WorldSprite;
    (function (WorldSprite) {
        WorldSprite.CLOUDS = "clouds";
        WorldSprite.BACK = "back";
        WorldSprite.CRESANT = "cresant";
        WorldSprite.DOCK = "dock";
        WorldSprite.DOCK_SIDE = "dockSide";
        WorldSprite.BUBBLE = "bubble";
        WorldSprite.SPUTNIK = "sputnik";
        WorldSprite.ICON_STORE = "store";
        WorldSprite.ICON_WORLD = "world";
        WorldSprite.ICON_NATIO = "nation";
        WorldSprite.ICON_LEAVE = "exit";
        WorldSprite.ICON_CO2 = "co2";
        WorldSprite.ICON_RES = "res";
        WorldSprite.ICON_TEM = "tem";
        WorldSprite.ICON_HAP = "hap";
    })(WorldSprite = Textures.WorldSprite || (Textures.WorldSprite = {}));
    function getTechIcon(index) {
        return index.toString();
    }
    Textures.getTechIcon = getTechIcon;
})(Textures || (Textures = {}));
//# sourceMappingURL=assets.js.map