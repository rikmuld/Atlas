var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StoreScreen;
(function (StoreScreen_1) {
    StoreScreen_1.NAME = "StoreScreen";
    var groups = [];
    var colorGrix;
    var StoreScreen = (function (_super) {
        __extends(StoreScreen, _super);
        function StoreScreen() {
            var buttons = [];
            var cats = Technologies.catagories;
            var spacer = vHeight / 6;
            for (var g = 0; g < cats.length; g++) {
                var x = vWidth / 2 - 400 + Math.floor(g / 3) * 400;
                var y = vHeight / 2 - (spacer * 1.5) + spacer * (g % 3) + 25;
                buttons.push(new CatButton(x, y, g + 10, cats[g], groups[g]));
            }
            _super.call(this, buttons);
            this.canClick = true;
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_STORE);
            OrchestraBot.setActiveWelcome(OrchestraBot.PRIM_STORE);
        }
        StoreScreen.setup = function () {
            var group = Technologies.catagories;
            var font = Textures.fontBig;
            for (var _i = 0; _i < group.length; _i++) {
                var g = group[_i];
                var name_1 = g.getName();
                groups.push(Grix.text(name_1, font));
            }
            colorGrix = Grix.shape().quad(1, 1).populate();
        };
        StoreScreen.prototype.update = function (delta) {
            _super.prototype.update.call(this, delta);
        };
        StoreScreen.prototype.render = function (delta) {
            _super.prototype.renderStars.call(this);
            camera.setView(GuiManager.getHUD().getRenderOffset(), 0);
            view.view();
            _super.prototype.render.call(this, delta);
            camera.setView(0, 0);
            view.view();
        };
        StoreScreen.prototype.buttonClicked = function (id) {
            for (var g = 10; g < 10 + Technologies.catagories.length; g++) {
                if (g == id) {
                    var cat = Technologies.catagories[g - 10];
                    TechScreen.loadTechScreen(cat.getTechIDs()[0], cat);
                }
            }
        };
        return StoreScreen;
    })(StarsScreen.StarsScreen);
    StoreScreen_1.StoreScreen = StoreScreen;
    var CatButton = (function (_super) {
        __extends(CatButton, _super);
        function CatButton(x, y, id, cat, text) {
            var spacer = vHeight / 6;
            _super.call(this, x, y, 400, spacer, id);
            this.color = Color.mkAlphaColor(cat.getColor(), 0.35);
            this.techs = cat.getTechIDs();
            this.text = text;
        }
        CatButton.prototype.render = function (delta) {
            colorGrix.scaleToSize(this.width, this.height);
            colorGrix.moveTo(this.x, this.y);
            colorGrix.setColor(this.color);
            colorGrix.render();
            Plena.forceRender();
            this.text.setPivotMove(0.5, 0.25);
            this.text.scaleTo(0.5, 0.5);
            this.text.moveTo(140 + this.x, vHeight / 12 + this.y);
            this.text.render();
            var tId = this.techs[0];
            var t = Technologies.getTech(tId);
            t.render(this.x + 310, vHeight / 12 + this.y, 0.25, false);
            if (this.hover) {
                var size = this.techs.length;
                var y = (vHeight / 2 - ((vHeight / 6) * 1.5) - 125) / 2 + 138;
                for (var t_1 = 0; t_1 < size; t_1++) {
                    var tech = this.techs[t_1];
                    Technologies.getTech(tech).render(vWidth / 2 - (size - 1) * 65 + t_1 * 130, y, 0.25);
                }
            }
        };
        return CatButton;
    })(SimpleButton);
})(StoreScreen || (StoreScreen = {}));
//# sourceMappingURL=storeScreen.js.map