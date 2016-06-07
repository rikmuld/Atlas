var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrchestraBot;
(function (OrchestraBot_1) {
    var orchestraBot;
    OrchestraBot_1.NAME = "OrchestraBot";
    OrchestraBot_1.PRIM_SATALITE = "wel_sat";
    OrchestraBot_1.PRIM_STORE = "wel_store";
    OrchestraBot_1.PRIM_NATION = "wel_nat";
    OrchestraBot_1.BOT_WELCOME = "welcome";
    OrchestraBot_1.BOT_STORE = "store";
    OrchestraBot_1.BOT_NATION = "nation";
    OrchestraBot_1.BOT_STAR = "star";
    OrchestraBot_1.BOT_SPUT = "sputnik";
    OrchestraBot_1.BOT_ICON_WORLD = "world_ic";
    OrchestraBot_1.BOT_ICON_NATION = "nation_ic";
    OrchestraBot_1.BOT_ICON_STORE = "store_ic";
    OrchestraBot_1.BOT_ICON_EXIT = "exit_ic";
    OrchestraBot_1.BOT_NATION_X = "nation_";
    OrchestraBot_1.BOT_NAT_SUN_M = "sunm";
    OrchestraBot_1.BOT_NAT_SUN_L = "sunl";
    OrchestraBot_1.BOT_NAT_WIND_M = "windm";
    OrchestraBot_1.BOT_NAT_WIND_L = "windl";
    OrchestraBot_1.BOT_NAT_FERT_M = "fertm";
    OrchestraBot_1.BOT_NAT_FERT_L = "fertl";
    OrchestraBot_1.BOT_NAT_SIZE = "size";
    OrchestraBot_1.BOT_NAT_TAX = "tax";
    OrchestraBot_1.BOT_NAT_COAL = "coal";
    OrchestraBot_1.BOT_NAT_ENERGY = "energy";
    OrchestraBot_1.BOT_NAT_NATURAL = "natural";
    OrchestraBot_1.BOT_NAT_TERRAIN = "terrain";
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var VERSION = "0.0.72";
    var botText = new TreeMap(STRING_COMPARE);
    var activeText;
    var activeWelcome;
    var switchTime;
    var textWorld;
    var textNation;
    var textStore;
    var textExit;
    var timeout = 0;
    var BUTTON_STORE = 2;
    var BUTTON_NATION = 1;
    var BUTTON_WORLD = 0;
    var BUTTON_EXIT = 3;
    var BUTTON_STATS_HAP = 4;
    var BUTTON_STATS_RESOUR = 5;
    var BUTTON_STATS_TEMP = 6;
    var BUTTON_STATS_POLU = 7;
    var BUTTON_STATS_POP = 8;
    var color = Color.mkColor(227, 227, 227);
    function registerBottext(key, text, font, prim) {
        if (prim === void 0) { prim = false; }
        botText.put(key, Grix.text(text, font, Assets.LETTERS, prim ? -1 : Math.min(2000, vWidth * 1.9)));
        activeText = key;
    }
    OrchestraBot_1.registerBottext = registerBottext;
    function setActiveWelcome(key) {
        activeWelcome = key;
    }
    OrchestraBot_1.setActiveWelcome = setActiveWelcome;
    function setActiveBottext(key) {
        if (timeout <= 0) {
            activeText = key;
            switchTime = 0;
        }
    }
    OrchestraBot_1.setActiveBottext = setActiveBottext;
    var OrchestraBot = (function (_super) {
        __extends(OrchestraBot, _super);
        function OrchestraBot() {
            this.message = OrchestraBot_1.BOT_WELCOME;
            var buttons = [];
            var middleW = vWidth / 2;
            var middleH = vHeight;
            var tex = Textures.WorldSprite;
            var world = new DockButton(0, tex.ICON_WORLD, BUTTON_WORLD, textWorld, OrchestraBot_1.BOT_ICON_WORLD);
            var store = new DockButton(1, tex.ICON_STORE, BUTTON_STORE, textStore, OrchestraBot_1.BOT_ICON_STORE);
            var nation = new DockButton(2, tex.ICON_NATIO, BUTTON_NATION, textNation, OrchestraBot_1.BOT_ICON_NATION);
            var exit = new DockButton(3, tex.ICON_LEAVE, BUTTON_EXIT, textExit, OrchestraBot_1.BOT_ICON_EXIT);
            var hap = new StatsButton(0, tex.ICON_HAP, BUTTON_STATS_HAP);
            var res = new StatsButton(1, tex.ICON_RES, BUTTON_STATS_RESOUR);
            var temp = new StatsButton(2, tex.ICON_TEM, BUTTON_STATS_TEMP);
            var pop = new StatsButton(3, tex.ICON_POP, BUTTON_STATS_POP);
            var pol = new StatsButton(4, tex.ICON_CO2, BUTTON_STATS_POLU);
            buttons.push(world);
            buttons.push(store);
            buttons.push(nation);
            buttons.push(exit);
            buttons.push(hap);
            buttons.push(res);
            buttons.push(temp);
            buttons.push(pop);
            buttons.push(pol);
            this.offset = 0;
            this.increaseOffset = 0;
            this.offMul = 1;
            _super.call(this, buttons);
        }
        OrchestraBot.prototype.setStickMessage = function (stick) {
            this.message = stick;
            timeout = 1;
        };
        OrchestraBot.setup = function () {
            var font = Textures.fontSmall;
            registerBottext(OrchestraBot_1.BOT_WELCOME, "I am Orchestra-Bot and I will be guiding you throught this experience... Hover over elements for information.", font);
            registerBottext(OrchestraBot_1.BOT_STORE, "Here you can invest your presious money in new or existing technologies. The more you invest the more the technology develops, it's really exciting!", font);
            registerBottext(OrchestraBot_1.BOT_NATION, "This is your very own nation! You can see all your nation related statistics here.", font);
            registerBottext(OrchestraBot_1.BOT_SPUT, "This little one is Sputnik, he keeps a close wacht over the Earth. My little brother lives there, we should visit some time.", font);
            registerBottext(OrchestraBot_1.BOT_STAR, "How persceptive of you! This is the only stationary star ever discovered. How? Nobody knows...", font);
            registerBottext(OrchestraBot_1.BOT_ICON_WORLD, "In the world view you can see the world, you overall statistics, go to other screens and best of all.. have a nice chat with me, Orchestra-Bot!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_NATION, "In the nation view you can visit you own nation. Did you know you can also view nations of other players? Try clicking the little dots on the world!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_STORE, "In the store you can invest your presious money in new or existing technologies. The more you invest the more the technology develops, it's really exciting!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_EXIT, "By clicking this button you will leave ALTAS and head back to Earth. Are you sure you want to leave me.. :'(", font);
            registerBottext(OrchestraBot_1.PRIM_SATALITE, "Welcome to ATLAS satalite " + VERSION + "α", Textures.fontBig, true);
            registerBottext(OrchestraBot_1.PRIM_STORE, "Welcome to St.Ores Store! Less for more~!!", Textures.fontBig, true);
            registerBottext(OrchestraBot_1.PRIM_NATION, "Orchestropia, a titan amongst nations.", Textures.fontBig, true);
            orchestraBot = Grix.shape().quad(600, 150).setColor(new AColor(color, 0.05)).populate();
            setActiveBottext(OrchestraBot_1.BOT_WELCOME);
            setActiveWelcome(OrchestraBot_1.PRIM_SATALITE);
            OrchestraBot_1.worldUtils = Grix.fromSprite(Textures.worldSprite);
            OrchestraBot_1.freeText = Grix.fromFontMap(Textures.fontMapSmall);
            font = Textures.fontBig;
            textWorld = Grix.text("World View", font);
            textNation = Grix.text("Nation View", font);
            textStore = Grix.text("Visit Store", font);
            textExit = Grix.text("Exit Game", font);
        };
        OrchestraBot.prototype.getRenderOffset = function () {
            return this.offset * this.offMul;
        };
        OrchestraBot.prototype.render = function (delta) {
            if (GuiManager.getHudAlpha())
                orchestraBot.setColor(new AColor(color, 0.2 + GuiManager.getHudAlpha()));
            orchestraBot.scaleToSize(vWidth, 120);
            orchestraBot.render();
            var alpha = GuiManager.getHudAlpha();
            var shad = Shader.getShader(Shader.TEXTURE);
            Plena.forceRender();
            if (alpha) {
                shad.bind();
                shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, alpha / (0.05)]);
            }
            OrchestraBot_1.worldUtils.clean();
            OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.DOCK);
            OrchestraBot_1.worldUtils.setPivotMove(0.5, 1);
            OrchestraBot_1.worldUtils.moveTo(vWidth / 2, vHeight);
            OrchestraBot_1.worldUtils.render();
            OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.DOCK_SIDE);
            OrchestraBot_1.worldUtils.setPivotMove(0, 1);
            OrchestraBot_1.worldUtils.moveTo(0, vHeight);
            OrchestraBot_1.worldUtils.render();
            OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.DOCK_SIDER);
            OrchestraBot_1.worldUtils.setPivotMove(1, 1);
            OrchestraBot_1.worldUtils.moveTo(vWidth, vHeight);
            OrchestraBot_1.worldUtils.render();
            Plena.forceRender();
            if (alpha) {
                shad.bind();
                shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1]);
            }
            botText.apply(activeWelcome).scaleTo(0.5, 0.5);
            botText.apply(activeWelcome).setPivotMove(0.5, 0);
            botText.apply(activeWelcome).moveTo(vWidth / 2, 16);
            botText.apply(activeWelcome).render();
            botText.apply(activeText).scaleTo(0.5, 0.5);
            botText.apply(activeText).setPivotMove(0.5, 0);
            botText.apply(activeText).moveTo(vWidth / 2, 60);
            botText.apply(activeText).render();
            if (World.ready()) {
                var time = World.getTime();
                var timeMonth = Math.floor((time - Math.floor(time)) * 12);
                var timeText = (2016 + time).toFixed(0) + " " + MONTHS[timeMonth];
                var moneyText = "$" + (Nation.getData().money / 1000000000).toFixed(0) + " Bilion";
                var ww = OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.DOCK_SIDER).getWidth();
                OrchestraBot_1.freeText.scaleTo(0.5, 0.5);
                OrchestraBot_1.freeText.moveTo(vWidth - ww / 2 - OrchestraBot_1.freeText.length(moneyText) / 2, vHeight - 45);
                OrchestraBot_1.freeText.freeText(moneyText);
                OrchestraBot_1.freeText.moveTo(vWidth - ww / 2 - OrchestraBot_1.freeText.length(timeText) / 2, vHeight - 75);
                OrchestraBot_1.freeText.freeText(timeText);
                OrchestraBot_1.freeText.moveTo(200, 200);
            }
            Plena.forceRender();
            if (alpha) {
                shad.bind();
                shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1]);
            }
            _super.prototype.render.call(this, delta);
        };
        OrchestraBot.prototype.startSlide = function (right, nextScreen) {
            if (this.offMul)
                this.nextScreen = nextScreen;
            this.increaseOffset = 3;
            this.offMul = right ? -1 : 1;
        };
        OrchestraBot.prototype.buttonClicked = function (id) {
            if (this.offset != 0)
                return;
            var current = GuiManager.getCurrentScreenName();
            switch (id) {
                case BUTTON_STORE:
                    if (current != StoreScreen.NAME) {
                        if (current != CityScreen.NAME) {
                            this.startSlide(current != WorldScreen.NAME, StoreScreen.NAME);
                        }
                        else {
                            $('canvas').fadeOut(200, function () {
                                GuiManager.loadScreen(StoreScreen.NAME);
                                $('canvas').fadeIn(200);
                            });
                        }
                    }
                    break;
                case BUTTON_NATION:
                    if (current != CityScreen.NAME) {
                        $('canvas').fadeOut(200, function () {
                            GuiManager.loadScreen(CityScreen.NAME);
                            $('canvas').fadeIn(200);
                        });
                    }
                    break;
                case BUTTON_WORLD:
                    if (current != WorldScreen.NAME) {
                        if (current != CityScreen.NAME) {
                            this.startSlide(true, WorldScreen.NAME);
                        }
                        else {
                            $('canvas').fadeOut(200, function () {
                                GuiManager.loadScreen(WorldScreen.NAME);
                                $('canvas').fadeIn(200);
                            });
                        }
                    }
                    break;
            }
        };
        OrchestraBot.prototype.update = function (delta) {
            switchTime += delta;
            if (timeout > 0)
                timeout -= 1;
            if (this.nextScreen) {
                this.offset += this.increaseOffset * delta;
                if (this.offset > (vWidth / 2) + 500) {
                    GuiManager.loadScreen(this.nextScreen);
                    this.nextScreen = null;
                    this.offMul = -this.offMul;
                }
            }
            else if (this.offset != 0) {
                this.offset -= this.increaseOffset * delta;
                if (this.offset <= 0) {
                    this.offset = 0;
                    this.increaseOffset = 0;
                }
            }
            if (switchTime > 1500)
                setActiveBottext(this.message);
            _super.prototype.update.call(this, delta);
        };
        return OrchestraBot;
    })(ClickableScreen);
    OrchestraBot_1.OrchestraBot = OrchestraBot;
    var StatsButton = (function (_super) {
        __extends(StatsButton, _super);
        function StatsButton(index, icon, id) {
            _super.call(this, 28, vHeight - 55 - (index) * 72, 32, 32, id);
            this.icon = icon;
        }
        StatsButton.prototype.render = function (delta) {
            OrchestraBot_1.worldUtils.clean();
            OrchestraBot_1.worldUtils.activeImg(this.icon);
            OrchestraBot_1.worldUtils.scaleToSize(this.width, this.height);
            OrchestraBot_1.worldUtils.moveTo(this.x, this.y);
            OrchestraBot_1.worldUtils.render();
            Plena.forceRender();
        };
        return StatsButton;
    })(SimpleButton);
    var DockButton = (function (_super) {
        __extends(DockButton, _super);
        function DockButton(index, icon, id, text, bot) {
            var middleW = vWidth / 2;
            var middleH = vHeight;
            _super.call(this, middleW - 203 + index * 101, middleH - 95, 100, 100, id);
            this.icon = icon;
            this.text = text;
            this.bot = bot;
        }
        DockButton.prototype.render = function (delta) {
            Plena.forceRender();
            OrchestraBot_1.worldUtils.clean();
            OrchestraBot_1.worldUtils.activeImg(this.icon);
            OrchestraBot_1.worldUtils.scaleToSize(this.width, this.height);
            OrchestraBot_1.worldUtils.moveTo(this.x, this.y);
            OrchestraBot_1.worldUtils.render();
            Plena.forceRender();
            if (this.isMouseOver()) {
                setActiveBottext(this.bot);
                OrchestraBot_1.worldUtils.clean();
                OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.DOCK);
                var dockHeight = OrchestraBot_1.worldUtils.getHeight();
                var alpha = GuiManager.getHudAlpha();
                var shad = Shader.getShader(Shader.TEXTURE);
                if (alpha) {
                    shad.bind();
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, alpha / (0.05)]);
                }
                OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.BUBBLE);
                OrchestraBot_1.worldUtils.setPivotMove(0.5, 1);
                OrchestraBot_1.worldUtils.moveTo(vWidth / 2, vHeight - dockHeight - 8);
                OrchestraBot_1.worldUtils.render();
                var height_1 = OrchestraBot_1.worldUtils.getHeight();
                Plena.forceRender();
                if (alpha) {
                    shad.bind();
                    shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1]);
                }
                this.text.setPivotMove(0.5, 0.5);
                this.text.scaleTo(0.5, 0.5);
                this.text.moveTo(vWidth / 2, vHeight - dockHeight - height_1 / 2 + 3);
                this.text.render();
                Plena.forceRender();
                if (alpha) {
                    shad.bind();
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1]);
                }
            }
        };
        return DockButton;
    })(SimpleButton);
})(OrchestraBot || (OrchestraBot = {}));
//# sourceMappingURL=orchestraBot.js.map