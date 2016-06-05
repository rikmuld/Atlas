var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TechScreen;
(function (TechScreen_1) {
    var tech;
    var cat;
    var container;
    var heading;
    var text;
    var invest;
    var research;
    var stopResearch;
    var box;
    TechScreen_1.NAME = "TechScreen";
    var INVEST_BUTTON = 50;
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
            for (var t = 0; t < size; t++) {
                buttons.push(new TechButton(vWidth / 2 - (size - 1) * 65 + t * 130, vHeight / 2 - 260, techs[t]));
            }
            buttons.push(new InvestButton(vWidth / 2, vHeight / 2 + 190, INVEST_BUTTON));
            _super.call(this, buttons);
            this.height = vHeight / 2;
            this.tech = tech;
            this.techn = Technologies.getTech(tech);
            container.setBackground(Color.mkAlphaColor(cat.getColor(), 0.35));
            container.startWrite(view);
            heading.moveTo(60, 100);
            heading.freeText(this.techn.getName());
            text.moveTo(60, 200);
            text.freeText(this.techn.getDescription(), 1200);
            Technologies.getTech(this.tech).render(1440, 160, 0.5, false);
            container.endWrite();
        }
        TechScreen.setup = function () {
            shape = new ShapeGrix().quad(1, 1).populate();
            heading = Grix.fromFontMap(Assets.mkFontMap(Textures.fontBig));
            text = Grix.fromFontMap(Assets.mkFontMap(Textures.fontSmall));
            container = Grix.writable(Assets.mkWritableImg(1600, 800));
            invest = Grix.text("Invest!", Textures.fontBig);
            research = Grix.text("Researching...", Textures.fontBig);
            stopResearch = Grix.text("Stop Research", Textures.fontBig);
            var canvas = Assets.mkCanvas(500, 120);
            canvas.strokeStyle = Color.White.WHITE.style();
            canvas.lineWidth = 8;
            canvas.strokeRect(0, 0, 500, 120);
            box = Grix.fromTexture(canvas);
        };
        TechScreen.prototype.update = function (delta) {
            _super.prototype.update.call(this, delta);
        };
        TechScreen.prototype.render = function (delta) {
            _super.prototype.renderStars.call(this);
            camera.setView(GuiManager.getHUD().getRenderOffset(), 0);
            view.view();
            container.scaleTo(0.5, 0.5);
            container.setPivotMove(0.5, 0.5);
            container.moveTo(vWidth / 2, vHeight / 2 + 50);
            container.render();
            Plena.forceRender();
            _super.prototype.render.call(this, delta);
            camera.setView(0, 0);
            view.view();
        };
        TechScreen.prototype.buttonClicked = function (id) {
            if (id == INVEST_BUTTON) {
                if (this.techn.isInResearch())
                    this.techn.stopResearch();
                else
                    this.techn.enableResearch(0);
            }
            else {
                var techs = cat.getTechIDs();
                if (id != tech) {
                    tech = id;
                    GuiManager.loadScreen(TechScreen_1.NAME);
                }
            }
        };
        return TechScreen;
    })(StarsScreen.StarsScreen);
    TechScreen_1.TechScreen = TechScreen;
    var InvestButton = (function (_super) {
        __extends(InvestButton, _super);
        function InvestButton(x, y, id) {
            _super.call(this, x, y, research.getWidth(), invest.getHeight() * 1.25, id);
            this.techn = Technologies.getTech(tech);
        }
        InvestButton.prototype.render = function () {
            var text = this.techn.isInResearch() ? this.hover ? stopResearch : research : invest;
            text.setPivotMove(0.5, 0.25);
            text.scaleTo(0.5, 0.5);
            text.moveTo(this.x, this.y);
            text.render();
            box.scaleTo(0.5, 0.5);
            box.setPivotMove(0.5, 0.5);
            box.moveTo(this.x, this.y);
            box.render();
        };
        InvestButton.prototype.isInBox = function (x, y) {
            return (x >= this.x - this.width / 2 && x <= this.x - this.width / 2 + this.width && y >= this.y - this.height / 2 && y <= this.y + -this.height / 2 + this.height);
        };
        return InvestButton;
    })(SimpleButton);
    var TechButton = (function (_super) {
        __extends(TechButton, _super);
        function TechButton(x, y, tech) {
            _super.call(this, x, y, 99, 99, tech);
        }
        TechButton.prototype.render = function (delta) {
            Technologies.getTech(this.id).render(this.x, this.y, 0.25);
        };
        TechButton.prototype.isInBox = function (x, y) {
            return inCircularRange(this.x, this.y, this.width / 2);
        };
        return TechButton;
    })(SimpleButton);
})(TechScreen || (TechScreen = {}));
//# sourceMappingURL=techScreen.js.map