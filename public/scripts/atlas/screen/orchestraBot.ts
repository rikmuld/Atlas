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

    let botText = new TreeMap<String, ImgGrix>(STRING_COMPARE)
    let activeText: string
    let switchTime: number

    let textWelcome: ImgGrix

    export function registerBottext(key: string, text: string, font:Font) {
        botText.put(key, Grix.text(text, font, Assets.LETTERS, 1000))
        activeText = key
    }

    export function setActiveBottext(key: string) {
        activeText = key
        switchTime = 0
    }

    export class OrchestraBot implements GuiManager.IScreen {
        message:string

        constructor(stickMessage?: string) {
            if (stickMessage) {
                this.message = stickMessage
            } else this.message = BOT_WELCOME
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

            textWelcome = Grix.text("Welcome to ATLAS satalite 0.0.41α", font.size(24))
            orchestraBot = Grix.shape().quad(600, 150).setColor(Color.mkAlphaColor(227, 227, 227, 0.05)).populate()

            setActiveBottext(BOT_WELCOME)
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
        }

        update(delta: number) {
            switchTime += delta
            if (switchTime > 1500) setActiveBottext(this.message)
        }
    }
}