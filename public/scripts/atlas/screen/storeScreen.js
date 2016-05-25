var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StoreScreen;
(function (StoreScreen_1) {
    StoreScreen_1.NAME = "StoreScreen";
    var icons;
    var StoreScreen = (function (_super) {
        __extends(StoreScreen, _super);
        function StoreScreen() {
            _super.call(this, []);
            this.HUD = new OrchestraBot.OrchestraBot(OrchestraBot.BOT_STORE);
        }
        StoreScreen.setup = function () {
            icons = Grix.fromSprite(Textures.iconSprite);
        };
        StoreScreen.prototype.update = function (delta) {
            _super.prototype.update.call(this, delta);
            for (var icon = 0; icon < 20; icon++) {
                var iconName = Textures.getTechIcon(icon);
                icons.activeImg(iconName);
                icons.scaleTo(0.5, 0.5);
                icons.moveTo(200 + (icon % 5) * 202, 200 + Math.floor(icon / 5) * 202);
                icons.render();
            }
            this.HUD.update(delta);
        };
        StoreScreen.prototype.render = function (delta) {
            this.renderStars();
            _super.prototype.render.call(this, delta);
            this.HUD.render(delta);
        };
        return StoreScreen;
    })(StarsScreen.StarsScreen);
    StoreScreen_1.StoreScreen = StoreScreen;
})(StoreScreen || (StoreScreen = {}));
//# sourceMappingURL=storeScreen.js.map