//button back to world
//preview of tech icons below city
module CityScreen {
    let background: ImgGrix

    export const NAME = "CityScreen"

    export class CityScreen extends ClickableScreen {
        constructor() {
            super([])
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
            background.moveTo(view.getWidth() / 2, view.getHeight() / 2)
            background.render()
        }
    }
}