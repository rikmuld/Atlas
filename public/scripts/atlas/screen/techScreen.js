var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TechScreen;
(function (TechScreen_1) {
    var tech;
    var cat;
    TechScreen_1.NAME = "TechScreen";
    var shape;
    function loadTechScreen(techn, cata) {
        tech = techn;
        cat = cata;
        GuiManager.getHUD().startSlide(false, TechScreen_1.NAME);
    }
    TechScreen_1.loadTechScreen = loadTechScreen;
    var TechScreen = (function (_super) {
        __extends(TechScreen, _super);
        function TechScreen() {
            var buttons = [];
            _super.call(this, buttons);
            this.height = view.getHeight() / 2;
            this.x = view.getWidth() / 2 - 400;
            this.y = view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) + 25;
        }
        TechScreen.setup = function () {
            shape = new ShapeGrix().quad(1, 1).populate();
        };
        TechScreen.prototype.update = function (delta) {
            _super.prototype.update.call(this, delta);
        };
        TechScreen.prototype.render = function (delta) {
            _super.prototype.renderStars.call(this);
            camera.setView(GuiManager.getHUD().getRenderOffset(), 0);
            view.view();
            shape.scaleToSize(800, this.height);
            shape.moveTo(this.x, this.y);
            shape.setColor(Color.mkAlphaColor(cat.getColor(), 0.35));
            shape.render();
            Plena.forceRender();
            var icons = StoreScreen.icons;
            icons.activeImg(Technologies.getTech(tech).getTexture());
            icons.scaleTo(0.25, 0.25);
            icons.setPivotMove(0, 0.5);
            icons.moveTo(this.x + 660, view.getHeight() / 12 + this.y);
            icons.render();
            var techs = cat.getTechIDs();
            var size = techs.length;
            var y = (view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) - 125) / 2 + 138;
            for (var t = 0; t < size; t++) {
                var tech_1 = techs[t];
                icons.setPivotMove(0.5, 0.5);
                icons.activeImg(Technologies.getTech(tech_1).getTexture());
                icons.moveTo(view.getWidth() / 2 - (size - 1) * 65 + t * 130, y);
                icons.render();
            }
            _super.prototype.render.call(this, delta);
            camera.setView(0, 0);
            view.view();
        };
        TechScreen.prototype.buttonClicked = function (id) {
        };
        return TechScreen;
    })(StarsScreen.StarsScreen);
    TechScreen_1.TechScreen = TechScreen;
})(TechScreen || (TechScreen = {}));
//# sourceMappingURL=techScreen.js.map