var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//some orchestrabot hovers
var WorldScreen;
(function (WorldScreen_1) {
    var worldMap;
    var worldUtils;
    WorldScreen_1.NAME = "WorldScreen";
    var BUTTON_NATION_MAGNETA = 37;
    var BUTTON_NATION_ORANGE = 38;
    var BUTTON_NATION_BLUE = 39;
    var BUTTON_NATION_RED = 40;
    var BUTTON_NATION_PURPLE = 41;
    var BUTTON_NATION_GREEN = 42;
    var WorldScreen = (function (_super) {
        __extends(WorldScreen, _super);
        function WorldScreen() {
            var magenta = new NationButton(356, 593, BUTTON_NATION_MAGNETA, OrchestraBot.BOT_NATION_X + "0");
            var orange = new NationButton(766, 288, BUTTON_NATION_ORANGE, OrchestraBot.BOT_NATION_X + "1");
            var blue = new NationButton(1172, 409, BUTTON_NATION_BLUE, OrchestraBot.BOT_NATION_X + "2");
            var red = new NationButton(1159, 820, BUTTON_NATION_RED, OrchestraBot.BOT_NATION_X + "3");
            var purple = new NationButton(1503, 668, BUTTON_NATION_PURPLE, OrchestraBot.BOT_NATION_X + "4");
            var green = new NationButton(1680, 512, BUTTON_NATION_GREEN, OrchestraBot.BOT_NATION_X + "5");
            _super.call(this, [magenta, orange, blue, red, purple, green]);
            this.worldOffset = 0;
            this.dragging = false;
            this.canDrag = true;
            this.counter = 1000000;
            this.sputnik = 0;
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_WELCOME);
            OrchestraBot.setActiveWelcome(OrchestraBot.PRIM_SATALITE);
        }
        WorldScreen.setup = function () {
            worldMap = new ImgGrix().mkCircle(Textures.mapImg, 441, 500, 0, 0, 0, 0, 200).populate();
            //worldMap = Grix.fromTexture(Textures.mapImg)
            worldUtils = OrchestraBot.worldUtils;
        };
        WorldScreen.prototype.update = function (delta) {
            _super.prototype.update.call(this, delta);
            this.worldOffsetOld = this.worldOffset;
            this.sputnik += 0.01 * delta;
            if (Keyboard.isDown(Keyboard.KEY_LEFT))
                this.worldOffset += 0.0004 * delta;
            if (Keyboard.isDown(Keyboard.KEY_RIGHT))
                this.worldOffset -= 0.0004 * delta;
            this.setCloudXY();
            var mx = Mouse.getX(view);
            var my = Mouse.getY(view);
            if (this.dragging) {
                this.worldOffset += (this.mouseBegin - mx) / (0.5 * worldMap.getImg().getWidth());
                this.mouseBegin = mx;
            }
            if (this.canDrag) {
                var cx = vWidth / 2;
                var cy = vHeight / 2;
                if (inCircularRange(cx, cy, 220)) {
                    if (Mouse.isDown(Mouse.LEFT)) {
                        this.dragging = true;
                        this.mouseBegin = mx;
                    }
                    setCursor("move");
                }
                this.canDrag = false;
            }
            if (this.dragging)
                setCursor("move");
            if (!Mouse.isDown(Mouse.LEFT)) {
                this.canDrag = true;
                this.dragging = false;
            }
            var angle = MMath.toRad(this.sputnik) - Math.PI * 0.75;
            var x = Math.cos(angle) * 311 + vWidth / 2;
            var y = Math.sin(angle) * 311 + vHeight / 2;
            if (inCircularRange(x, y, 30)) {
                OrchestraBot.setActiveBottext(OrchestraBot.BOT_SPUT);
            }
            if (this.worldOffsetOld == this.worldOffset)
                this.counter += delta;
            else
                this.counter = 0;
            //if (this.worldOffset < 0) this.worldOffset = 1+this.worldOffset
            this.worldOffset %= 1;
            console.log(this.worldOffset);
            //if (this.counter > 2500) this.worldOffset += 0.00002 * delta
        };
        WorldScreen.prototype.render = function (delta) {
            this.renderStars();
            camera.setView(GuiManager.getHUD().getRenderOffset(), 0);
            view.view();
            this.setWorldUtil(Textures.WorldSprite.BACK);
            worldUtils.render();
            Plena.forceRender();
            this.setTextureUV(this.worldOffset, 0);
            worldMap.scaleTo(0.5, 0.5);
            this.center(worldMap);
            worldMap.render();
            Plena.forceRender();
            this.resetTextureUV();
            this.setWorldUtil(Textures.WorldSprite.CRESANT);
            worldUtils.render();
            this.setWorldUtil(Textures.WorldSprite.CLOUDS);
            worldUtils.move(this.cloudX, this.cloudY);
            worldUtils.render();
            worldUtils.activeImg(Textures.WorldSprite.SPUTNIK);
            worldUtils.scaleTo(0.25, 0.25);
            worldUtils.setPivotRot(vWidth / 2, vHeight / 2, false);
            worldUtils.setPivotMove(0.5, 0.5);
            worldUtils.rotateToDeg(this.sputnik);
            worldUtils.moveTo(vWidth / 2 - 220, vHeight / 2 - 220);
            worldUtils.render();
            Plena.forceRender();
            _super.prototype.render.call(this, delta);
            camera.setView(0, 0);
            view.view();
        };
        WorldScreen.prototype.setWorldUtil = function (key) {
            worldUtils.scaleTo(0.5, 0.5);
            this.center(worldUtils);
            worldUtils.activeImg(key);
        };
        WorldScreen.prototype.setCloudXY = function () {
            this.cloudX = (50 * (vmx / vHeight) - 25 * (vWidth / vHeight)) | 0;
            this.cloudY = (50 * (vmy / vHeight) - 25) | 0;
        };
        WorldScreen.prototype.center = function (grix) {
            grix.setPivotMove(0.5, 0.5);
            grix.moveTo(vWidth / 2, vHeight / 2);
        };
        WorldScreen.prototype.buttonClicked = function (id) {
        };
        return WorldScreen;
    })(StarsScreen.StarsScreen);
    WorldScreen_1.WorldScreen = WorldScreen;
    var NationButton = (function (_super) {
        __extends(NationButton, _super);
        function NationButton(x, y, id, bot) {
            _super.call(this, 0, vHeight / 2 + (-505 + y) * 0.44, 12, 12, id);
            this.xnorm = vWidth / 2 + (-505 + x) * 0.44;
            this.bot = bot;
            this.time = 0;
        }
        NationButton.prototype.isInBox = function (x, y) {
            return inCircularRangeOf(this.x, this.y, vWidth / 2, vHeight / 2, 222) && inCircularRange(this.x, this.y, this.width);
        };
        NationButton.prototype.render = function (delta) {
            if (this.hover) {
                if (Mouse.isDown(Mouse.LEFT))
                    this.time = 300;
                OrchestraBot.setActiveBottext(this.bot);
            }
            if (this.time > 0 || this.hover) {
                this.time--;
                worldUtils.clean();
                worldUtils.activeImg(Textures.WorldSprite.NATION_CLICK_DOCK);
                worldUtils.setPivotMove(0.5, 0.5);
                worldUtils.moveTo(vWidth / 2 + 400, vHeight / 2);
                worldUtils.render();
                worldUtils.activeImg(Textures.WorldSprite.NATION_C_EYE);
                worldUtils.moveTo(vWidth / 2 + 400 + 2, vHeight / 2 - 45);
                worldUtils.render();
                worldUtils.activeImg(Textures.WorldSprite.NATION_C_HAND);
                worldUtils.moveTo(vWidth / 2 + 400 + 2, vHeight / 2);
                worldUtils.render();
                worldUtils.activeImg(Textures.WorldSprite.NATION_C_TALK);
                worldUtils.moveTo(vWidth / 2 + 400 + 2, vHeight / 2 + 45);
                worldUtils.render();
            }
        };
        NationButton.prototype.update = function (x, y, delta) {
            _super.prototype.update.call(this, x, y, delta);
            if (Mouse.isDown(Mouse.LEFT)) {
                if (this.id == BUTTON_NATION_ORANGE)
                    console.log(this.x, this.y, Mouse.getX(view), Mouse.getY(view));
                if (this.id == BUTTON_NATION_MAGNETA)
                    console.log(this.x, this.y, Mouse.getX(view), Mouse.getY(view));
            }
            this.x = this.xnorm - (GuiManager.getCurrentScreen().worldOffset * 903);
        };
        return NationButton;
    })(SimpleButton);
})(WorldScreen || (WorldScreen = {}));
//# sourceMappingURL=worldScreen.js.map