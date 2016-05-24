/**
 * Mouse helper functions
 */
//context disable add
var Mouse;
(function (Mouse) {
    var pressCalls = new DeepTreeMap(NUMBER_COMPARE);
    var releaseCalls = new DeepTreeMap(NUMBER_COMPARE);
    var browserControl = true;
    /**
     * Button code
     */
    Mouse.LEFT = 0, Mouse.RIGHT = 1, Mouse.MIDDLE = 2;
    var mouseX;
    var mouseY;
    var buttons = [];
    /**
     * Enable the default listners, is needed for a lot of other Mouse functionality
     */
    function enable() {
        document.body.onmouseup = mouseUp;
        document.body.onmousedown = mouseDown;
        document.onmousemove = mouseMoved;
    }
    Mouse.enable = enable;
    /**
     * Register custom mouse moved listners
     *
     * @param mouseMoved move moved listner, will be triggerd when the mouse position has changed
     */
    function customListenPos(mouseMoved) {
        document.onmousemove = mouseMoved;
    }
    Mouse.customListenPos = customListenPos;
    /**
     * Register custom button listners
     *
     * Note that you can also register them with addPressedEvent and addReleasedEvent,
     * listners registerd by those will be triggerd by the default button listner. Specific keys
     * for those events can be specified.
     *
     * @param mouseDown mouse button down listner, will be triggered when a button is pressed (will be fired
     * repeadidly until released [in contrast to listners registerd with addPressedEvent])
     * @param mouseUp mouse button up listner, will be triggerd when a button is released (firied once)
     */
    function customListen(mouseDown, mouseUp) {
        document.body.onmouseup = mouseUp;
        document.body.onmousedown = mouseDown;
    }
    Mouse.customListen = customListen;
    function mouseMoved(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    function mouseUp(event) {
        var button = event.button;
        setButton(button, false);
        triggerButtons(releaseCalls, button, event);
    }
    function mouseDown(event) {
        var button = event.button;
        if (!isDown(button)) {
            triggerButtons(pressCalls, button, event);
        }
        setButton(button, true);
    }
    function setButton(button, value) {
        buttons[button] = value;
    }
    /**
     * Hide the mouse cursor
     */
    function hide() {
        document.body.style.cursor = "none";
    }
    Mouse.hide = hide;
    /**
     * Show the mouse cursor
     */
    function show() {
        document.body.style.cursor = "auto";
    }
    Mouse.show = show;
    /**
     * Get the current x position of the mouse
     */
    function getX(view) {
        return view.mapX(mouseX, true);
    }
    Mouse.getX = getX;
    /**
     * Get the current y position of the mouse
     */
    function getY(view) {
        return view.mapY(mouseY, true);
    }
    Mouse.getY = getY;
    /**
     * Get the current x position of the mouse in pixels (entire browser screen, not the canvas)
     */
    function getScreenX() {
        return mouseX;
    }
    Mouse.getScreenX = getScreenX;
    /**
     * Get the current y position of the mouse in pixels (entire browser screen, not the canvas)
     */
    function getScreenY() {
        return mouseY;
    }
    Mouse.getScreenY = getScreenY;
    /**
     * Check if a button is currently pressed
     *
     * @param button button code
     */
    function isDown(button) {
        return buttons[button];
    }
    Mouse.isDown = isDown;
    /**
     * Set availability of all default button controlls in the browser
     *
     * @param allow whather or not the browser key controlls will be triggered
     */
    function browserControll(allow) {
        browserControl = allow;
    }
    Mouse.browserControll = browserControll;
    function triggerButtons(collection, button, event) {
        if (collection.contains(button)) {
            var calls = collection.itterator(button);
            for (var _i = 0; _i < calls.length; _i++) {
                var call = calls[_i];
                call(event);
            }
        }
        var calls2 = collection.itterator(-1);
        for (var _a = 0; _a < calls2.length; _a++) {
            var call = calls2[_a];
            call(event);
        }
    }
    /**
     * Add an event for when a button is released
     *
     * @param callback callback triggered when a button is released
     * @param keys the buttons that will trigger the callback, no buttons means any button will be a trigger
     */
    function addReleasedEvent(callback) {
        var buttons = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            buttons[_i - 1] = arguments[_i];
        }
        addEvent(releaseCalls, callback, buttons);
    }
    Mouse.addReleasedEvent = addReleasedEvent;
    /**
     * Add an event for when a button is pressed (will only fire once when the key is pressed)
     *
     * @param callback callback triggered when a button is pressed
     * @param keys the buttons that will trigger the callback, no buttons means any button will be a trigger
     */
    function addPressedEvent(callback) {
        var buttons = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            buttons[_i - 1] = arguments[_i];
        }
        addEvent(pressCalls, callback, buttons);
    }
    Mouse.addPressedEvent = addPressedEvent;
    function addEvent(collection, callback, buttons) {
        if (buttons.length == 0)
            collection.put(-1, callback);
        else
            for (var _i = 0; _i < buttons.length; _i++) {
                var button = buttons[_i];
                collection.put(button, callback);
            }
    }
})(Mouse || (Mouse = {}));
/**
 * Keyboard helper functions
 */
