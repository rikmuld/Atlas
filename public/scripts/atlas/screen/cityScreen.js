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
    CityScreen_1.NAME = "CityScreen";
    var CityScreen = (function (_super) {
        __extends(CityScreen, _super);
        function CityScreen() {
            _super.call(this, []);
        }
        CityScreen.setup = function () {
            background = Grix.fromTexture(Textures.nation);
        };
        CityScreen.prototype.buttonClicked = function (id) {
        };
        CityScreen.prototype.update = function (delta) {
        };
        CityScreen.prototype.render = function (delta) {
            background.setPivotMove(0.5, 0.5);
            background.moveTo(view.getWidth() / 2, view.getHeight() / 2);
            background.render();
        };
        return CityScreen;
    })(ClickableScreen);
    CityScreen_1.CityScreen = CityScreen;
})(CityScreen || (CityScreen = {}));
//# sourceMappingURL=cityScreen.js.map