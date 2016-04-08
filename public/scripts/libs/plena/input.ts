/**
 * Mouse helper functions
 */
//context disable add
namespace Mouse {
    type ButtonEventEx = (event: MouseEvent) => any
    type ButtonEvent = (event: MouseEvent) => any
    type EventMap = DeepTreeMap<number, ButtonEventEx>

    var pressCalls = new DeepTreeMap<number, ButtonEventEx>(NUMBER_COMPARE)
    var releaseCalls = new DeepTreeMap<number, ButtonEventEx>(NUMBER_COMPARE)
    var browserControl = true

    /**
     * Button code
     */
    export const
        LEFT = 0,
        RIGHT = 1,
        MIDDLE = 2

    var mouseX: number
    var mouseY: number
    var buttons: boolean[] = []
    
    /**
     * Enable the default listners, is needed for a lot of other Mouse functionality
     */
    export function enable() {
        document.body.onmouseup = mouseUp
        document.body.onmousedown = mouseDown
        document.onmousemove = mouseMoved
    }

    /**
     * Register custom mouse moved listners
     *
     * @param mouseMoved move moved listner, will be triggerd when the mouse position has changed
     */
    export function customListenPos(mouseMoved: ButtonEvent) {
        document.onmousemove = mouseMoved
    }

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
    export function customListen(mouseDown: ButtonEvent, mouseUp: ButtonEvent) {
        document.body.onmouseup = mouseUp
        document.body.onmousedown = mouseDown
    }

    function mouseMoved(event: MouseEvent) {
        mouseX = event.clientX
        mouseY = event.clientY
    }

    function mouseUp(event: MouseEvent) {
        let button = event.button;

        setButton(button, false);
        triggerButtons(releaseCalls, button, event)
    }

    function mouseDown(event: MouseEvent) {
        let button = event.button;

        if (!isDown(button)) {
            triggerButtons(pressCalls, button, event)
        }

        setButton(button, true);
    }

    function setButton(button:number, value:boolean){
        buttons[button] = value;
    }

    /**
     * Hide the mouse cursor
     */
    export function hide() {
        document.body.style.cursor = "none"
    }

    /**
     * Show the mouse cursor
     */
    export function show() {
        document.body.style.cursor = "auto"
    }

    /**
     * Get the current x position of the mouse
     */
    export function getX(view: Views.View) {
        return view.mapX(mouseX, true)
    }
    
    /**
     * Get the current y position of the mouse
     */
    export function getY(view: Views.View) {
        return view.mapY(mouseY, true)
    }

    /**
     * Get the current x position of the mouse in pixels (entire browser screen, not the canvas)
     */
    export function getScreenX() {
        return mouseX
    }
    
    /**
     * Get the current y position of the mouse in pixels (entire browser screen, not the canvas)
     */
    export function getScreenY() {
        return mouseY
    }

    /**
     * Check if a button is currently pressed
     * 
     * @param button button code
     */
    export function isDown(button: number) {
        return buttons[button]
    }

    /**
     * Set availability of all default button controlls in the browser
     * 
     * @param allow whather or not the browser key controlls will be triggered
     */
    export function browserControll(allow: boolean) {
        browserControl = allow
    }

    function triggerButtons(collection: EventMap, button: number, event: MouseEvent) {
        if (collection.contains(button)) {
            let calls = collection.itterator(button)
            for (let call of calls) call(event)
        }

        let calls2 = collection.itterator(-1)
        for (let call of calls2) call(event)
    }

    /**
     * Add an event for when a button is released
     * 
     * @param callback callback triggered when a button is released
     * @param keys the buttons that will trigger the callback, no buttons means any button will be a trigger
     */
    export function addReleasedEvent(callback: ButtonEventEx, ...buttons: number[]) {
        addEvent(releaseCalls, callback, buttons)
    }

    /**
     * Add an event for when a button is pressed (will only fire once when the key is pressed)
     * 
     * @param callback callback triggered when a button is pressed
     * @param keys the buttons that will trigger the callback, no buttons means any button will be a trigger
     */
    export function addPressedEvent(callback: ButtonEventEx, ...buttons: number[]) {
        addEvent(pressCalls, callback, buttons)
    }

    function addEvent(collection: EventMap, callback: ButtonEventEx, buttons: number[]) {
        if (buttons.length == 0) collection.put(-1, callback)
        else for (var button of buttons) collection.put(button, callback)
    }
}

/**
 * Keyboard helper functions
 */
namespace Keyboard {
    type KeyEvent = (event: KeyboardEvent) => any
    type EventMap = DeepTreeMap<number, KeyEvent>

    var keys = []
    var pressCalls = new DeepTreeMap<number, KeyEvent>(NUMBER_COMPARE)
    var releaseCalls = new DeepTreeMap<number, KeyEvent>(NUMBER_COMPARE)
    var browserControl = true

