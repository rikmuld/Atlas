module StoreScreen {
    export const NAME = "StoreScreen"

    export let icons: SpriteGrix
    let groups: ImgGrix[] = []

    let colorGrix: ShapeGrix

    export class StoreScreen extends StarsScreen.StarsScreen {
        active: number
        canClick: boolean

        constructor() {
            let buttons: GuiManager.IButton[] = []
            let cats = Technologies.catagories
            let spacer = view.getHeight() / 6

            for (let g = 0; g < cats.length; g++) {
                let x = view.getWidth() / 2 - 400 + Math.floor(g / 3) * 400
                let y = view.getHeight() / 2 - (spacer * 1.5) + spacer * (g % 3) + 25

                buttons.push(new CatButton(x, y, g + 10, cats[g], groups[g]))
            }

            super(buttons)

            this.active = -1
            this.canClick = true
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_STORE)
        }

        static setup() {
            icons = Grix.fromSprite(Textures.iconSprite)
            let group = Technologies.catagories
            let font = new Font(Font.CONSOLAS, 24).fill(Color.mkColor(245, 245, 245))
            for (let g of group) {
                let name = g.getName()
                groups.push(Grix.text(name, font))
            }

            colorGrix = Grix.shape().quad(1, 1).populate()
        }

        update(delta: number) {
            super.update(delta)
        }

        setActive(g: number) {
            this.active = g
        }

        render(delta: number) {
            super.renderStars()

            camera.setView(GuiManager.getHUD().getRenderOffset(), 0)
            view.view()

            super.render(delta)
            camera.setView(0, 0)
            view.view()
        }

        buttonClicked(id: number) {
            for (let g = 10; g < 10 + Technologies.catagories.length; g++) {
                if (g == id) {
                    let cat = Technologies.catagories[g - 10]
                    TechScreen.loadTechScreen(cat.getTechIDs()[0], cat)
                }
            }
        }
    }

    class CatButton extends SimpleButton {
        color: Col
        text: ImgGrix
        techs: number[]

        static lastActive: number = -1

        constructor(x: number, y: number, id: number, cat: Technologies.TechCat, text: ImgGrix) {
            let spacer = view.getHeight() / 6

            super(x, y, 400, spacer, id)
            this.color = Color.mkAlphaColor(cat.getColor() as Color, 0.35)
            this.techs = cat.getTechIDs()
            this.text = text
        }

        render(delta: number) {
            colorGrix.scaleToSize(this.width, this.height)
            colorGrix.moveTo(this.x, this.y)
            colorGrix.setColor(this.color)
            colorGrix.render()

            Plena.forceRender()

            this.text.setPivotMove(0.5, 0.25)
            this.text.moveTo(140 + this.x, view.getHeight() / 12 + this.y)
            this.text.render()

            let tId = this.techs[0]
            let t = Technologies.getTech(tId)

            icons.activeImg(t.getTexture())
            icons.scaleTo(0.25, 0.25)
            icons.setPivotMove(0, 0.5)
            icons.moveTo(this.x + 260, view.getHeight() / 12 + this.y)
            icons.render()

            if (this.hover || CatButton.lastActive == this.id) {
                let size = this.techs.length
                let y = (view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) - 125)/2 + 138

                for (let t = 0; t < size; t++) {
                    let tech = this.techs[t]

                    icons.setPivotMove(0.5, 0.5)
                    icons.activeImg(Technologies.getTech(tech).getTexture())
                    icons.moveTo(view.getWidth() / 2 - (size - 1) * 65 + t * 130, y)
                    icons.render()
                }

                CatButton.lastActive = this.id
            }
        }
    }
}