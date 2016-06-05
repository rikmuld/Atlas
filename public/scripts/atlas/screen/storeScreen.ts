module StoreScreen {
    export const NAME = "StoreScreen"

    let groups: ImgGrix[] = []

    let colorGrix: ShapeGrix

    export class StoreScreen extends StarsScreen.StarsScreen {
        canClick: boolean

        constructor() {
            let buttons: GuiManager.IButton[] = []
            let cats = Technologies.catagories
            let spacer = vHeight / 6

            for (let g = 0; g < cats.length; g++) {
                let x = vWidth / 2 - 400 + Math.floor(g / 3) * 400
                let y = vHeight / 2 - (spacer * 1.5) + spacer * (g % 3) + 25

                buttons.push(new CatButton(x, y, g + 10, cats[g], groups[g]))
            }

            super(buttons)

            this.canClick = true
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_STORE)
            OrchestraBot.setActiveWelcome(OrchestraBot.PRIM_STORE)
        }

        static setup() {
            let group = Technologies.catagories
            let font = Textures.fontBig
            for (let g of group) {
                let name = g.getName()
                groups.push(Grix.text(name, font))
            }

            colorGrix = Grix.shape().quad(1, 1).populate()
        }

        update(delta: number) {
            super.update(delta)
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

        constructor(x: number, y: number, id: number, cat: Technologies.TechCat, text: ImgGrix) {
            let spacer = vHeight / 6

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
            this.text.scaleTo(0.5, 0.5)
            this.text.moveTo(140 + this.x, vHeight / 12 + this.y)
            this.text.render()

            let tId = this.techs[0]
            let t = Technologies.getTech(tId)

            t.render(this.x + 310, vHeight / 12 + this.y, 0.25, false)

            if (this.hover) {
                let size = this.techs.length
                let y = (vHeight / 2 - ((vHeight / 6) * 1.5) - 125)/2 + 138

                for (let t = 0; t < size; t++) {
                    let tech = this.techs[t]
                    Technologies.getTech(tech).render(vWidth / 2 - (size - 1) * 65 + t * 130, y, 0.25)
                }
            }
        }
    }
}