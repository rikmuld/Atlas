//button back to world
//preview of tech icons below city
module CityScreen {
    let background: ImgGrix
    let nationUtits: SpriteGrix

    export const NAME = "CityScreen"

    export class CityScreen extends ClickableScreen {
        bX: number
        bY: number

        cloudy: number
        cloudies: number[]

        constructor() {
            super([])

            GuiManager.setHudAlpha(0.25)
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_NATION)
            OrchestraBot.setActiveWelcome(OrchestraBot.PRIM_NATION)

            let golden = 16/9

            if ((vWidth / vHeight) != golden){
                if ((vWidth / vHeight) > golden) this.bX = vWidth
                else this.bY = vHeight
            }

            this.cloudy = 0
            this.cloudies = []
            for (let i = 0; i < 6; i++) {
                this.cloudies.push(Math.random() * Math.PI * 2)
            }
        }

        static setup() {
            nationUtits = Grix.fromSprite(Textures.cities) 
            background = Grix.fromTexture(Textures.nation)
        }

        buttonClicked(id:number) {

        }

        update(delta: number) {
            this.cloudy += delta * 0.0002
        }

        render(delta: number) {
            if (this.bY) background.scaleHeightToSize(this.bY)
            else if (this.bX) background.scaleWidthToSize(this.bX)
            background.setPivotMove(0.5, 0.5)
            background.moveTo(vWidth / 2, vHeight / 2)
            background.render()

            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.activeImg(Textures.NationSprite.CLOUDY)
            for (let i = 0; i < this.cloudies.length / 2; i++) {
                nationUtits.moveTo(vWidth / 2 - 50 + this.cloudyX(i), vHeight / 2 - 220 + this.cloudyY(i))
                nationUtits.render()
            }
            Plena.forceRender()

            nationUtits.scaleTo(0.55, 0.55)
            nationUtits.setPivotMove(0.5, 0)
            nationUtits.activeImg(Textures.NationSprite.CITY_GREEN)
            nationUtits.moveTo(vWidth / 2, vHeight / 2 - 240)
            nationUtits.render()

            Plena.forceRender()

            let shad = Shader.getShader(Shader.TEXTURE)

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 0.175])

            nationUtits.activeImg(Textures.NationSprite.DOCK)
            nationUtits.setPivotMove(0.5, 0.5)
            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.moveTo(vWidth / 2, vHeight / 2 + 167)
            nationUtits.render()

            Plena.forceRender()

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])

            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.activeImg(Textures.NationSprite.CLOUDY)
            for (let i = this.cloudies.length / 2; i < this.cloudies.length; i++) {
                nationUtits.moveTo(vWidth / 2 - 50 + this.cloudyX(i), vHeight / 2 - 220 + this.cloudyY(i))
                nationUtits.render()
            }
            Plena.forceRender()
        }

        cloudyX(cloudy: number):number {
            let scale = 400 / (3 - Math.cos(2 * (this.cloudy + this.cloudies[cloudy])));
            return scale * Math.cos((this.cloudy + this.cloudies[cloudy]));
        }

        cloudyY(cloudy: number):number {
            let scale = 250 / (3 - Math.cos(2 * (this.cloudy + this.cloudies[cloudy])));
            return scale * Math.sin((this.cloudy + this.cloudies[cloudy]) * 3)/2;
        }
    }
}