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
    var WorldScreen = (function (_super) {
        __extends(WorldScreen, _super);
        function WorldScreen() {
            _super.call(this, []);
            this.worldOffset = 0.164;
            this.dragging = false;
            this.canDrag = true;
            this.counter = 1000000;
            this.sputnik = 0;
            this.HUD = new OrchestraBot.OrchestraBot(OrchestraBot.BOT_WELCOME);
        }
        WorldScreen.setup = function () {
            worldMap = new ImgGrix().mkCircle(Textures.mapImg, 441, 500, 0, 0, 0, 0, 200).populate();
            worldUtils = StarsScreen.worldUtils;
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
            if (Mouse.isDown(Mouse.LEFT) && this.canDrag) {
                var cx = view.getWidth() / 2;
                var cy = view.getHeight() / 2;
                if (this.inCircularRange(cx, cy, 220)) {
                    this.dragging = true;
                    this.mouseBegin = mx;
                }
                this.canDrag = false;
            }
            if (!Mouse.isDown(Mouse.LEFT)) {
                this.canDrag = true;
                this.dragging = false;
            }
            var angle = MMath.toRad(this.sputnik) - Math.PI * 0.75;
            var x = Math.cos(angle) * 311 + view.getWidth() / 2;
            var y = Math.sin(angle) * 311 + view.getHeight() / 2;
            if (this.inCircularRange(x, y, 30)) {
                OrchestraBot.setActiveBottext(OrchestraBot.BOT_SPUT);
            }
            if (this.worldOffsetOld == this.worldOffset)
                this.counter += delta;
            else
                this.counter = 0;
            if (this.counter > 2500)
                this.worldOffset += 0.00002 * delta;
            this.HUD.update(delta);
        };
        WorldScreen.prototype.render = function (delta) {
            this.renderStars();
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
            worldUtils.setPivotRot(view.getWidth() / 2, view.getHeight() / 2, false);
            worldUtils.setPivotMove(0.5, 0.5);
            worldUtils.rotateToDeg(this.sputnik);
            worldUtils.moveTo(view.getWidth() / 2 - 220, view.getHeight() / 2 - 220);
            worldUtils.render();
            Plena.forceRender();
            _super.prototype.render.call(this, delta);
            this.HUD.render(delta);
        };
        WorldScreen.prototype.setWorldUtil = function (key) {
            worldUtils.scaleTo(0.5, 0.5);
            this.center(worldUtils);
            worldUtils.activeImg(key);
        };
        WorldScreen.prototype.setCloudXY = function () {
            this.cloudX = (50 * (Mouse.getX(view) / view.getHeight()) - 25 * (view.getWidth() / view.getHeight())) | 0;
            this.cloudY = (50 * (Mouse.getY(view) / view.getHeight()) - 25) | 0;
        };
        WorldScreen.prototype.center = function (grix) {
            grix.setPivotMove(0.5, 0.5);
            grix.moveTo(view.getWidth() / 2, view.getHeight() / 2);
        };
        return WorldScreen;
    })(StarsScreen.StarsScreen);
    WorldScreen_1.WorldScreen = WorldScreen;
})(WorldScreen || (WorldScreen = {}));
//# sourceMappingURL=worldScreen.js.map