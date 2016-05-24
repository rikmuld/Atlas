var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//some orchestrabot hovers
var StarsScreen;
(function (StarsScreen_1) {
    var stars;
    var stars2;
    var stars3;
    var star;
    StarsScreen_1.NAME = "StarsScreen";
    var textWorld;
    var textNation;
    var textStore;
    var textExit;
    var BUTTON_STORE = 2;
    var BUTTON_NATION = 1;
    var BUTTON_WORLD = 0;
    var BUTTON_EXIT = 3;
    function mkStars(width, height, amount) {
        var stars = Assets.mkCanvas(1920, 2000);
        for (var star_1 = 0; star_1 < amount; star_1++) {
            var x = Math.floor(Math.random() * 1920);
            var y = Math.floor(Math.random() * 2000);
            stars.fillStyle = Color.White.WHITE.hex();
            stars.fillRect(x, y, width, height);
        }
        return Grix.fromTexture(stars);
    }
    var StarsScreen = (function (_super) {
        __extends(StarsScreen, _super);
        function StarsScreen(buttons) {
            var middleW = view.getWidth() / 2;
            var middleH = view.getHeight();
            var world = new DockButton(0, Textures.WorldSprite.ICON_WORLD, BUTTON_WORLD, textWorld, OrchestraBot.BOT_ICON_WORLD);
            var nation = new DockButton(1, Textures.WorldSprite.ICON_NATIO, BUTTON_NATION, textNation, OrchestraBot.BOT_ICON_NATION);
            var store = new DockButton(2, Textures.WorldSprite.ICON_STORE, BUTTON_STORE, textStore, OrchestraBot.BOT_ICON_STORE);
            var exit = new DockButton(3, Textures.WorldSprite.ICON_LEAVE, BUTTON_EXIT, textExit, OrchestraBot.BOT_ICON_EXIT);
            buttons.push(world);
            buttons.push(nation);
            buttons.push(store);
            buttons.push(exit);
            _super.call(this, buttons);
            this.star1 = 0;
            this.star2 = 0;
            this.star3 = 0;
            var secretStarTheta = Math.random() * 2 * Math.PI;
            var secretStarR = Math.random() * 250 + 250;
            this.secretStarX = view.getWidth() / 2 + secretStarR * Math.cos(secretStarTheta);
            this.secretStarY = view.getHeight() / 2 + secretStarR * Math.sin(secretStarTheta);
        }
        StarsScreen.setup = function () {
            stars = mkStars(1, 1, 400);
            stars2 = mkStars(2, 2, 100);
            stars3 = mkStars(3, 3, 50);
            StarsScreen_1.worldUtils = Grix.fromSprite(Textures.worldSprite);
            var font = new Font(Font.CONSOLAS, 24).fill(Color.White.WHITE);
            textWorld = Grix.text("World View", font);
            textNation = Grix.text("Nation View", font);
            textStore = Grix.text("Visit Store", font);
            textExit = Grix.text("Exit Game", font);
            star = Grix.shape().quad(3, 3).setColor(Color.White.WHITE).populate();
        };
        StarsScreen.prototype.update = function (delta) {
            _super.prototype.update.call(this, delta);
            this.star1 += delta * 0.000012;
            this.star2 += delta * 0.000006;
            this.star3 += delta * 0.000003;
            if (this.inCircularRange(this.secretStarX, this.secretStarY, 3)) {
                OrchestraBot.setActiveBottext(OrchestraBot.BOT_STAR);
            }
        };
        StarsScreen.prototype.renderStars = function () {
            Plena.forceRender();
            this.setTextureUV(0, this.star1);
            stars.render();
            Plena.forceRender();
            this.setTextureUV(0, this.star2);
            stars2.render();
            Plena.forceRender();
            this.setTextureUV(0, this.star3);
            stars3.render();
            Plena.forceRender();
            this.resetTextureUV();
            StarsScreen_1.worldUtils.clean();
            StarsScreen_1.worldUtils.activeImg(Textures.WorldSprite.DOCK);
            StarsScreen_1.worldUtils.setPivotMove(0.5, 1);
            StarsScreen_1.worldUtils.moveTo(view.getWidth() / 2, view.getHeight());
            StarsScreen_1.worldUtils.render();
            Plena.forceRender();
            star.clean();
            star.setColor(Color.White.WHITE);
            star.scaleToSize(3, 3);
            star.moveTo(this.secretStarX, this.secretStarY);
            star.render();
        };
        StarsScreen.prototype.inCircularRange = function (centerX, centerY, range) {
            var mx = Mouse.getX(view);
            var my = Mouse.getY(view);
            var dx = Math.pow((mx - centerX), 2);
            var dy = Math.pow((my - centerY), 2);
            return (Math.sqrt(dx + dy) <= range);
        };
        StarsScreen.prototype.buttonClicked = function (id) {
            switch (id) {
                case BUTTON_STORE:
                    if (GuiManager.getCurrentScreenName() != StoreScreen.NAME) {
                        GuiManager.loadScreen(StoreScreen.NAME);
                    }
                    break;
                case BUTTON_NATION:
                    GuiManager.loadScreen(CityScreen.NAME);
                    break;
                case BUTTON_WORLD:
                    if (GuiManager.getCurrentScreenName() != WorldScreen.NAME) {
                        GuiManager.loadScreen(WorldScreen.NAME);
                    }
                    break;
            }
        };
        StarsScreen.prototype.setTextureUV = function (u, v) {
            this.setTextureMatrix(Matrix.Mat4.translate(u, v));
        };
        StarsScreen.prototype.resetTextureUV = function () {
            this.setTextureMatrix(Matrix.Mat4.identity());
        };
        StarsScreen.prototype.setTextureMatrix = function (mat) {
            Shader.getShader(Shader.TEXTURE).bind();
            Shader.getShader(Shader.TEXTURE).getMatHandler().setUVMatrix(mat);
        };
        return StarsScreen;
    })(ClickableScreen);
    StarsScreen_1.StarsScreen = StarsScreen;
    var DockButton = (function (_super) {
        __extends(DockButton, _super);
        function DockButton(index, icon, id, text, bot) {
            var middleW = view.getWidth() / 2;
            var middleH = view.getHeight();
            _super.call(this, middleW - 203 + index * 101, middleH - 95, 100, 100, id);
            this.icon = icon;
            this.text = text;
            this.bot = bot;
        }
        DockButton.prototype.render = function (delta) {
            Plena.forceRender();
            StarsScreen_1.worldUtils.clean();
            StarsScreen_1.worldUtils.activeImg(this.icon);
            StarsScreen_1.worldUtils.scaleToSize(this.width, this.height);
            StarsScreen_1.worldUtils.moveTo(this.x, this.y);
            StarsScreen_1.worldUtils.render();
            if (this.isMouseOver()) {
                OrchestraBot.setActiveBottext(this.bot);
                StarsScreen_1.worldUtils.clean();
                StarsScreen_1.worldUtils.activeImg(Textures.WorldSprite.DOCK);
                var dockHeight = StarsScreen_1.worldUtils.getHeight();
                StarsScreen_1.worldUtils.activeImg(Textures.WorldSprite.BUBBLE);
                StarsScreen_1.worldUtils.setPivotMove(0.5, 1);
                StarsScreen_1.worldUtils.moveTo(view.getWidth() / 2, view.getHeight() - dockHeight - 3);
                StarsScreen_1.worldUtils.render();
                var height_1 = StarsScreen_1.worldUtils.getHeight();
                Plena.forceRender();
                this.text.setPivotMove(0.5, 0.5);
                this.text.moveTo(view.getWidth() / 2, view.getHeight() - dockHeight - height_1 / 2 + 3);
                this.text.render();
            }
        };
        return DockButton;
    })(SimpleButton);
})(StarsScreen || (StarsScreen = {}));
//# sourceMappingURL=starsScreen.js.map