var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TechScreen;
(function (TechScreen_1) {
    var tech;
    var cat;
    var heading;
    var text;
    TechScreen_1.NAME = "TechScreen";
    var shape;
    function loadTechScreen(techn, cata, reverse) {
        if (reverse === void 0) { reverse = false; }
        tech = techn;
        cat = cata;
        GuiManager.getHUD().startSlide(reverse, TechScreen_1.NAME);
    }
    TechScreen_1.loadTechScreen = loadTechScreen;
    var TechScreen = (function (_super) {
        __extends(TechScreen, _super);
        function TechScreen() {
            var buttons = [];
            var techs = cat.getTechIDs();
            var size = techs.length;
            var y = (view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) - 125) / 2 + 138;
            for (var t = 0; t < size; t++) {
                buttons.push(new TechButton(view.getWidth() / 2 - (size - 1) * 65 + t * 130, y, techs[t]));
            }
            _super.call(this, buttons);
            this.height = view.getHeight() / 2;
            this.x = view.getWidth() / 2 - 400;
            this.y = view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) + 25;
            this.tech = tech;
            this.techn = Technologies.getTech(tech);
        }
        TechScreen.setup = function () {
            shape = new ShapeGrix().quad(1, 1).populate();
            heading = Grix.fromFontMap(Assets.mkFontMap(new Font(Font.CONSOLAS, 24).fill(Color.White.WHITE)));
            text = Grix.fromFontMap(Assets.mkFontMap(new Font(Font.CONSOLAS, 20).fill(Color.White.WHITE)));
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
            icons.activeImg(Technologies.getTech(this.tech).getTexture());
            icons.scaleTo(0.25, 0.25);
            icons.setPivotMove(0, 0.5);
            icons.moveTo(this.x + 660, view.getHeight() / 12 + this.y);
            icons.render();
            heading.moveTo(this.x + 50, this.y + view.getHeight() / 12 - 30);
            heading.freeText(this.techn.getName());
            text.moveTo(this.x + 50, this.y + view.getHeight() / 12 + 30);
            text.freeText(this.techn.getDescription(), 575);
            _super.prototype.render.call(this, delta);
            camera.setView(0, 0);
            view.view();
        };
        TechScreen.prototype.buttonClicked = function (id) {
            var techs = cat.getTechIDs();
            var iNew = techs.indexOf(id);
            var iOld = techs.indexOf(this.tech);
            loadTechScreen(id, cat, iNew < iOld);
        };
        return TechScreen;
    })(StarsScreen.StarsScreen);
    TechScreen_1.TechScreen = TechScreen;
    var TechButton = (function (_super) {
        __extends(TechButton, _super);
        function TechButton(x, y, tech) {
            _super.call(this, x, y, 99, 99, tech);
        }
        TechButton.prototype.render = function (delta) {
            var icons = StoreScreen.icons;
            icons.scaleToSize(this.width, this.height);
            icons.setPivotMove(0.5, 0.5);
            icons.activeImg(Technologies.getTech(this.id).getTexture());
            icons.moveTo(this.x, this.y);
            icons.render();
        };
        TechButton.prototype.isInBox = function (x, y) {
            return inCircularRange(this.x, this.y, this.width / 2);
        };
        return TechButton;
    })(SimpleButton);
})(TechScreen || (TechScreen = {}));
//# sourceMappingURL=techScreen.js.map