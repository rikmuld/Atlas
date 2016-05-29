/*
 * The three screen rules ;)
 *
 * Every screen should be loaded with this and should implement IScreen.
 * Every screen should have a static setup function, this will be called once, the constructor of the screen will be called every time upon loading the screen
 * Every screen should be in its on module named the same in its own file, named whatever you want, also the model should have an export named NAME with the name of the module
 *
 * Look at worldScreen.ts for an example
 * Also note that worldScreen.js needs to be included into atlas.jade
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GuiManager;
(function (GuiManager) {
    var hud;
    var screens = new TreeMap(STRING_COMPARE);
    var currentScreen;
    var screenKey;
    function registerScreen(screenModule) {
        screenModule[screenModule["NAME"]].setup();
        screens.put(screenModule["NAME"], screenModule);
        console.log("Setting up screen: " + screenModule["NAME"]);
    }
    GuiManager.registerScreen = registerScreen;
    function getCurrentScreen() {
        return currentScreen;
    }
    GuiManager.getCurrentScreen = getCurrentScreen;
    function getCurrentScreenName() {
        return screenKey;
    }
    GuiManager.getCurrentScreenName = getCurrentScreenName;
    function loadScreen(key) {
        console.log("Loading screen: " + key);
        currentScreen = new (screens.apply(key))[key]();
        screenKey = key;
        return currentScreen;
    }
    GuiManager.loadScreen = loadScreen;
    function update(delta) {
        setCursor("default");
        if (resized) {
            loadScreen(screenKey);
            newHud();
        }
        else if (!hud)
            newHud();
        else {
            currentScreen.update(delta);
            hud.update(delta);
        }
    }
    GuiManager.update = update;
    function getHUD() {
        if (!hud)
            newHud();
        return hud;
    }
    GuiManager.getHUD = getHUD;
    function newHud() {
        hud = new OrchestraBot.OrchestraBot();
    }
    function render(delta) {
        currentScreen.render(delta);
        hud.render(delta);
    }
    GuiManager.render = render;
})(GuiManager || (GuiManager = {}));
var ClickableScreen = (function () {
    function ClickableScreen(buttons) {
        this.buttons = buttons;
        this.clickOpen = false;
    }
    ClickableScreen.prototype.render = function (delta) {
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            button.render(delta);
        }
    };
    ClickableScreen.prototype.update = function (delta) {
        var mouseX = vmx;
        var mouseY = vmy;
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            button.update(mouseX, mouseY, delta);
        }
        if (Mouse.isDown(Mouse.LEFT) && this.clickOpen) {
            this.clickOpen = false;
            this.clicked(mouseX, mouseY);
        }
        else if (!Mouse.isDown(Mouse.LEFT))
            this.clickOpen = true;
    };
    ClickableScreen.prototype.clicked = function (x, y) {
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            if (button.click(x, y))
                this.buttonClicked(button.id);
        }
    };
    return ClickableScreen;
})();
var SimpleButton = (function () {
    function SimpleButton(x, y, width, height, id) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    }
    SimpleButton.prototype.click = function (x, y) {
        return this.hover;
    };
    SimpleButton.prototype.isInBox = function (x, y) {
        return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
    };
    SimpleButton.prototype.isMouseOver = function () {
        return this.hover;
    };
    SimpleButton.prototype.update = function (x, y, delta) {
        this.hover = this.isInBox(x, y);
        if (this.hover)
            setCursor("pointer");
    };
    return SimpleButton;
})();
var FillerButton = (function (_super) {
    __extends(FillerButton, _super);
    function FillerButton(x, y, width, height, id) {
        _super.call(this, x, y, width, height, id);
        if (FillerButton.circle == null)
            FillerButton.circle = Grix.shape().circle(100).drawmode(gl.TRIANGLE_FAN).setColor(Color.Blue.BLUE_MIDNIGHT).populate();
    }
    FillerButton.prototype.render = function (delta) {
        var draw = FillerButton.circle;
        draw.clean();
        draw.moveTo(this.x, this.y);
        draw.scaleToSize(this.width, this.height);
        if (this.isMouseOver())
            draw.setColor(Color.Blue.BLUE_MEDIUM);
        draw.render();
    };
    return FillerButton;
})(SimpleButton);
function inCircularRange(centerX, centerY, range) {
    var dx = Math.pow((vmx - centerX), 2);
    var dy = Math.pow((vmy - centerY), 2);
    return (Math.sqrt(dx + dy) <= range);
}
//# sourceMappingURL=screen.js.map