module StoreScreen {
    export const NAME = "StoreScreen"

    export class StoreScreen implements GuiManager.IScreen {
        background: GuiManager.IScreen

        constructor() {
            this.background = GuiManager.getCurrentScreen()
        }

        static setup() {
        
        }

        update(delta: number) {

        }

        render(delta: number) {
            this.background.render(delta)
        }
    }
}