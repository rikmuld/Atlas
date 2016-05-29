//button back to world
//preview of tech icons below city
module CityScreen {
    let background: ImgGrix

    export const NAME = "CityScreen"

    export class CityScreen extends ClickableScreen {
        constructor() {
            super([])

            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_STORE)
        }

        static setup() {
            background = Grix.fromTexture(Textures.nation)
        }

        buttonClicked(id:number) {

        }

        update(delta: number) {

        }

        render(delta: number) {
            background.setPivotMove(0.5, 0.5)
            background.moveTo(vWidth / 2, vHeight / 2)
            background.render()
        }
    }
}