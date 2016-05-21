//some orchestrabot hovers
module WorldScreen {
    let worldMap: ImgGrix
    let worldUtils: SpriteGrix
    let button: ShapeGrix

    let stars: ImgGrix
    let stars2: ImgGrix
    let stars3: ImgGrix

    let orchestraBot: ShapeGrix

    export const NAME = "WorldScreen"

    export const BOT_WELCOME = "welcome"
    export const BOT_STAR = "star"
    export const BOT_SPUT = "sputnik"
    export const BOT_ICON_WORLD = "world"
    export const BOT_ICON_NATION = "nation"
    export const BOT_ICON_STORE = "store"
    export const BOT_ICON_EXIT = "exit"
    export const BOT_NATION_X = "nation_"

    let textWorld: ImgGrix
    let textNation: ImgGrix
    let textStore: ImgGrix
    let textExit: ImgGrix

    let botText = new TreeMap<String, ImgGrix>(STRING_COMPARE)
    let activeText: string
    let switchTime: number

    let textWelcome: ImgGrix

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

        secretStarX: number
        secretStarY: number

        constructor() {
            let middleW = view.getWidth() / 2
            let middleH = view.getHeight()

            let world = new DockButton(0, Textures.WorldSprite.ICON_WORLD, BUTTON_WORLD, textWorld, BOT_ICON_WORLD)
            let nation = new DockButton(1, Textures.WorldSprite.ICON_NATIO, BUTTON_NATION, textNation, BOT_ICON_NATION)
            let store = new DockButton(2, Textures.WorldSprite.ICON_STORE, BUTTON_STORE, textStore, BOT_ICON_STORE)
            let exit = new DockButton(3, Textures.WorldSprite.ICON_LEAVE, BUTTON_EXIT, textExit, BOT_ICON_EXIT)

            super([world, nation, store, exit])

            this.worldOffset = 0.164

            this.star1 = 0
            this.star2 = 0
            this.star3 = 0

            this.dragging = false
            this.canDrag = true

            this.counter = 1000000
            this.sputnik = 0

            let secretStarTheta = Math.random() * 2 * Math.PI
            let secretStarR = Math.random() * 250 + 250

            this.secretStarX = view.getWidth() / 2 + secretStarR * Math.cos(secretStarTheta)
            this.secretStarY = view.getHeight() / 2 + secretStarR * Math.sin(secretStarTheta)
            WorldScreen.setActiveBottext(BOT_WELCOME)
        }

        static setup() {
            worldMap = new ImgGrix().mkCircle(Textures.mapImg, 441, 500, 0, 0, 0, 0, 200).populate()
            worldUtils = Grix.fromSprite(Textures.worldSprite)
            stars = WorldScreen.mkStars(1, 1, 400)
            stars2 = WorldScreen.mkStars(2, 2, 100)
            stars3 = WorldScreen.mkStars(3, 3, 50)

            button = Grix.shape().circle(50).setColor(Color.Blue.BLUE_MIDNIGHT).populate()

            let font = new Font(Font.CONSOLAS, 24).fill(Color.White.WHITE)
            textWorld = Grix.text("World View", font)
            textNation = Grix.text("Nation View", font)
            textStore = Grix.text("Visit Store", font)
            textExit = Grix.text("Exit Game", font)

            textWelcome = Grix.text("Welcome to ATLAS satalite 0.0.41α", font)
            orchestraBot = Grix.shape().quad(600, 150).setColor(Color.mkAlphaColor(227, 227, 227, 0.45)).populate()

            WorldScreen.registerBottext(BOT_WELCOME, "I am Orchestra-Bot and I will be guiding you throught this experience... Hover over elements for information.")
            WorldScreen.registerBottext(BOT_SPUT, "This little one is Sputnik, he keeps a close wacht over the Earth. My little brother lives there, we should visit some time.")
            WorldScreen.registerBottext(BOT_STAR, "How persceptive of you! This is the only stationary star ever discovered. How? Nobody knows...")
            WorldScreen.registerBottext(BOT_ICON_WORLD, "In the world view you can see the world, you overall statistics, go to other screens and best of all.. have a nice chat with me, Orchestra-Bot!")
            WorldScreen.registerBottext(BOT_ICON_NATION, "In the nation view you can visit you own nation. Did you know you can also view nations of other players? Try clicking the little dots on the world!")
            WorldScreen.registerBottext(BOT_ICON_STORE, "In the store you can invest your presious money in new or existing technologies. The more you invest the more the technology develops, it's really existing!")
            WorldScreen.registerBottext(BOT_ICON_EXIT, "By clicking this button you will leave ALTAS and head back to Earth. Are you sure you want to leave me.. :'(")

        }