    /**
     * ASCII key code
     */
    export const
        KEY_BACKSPACE = 8,
        KEY_TAB = 9,
        KEY_ENTER = 13,
        KEY_SHIFT = 16,
        KEY_CTRL = 17,
        KEY_ALT = 18,
        KEY_BREAK = 19,
        KEY_CAPS_LOCK = 20,
        KEY_ESCAPE = 27,
        KEY_SPACE = 32,
        KEY_PAGE_UP = 33,
        KEY_PAGE_DOWN = 34,
        KEY_END = 35,
        KEY_HOME = 36,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
        KEY_INSERT = 45,
        KEY_DELETE = 46,
        KEY_0 = 48,
        KEY_1 = 49,
        KEY_2 = 50,
        KEY_3 = 51,
        KEY_4 = 52,
        KEY_5 = 53,
        KEY_6 = 54,
        KEY_7 = 55,
        KEY_8 = 56,
        KEY_9 = 57,
        KEY_A = 65,
        KEY_B = 66,
        KEY_C = 67,
        KEY_D = 68,
        KEY_E = 69,
        KEY_F = 70,
        KEY_G = 71,
        KEY_H = 72,
        KEY_I = 73,
        KEY_J = 74,
        KEY_K = 75,
        KEY_L = 76,
        KEY_M = 77,
        KEY_N = 78,
        KEY_O = 79,
        KEY_P = 80,
        KEY_Q = 81,
        KEY_R = 82,
        KEY_S = 83,
        KEY_T = 84,
        KEY_U = 85,
        KEY_V = 86,
        KEY_W = 87,
        KEY_X = 88,
        KEY_Y = 89,
        KEY_Z = 90,
        KEY_WINDOWS_LEFT = 91,
        KEY_WINDOWS_RIGHT = 92,
        KEY_SELECT = 93,
        KEY_NUMPAD_0 = 96,
        KEY_NUMPAD_1 = 97,
        KEY_NUMPAD_2 = 98,
        KEY_NUMPAD_3 = 99,
        KEY_NUMPAD_4 = 100,
        KEY_NUMPAD_5 = 101,
        KEY_NUMPAD_6 = 102,
        KEY_NUMPAD_7 = 103,
        KEY_NUMPAD_8 = 104,
        KEY_NUMPAD_9 = 105,
        KEY_MULTIPLY = 106,
        KEY_ADD = 107,
        KEY_SUBSTRACT = 108,
        KEY_POINT = 109,
        KEY_DECIMAL_POINT = 110,
        DEVIDE = 111,
        KEY_F1 = 112,
        KEY_F2 = 113,
        KEY_F3 = 114,
        KEY_F4 = 115,
        KEY_F5 = 116,
        KEY_F6 = 117,
        KEY_F7 = 118,
        KEY_F8 = 119,
        KEY_F9 = 120,
        KEY_F10 = 121,
        KEY_F11 = 122,
        KEY_F12 = 123,
        KEY_NUM_LOCK = 144,
        KEY_SCROLL_LOCK = 145,
        KEY_SEMI_COLON = 186,
        KEY_EQUAL_SIGN = 187,
        KEY_COMMA = 188,
        KEY_DASH = 189,
        KEY_PERIOD = 190,
        KEY_SLASH_FORWARD = 191,
        KEY_GRAVE_ACCENT = 192,
        KEY_BRACKET_OPEN = 219,
        KEY_SLASH_BACK = 220,
        KEY_BRACKET_CLOSE = 221,
        KEY_QUOTE_SINGLE = 222
    
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
    export function customListen(keyDown: KeyEvent, keyUp: KeyEvent) {
        document.onkeydown = keyDown
        document.onkeyup = keyUp
    }

    /**
     * Set availability of all default key controlls in the browser (e.g. backspace trigger back)
     * 
     * @param allow whather or not the browser key controlls will be triggered
     */
    export function browserControll(allow:boolean) {
        browserControl = allow
    }

    /**
     * Enable the default key listners, is needed for use of every other Keyboard functionality
     */
    export function enable() {
        customListen(keyDown, keyUp)
    }

    function keyDown(event: KeyboardEvent):boolean {
        let key = event.keyCode

        if (!isDown(key)) {
            triggerKeys(pressCalls, key, event)
        }

        setKey(key, true)
        return browserControl
    }

    function keyUp(event: KeyboardEvent) {
        let key = event.keyCode

        setKey(key, false)
        triggerKeys(releaseCalls, key, event)
    }

    function triggerKeys(collection:EventMap, key:number, event: KeyboardEvent) {
        if (collection.contains(key)) {
            let calls = collection.itterator(key)
            for (let call of calls) call(event)
        }

        let calls2 = collection.itterator(-1)
        for (let call of calls2) call(event)
    }

    /**
     * Check if a key is currently pressed
     * 
     * @param key ASCII key code of the key
     */
    export function isDown(key:number) {
        return keys[key]
    }

    function setKey(key: number, value: boolean) {
        keys[key] = value
    }

    /**
     * Add an event for when a key is released
     * 
     * @param callback callback triggered when a key is released
     * @param keys the keys that will trigger the callback, no keys means any key will be a trigger
     */
    export function addReleasedEvent(callback: KeyEvent, ...keys: number[]) {
        addEvent(releaseCalls, callback, keys)
    }

    /**
     * Add an event for when a key is pressed (will only fire once when the key is pressed)
     * 
     * @param callback callback triggered when a key is pressed
     * @param keys the keys that will trigger the callback, no keys means any key will be a trigger
     */
    export function addPressedEvent(callback: KeyEvent, ...keys: number[]) {
        addEvent(pressCalls, callback, keys)
    }

    function addEvent(collection: EventMap, callback: KeyEvent, keys: number[]) {
        if (keys.length == 0) collection.put(-1, callback)
        else for (var key of keys) collection.put(key, callback)
    }
}