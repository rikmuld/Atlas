//some orchestrabot hovers
module StarsScreen {
    let stars: ImgGrix
    let stars2: ImgGrix
    let stars3: ImgGrix

    let star: ShapeGrix

    let star1 = 0
    let star2 = 0
    let star3 = 0

    export const NAME = "StarsScreen"

    function mkStars(width: number, height: number, amount: number): ImgGrix {
        let stars = Assets.mkCanvas(1920, 2000)
        for (let star = 0; star < amount; star++) {
            let x = Math.floor(Math.random() * 1920)
            let y = Math.floor(Math.random() * 2000)
            stars.fillStyle = Color.White.WHITE.hex()
            stars.fillRect(x, y, width, height)
        }
        return Grix.fromTexture(stars)
    }

    export abstract class StarsScreen extends ClickableScreen {
        secretStarX: number
        secretStarY: number

        constructor(buttons: GuiManager.IButton[]) {
            super(buttons)

            let secretStarTheta = Math.random() * 2 * Math.PI
            let secretStarR = Math.random() * 250 + 250

            this.secretStarX = view.getWidth() / 2 + secretStarR * Math.cos(secretStarTheta)
            this.secretStarY = view.getHeight() / 2 + secretStarR * Math.sin(secretStarTheta)
        }

        static setup() {
            stars = mkStars(1, 1, 400)
            stars2 = mkStars(2, 2, 100)
            stars3 = mkStars(3, 3, 50)

            star = Grix.shape().quad(3, 3).setColor(Color.White.WHITE).populate()
        }

        update(delta: number) {
            super.update(delta)

            star1 += delta * 0.000012
            star2 += delta * 0.000006
            star3 += delta * 0.000003

            if (this.inCircularRange(this.secretStarX, this.secretStarY, 3)) {
                OrchestraBot.setActiveBottext(OrchestraBot.BOT_STAR)
            }
        }

        renderStars() {
            Plena.forceRender()
            this.setTextureUV(0, star1)
            stars.render()
            Plena.forceRender()
            this.setTextureUV(0, star2)
            stars2.render()
            Plena.forceRender()
            this.setTextureUV(0, star3)
            stars3.render()
            Plena.forceRender()
            this.resetTextureUV()

            star.clean()
            star.setColor(Color.White.WHITE)
            star.scaleToSize(3, 3)
            star.moveTo(this.secretStarX, this.secretStarY)
            star.render()
        }

        protected inCircularRange(centerX: number, centerY: number, range: number) {
            let mx = Mouse.getX(view)
            let my = Mouse.getY(view)

            let dx = Math.pow((mx - centerX), 2)
            let dy = Math.pow((my - centerY), 2)

            return (Math.sqrt(dx + dy) <= range)
        }

        protected setTextureUV(u: number, v: number) {
            this.setTextureMatrix(Matrix.Mat4.translate(u, v))
        }

        protected resetTextureUV() {
            this.setTextureMatrix(Matrix.Mat4.identity())
        }

        protected setTextureMatrix(mat: Mat4) {
            Shader.getShader(Shader.TEXTURE).bind()
            Shader.getShader(Shader.TEXTURE).getMatHandler().setUVMatrix(mat)
        }
    }
}