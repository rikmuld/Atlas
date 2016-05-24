var Textures;
(function (Textures) {
    function load() {
        Textures.worldSprite = Assets.loadSprite("/images/worldUtils.png", Assets.TILE_SHEET);
        Textures.mapImg = Assets.loadImg("/images/worldMap.png", Assets.NORMAL);
        Textures.iconSprite = Assets.loadSprite("/images/techs.png", Assets.TILE_SHEET);
        Textures.nation = Assets.loadImg("/images/nation.png", Assets.NORMAL);
        var names = [];
        for (var name_1 = 0; name_1 < 20; name_1++) {
            names.push(name_1.toString());
        }
        Textures.iconSprite.addImgs(names, 0, 0, 395, 395, 20);
        Textures.worldSprite.addImg(WorldSprite.CLOUDS, 0, 0, 1024, 1024);
        Textures.worldSprite.addImg(WorldSprite.BACK, 1024, 0, 1024, 1024);
        Textures.worldSprite.addImg(WorldSprite.CRESANT, 0, 1024, 1024, 1024);
        Textures.worldSprite.addImg(WorldSprite.DOCK, 1024, 1024, 433, 101);
        Textures.worldSprite.addImg(WorldSprite.BUBBLE, 1024, 1135, 299, 59);
        Textures.worldSprite.addImg(WorldSprite.SPUTNIK, 1536, 1024, 148, 148);
        Textures.worldSprite.addImg(WorldSprite.ICON_WORLD, 1024, 1536, 200, 200);
        Textures.worldSprite.addImg(WorldSprite.ICON_NATIO, 1224, 1536, 200, 200);
        Textures.worldSprite.addImg(WorldSprite.ICON_STORE, 1424, 1536, 200, 200);
        Textures.worldSprite.addImg(WorldSprite.ICON_LEAVE, 1624, 1536, 200, 200);
    }
    Textures.load = load;
    var WorldSprite;
    (function (WorldSprite) {
        WorldSprite.CLOUDS = "clouds";
        WorldSprite.BACK = "back";
        WorldSprite.CRESANT = "cresant";
        WorldSprite.DOCK = "dock";
        WorldSprite.BUBBLE = "bubble";
        WorldSprite.SPUTNIK = "sputnik";
        WorldSprite.ICON_STORE = "store";
        WorldSprite.ICON_WORLD = "world";
        WorldSprite.ICON_NATIO = "nation";
        WorldSprite.ICON_LEAVE = "exit";
    })(WorldSprite = Textures.WorldSprite || (Textures.WorldSprite = {}));
    function getTechIcon(index) {
        return index.toString();
    }
    Textures.getTechIcon = getTechIcon;
})(Textures || (Textures = {}));
//# sourceMappingURL=assets.js.map