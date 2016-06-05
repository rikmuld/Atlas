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

    const VERSION = "0.0.62"

    let botText = new TreeMap<String, ImgGrix>(STRING_COMPARE)
    let activeText: string
    let switchTime: number

    let textWelcome: ImgGrix

    let textWorld: ImgGrix
    let textNation: ImgGrix
    let textStore: ImgGrix
    let textExit: ImgGrix

    export let worldUtils: SpriteGrix

    export let freeText: TextGrix

    const BUTTON_STORE = 2
    const BUTTON_NATION = 1
    const BUTTON_WORLD = 0
    const BUTTON_EXIT = 3

    const color = Color.mkColor(227, 227, 227)

    export function registerBottext(key: string, text: string, font: Font) {
        botText.put(key, Grix.text(text, font, Assets.LETTERS, Math.min(2000, vWidth * 1.9)))
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

            let middleW = vWidth / 2
            let middleH = vHeight

            let world = new DockButton(0, Textures.WorldSprite.ICON_WORLD, BUTTON_WORLD, textWorld, BOT_ICON_WORLD)
            let store = new DockButton(1, Textures.WorldSprite.ICON_STORE, BUTTON_STORE, textStore, BOT_ICON_STORE)
            let nation = new DockButton(2, Textures.WorldSprite.ICON_NATIO, BUTTON_NATION, textNation, BOT_ICON_NATION)
            let exit = new DockButton(3, Textures.WorldSprite.ICON_LEAVE, BUTTON_EXIT, textExit, BOT_ICON_EXIT)

            buttons.push(world)
            buttons.push(store)
            buttons.push(nation)
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
            let font = Textures.fontSmall

            registerBottext(BOT_WELCOME, "I am Orchestra-Bot and I will be guiding you throught this experience... Hover over elements for information.", font)
            registerBottext(BOT_STORE, "Welcome to the store! ..*Ahum*..  I'll make a proper text soon!", font)
            registerBottext(BOT_SPUT, "This little one is Sputnik, he keeps a close wacht over the Earth. My little brother lives there, we should visit some time.", font)
            registerBottext(BOT_STAR, "How persceptive of you! This is the only stationary star ever discovered. How? Nobody knows...", font)
            registerBottext(BOT_ICON_WORLD, "In the world view you can see the world, you overall statistics, go to other screens and best of all.. have a nice chat with me, Orchestra-Bot!", font)
            registerBottext(BOT_ICON_NATION, "In the nation view you can visit you own nation. Did you know you can also view nations of other players? Try clicking the little dots on the world!", font)
            registerBottext(BOT_ICON_STORE, "In the store you can invest your presious money in new or existing technologies. The more you invest the more the technology develops, it's really existing!", font)
            registerBottext(BOT_ICON_EXIT, "By clicking this button you will leave ALTAS and head back to Earth. Are you sure you want to leave me.. :'(", font)

            textWelcome = Grix.text("Welcome to ATLAS satalite " + VERSION + "α", Textures.fontBig)
            orchestraBot = Grix.shape().quad(600, 150).setColor(new AColor(color, 0.05)).populate()

            setActiveBottext(BOT_WELCOME)

            worldUtils = Grix.fromSprite(Textures.worldSprite)

            freeText = Grix.fromFontMap(Textures.fontMapSmall)

            font = Textures.fontBig
            textWorld = Grix.text("World View", font)
            textNation = Grix.text("Nation View", font)
            textStore = Grix.text("Visit Store", font)
            textExit = Grix.text("Exit Game", font)
        }

        getRenderOffset(): number {
            return this.offset * this.offMul
        }

        render(delta: number) {
            if (GuiManager.getHudAlpha()) orchestraBot.setColor(new AColor(color, 0.2+GuiManager.getHudAlpha()))
            orchestraBot.scaleToSize(vWidth, 120)
            orchestraBot.render()

            Plena.forceRender()

            let alpha = GuiManager.getHudAlpha()
            let shad = Shader.getShader(Shader.TEXTURE)

            if (alpha) {
                shad.bind()
                shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])
            }

            textWelcome.scaleTo(0.5, 0.5)
            textWelcome.setPivotMove(0.5, 0)
            textWelcome.moveTo(vWidth / 2, 16)
            textWelcome.render()

            botText.apply(activeText).scaleTo(0.5, 0.5)
            botText.apply(activeText).setPivotMove(0.5, 0)
            botText.apply(activeText).moveTo(vWidth / 2, 60)
            botText.apply(activeText).render()

            if (World.ready()) {
                freeText.scaleTo(0.5, 0.5)
                freeText.moveTo(vWidth - 200, vHeight - 130)
                freeText.freeText("$" + Nation.getData().money.toFixed(0))
                freeText.moveTo(vWidth - 200, vHeight - 100)
                freeText.freeText(World.getTime().toFixed(2) + " Years")
                freeText.moveTo(200, 200)
            }

            Plena.forceRender()

            if (alpha) {
                shad.bind()
                shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, alpha/(0.05)])
            }
  
            worldUtils.clean()
            worldUtils.activeImg(Textures.WorldSprite.DOCK)
            worldUtils.setPivotMove(0.5, 1)
            worldUtils.moveTo(vWidth / 2, vHeight)
            worldUtils.render()

            Plena.forceRender()

            if (alpha) {
                shad.bind()
                shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])
            }

            super.render(delta)
        }

        startSlide(right: boolean, nextScreen: string) {
            if (this.offMul)
            this.nextScreen = nextScreen
            this.increaseOffset = 3
            this.offMul = right? -1:1
        }

        buttonClicked(id: number) {
            if (this.offset != 0) return

            let current = GuiManager.getCurrentScreenName()

            switch (id) {
                case BUTTON_STORE:
                    if (current != StoreScreen.NAME) {
                        if (current != CityScreen.NAME) {
                            this.startSlide(current != WorldScreen.NAME, StoreScreen.NAME)
                        } else {
                            $('canvas').fadeOut(200, function () {
                                GuiManager.loadScreen(StoreScreen.NAME)
                                $('canvas').fadeIn(200)
                            })
                        }
                    }
                    break
                case BUTTON_NATION:
                    if (current != CityScreen.NAME) {
                        $('canvas').fadeOut(200, function () {
                            GuiManager.loadScreen(CityScreen.NAME)
                            $('canvas').fadeIn(200)
                        })
                    }
                    break
                case BUTTON_WORLD:
                    if (current!= WorldScreen.NAME) {
                        if (current != CityScreen.NAME) {
                            this.startSlide(true, WorldScreen.NAME)
                        } else {
                            $('canvas').fadeOut(200, function () {
                                GuiManager.loadScreen(WorldScreen.NAME)
                                $('canvas').fadeIn(200)
                            })
                        }
                    }
                    break
            }
        }

        update(delta: number) {
            switchTime += delta

            if (this.nextScreen) {
                this.offset += this.increaseOffset * delta
                if (this.offset > (vWidth/2) + 500) {
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
            let middleW = vWidth / 2
            let middleH = vHeight

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
            Plena.forceRender()

            if (this.isMouseOver()) {
                setActiveBottext(this.bot)

                worldUtils.clean()

                worldUtils.activeImg(Textures.WorldSprite.DOCK)
                let dockHeight = worldUtils.getHeight()

                let alpha = GuiManager.getHudAlpha()
                let shad = Shader.getShader(Shader.TEXTURE)

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, alpha / (0.05)])
                }

                worldUtils.activeImg(Textures.WorldSprite.BUBBLE)
                worldUtils.setPivotMove(0.5, 1)
                worldUtils.moveTo(vWidth / 2, vHeight - dockHeight - 3)
                worldUtils.render()

                let height = worldUtils.getHeight()

                Plena.forceRender()

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])
                }

                this.text.setPivotMove(0.5, 0.5)
                this.text.scaleTo(0.5, 0.5)
                this.text.moveTo(vWidth / 2, vHeight - dockHeight - height / 2 + 3)
                this.text.render()

                Plena.forceRender()

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])
                }
            }
        }
    }
}