var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//button back to world
//preview of tech icons below city
var CityScreen;
(function (CityScreen_1) {
    var background;
    var nationUtits;
    CityScreen_1.NAME = "CityScreen";
    var CityScreen = (function (_super) {
        __extends(CityScreen, _super);
        function CityScreen() {
            _super.call(this, []);
            GuiManager.setHudAlpha(0.25);
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_STORE);
            var golden = 16 / 9;
            if ((vWidth / vHeight) != golden) {
                if ((vWidth / vHeight) > golden)
                    this.bX = vWidth;
                else
                    this.bY = vHeight;
            }
            this.cloudy = 0;
        }
        CityScreen.setup = function () {
            nationUtits = Grix.fromSprite(Textures.cities);
            background = Grix.fromTexture(Textures.nation);
        };
        CityScreen.prototype.buttonClicked = function (id) {
        };
        CityScreen.prototype.update = function (delta) {
            this.cloudy += delta * 0.0005;
        };
        CityScreen.prototype.render = function (delta) {
            if (this.bY)
                background.scaleHeightToSize(this.bY);
            else if (this.bX)
                background.scaleWidthToSize(this.bX);
            background.setPivotMove(0.5, 0.5);
            background.moveTo(vWidth / 2, vHeight / 2);
            background.render();
            nationUtits.activeImg(Textures.NationSprite.CITY_GREEN);
            nationUtits.moveTo(vWidth / 2 - 295, vHeight / 2 - 240);
            nationUtits.scaleTo(0.55, 0.55);
            nationUtits.render();
            Plena.forceRender();
            nationUtits.activeImg(Textures.NationSprite.CLOUDY);
            nationUtits.scaleTo(0.5, 0.5);
            nationUtits.moveTo(vWidth / 2 - 100 + this.cloudyX(), vHeight / 2 - 220 + this.cloudyY());
            nationUtits.render();
        };
        CityScreen.prototype.cloudyX = function () {
            var scale = 300 / (3 - Math.cos(2 * this.cloudy));
            return scale * Math.cos(this.cloudy);
        };
        CityScreen.prototype.cloudyY = function () {
            var scale = 250 / (3 - Math.cos(2 * this.cloudy));
            return scale * Math.sin(this.cloudy * 3) / 2;
        };
        return CityScreen;
    })(ClickableScreen);
    CityScreen_1.CityScreen = CityScreen;
})(CityScreen || (CityScreen = {}));
//# sourceMappingURL=cityScreen.js.map