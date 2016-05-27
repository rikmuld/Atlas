module OrchestraBot {
    let orchestraBot: ShapeGrix

    export const NAME = "OrchestraBot"

    export const BOT_WELCOME = "welcome"
    export const BOT_STORE = "store"
    export const BOT_STAR = "star"
    export const BOT_SPUT = "sputnik"
    export const BOT_ICON_WORLD = "world_ic"
    export const BOT_ICON_NATION = "nation_ic"
    export const BOT_ICON_STORE = "store_ic"
    export const BOT_ICON_EXIT = "exit_ic"
    export const BOT_NATION_X = "nation_"

    const VERSION = "0.0.49"

    let botText = new TreeMap<String, ImgGrix>(STRING_COMPARE)
    let activeText: string
    let switchTime: number

    let textWelcome: ImgGrix

    let textWorld: ImgGrix
    let textNation: ImgGrix
    let textStore: ImgGrix
    let textExit: ImgGrix

    export let worldUtils: SpriteGrix

    const BUTTON_STORE = 2
    const BUTTON_NATION = 1
    const BUTTON_WORLD = 0
    const BUTTON_EXIT = 3

    export function registerBottext(key: string, text: string, font:Font) {
        botText.put(key, Grix.text(text, font, Assets.LETTERS, 1000))
        activeText = key
    }

    export function setActiveBottext(key: string) {
        activeText = key
        switchTime = 0
    }

    export class OrchestraBot extends ClickableScreen {
        private message: string
        private offset: number
        private increaseOffset: number 
        private offMul:number 
        private nextScreen:string

        constructor() {
            this.message = BOT_WELCOME

            let buttons:GuiManager.IButton[] = []

            let middleW = view.getWidth() / 2
            let middleH = view.getHeight()

            let world = new DockButton(0, Textures.WorldSprite.ICON_WORLD, BUTTON_WORLD, textWorld, BOT_ICON_WORLD)
            let nation = new DockButton(1, Textures.WorldSprite.ICON_NATIO, BUTTON_NATION, textNation, BOT_ICON_NATION)
            let store = new DockButton(2, Textures.WorldSprite.ICON_STORE, BUTTON_STORE, textStore, BOT_ICON_STORE)
            let exit = new DockButton(3, Textures.WorldSprite.ICON_LEAVE, BUTTON_EXIT, textExit, BOT_ICON_EXIT)

            buttons.push(world)
            buttons.push(nation)
            buttons.push(store)
            buttons.push(exit)

            this.offset = 0
            this.increaseOffset = 0
            this.offMul = 1

            super(buttons)
        }

        setStickMessage(stick: string) {
            this.message = stick
        }

        static setup() {
            let font = new Font(Font.CONSOLAS, 20).fill(Color.mkColor(245, 245, 245))

            registerBottext(BOT_WELCOME, "I am Orchestra-Bot and I will be guiding you throught this experience... Hover over elements for information.", font)
            registerBottext(BOT_STORE, "Welcome to the store! ..*Ahum*..  I'll make a proper text soon!", font)
            registerBottext(BOT_SPUT, "This little one is Sputnik, he keeps a close wacht over the Earth. My little brother lives there, we should visit some time.", font)
            registerBottext(BOT_STAR, "How persceptive of you! This is the only stationary star ever discovered. How? Nobody knows...", font)
            registerBottext(BOT_ICON_WORLD, "In the world view you can see the world, you overall statistics, go to other screens and best of all.. have a nice chat with me, Orchestra-Bot!", font)
            registerBottext(BOT_ICON_NATION, "In the nation view you can visit you own nation. Did you know you can also view nations of other players? Try clicking the little dots on the world!", font)
            registerBottext(BOT_ICON_STORE, "In the store you can invest your presious money in new or existing technologies. The more you invest the more the technology develops, it's really existing!", font)
            registerBottext(BOT_ICON_EXIT, "By clicking this button you will leave ALTAS and head back to Earth. Are you sure you want to leave me.. :'(", font)

            textWelcome = Grix.text("Welcome to ATLAS satalite " + VERSION + "α", font.size(24))
            orchestraBot = Grix.shape().quad(600, 150).setColor(Color.mkAlphaColor(227, 227, 227, 0.05)).populate()

            setActiveBottext(BOT_WELCOME)

            worldUtils = Grix.fromSprite(Textures.worldSprite)

            font = font.size(24)
            textWorld = Grix.text("World View", font)
            textNation = Grix.text("Nation View", font)
            textStore = Grix.text("Visit Store", font)
            textExit = Grix.text("Exit Game", font)
        }

        getRenderOffset(): number {
            return this.offset * this.offMul
        }

        render(delta: number) {
            orchestraBot.scaleToSize(view.getWidth(), 120)
            orchestraBot.render()

            Plena.forceRender()

            textWelcome.setPivotMove(0.5, 0)
            textWelcome.moveTo(view.getWidth() / 2, 16)
            textWelcome.render()

            botText.apply(activeText).setPivotMove(0.5, 0)
            botText.apply(activeText).moveTo(view.getWidth() / 2, 60)
            botText.apply(activeText).render()

            Plena.forceRender()

            worldUtils.clean()
            worldUtils.activeImg(Textures.WorldSprite.DOCK)
            worldUtils.setPivotMove(0.5, 1)
            worldUtils.moveTo(view.getWidth() / 2, view.getHeight())
            worldUtils.render()

            Plena.forceRender()

            super.render(delta)
        }

        buttonClicked(id: number) {
            if (this.offset != 0) return
            switch (id) {
                case BUTTON_STORE:
                    if (GuiManager.getCurrentScreenName() != StoreScreen.NAME) {
                        if (GuiManager.getCurrentScreenName() != CityScreen.NAME) {
                            this.nextScreen = StoreScreen.NAME
                            this.increaseOffset = 3
                            this.offset = 1
                        } else {
                            GuiManager.loadScreen(StoreScreen.NAME)
                        }
                    }
                    break
                case BUTTON_NATION:
                    GuiManager.loadScreen(CityScreen.NAME)
                    break
                case BUTTON_WORLD:
                    if (GuiManager.getCurrentScreenName() != WorldScreen.NAME) {
                        if (GuiManager.getCurrentScreenName() != CityScreen.NAME) {
                            this.nextScreen = WorldScreen.NAME
                            this.increaseOffset = 3
                            this.offset = -1
                        } else {
                            GuiManager.loadScreen(WorldScreen.NAME)
                        }
                    }
                    break
            }
        }

        update(delta: number) {
            switchTime += delta

            if (this.nextScreen) {
                this.offset += this.increaseOffset * delta
                if (this.offset > 2*(view.getWidth()/3)) {
                    GuiManager.loadScreen(this.nextScreen)
                    this.nextScreen = null
                    this.offMul = -this.offMul
                }
            } else if (this.offset != 0) {
                this.offset -= this.increaseOffset * delta
                if (this.offset <= 0) {
                    this.offset = 0
                    this.increaseOffset = 0
                }
            }

            if (switchTime > 1500) setActiveBottext(this.message)

            super.update(delta)
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
                setActiveBottext(this.bot)

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