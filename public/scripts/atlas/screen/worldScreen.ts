//the world background looks off, thats a problem with the texture, aperantly it is not a circle....
module WorldScreen {
    let stars: ImgGrix
    let worldMap: ImgGrix
    let worldUtils: SpriteGrix
    let button: ShapeGrix

    export const NAME = "WorldScreen"

    const BUTTON_STORE = 0
    const BUTTON_CITY = 1

    export class WorldScreen extends ClickableScreen {
        worldOffset: number

        cloudX: number 
        cloudY: number

        constructor() {
            let middleW = view.getWidth() / 2
            let middleH = view.getHeight() / 2

            let storeButton = new FillerButton(middleW - 185, middleH + 200, 75, 75, BUTTON_STORE)
            let someButton1 = new FillerButton(middleW - 85, middleH + 200, 75, 75, BUTTON_CITY)
            let someButton2 = new FillerButton(middleW + 10, middleH + 200, 75, 75, 2)
            let someButton3 = new FillerButton(middleW + 105, middleH + 200, 75, 75, 3)

            super([storeButton, someButton1, someButton2, someButton3])
            this.worldOffset = 0.164
        }

        static setup() {
            worldMap = new ImgGrix().mkCircle(Textures.mapImg, 216, 500, 0, 0, 0, 0, 200).populate()
            worldUtils = Grix.fromSprite(Textures.worldSprite)

            Textures.starImg.onLoaded(function () {
                stars = new ImgGrix()
                    .add(3840, 2160, Textures.starImg, 0, 0, Textures.starImg.getCoord().newCoords(Textures.starImg, 3840, 2160))
                    .populate()
            })

            button = Grix.shape().circle(50).setColor(Color.Blue.BLUE_MIDNIGHT).populate()
        }

        update(delta: number) {
            super.update(delta)

            if (Keyboard.isDown(Keyboard.KEY_LEFT)) this.worldOffset -= 0.0003 * delta
            if (Keyboard.isDown(Keyboard.KEY_RIGHT)) this.worldOffset += 0.0003 * delta

            this.setCloudXY()
        }

        render(delta: number) {
            super.render(delta)

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

            this.setWorldUtil(Textures.WorldSprite.CLOUDS)
            worldUtils.move(this.cloudX, this.cloudY)
            worldUtils.render()
        }

        buttonClicked(id:number) {
            switch (id) {
                case BUTTON_STORE:
                    GuiManager.loadScreen(StoreScreen.NAME)
                    break
                case BUTTON_CITY:
                    GuiManager.loadScreen(CityScreen.NAME)
                    break
            }
        }

        private setWorldUtil(key: string) {
            worldUtils.scaleTo(0.5, 0.5)
            this.center(worldUtils)
            worldUtils.activeImg(key)
        }

        private setCloudXY() {
            this.cloudX = (50 * (Mouse.getX(view) / view.getHeight()) - 25*(view.getWidth()/view.getHeight())) | 0
            this.cloudY = (50 * (Mouse.getY(view) / view.getHeight()) - 25) | 0
        }

        private center(grix:Grix) {
            grix.setPivotMove(0.5, 0.5)
            grix.moveTo(view.getWidth() / 2, view.getHeight() / 2 - 75)
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