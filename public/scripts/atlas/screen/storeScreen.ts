module StoreScreen {
    export const NAME = "StoreScreen"

    let icons: SpriteGrix

    export class StoreScreen extends StarsScreen.StarsScreen {
        HUD: GuiManager.IScreen

        constructor() {
            super([])

            this.HUD = new OrchestraBot.OrchestraBot(OrchestraBot.BOT_STORE)
        }

        static setup() {
            icons = Grix.fromSprite(Textures.iconSprite)
        }

        update(delta: number) {
            super.update(delta)

            let niceOrder = [0, 5, 15, 16, 17, 18, 19, 1, 6, 11, 2, 7, 12, 10, 3, 8, 13, 4, 9, 14]
            for (let icon = 0; icon < 20; icon++) {
                let iconName = Textures.getTechIcon(niceOrder[icon])

                icons.activeImg(iconName)
                icons.scaleTo(0.5, 0.5)
                icons.moveTo(200 + (icon % 7) * 200, 200 + Math.floor(icon / 7) * 200)
                icons.render()
            }

            this.HUD.update(delta)
        }

        render(delta: number) {
            this.renderStars()
            super.render(delta)

            this.HUD.render(delta)
        }
    }
}