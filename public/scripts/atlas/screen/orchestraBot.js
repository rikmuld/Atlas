var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrchestraBot;
(function (OrchestraBot_1) {
    var orchestraBot;
    OrchestraBot_1.NAME = "OrchestraBot";
    OrchestraBot_1.BOT_WELCOME = "welcome";
    OrchestraBot_1.BOT_STORE = "store";
    OrchestraBot_1.BOT_STAR = "star";
    OrchestraBot_1.BOT_SPUT = "sputnik";
    OrchestraBot_1.BOT_ICON_WORLD = "world_ic";
    OrchestraBot_1.BOT_ICON_NATION = "nation_ic";
    OrchestraBot_1.BOT_ICON_STORE = "store_ic";
    OrchestraBot_1.BOT_ICON_EXIT = "exit_ic";
    OrchestraBot_1.BOT_NATION_X = "nation_";
    var VERSION = "0.0.58";
    var botText = new TreeMap(STRING_COMPARE);
    var activeText;
    var switchTime;
    var textWelcome;
    var textWorld;
    var textNation;
    var textStore;
    var textExit;
    var BUTTON_STORE = 2;
    var BUTTON_NATION = 1;
    var BUTTON_WORLD = 0;
    var BUTTON_EXIT = 3;
    function registerBottext(key, text, font) {
        botText.put(key, Grix.text(text, font, Assets.LETTERS, 1000));
        activeText = key;
    }
    OrchestraBot_1.registerBottext = registerBottext;
    function setActiveBottext(key) {
        activeText = key;
        switchTime = 0;
    }
    OrchestraBot_1.setActiveBottext = setActiveBottext;
    var OrchestraBot = (function (_super) {
        __extends(OrchestraBot, _super);
        function OrchestraBot() {
            this.message = OrchestraBot_1.BOT_WELCOME;
            var buttons = [];
            var middleW = vWidth / 2;
            var middleH = vHeight;
            var world = new DockButton(0, Textures.WorldSprite.ICON_WORLD, BUTTON_WORLD, textWorld, OrchestraBot_1.BOT_ICON_WORLD);
            var store = new DockButton(1, Textures.WorldSprite.ICON_STORE, BUTTON_STORE, textStore, OrchestraBot_1.BOT_ICON_STORE);
            var nation = new DockButton(2, Textures.WorldSprite.ICON_NATIO, BUTTON_NATION, textNation, OrchestraBot_1.BOT_ICON_NATION);
            var exit = new DockButton(3, Textures.WorldSprite.ICON_LEAVE, BUTTON_EXIT, textExit, OrchestraBot_1.BOT_ICON_EXIT);
            buttons.push(world);
            buttons.push(store);
            buttons.push(nation);
            buttons.push(exit);
            this.offset = 0;
            this.increaseOffset = 0;
            this.offMul = 1;
            _super.call(this, buttons);
        }
        OrchestraBot.prototype.setStickMessage = function (stick) {
            this.message = stick;
        };
        OrchestraBot.setup = function () {
            var font = Textures.fontSmall;
            registerBottext(OrchestraBot_1.BOT_WELCOME, "I am Orchestra-Bot and I will be guiding you throught this experience... Hover over elements for information.", font);
            registerBottext(OrchestraBot_1.BOT_STORE, "Welcome to the store! ..*Ahum*..  I'll make a proper text soon!", font);
            registerBottext(OrchestraBot_1.BOT_SPUT, "This little one is Sputnik, he keeps a close wacht over the Earth. My little brother lives there, we should visit some time.", font);
            registerBottext(OrchestraBot_1.BOT_STAR, "How persceptive of you! This is the only stationary star ever discovered. How? Nobody knows...", font);
            registerBottext(OrchestraBot_1.BOT_ICON_WORLD, "In the world view you can see the world, you overall statistics, go to other screens and best of all.. have a nice chat with me, Orchestra-Bot!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_NATION, "In the nation view you can visit you own nation. Did you know you can also view nations of other players? Try clicking the little dots on the world!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_STORE, "In the store you can invest your presious money in new or existing technologies. The more you invest the more the technology develops, it's really existing!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_EXIT, "By clicking this button you will leave ALTAS and head back to Earth. Are you sure you want to leave me.. :'(", font);
            textWelcome = Grix.text("Welcome to ATLAS satalite " + VERSION + "α", Textures.fontBig);
            orchestraBot = Grix.shape().quad(600, 150).setColor(Color.mkAlphaColor(227, 227, 227, 0.05)).populate();
            setActiveBottext(OrchestraBot_1.BOT_WELCOME);
            OrchestraBot_1.worldUtils = Grix.fromSprite(Textures.worldSprite);
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
            orchestraBot.scaleToSize(vWidth, 120);
            orchestraBot.render();
            Plena.forceRender();
            textWelcome.setPivotMove(0.5, 0);
            textWelcome.moveTo(vWidth / 2, 16);
            textWelcome.render();
            botText.apply(activeText).setPivotMove(0.5, 0);
            botText.apply(activeText).moveTo(vWidth / 2, 60);
            botText.apply(activeText).render();
            Plena.forceRender();
            OrchestraBot_1.worldUtils.clean();
            OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.DOCK);
            OrchestraBot_1.worldUtils.setPivotMove(0.5, 1);
            OrchestraBot_1.worldUtils.moveTo(vWidth / 2, vHeight);
            OrchestraBot_1.worldUtils.render();
            Plena.forceRender();
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
                            GuiManager.loadScreen(StoreScreen.NAME);
                        }
                    }
                    break;
                case BUTTON_NATION:
                    GuiManager.loadScreen(CityScreen.NAME);
                    break;
                case BUTTON_WORLD:
                    if (current != WorldScreen.NAME) {
                        if (current != CityScreen.NAME) {
                            this.startSlide(true, WorldScreen.NAME);
                        }
                        else {
                            GuiManager.loadScreen(WorldScreen.NAME);
                        }
                    }
                    break;
            }
        };
        OrchestraBot.prototype.update = function (delta) {
            switchTime += delta;
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
            if (this.isMouseOver()) {
                setActiveBottext(this.bot);
                OrchestraBot_1.worldUtils.clean();
                OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.DOCK);
                var dockHeight = OrchestraBot_1.worldUtils.getHeight();
                OrchestraBot_1.worldUtils.activeImg(Textures.WorldSprite.BUBBLE);
                OrchestraBot_1.worldUtils.setPivotMove(0.5, 1);
                OrchestraBot_1.worldUtils.moveTo(vWidth / 2, vHeight - dockHeight - 3);
                OrchestraBot_1.worldUtils.render();
                var height_1 = OrchestraBot_1.worldUtils.getHeight();
                Plena.forceRender();
                this.text.setPivotMove(0.5, 0.5);
                this.text.moveTo(vWidth / 2, vHeight - dockHeight - height_1 / 2 + 3);
                this.text.render();
            }
        };
        return DockButton;
    })(SimpleButton);
})(OrchestraBot || (OrchestraBot = {}));
//# sourceMappingURL=orchestraBot.js.map