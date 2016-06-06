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
    var nationUtits;
    var orchestropia;
    var techs;
    CityScreen_1.NAME = "CityScreen";
    var CityScreen = (function (_super) {
        __extends(CityScreen, _super);
        function CityScreen() {
            _super.call(this, []);
            GuiManager.setHudAlpha(0.25);
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_NATION);
            OrchestraBot.setActiveWelcome(OrchestraBot.PRIM_NATION);
            var golden = 16 / 9;
            if ((vWidth / vHeight) != golden) {
                if ((vWidth / vHeight) > golden)
                    this.bX = vWidth;
                else
                    this.bY = vHeight;
            }
            this.cloudy = 0;
            this.balloon = 0;
            this.cloudies = [];
            for (var i = 0; i < 6; i++) {
                this.cloudies.push(Math.random() * Math.PI * 2);
            }
        }
        CityScreen.setup = function () {
            nationUtits = Grix.fromSprite(Textures.cities);
            background = Grix.fromTexture(Textures.nation);
            orchestropia = Grix.text("Orchestropia", Textures.fontBig);
            techs = Grix.text("most used technologies:", Textures.fontSmall);
        };
        CityScreen.prototype.buttonClicked = function (id) {
        };
        CityScreen.prototype.update = function (delta) {
            this.cloudy += delta * 0.0002;
            this.balloon += delta * 0.00075;
        };
        CityScreen.prototype.balloonX = function () {
            var scale = 10 / (3 - Math.cos(2 * this.balloon));
            return scale * Math.cos(this.balloon);
        };
        CityScreen.prototype.balloonY = function () {
            var scale = 30 / (3 - Math.cos(2 * this.balloon));
            return scale * Math.sin(this.balloon * 2) / 2;
        };
        CityScreen.prototype.render = function (delta) {
            if (this.bY)
                background.scaleHeightToSize(this.bY);
            else if (this.bX)
                background.scaleWidthToSize(this.bX);
            background.setPivotMove(0.5, 0.5);
            background.moveTo(vWidth / 2, vHeight / 2);
            background.render();
            nationUtits.scaleTo(0.5, 0.5);
            nationUtits.activeImg(Textures.NationSprite.CLOUDY);
            for (var i = 0; i < this.cloudies.length / 2; i++) {
                nationUtits.moveTo(vWidth / 2 - 50 + this.cloudyX(i), vHeight / 2 - 220 + this.cloudyY(i));
                nationUtits.render();
            }
            Plena.forceRender();
            nationUtits.scaleTo(0.55, 0.55);
            nationUtits.setPivotMove(0.5, 0);
            nationUtits.activeImg(Textures.NationSprite.CITY_GREEN);
            nationUtits.moveTo(vWidth / 2, vHeight / 2 - 240);
            nationUtits.render();
            Plena.forceRender();
            nationUtits.scaleTo(0.5, 0.5);
            nationUtits.setPivotMove(0.5, 0.5);
            nationUtits.activeImg(Textures.NationSprite.BALLOON);
            nationUtits.moveTo(vWidth / 2 + 200 + this.balloonX(), vHeight / 2 - 225 + this.balloonY());
            nationUtits.render();
            Plena.forceRender();
            var shad = Shader.getShader(Shader.TEXTURE);
            shad.bind();
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 0.175]);
            nationUtits.activeImg(Textures.NationSprite.DOCK);
            nationUtits.setPivotMove(0.5, 0.5);
            nationUtits.scaleTo(0.5, 0.5);
            nationUtits.moveTo(vWidth / 2, vHeight / 2 + 167);
            nationUtits.render();
            Plena.forceRender();
            shad.bind();
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1]);
            nationUtits.scaleTo(0.5, 0.5);
            nationUtits.activeImg(Textures.NationSprite.CLOUDY);
            for (var i = this.cloudies.length / 2; i < this.cloudies.length; i++) {
                nationUtits.moveTo(vWidth / 2 - 50 + this.cloudyX(i), vHeight / 2 - 220 + this.cloudyY(i));
                nationUtits.render();
            }
            Plena.forceRender();
            shad.bind();
            shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1]);
            orchestropia.setPivotMove(0.5, 0.5);
            orchestropia.scaleTo(0.5, 0.5);
            orchestropia.moveTo(vWidth / 2, vHeight / 2 + 60);
            orchestropia.render();
            techs.setPivotMove(0.5, 0.5);
            techs.scaleTo(0.5, 0.5);
            techs.moveTo(vWidth / 2, vHeight / 2 + 90);
            techs.render();
            Plena.forceRender();
            shad.bind();
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1]);
            var x = vWidth / 2 - 240;
            var y = vHeight / 2 + 165;
            for (var i = 0; i < 5; i++) {
                Technologies.renderFiller(x, y, 0.25);
                x += 120;
            }
            Plena.forceRender();
            var mostTech = Technologies.mostUsed(5);
            x = vWidth / 2 - 240;
            for (var _i = 0; _i < mostTech.length; _i++) {
                var tech = mostTech[_i];
                tech.render(x, y, 0.25);
                x += 120;
            }
        };
        CityScreen.prototype.cloudyX = function (cloudy) {
            var scale = 400 / (3 - Math.cos(2 * (this.cloudy + this.cloudies[cloudy])));
            return scale * Math.cos((this.cloudy + this.cloudies[cloudy]));
        };
        CityScreen.prototype.cloudyY = function (cloudy) {
            var scale = 250 / (3 - Math.cos(2 * (this.cloudy + this.cloudies[cloudy])));
            return scale * Math.sin((this.cloudy + this.cloudies[cloudy]) * 3) / 2;
        };
        return CityScreen;
    })(ClickableScreen);
    CityScreen_1.CityScreen = CityScreen;
})(CityScreen || (CityScreen = {}));
//# sourceMappingURL=cityScreen.js.map