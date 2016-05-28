module TechScreen {
	let tech:number
    let cat: Technologies.TechCat

    export const NAME = "TechScreen"

    let shape: ShapeGrix

    export function loadTechScreen(techn: number, cata: Technologies.TechCat) {
        tech = techn
        cat = cata

        GuiManager.getHUD().startSlide(false, NAME)
    }

    export class TechScreen extends StarsScreen.StarsScreen {
        x: number
        y: number
        height: number

        constructor() {
            let buttons: GuiManager.IButton[] = []

            super(buttons)

            this.height = view.getHeight() / 2
            this.x = view.getWidth() / 2 - 400
            this.y = view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) + 25
        }

        static setup() {
            shape = new ShapeGrix().quad(1, 1).populate()
        }

        update(delta: number) {
            super.update(delta)
        }

        render(delta: number) {
            super.renderStars()

            camera.setView(GuiManager.getHUD().getRenderOffset(), 0)
            view.view()

            shape.scaleToSize(800, this.height)
            shape.moveTo(this.x, this.y)
            shape.setColor(Color.mkAlphaColor(cat.getColor() as Color, 0.35))
            shape.render()
            Plena.forceRender()

            let icons = StoreScreen.icons

            icons.activeImg(Technologies.getTech(tech).getTexture())
            icons.scaleTo(0.25, 0.25)
            icons.setPivotMove(0, 0.5)
            icons.moveTo(this.x + 660, view.getHeight() / 12 + this.y)
            icons.render()

            let techs = cat.getTechIDs()
            let size = techs.length
            let y = (view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) - 125) / 2 + 138

            for (let t = 0; t < size; t++) {
                let tech = techs[t]

                icons.setPivotMove(0.5, 0.5)
                icons.activeImg(Technologies.getTech(tech).getTexture())
                icons.moveTo(view.getWidth() / 2 - (size - 1) * 65 + t * 130, y)
                icons.render()
            }

            super.render(delta)

            camera.setView(0, 0)
            view.view()
        }

        buttonClicked(id: number) {

        }
    }
}