        static registerBottext(key: string, text: string) {
            let font = new Font(Font.CONSOLAS, 20).fill(Color.White.WHITE)
            botText.put(key, Grix.text(text, font, Assets.LETTERS, 1000))
            activeText = key
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

        static setActiveBottext(key: string) {
            activeText = key
            switchTime = 0
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

                if (this.inCircularRange(cx, cy, 220)) {
                    this.dragging = true
                    this.mouseBegin = mx
                }

                this.canDrag = false
            }

            if (!Mouse.isDown(Mouse.LEFT)) {
                this.canDrag = true
                this.dragging = false
            }

            switchTime += delta
            if (switchTime > 250 * delta) WorldScreen.setActiveBottext(BOT_WELCOME)

            if (this.inCircularRange(this.secretStarX, this.secretStarY, 3)) WorldScreen.setActiveBottext(BOT_STAR)

            let angle = MMath.toRad(this.sputnik) - Math.PI * 0.75
            let x = Math.cos(angle) * 311 + view.getWidth() / 2
            let y = Math.sin(angle) * 311 + view.getHeight() / 2
            if (this.inCircularRange(x, y, 30)) {
                WorldScreen.setActiveBottext(BOT_SPUT)
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

            worldUtils.activeImg(Textures.WorldSprite.SPUTNIK)
            worldUtils.scaleTo(0.25, 0.25)
            worldUtils.setPivotRot(view.getWidth() / 2, view.getHeight() / 2, false)
            worldUtils.setPivotMove(0.5, 0.5)
            worldUtils.rotateToDeg(this.sputnik)
            worldUtils.moveTo(view.getWidth() / 2 - 220, view.getHeight() / 2 - 220)
            worldUtils.render()

            Plena.forceRender()

            orchestraBot.scaleToSize(view.getWidth(), 120)
            orchestraBot.render()

            Plena.forceRender()

            orchestraBot.clean()
            orchestraBot.setColor(Color.White.WHITE)
            orchestraBot.scaleToSize(3, 3)
            orchestraBot.moveTo(this.secretStarX, this.secretStarY)
            orchestraBot.render()

            Plena.forceRender()

            textWelcome.setPivotMove(0.5, 0)
            textWelcome.moveTo(view.getWidth() / 2, 16)
            textWelcome.render()

            botText.apply(activeText).setPivotMove(0.5, 0)
            botText.apply(activeText).moveTo(view.getWidth() / 2, 60)
            botText.apply(activeText).render()

            Plena.forceRender()

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

        private inCircularRange(centerX: number, centerY: number, range:number) {
            let mx = Mouse.getX(view)
            let my = Mouse.getY(view)

            let dx = Math.pow((mx - centerX), 2)
            let dy = Math.pow((my - centerY), 2)

            return (Math.sqrt(dx + dy) <= range)
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
        bot: string
        text: ImgGrix

        constructor(index: number, icon: string, id: number, text: ImgGrix, bot:string) {
            let middleW = view.getWidth() / 2
            let middleH = view.getHeight()

            super(middleW - 203 + index * 101, middleH - 100, 100, 100, id)
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
                WorldScreen.setActiveBottext(this.bot)

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