var Keyboard;
(function (Keyboard) {
    var keys = [];
    var pressCalls = new DeepTreeMap(NUMBER_COMPARE);
    var releaseCalls = new DeepTreeMap(NUMBER_COMPARE);
    var browserControl = true;
    /**
     * ASCII key code
     */
    Keyboard.KEY_BACKSPACE = 8, Keyboard.KEY_TAB = 9, Keyboard.KEY_ENTER = 13, Keyboard.KEY_SHIFT = 16, Keyboard.KEY_CTRL = 17, Keyboard.KEY_ALT = 18, Keyboard.KEY_BREAK = 19, Keyboard.KEY_CAPS_LOCK = 20, Keyboard.KEY_ESCAPE = 27, Keyboard.KEY_SPACE = 32, Keyboard.KEY_PAGE_UP = 33, Keyboard.KEY_PAGE_DOWN = 34, Keyboard.KEY_END = 35, Keyboard.KEY_HOME = 36, Keyboard.KEY_LEFT = 37, Keyboard.KEY_UP = 38, Keyboard.KEY_RIGHT = 39, Keyboard.KEY_DOWN = 40, Keyboard.KEY_INSERT = 45, Keyboard.KEY_DELETE = 46, Keyboard.KEY_0 = 48, Keyboard.KEY_1 = 49, Keyboard.KEY_2 = 50, Keyboard.KEY_3 = 51, Keyboard.KEY_4 = 52, Keyboard.KEY_5 = 53, Keyboard.KEY_6 = 54, Keyboard.KEY_7 = 55, Keyboard.KEY_8 = 56, Keyboard.KEY_9 = 57, Keyboard.KEY_A = 65, Keyboard.KEY_B = 66, Keyboard.KEY_C = 67, Keyboard.KEY_D = 68, Keyboard.KEY_E = 69, Keyboard.KEY_F = 70, Keyboard.KEY_G = 71, Keyboard.KEY_H = 72, Keyboard.KEY_I = 73, Keyboard.KEY_J = 74, Keyboard.KEY_K = 75, Keyboard.KEY_L = 76, Keyboard.KEY_M = 77, Keyboard.KEY_N = 78, Keyboard.KEY_O = 79, Keyboard.KEY_P = 80, Keyboard.KEY_Q = 81, Keyboard.KEY_R = 82, Keyboard.KEY_S = 83, Keyboard.KEY_T = 84, Keyboard.KEY_U = 85, Keyboard.KEY_V = 86, Keyboard.KEY_W = 87, Keyboard.KEY_X = 88, Keyboard.KEY_Y = 89, Keyboard.KEY_Z = 90, Keyboard.KEY_WINDOWS_LEFT = 91, Keyboard.KEY_WINDOWS_RIGHT = 92, Keyboard.KEY_SELECT = 93, Keyboard.KEY_NUMPAD_0 = 96, Keyboard.KEY_NUMPAD_1 = 97, Keyboard.KEY_NUMPAD_2 = 98, Keyboard.KEY_NUMPAD_3 = 99, Keyboard.KEY_NUMPAD_4 = 100, Keyboard.KEY_NUMPAD_5 = 101, Keyboard.KEY_NUMPAD_6 = 102, Keyboard.KEY_NUMPAD_7 = 103, Keyboard.KEY_NUMPAD_8 = 104, Keyboard.KEY_NUMPAD_9 = 105, Keyboard.KEY_MULTIPLY = 106, Keyboard.KEY_ADD = 107, Keyboard.KEY_SUBSTRACT = 108, Keyboard.KEY_POINT = 109, Keyboard.KEY_DECIMAL_POINT = 110, Keyboard.DEVIDE = 111, Keyboard.KEY_F1 = 112, Keyboard.KEY_F2 = 113, Keyboard.KEY_F3 = 114, Keyboard.KEY_F4 = 115, Keyboard.KEY_F5 = 116, Keyboard.KEY_F6 = 117, Keyboard.KEY_F7 = 118, Keyboard.KEY_F8 = 119, Keyboard.KEY_F9 = 120, Keyboard.KEY_F10 = 121, Keyboard.KEY_F11 = 122, Keyboard.KEY_F12 = 123, Keyboard.KEY_NUM_LOCK = 144, Keyboard.KEY_SCROLL_LOCK = 145, Keyboard.KEY_SEMI_COLON = 186, Keyboard.KEY_EQUAL_SIGN = 187, Keyboard.KEY_COMMA = 188, Keyboard.KEY_DASH = 189, Keyboard.KEY_PERIOD = 190, Keyboard.KEY_SLASH_FORWARD = 191, Keyboard.KEY_GRAVE_ACCENT = 192, Keyboard.KEY_BRACKET_OPEN = 219, Keyboard.KEY_SLASH_BACK = 220, Keyboard.KEY_BRACKET_CLOSE = 221, Keyboard.KEY_QUOTE_SINGLE = 222;
    /**
     * Register custom key listners
     *
     * Note that you can also register them with addPressedEvent and addReleasedEvent,
     * listners registerd by those will be triggerd by the default key listner. Specific keys
     * for those events can be specified.
     *
     * @param keyDown key down listner, will be triggered when a key is pressed (will be fired
     * repeadidly until released [in contract to listners registerd with addPressedEvent])
     * @param keyUp key up listner, will be triggerd when a key is released (firied once)
     */
    function customListen(keyDown, keyUp) {
        document.onkeydown = keyDown;
        document.onkeyup = keyUp;
    }
    Keyboard.customListen = customListen;
    /**
     * Set availability of all default key controlls in the browser (e.g. backspace trigger back)
     *
     * @param allow whather or not the browser key controlls will be triggered
     */
    function browserControll(allow) {
        browserControl = allow;
    }
    Keyboard.browserControll = browserControll;
    /**
     * Enable the default key listners, is needed for use of every other Keyboard functionality
     */
    function enable() {
        customListen(keyDown, keyUp);
    }
    Keyboard.enable = enable;
    function keyDown(event) {
        var key = event.keyCode;
        if (!isDown(key)) {
            triggerKeys(pressCalls, key, event);
        }
        setKey(key, true);
        return browserControl;
    }
    function keyUp(event) {
        var key = event.keyCode;
        setKey(key, false);
        triggerKeys(releaseCalls, key, event);
    }
    function triggerKeys(collection, key, event) {
        if (collection.contains(key)) {
            var calls = collection.itterator(key);
            for (var _i = 0; _i < calls.length; _i++) {
                var call = calls[_i];
                call(event);
            }
        }
        var calls2 = collection.itterator(-1);
        for (var _a = 0; _a < calls2.length; _a++) {
            var call = calls2[_a];
            call(event);
        }
    }
    /**
     * Check if a key is currently pressed
     *
     * @param key ASCII key code of the key
     */
    function isDown(key) {
        return keys[key];
    }
    Keyboard.isDown = isDown;
    function setKey(key, value) {
        keys[key] = value;
    }
    /**
     * Add an event for when a key is released
     *
     * @param callback callback triggered when a key is released
     * @param keys the keys that will trigger the callback, no keys means any key will be a trigger
     */
    function addReleasedEvent(callback) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        addEvent(releaseCalls, callback, keys);
    }
    Keyboard.addReleasedEvent = addReleasedEvent;
    /**
     * Add an event for when a key is pressed (will only fire once when the key is pressed)
     *
     * @param callback callback triggered when a key is pressed
     * @param keys the keys that will trigger the callback, no keys means any key will be a trigger
     */
    function addPressedEvent(callback) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        addEvent(pressCalls, callback, keys);
    }
    Keyboard.addPressedEvent = addPressedEvent;
    function addEvent(collection, callback, keys) {
        if (keys.length == 0)
            collection.put(-1, callback);
        else
            for (var _i = 0; _i < keys.length; _i++) {
                var key = keys[_i];
                collection.put(key, callback);
            }
    }
})(Keyboard || (Keyboard = {}));
//# sourceMappingURL=input.js.map