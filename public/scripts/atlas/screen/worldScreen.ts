//the world background looks off, thats a problem with the texture, aperantly it is not a circle....
module WorldScreen {
    let stars: ImgGrix
    let worldMap: ImgGrix
    let worldUtils: SpriteGrix

    export const NAME = "WorldScreen"

    export class WorldScreen implements GuiManager.IScreen {
        worldOffset: number
        view: Views.View

        constructor() {
            this.worldOffset = 0.164
            this.view = Plena.getDefaultView()
        }

        static setup() {
            worldMap = new ImgGrix().mkCircle(Textures.mapImg, 433, 500, 0, 0, 0, 0, 200).populate()
            worldUtils = Grix.fromSprite(Textures.worldSprite)

            Textures.starImg.onLoaded(function () {
                stars = new ImgGrix()
                    .add(3840, 2160, Textures.starImg, 0, 0, Textures.starImg.getCoord().newCoords(Textures.starImg, 3840, 2160))
                    .populate()
            })
        }

        update(delta: number) {
            this.view = Plena.getDefaultView()

            if (Keyboard.isDown(Keyboard.KEY_LEFT)) this.worldOffset -= 0.0003 * delta
            if (Keyboard.isDown(Keyboard.KEY_RIGHT)) this.worldOffset += 0.0003 * delta
        }

        render(delta: number) {
            stars.render()

            this.setWorldUtil(Textures.WorldSprite.BACK)
            worldUtils.render()

            Plena.forceRender()
            this.setTextureUV(this.worldOffset, 0)
            this.center(worldMap)

            worldMap.render()

            Plena.forceRender()
            this.resetTextureUV()

            this.setWorldUtil(Textures.WorldSprite.CRESANT)
            worldUtils.render()

            let x = (50 * (Mouse.getX(this.view) / this.view.getHeight()) - 25) | 0
            let y = (50 * (Mouse.getY(this.view) / this.view.getHeight()) - 25) | 0

            this.setWorldUtil(Textures.WorldSprite.CLOUDS)
            worldUtils.move(x, y)
            worldUtils.render()
        }

        private setWorldUtil(key: string) {
            this.center(worldUtils)
            worldUtils.activeImg(key)
        }

        private center(grix:Grix) {
            grix.setPivotMove(0.5, 0.5)
            grix.moveTo(this.view.getWidth() / 2, this.view.getHeight() / 2)
        }

        private setTextureUV(u: number, v: number) {
            this.setTextureMatrix(Matrix.Mat4.translate(u, v))
        }

        private resetTextureUV() {
            this.setTextureMatrix(Matrix.Mat4.identity())
        }

        private setTextureMatrix(mat: Mat4) {
            Shader.getShader(Shader.TEXTURE).bind()
            Shader.getShader(Shader.TEXTURE).getMatHandler().setUVMatrix(mat)
        }
    }
}