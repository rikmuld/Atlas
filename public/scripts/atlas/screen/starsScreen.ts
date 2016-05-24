//some orchestrabot hovers
module StarsScreen {
    let stars: ImgGrix
    let stars2: ImgGrix
    let stars3: ImgGrix

    let star: ShapeGrix

    export const NAME = "StarsScreen"

    let textWorld: ImgGrix
    let textNation: ImgGrix
    let textStore: ImgGrix
    let textExit: ImgGrix

    export let worldUtils: SpriteGrix

    const BUTTON_STORE = 2
    const BUTTON_NATION = 1
    const BUTTON_WORLD = 0
    const BUTTON_EXIT = 3

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

    export class StarsScreen extends ClickableScreen {
        star1: number
        star2: number
        star3: number

        secretStarX: number
        secretStarY: number

        constructor(buttons: GuiManager.IButton[]) {
            let middleW = view.getWidth() / 2
            let middleH = view.getHeight()

            let world = new DockButton(0, Textures.WorldSprite.ICON_WORLD, BUTTON_WORLD, textWorld, OrchestraBot.BOT_ICON_WORLD)
            let nation = new DockButton(1, Textures.WorldSprite.ICON_NATIO, BUTTON_NATION, textNation, OrchestraBot.BOT_ICON_NATION)
            let store = new DockButton(2, Textures.WorldSprite.ICON_STORE, BUTTON_STORE, textStore, OrchestraBot.BOT_ICON_STORE)
            let exit = new DockButton(3, Textures.WorldSprite.ICON_LEAVE, BUTTON_EXIT, textExit, OrchestraBot.BOT_ICON_EXIT)

            buttons.push(world)
            buttons.push(nation)
            buttons.push(store)
            buttons.push(exit)

            super(buttons)

            this.star1 = 0
            this.star2 = 0
            this.star3 = 0

            let secretStarTheta = Math.random() * 2 * Math.PI
            let secretStarR = Math.random() * 250 + 250

            this.secretStarX = view.getWidth() / 2 + secretStarR * Math.cos(secretStarTheta)
            this.secretStarY = view.getHeight() / 2 + secretStarR * Math.sin(secretStarTheta)
        }

        static setup() {
            stars = mkStars(1, 1, 400)
            stars2 = mkStars(2, 2, 100)
            stars3 = mkStars(3, 3, 50)

            worldUtils = Grix.fromSprite(Textures.worldSprite)

            let font = new Font(Font.CONSOLAS, 24).fill(Color.White.WHITE)
            textWorld = Grix.text("World View", font)
            textNation = Grix.text("Nation View", font)
            textStore = Grix.text("Visit Store", font)
            textExit = Grix.text("Exit Game", font)

            star = Grix.shape().quad(3, 3).setColor(Color.White.WHITE).populate()
        }

        update(delta: number) {
            super.update(delta)

            this.star1 += delta * 0.000012
            this.star2 += delta * 0.000006
            this.star3 += delta * 0.000003

            if (this.inCircularRange(this.secretStarX, this.secretStarY, 3)) {
                OrchestraBot.setActiveBottext(OrchestraBot.BOT_STAR)
            }
        }

        renderStars() {
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

            worldUtils.clean()
            worldUtils.activeImg(Textures.WorldSprite.DOCK)
            worldUtils.setPivotMove(0.5, 1)
            worldUtils.moveTo(view.getWidth() / 2, view.getHeight())
            worldUtils.render()

            Plena.forceRender()

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

        buttonClicked(id: number) {
            switch (id) {
                case BUTTON_STORE:
                    if (GuiManager.getCurrentScreenName() != StoreScreen.NAME) {
                        GuiManager.loadScreen(StoreScreen.NAME)
                    }
                    break
                case BUTTON_NATION:
                    GuiManager.loadScreen(CityScreen.NAME)
                    break
                case BUTTON_WORLD:
                    if (GuiManager.getCurrentScreenName() != WorldScreen.NAME) {
                        GuiManager.loadScreen(WorldScreen.NAME)
                    }
                    break
            }
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

    class DockButton extends SimpleButton {
        icon: string
        bot: string
        text: ImgGrix

        constructor(index: number, icon: string, id: number, text: ImgGrix, bot: string) {
            let middleW = view.getWidth() / 2
            let middleH = view.getHeight()

            super(middleW - 203 + index * 101, middleH - 95, 100, 100, id)
            this.icon = icon
            this.text = text
            this.bot = bot
        }

        render(delta: number) {
            Plena.forceRender()
            worldUtils.clean()
            worldUtils.activeImg(this.icon)
            worldUtils.scaleToSize(this.width, this.height)
            worldUtils.moveTo(this.x, this.y)
            worldUtils.render()

            if (this.isMouseOver()) {
                OrchestraBot.setActiveBottext(this.bot)

                worldUtils.clean()

                worldUtils.activeImg(Textures.WorldSprite.DOCK)
                let dockHeight = worldUtils.getHeight()

                worldUtils.activeImg(Textures.WorldSprite.BUBBLE)
                worldUtils.setPivotMove(0.5, 1)
                worldUtils.moveTo(view.getWidth() / 2, view.getHeight() - dockHeight - 3)
                worldUtils.render()

                let height = worldUtils.getHeight()

                Plena.forceRender()

                this.text.setPivotMove(0.5, 0.5)
                this.text.moveTo(view.getWidth() / 2, view.getHeight() - dockHeight - height / 2 + 3)
                this.text.render()
            }
        }
    }
}