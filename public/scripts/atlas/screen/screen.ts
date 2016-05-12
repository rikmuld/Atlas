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

module GuiManager {
    export interface IScreen {
        render(delta: number): void
        update(delta: number): void
    }

    let screens = new TreeMap<String, any>(STRING_COMPARE)
    let currentScreen: IScreen

    export function registerScreen(screenModule: any) {
        screenModule[screenModule["NAME"]].setup()
        screens.put(screenModule["NAME"], screenModule)
    }

    export function getCurrentScreen(): IScreen {
        return currentScreen
    }

    export function loadScreen(key: string): IScreen {
        currentScreen = new (screens.apply(key))[key]()
        return currentScreen
    }

    export function update(delta: number) {
        currentScreen.update(delta)
    }

    export function render(delta: number) {
        currentScreen.render(delta)
    }
}