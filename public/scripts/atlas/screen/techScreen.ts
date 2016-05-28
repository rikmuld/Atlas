module TechScreen {
	let tech:number
    let cat: Technologies.TechCat
    let container: WritableGrix

    let heading: TextGrix
    let text: TextGrix

    let invest: ImgGrix

    export const NAME = "TechScreen"

    const INVEST_BUTTON = 50

    let shape: ShapeGrix

    export function loadTechScreen(techn: number, cata: Technologies.TechCat, reverse:boolean = false) {
        tech = techn
        cat = cata

        GuiManager.getHUD().startSlide(reverse, NAME)
    }

    export class TechScreen extends StarsScreen.StarsScreen {
        height: number
        tech: number
        techn: Technologies.Tech

        constructor() {
            let buttons: GuiManager.IButton[] = []

            let techs = cat.getTechIDs()
            let size = techs.length

            for (let t = 0; t < size; t++) {
                buttons.push(new TechButton(view.getWidth() / 2 - (size - 1) * 65 + t * 130, view.getHeight()/2-300, techs[t]))
            }

            buttons.push(new InvestButton(view.getWidth() / 2, view.getHeight() / 2 + 160, INVEST_BUTTON))

            super(buttons)

            this.height = view.getHeight() / 2
            this.tech = tech
            this.techn = Technologies.getTech(tech)

            container.setBackground(Color.mkAlphaColor(cat.getColor() as Color, 0.35))
            container.startWrite(view)

            heading.moveTo(50, view.getHeight() / 12 - 30)
            heading.freeText(this.techn.getName())
            text.moveTo(50, view.getHeight() / 12 + 30)
            text.freeText(this.techn.getDescription(), 575)

            container.endWrite()
        }

        static setup() {
            shape = new ShapeGrix().quad(1, 1).populate()
            heading = Grix.fromFontMap(Assets.mkFontMap(new Font(Font.CONSOLAS, 24).fill(Color.White.WHITE)))
            text = Grix.fromFontMap(Assets.mkFontMap(new Font(Font.CONSOLAS, 20).fill(Color.White.WHITE)))
            container = Grix.writable(Assets.mkWritableImg(800, 400))
            invest = Grix.text("Invest!", new Font(Font.CONSOLAS, 24).fill(Color.White.WHITE))
        }

        update(delta: number) {
            super.update(delta)
        }

        render(delta: number) {
            super.renderStars()

            camera.setView(GuiManager.getHUD().getRenderOffset(), 0)
            view.view()

            container.setPivotMove(0.5, 0.5)
            container.moveTo(view.getWidth() / 2, view.getHeight() / 2)
            container.render()
            Plena.forceRender()

            let icons = StoreScreen.icons

            icons.activeImg(Technologies.getTech(this.tech).getTexture())
            icons.scaleTo(0.25, 0.25)
            icons.setPivotMove(0, 0.5)
            icons.moveTo(view.getWidth() / 2 + 260, view.getHeight() / 2 - 200 + view.getHeight() / 12)
            icons.render()

            super.render(delta)

            camera.setView(0, 0)
            view.view()
        }

        buttonClicked(id: number) {
            if (id == INVEST_BUTTON) {
                this.techn.research(0)
            } else {
                let techs = cat.getTechIDs()

                let iNew = techs.indexOf(id)
                let iOld = techs.indexOf(this.tech)

                if (id != tech) loadTechScreen(id, cat, iNew < iOld)
            }   
        }
    }

    class InvestButton extends SimpleButton {
        constructor(x: number, y: number, id: number) {
            super(x, y, invest.getWidth(), invest.getHeight(), id)
        }

        render() {
            if (this.hover) {
                invest.scaleTo(1.2, 1.2)
            }
            invest.setPivotMove(0.5, 0.5)
            invest.moveTo(this.x, this.y)
            invest.render()
        }

        isInBox(x: number, y: number): boolean {
            return (x >= this.x - this.width / 2 && x <= this.x - this.width / 2 + this.width && y >= this.y - this.height / 2 && y <= this.y + - this.height / 2 + this.height)
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