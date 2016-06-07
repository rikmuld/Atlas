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
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_SUN_M, "This is the percentage of sun hours a day. Your nations has more than the average which is benifitial for solar panels.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_SUN_L, "This is the percentage of sun hours a day. Your nations has less than the average, solar panels will be a bit less efficient.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_WIND_M, "This is the average wind speed of your nation. Your nations has more than the average, wind turbines will be more efficient.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_WIND_L, "This is the average wind speed of your nation. Your nations has less than the average, wind turbines will generate less energy.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_SIZE, "This is the total surface area of your nation.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_FERT_M, "This is the fertility of your nation, or in other words the land quality. A high fertility (>100%) means that you need less energy to sustain a population.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_FERT_L, "This is the fertility of your nation, or in other words the land quality. A low fertility (<100%) means that you will need more energy to sustain a population.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_TAX, "This is the tax money you will receive per year, you can spend about 3% of this on scientific research. This vereys based on the happieness and fertility of your nation.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_COAL, "This is the amount of fossil fuels left in the ground, the lower it becomes to more expensive mining will be. Researching mining will improve this.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_NATURAL, "This is the amount of materials such as metals left in the ground, this feature however, is not implemented yet.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_ENERGY, "This is the percentage of energy that your nation uses which comes from clean energy sources.", Textures.fontSmall);
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_TERRAIN, "This are the terrain types of your nations. Some technologies work better in certain types of terrain, some may also require a specific type.", Textures.fontSmall);
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
            var y = vHeight / 2 + 160;
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
            var tex = Textures.NationSprite;
            var icons = [tex.IC_SUN, tex.IC_WIND, tex.IC_SIZE, tex.IC_FERTILE,
                tex.IC_MONEY, tex.IC_COAL, tex.IC_ENERGY, tex.IC_NATURAL,
                tex.IC_MOUNT];
            x = -237;
            for (var _a = 0; _a < icons.length; _a++) {
                var ic = icons[_a];
                nationUtits.activeImg(ic);
                nationUtits.scaleTo(0.25, 0.25);
                nationUtits.setPivotMove(0.5, 0.5);
                nationUtits.moveTo(vWidth / 2 + x, vHeight / 2 + 250);
                nationUtits.render();
                x += 60;
            }
            Plena.forceRender();
            shad.bind();
            shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1]);
            x = -237;
            for (var _b = 0; _b < icons.length; _b++) {
                var ic = icons[_b];
                if (inCircularRange(vWidth / 2 + x, vHeight / 2 + 250, 16)) {
                    OrchestraBot.freeText.scaleTo(0.5, 0.5);
                    OrchestraBot.freeText.moveTo(vWidth / 2, vHeight / 2 + 285);
                    var text = "";
                    switch (ic) {
                        case tex.IC_SUN:
                            var sun = Nation.getData().landType.sunny;
                            text = "Sunny: " + sun.toFixed(0) + "%";
                            OrchestraBot.setActiveBottext(sun >= Model.NationDefaults.SUNNY ? OrchestraBot.BOT_NAT_SUN_M : OrchestraBot.BOT_NAT_SUN_L);
                            break;
                        case tex.IC_WIND:
                            var windy = Nation.getData().landType.windy;
                            text = "Windy: " + windy.toFixed(0) + " km/h";
                            OrchestraBot.setActiveBottext(windy >= Model.NationDefaults.WINDY ? OrchestraBot.BOT_NAT_WIND_M : OrchestraBot.BOT_NAT_WIND_L);
                            break;
                        case tex.IC_SIZE:
                            text = "Size: " + (Nation.getData().landType.size / 1000).toFixed(0) + " Thousand km²";
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_SIZE);
                            break;
                        case tex.IC_FERTILE:
                            var fertil = Nation.getData().landType.fertile;
                            text = "Fertile: " + Nation.getData().landType.fertile.toFixed(0) + "%";
                            OrchestraBot.setActiveBottext(fertil >= Model.NationDefaults.FERTILE ? OrchestraBot.BOT_NAT_FERT_M : OrchestraBot.BOT_NAT_FERT_L);
                            break;
                        case tex.IC_MONEY:
                            text = "Tax: $" + (Model.Nation.tax(1, Nation.getData(), World.getWorld()) / 1000000000).toFixed(0) + " Bilion per year";
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_TAX);
                            break;
                        case tex.IC_COAL:
                            text = "Fossil Fuels: " + (Nation.getData().landType.resourcesEDensity / 1000).toFixed(0) + " MWh/km²";
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_COAL);
                            break;
                        case tex.IC_ENERGY:
                            text = "Clean Energy: 0%";
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_ENERGY);
                            break;
                        case tex.IC_NATURAL:
                            text = "Materials: ...";
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_NATURAL);
                            break;
                        case tex.IC_MOUNT:
                            var types = Nation.getData().landType.terrain;
                            text = "Terrain types: ";
                            for (var type = 0; type < types.length; type++) {
                                text += Model.TERRAIN[types[type]] + (type + 1 == types.length ? "" : (type + 1 == types.length - 1 ? " and " : ", "));
                            }
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_TERRAIN);
                            break;
                    }
                    var w = OrchestraBot.freeText.length(text);
                    OrchestraBot.freeText.move(-w / 2, 0);
                    OrchestraBot.freeText.freeText(text);
                }
                x += 60;
            }
            Plena.forceRender();
            shad.bind();
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1]);
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