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
    var star1 = 0;
    var star2 = 0;
    var star3 = 0;
    StarsScreen_1.NAME = "StarsScreen";
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
            _super.call(this, buttons);
            var secretStarTheta = Math.random() * 2 * Math.PI;
            var secretStarR = Math.random() * 250 + 250;
            this.secretStarX = view.getWidth() / 2 + secretStarR * Math.cos(secretStarTheta);
            this.secretStarY = view.getHeight() / 2 + secretStarR * Math.sin(secretStarTheta);
        }
        StarsScreen.setup = function () {
            stars = mkStars(1, 1, 400);
            stars2 = mkStars(2, 2, 100);
            stars3 = mkStars(3, 3, 50);
            star = Grix.shape().quad(3, 3).setColor(Color.White.WHITE).populate();
        };
        StarsScreen.prototype.update = function (delta) {
            _super.prototype.update.call(this, delta);
            star1 += delta * 0.000012;
            star2 += delta * 0.000006;
            star3 += delta * 0.000003;
            if (this.inCircularRange(this.secretStarX, this.secretStarY, 3)) {
                OrchestraBot.setActiveBottext(OrchestraBot.BOT_STAR);
            }
        };
        StarsScreen.prototype.renderStars = function () {
            Plena.forceRender();
            this.setTextureUV(0, star1);
            stars.render();
            Plena.forceRender();
            this.setTextureUV(0, star2);
            stars2.render();
            Plena.forceRender();
            this.setTextureUV(0, star3);
            stars3.render();
            Plena.forceRender();
            this.resetTextureUV();
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
})(StarsScreen || (StarsScreen = {}));
//# sourceMappingURL=starsScreen.js.map