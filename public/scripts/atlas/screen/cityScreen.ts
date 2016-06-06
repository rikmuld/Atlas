//button back to world
//preview of tech icons below city
module CityScreen {
    let background: ImgGrix
    let nationUtits: SpriteGrix

    let orchestropia: ImgGrix
    let techs: ImgGrix

    export const NAME = "CityScreen"

    export class CityScreen extends ClickableScreen {
        bX: number
        bY: number

        cloudy: number
        balloon: number
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
            this.balloon = 0
            this.cloudies = []
            for (let i = 0; i < 6; i++) {
                this.cloudies.push(Math.random() * Math.PI * 2)
            }
        }

        static setup() {
            nationUtits = Grix.fromSprite(Textures.cities) 
            background = Grix.fromTexture(Textures.nation)
            orchestropia = Grix.text("Orchestropia", Textures.fontBig)
            techs = Grix.text("most used technologies:", Textures.fontSmall)
        }

        buttonClicked(id:number) {

        }

        update(delta: number) {
            this.cloudy += delta * 0.0002
            this.balloon += delta * 0.00075
        }

        balloonX(): number {
            let scale = 10 / (3 - Math.cos(2 * this.balloon));
            return scale * Math.cos(this.balloon);
        }

        balloonY(): number {
            let scale = 30 / (3 - Math.cos(2 * this.balloon));
            return scale * Math.sin(this.balloon * 2) / 2;
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

            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.setPivotMove(0.5, 0.5)
            nationUtits.activeImg(Textures.NationSprite.BALLOON)
            nationUtits.moveTo(vWidth / 2 + 200 + this.balloonX(), vHeight / 2 - 225 + this.balloonY())
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

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])

            orchestropia.setPivotMove(0.5, 0.5)
            orchestropia.scaleTo(0.5, 0.5)
            orchestropia.moveTo(vWidth / 2, vHeight / 2 + 60)
            orchestropia.render()

            techs.setPivotMove(0.5, 0.5)
            techs.scaleTo(0.5, 0.5)
            techs.moveTo(vWidth / 2, vHeight / 2 + 90)
            techs.render()

            Plena.forceRender()

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])

            let x = vWidth / 2 - 240
            let y = vHeight / 2 + 165
            for (let i = 0; i < 5; i++) {
                Technologies.renderFiller(x, y, 0.25)
                x += 120
            }

            Plena.forceRender()

            let mostTech = Technologies.mostUsed(5) 

            x = vWidth/2 - 240
            for (let tech of mostTech) {
                tech.render(x, y, 0.25)
                x += 120
            }
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