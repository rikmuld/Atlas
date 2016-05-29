//button back to world
//preview of tech icons below city
module CityScreen {
    let background: ImgGrix
    let nationUtits: SpriteGrix

    export const NAME = "CityScreen"

    export class CityScreen extends ClickableScreen {
        bX: number
        bY: number

        cloudy:number

        constructor() {
            super([])

            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_STORE)

            let golden = 16/9

            if ((vWidth / vHeight) != golden){
                if ((vWidth / vHeight) > golden) this.bX = vWidth
                else this.bY = vHeight
            }

            this.cloudy = 0
        }

        static setup() {
            nationUtits = Grix.fromSprite(Textures.cities) 
            background = Grix.fromTexture(Textures.nation)
        }

        buttonClicked(id:number) {

        }

        update(delta: number) {
            this.cloudy += delta * 0.0005
        }

        render(delta: number) {
            if (this.bY) background.scaleHeightToSize(this.bY)
            else if (this.bX) background.scaleWidthToSize(this.bX)
            background.setPivotMove(0.5, 0.5)
            background.moveTo(vWidth / 2, vHeight / 2)
            background.render()

            nationUtits.activeImg(Textures.NationSprite.CITY_GREEN)
            nationUtits.moveTo(vWidth / 2 - 295, vHeight / 2 - 240)
            nationUtits.scaleTo(0.55, 0.55)
            nationUtits.render()

            Plena.forceRender()

            nationUtits.activeImg(Textures.NationSprite.CLOUDY)
            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.moveTo(vWidth / 2 - 100 + this.cloudyX(), vHeight / 2 - 220 + this.cloudyY())
            nationUtits.render()
        }

        cloudyX():number {
            let scale = 300 / (3 - Math.cos(2 * this.cloudy));
            return scale * Math.cos(this.cloudy);
        }

        cloudyY():number {
            let scale = 250 / (3 - Math.cos(2 * this.cloudy));
            return scale * Math.sin(this.cloudy * 3)/2;
        }
    }
}