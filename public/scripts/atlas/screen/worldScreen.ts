//satalite, dragging world with mouse, icon in doc positioning, hover with text above doc
module WorldScreen {
    let worldMap: ImgGrix
    let worldUtils: SpriteGrix
    let button: ShapeGrix

    let stars: ImgGrix
    let stars2: ImgGrix
    let stars3: ImgGrix

    export const NAME = "WorldScreen"

    const BUTTON_STORE = 2
    const BUTTON_NATION = 1
    const BUTTON_WORLD = 0
    const BUTTON_EXIT = 3

    export class WorldScreen extends ClickableScreen {
        worldOffset: number
        worldOffsetOld:number

        mouseBegin: number
        dragging: boolean
        canDrag: boolean

        cloudX: number 
        cloudY: number

        star1: number
        star2: number
        star3: number

        counter: number 

        sputnik: number

        constructor() {
            let middleW = view.getWidth() / 2
            let middleH = view.getHeight()

            let world = new DockButton(0, Textures.WorldSprite.ICON_WORLD, BUTTON_WORLD)
            let nation = new DockButton(1, Textures.WorldSprite.ICON_NATIO, BUTTON_NATION)
            let store = new DockButton(2, Textures.WorldSprite.ICON_STORE, BUTTON_STORE)
            let exit = new DockButton(3, Textures.WorldSprite.ICON_LEAVE, BUTTON_EXIT)

            super([world, nation, store, exit])

            this.worldOffset = 0.164

            this.star1 = 0
            this.star2 = 0
            this.star3 = 0

            this.dragging = false
            this.canDrag = true

            this.counter = 1000000
            this.sputnik = 0
        }

        static setup() {
            worldMap = new ImgGrix().mkCircle(Textures.mapImg, 441, 500, 0, 0, 0, 0, 200).populate()
            worldUtils = Grix.fromSprite(Textures.worldSprite)
            stars = WorldScreen.mkStars(1, 1, 400)
            stars2 = WorldScreen.mkStars(2, 2, 100)
            stars3 = WorldScreen.mkStars(3, 3, 50)

            button = Grix.shape().circle(50).setColor(Color.Blue.BLUE_MIDNIGHT).populate()
        }

        static mkStars(width: number, height: number, amount:number): ImgGrix {
            let stars = Assets.mkCanvas(1920, 2000)
            for (let star = 0; star < amount; star++) {
                let x = Math.floor(Math.random() * 1920)
                let y = Math.floor(Math.random() * 2000)
                stars.fillStyle = Color.White.WHITE.hex()
                stars.fillRect(x, y, width, height)
            }
            return Grix.fromTexture(stars)
        }

        update(delta: number) {
            super.update(delta)

            this.worldOffsetOld = this.worldOffset
            this.sputnik += 0.01 * delta

            if (Keyboard.isDown(Keyboard.KEY_LEFT)) this.worldOffset += 0.0004 * delta
            if (Keyboard.isDown(Keyboard.KEY_RIGHT)) this.worldOffset -= 0.0004 * delta

            this.setCloudXY()

            this.star1 += delta * 0.000012
            this.star2 += delta * 0.000006
            this.star3 += delta * 0.000003

            let mx = Mouse.getX(view)
            let my = Mouse.getY(view)

            if (this.dragging) {
                this.worldOffset += (this.mouseBegin - mx) / (0.5*worldMap.getImg().getWidth())
                this.mouseBegin = mx
            }

            if (Mouse.isDown(Mouse.LEFT) && this.canDrag) {
                let cx = view.getWidth() / 2
                let cy = view.getHeight() / 2

                let dx = Math.pow((mx - cx), 2)
                let dy = Math.pow((my - cy), 2)

                if (Math.sqrt(dx + dy) <= 220) {
                    this.dragging = true
                    this.mouseBegin = mx
                }

                this.canDrag = false
            }

            if (!Mouse.isDown(Mouse.LEFT)) {
                this.canDrag = true
                this.dragging = false
            }

            if (this.worldOffsetOld == this.worldOffset) this.counter += delta
            else this.counter = 0

            if (this.counter > 250 * delta) this.worldOffset += 0.00002 * delta
        }

        render(delta: number) {
            Plena.forceRender()
            this.setTextureUV(0, this.star1)
            stars.render()
            Plena.forceRender()
            this.setTextureUV(0, this.star2)
            stars2.render()
            Plena.forceRender()
            this.setTextureUV(0, this.star3)
            stars3.render()
            Plena.forceRender()
            this.resetTextureUV()

            this.setWorldUtil(Textures.WorldSprite.BACK)
            worldUtils.render()

            Plena.forceRender()
            this.setTextureUV(this.worldOffset, 0)
            worldMap.scaleTo(0.5, 0.5)
            this.center(worldMap)

            worldMap.render()

            Plena.forceRender()
            this.resetTextureUV()

            this.setWorldUtil(Textures.WorldSprite.CRESANT)
            worldUtils.render()

            this.setWorldUtil(Textures.WorldSprite.CLOUDS)
            worldUtils.move(this.cloudX, this.cloudY)
            worldUtils.render()

            worldUtils.clean()
            worldUtils.activeImg(Textures.WorldSprite.DOCK)
            worldUtils.setPivotMove(0.5, 1)
            worldUtils.moveTo(view.getWidth() / 2, view.getHeight())
            worldUtils.render()
            Plena.forceRender()

            worldUtils.activeImg(Textures.WorldSprite.SPUTNIK)
            worldUtils.scaleTo(0.25, 0.25)
            worldUtils.setPivotRot(view.getWidth() / 2, view.getHeight() / 2, false)
            worldUtils.setPivotMove(0.5, 0.5)
            worldUtils.rotateToDeg(this.sputnik)
            worldUtils.moveTo(view.getWidth() / 2 - 220, view.getHeight() / 2 - 220)
            worldUtils.render()

            super.render(delta)
        }

        buttonClicked(id:number) {
            switch (id) {
                case BUTTON_STORE:
                    GuiManager.loadScreen(StoreScreen.NAME)
                    break
                case BUTTON_NATION:
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
            grix.moveTo(view.getWidth() / 2, view.getHeight() / 2)
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

    class DockButton extends SimpleButton {
        icon: string

        constructor(index: number, icon: string, id: number) {
            let middleW = view.getWidth() / 2
            let middleH = view.getHeight()

            super(middleW - 200 + index * 100, middleH - 100, 100, 100, id)

            this.icon = icon
        }

        render(delta: number) {
            Plena.forceRender()
            worldUtils.clean()
            worldUtils.activeImg(this.icon)
            worldUtils.scaleToSize(this.width, this.height)
            worldUtils.moveTo(this.x, this.y)
            worldUtils.render()
        }
    }
}