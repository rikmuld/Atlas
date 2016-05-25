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
    var VERSION = "0.0.49";
    var botText = new TreeMap(STRING_COMPARE);
    var activeText;
    var switchTime;
    var textWelcome;
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
    var OrchestraBot = (function () {
        function OrchestraBot(stickMessage) {
            if (stickMessage) {
                this.message = stickMessage;
            }
            else
                this.message = OrchestraBot_1.BOT_WELCOME;
        }
        OrchestraBot.setup = function () {
            var font = new Font(Font.CONSOLAS, 20).fill(Color.mkColor(245, 245, 245));
            registerBottext(OrchestraBot_1.BOT_WELCOME, "I am Orchestra-Bot and I will be guiding you throught this experience... Hover over elements for information.", font);
            registerBottext(OrchestraBot_1.BOT_STORE, "Welcome to the store! ..*Ahum*..  I'll make a proper text soon!", font);
            registerBottext(OrchestraBot_1.BOT_SPUT, "This little one is Sputnik, he keeps a close wacht over the Earth. My little brother lives there, we should visit some time.", font);
            registerBottext(OrchestraBot_1.BOT_STAR, "How persceptive of you! This is the only stationary star ever discovered. How? Nobody knows...", font);
            registerBottext(OrchestraBot_1.BOT_ICON_WORLD, "In the world view you can see the world, you overall statistics, go to other screens and best of all.. have a nice chat with me, Orchestra-Bot!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_NATION, "In the nation view you can visit you own nation. Did you know you can also view nations of other players? Try clicking the little dots on the world!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_STORE, "In the store you can invest your presious money in new or existing technologies. The more you invest the more the technology develops, it's really existing!", font);
            registerBottext(OrchestraBot_1.BOT_ICON_EXIT, "By clicking this button you will leave ALTAS and head back to Earth. Are you sure you want to leave me.. :'(", font);
            textWelcome = Grix.text("Welcome to ATLAS satalite " + VERSION + "α", font.size(24));
            orchestraBot = Grix.shape().quad(600, 150).setColor(Color.mkAlphaColor(227, 227, 227, 0.05)).populate();
            setActiveBottext(OrchestraBot_1.BOT_WELCOME);
        };
        OrchestraBot.prototype.render = function (delta) {
            orchestraBot.scaleToSize(view.getWidth(), 120);
            orchestraBot.render();
            Plena.forceRender();
            textWelcome.setPivotMove(0.5, 0);
            textWelcome.moveTo(view.getWidth() / 2, 16);
            textWelcome.render();
            botText.apply(activeText).setPivotMove(0.5, 0);
            botText.apply(activeText).moveTo(view.getWidth() / 2, 60);
            botText.apply(activeText).render();
            Plena.forceRender();
        };
        OrchestraBot.prototype.update = function (delta) {
            switchTime += delta;
            if (switchTime > 1500)
                setActiveBottext(this.message);
        };
        return OrchestraBot;
    })();
    OrchestraBot_1.OrchestraBot = OrchestraBot;
})(OrchestraBot || (OrchestraBot = {}));
//# sourceMappingURL=orchestraBot.js.map