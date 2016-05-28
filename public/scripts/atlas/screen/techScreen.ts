module TechScreen {
	let tech:number
    let cat: Technologies.TechCat

    let heading: TextGrix
    let text: TextGrix

    export const NAME = "TechScreen"

    let shape: ShapeGrix

    export function loadTechScreen(techn: number, cata: Technologies.TechCat, reverse:boolean = false) {
        tech = techn
        cat = cata

        GuiManager.getHUD().startSlide(reverse, NAME)
    }

    export class TechScreen extends StarsScreen.StarsScreen {
        x: number
        y: number
        height: number
        tech: number
        techn: Technologies.Tech

        constructor() {
            let buttons: GuiManager.IButton[] = []

            let techs = cat.getTechIDs()
            let size = techs.length
            let y = (view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) - 125) / 2 + 138

            for (let t = 0; t < size; t++) {
                buttons.push(new TechButton(view.getWidth() / 2 - (size - 1) * 65 + t * 130, y, techs[t]))
            }

            super(buttons)

            this.height = view.getHeight() / 2
            this.x = view.getWidth() / 2 - 400
            this.y = view.getHeight() / 2 - ((view.getHeight() / 6) * 1.5) + 25
            this.tech = tech
            this.techn = Technologies.getTech(tech)
        }

        static setup() {
            shape = new ShapeGrix().quad(1, 1).populate()
            heading = Grix.fromFontMap(Assets.mkFontMap(new Font(Font.CONSOLAS, 24).fill(Color.White.WHITE)))
            text = Grix.fromFontMap(Assets.mkFontMap(new Font(Font.CONSOLAS, 20).fill(Color.White.WHITE)))
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

            icons.activeImg(Technologies.getTech(this.tech).getTexture())
            icons.scaleTo(0.25, 0.25)
            icons.setPivotMove(0, 0.5)
            icons.moveTo(this.x + 660, view.getHeight() / 12 + this.y)
            icons.render()

            heading.moveTo(this.x + 50, this.y + view.getHeight() / 12 - 30)
            heading.freeText(this.techn.getName())
            text.moveTo(this.x + 50, this.y + view.getHeight() / 12 + 30)
            text.freeText(this.techn.getDescription(), 575)

            super.render(delta)

            camera.setView(0, 0)
            view.view()
        }

        buttonClicked(id: number) {
            let techs = cat.getTechIDs()

            let iNew = techs.indexOf(id)
            let iOld = techs.indexOf(this.tech)

            loadTechScreen(id, cat, iNew < iOld)    
        }
    }

    class TechButton extends SimpleButton {
        constructor(x:number, y:number, tech:number) {
            super(x, y, 99, 99, tech)
        }

        render(delta: number) {
            let icons = StoreScreen.icons

            icons.scaleToSize(this.width, this.height)
            icons.setPivotMove(0.5, 0.5)
            icons.activeImg(Technologies.getTech(this.id).getTexture())
            icons.moveTo(this.x, this.y)
            icons.render()
        }

        isInBox(x: number, y: number): boolean {
            return inCircularRange(this.x, this.y, this.width/2)
        }
    }
}