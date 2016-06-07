//some orchestrabot hovers
module WorldScreen {
    let worldMap: ImgGrix
    let worldUtils: SpriteGrix

    export const NAME = "WorldScreen"

    export class WorldScreen extends StarsScreen.StarsScreen {
        worldOffset: number
        worldOffsetOld:number

        mouseBegin: number
        dragging: boolean
        canDrag: boolean

        cloudX: number 
        cloudY: number

        counter: number 
        sputnik: number

        constructor() {
            super([])
             
            this.worldOffset = 0.164

            this.dragging = false
            this.canDrag = true

            this.counter = 1000000
            this.sputnik = 0

            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_WELCOME)
            OrchestraBot.setActiveWelcome(OrchestraBot.PRIM_SATALITE)
        }

        static setup() {
            worldMap = new ImgGrix().mkCircle(Textures.mapImg, 441, 500, 0, 0, 0, 0, 200).populate()
            worldUtils = OrchestraBot.worldUtils
        }

        update(delta: number) {
            super.update(delta)

            this.worldOffsetOld = this.worldOffset
            this.sputnik += 0.01 * delta

            if (Keyboard.isDown(Keyboard.KEY_LEFT)) this.worldOffset += 0.0004 * delta
            if (Keyboard.isDown(Keyboard.KEY_RIGHT)) this.worldOffset -= 0.0004 * delta

            this.setCloudXY()

            let mx = Mouse.getX(view)
            let my = Mouse.getY(view)

            if (this.dragging) {
                this.worldOffset += (this.mouseBegin - mx) / (0.5*worldMap.getImg().getWidth())
                this.mouseBegin = mx
            }

            if (this.canDrag) {
                let cx = vWidth / 2
                let cy = vHeight / 2

                if (inCircularRange(cx, cy, 220)) {
                    if (Mouse.isDown(Mouse.LEFT)) {
                        this.dragging = true
                        this.mouseBegin = mx
                    } 
                    setCursor("move")
                }

                this.canDrag = false
            }
            if (this.dragging) setCursor("move")

            if (!Mouse.isDown(Mouse.LEFT)) {
                this.canDrag = true
                this.dragging = false
            }

            let angle = MMath.toRad(this.sputnik) - Math.PI * 0.75
            let x = Math.cos(angle) * 311 + vWidth / 2
            let y = Math.sin(angle) * 311 + vHeight / 2
            if (inCircularRange(x, y, 30)) {
                OrchestraBot.setActiveBottext(OrchestraBot.BOT_SPUT)
            }

            if (this.worldOffsetOld == this.worldOffset) this.counter += delta
            else this.counter = 0

            if (this.counter > 2500) this.worldOffset += 0.00002 * delta
        }

        render(delta: number) {
            this.renderStars()

            camera.setView(GuiManager.getHUD().getRenderOffset(), 0)
            view.view()

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

            worldUtils.activeImg(Textures.WorldSprite.SPUTNIK)
            worldUtils.scaleTo(0.25, 0.25)
            worldUtils.setPivotRot(vWidth / 2, vHeight / 2, false)
            worldUtils.setPivotMove(0.5, 0.5)
            worldUtils.rotateToDeg(this.sputnik)
            worldUtils.moveTo(vWidth / 2 - 220, vHeight / 2 - 220)
            worldUtils.render()

            worldUtils.clean()
            worldUtils.activeImg(Textures.WorldSprite.NATION_CLICK_DOCK)
            worldUtils.setPivotMove(0.5, 0.5)
            worldUtils.moveTo(vWidth / 2 + 400, vHeight / 2)
            worldUtils.render()

            worldUtils.activeImg(Textures.WorldSprite.NATION_C_EYE)
            worldUtils.moveTo(vWidth / 2 + 400 + 2, vHeight / 2 - 45)
            worldUtils.render()

            worldUtils.activeImg(Textures.WorldSprite.NATION_C_HAND)
            worldUtils.moveTo(vWidth / 2 + 400 + 2, vHeight / 2)
            worldUtils.render()

            worldUtils.activeImg(Textures.WorldSprite.NATION_C_TALK)
            worldUtils.moveTo(vWidth / 2 + 400 + 2, vHeight / 2 + 45)
            worldUtils.render()

            Plena.forceRender()
            
            super.render(delta)
            camera.setView(0, 0)
            view.view()
        }

        private setWorldUtil(key: string) {
            worldUtils.scaleTo(0.5, 0.5)
            this.center(worldUtils)
            worldUtils.activeImg(key)
        }

        private setCloudXY() {
            this.cloudX = (50 * (vmx / vHeight) - 25*(vWidth/vHeight)) | 0
            this.cloudY = (50 * (vmy / vHeight) - 25) | 0
        }

        private center(grix:Grix) {
            grix.setPivotMove(0.5, 0.5)
            grix.moveTo(vWidth / 2, vHeight / 2)
        }

        buttonClicked(id: number) {

        }
    }
}