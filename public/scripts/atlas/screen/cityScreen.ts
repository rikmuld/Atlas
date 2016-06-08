//button back to world
//preview of tech icons below city
module CityScreen {
    let background: ImgGrix
    let nationUtits: SpriteGrix

    let orchestropia: ImgGrix
    let techs: ImgGrix

    export const NAME = "CityScreen"

    export const NATION_NAME = ["Boscor", "Mypos", "Mushroom Kingdom", "Drachma", "Krikkit", "Asgard"]

    export class CityScreen extends ClickableScreen {
        bX: number
        bY: number

        cloudy: number
        balloon: number
        cloudies: number[]

        constructor() {
            super([])

            GuiManager.setHudAlpha(0.25)
            GuiManager.getHUD().setStickMessage(OrchestraBot.BOT_NATION)
            OrchestraBot.setActiveWelcome(OrchestraBot.PRIM_NATION)

            let golden = 16/9

            if ((vWidth / vHeight) != golden){
                if ((vWidth / vHeight) > golden) this.bX = vWidth
                else this.bY = vHeight
            }

            this.cloudy = 0
            this.balloon = 0
            this.cloudies = []
            for (let i = 0; i < 6; i++) {
                this.cloudies.push(Math.random() * Math.PI * 2)
            }
        }

        static setup() {
            nationUtits = Grix.fromSprite(Textures.cities) 
            background = Grix.fromTexture(Textures.nation)

            orchestropia = Grix.text(NATION_NAME[id], Textures.fontBig)
            techs = Grix.text("most used technologies:", Textures.fontSmall)

            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_SUN_M, "This is the percentage of sun hours a day. Your nations has more than the average which is beneficial for solar panels.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_SUN_L, "This is the percentage of sun hours a day. Your nations has less than the average, solar panels will be a bit less efficient.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_WIND_M, "This is the average wind speed in your nation. Your nation has a greater wind speed than average, which is beneficial for wind turbines!", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_WIND_L, "This is the average wind speed of your nation. Your nations has less than the average, wind turbines will generate less energy.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_SIZE, "This is the total surface area of your nation.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_FERT_M, "This is the fertility of your nation, or in other words the land quality. Your nation is more fertile than average, which means that you need less energy to sustain your population.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_FERT_L, "This is the fertility of your nation, or in other words the land quality. Your nation is less fertile than average, which means that you need more energy to sustain your population.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_TAX, "This is the tax money you will receive per year, you can spend about 3% of this on scientific research. This varies based on the happiness and fertility of your nation.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_COAL, "This is the amount of fossil fuels left in the ground, the lower it becomes to more expensive mining will be. Researching mining will improve this.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_NATURAL, "This is the amount of materials such as metals left in the ground, this feature however, is not implemented yet.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_ENERGY, "This is the percentage of clean energy your nation is currently using.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_NAT_TERRAIN, "These are the terrain types of your nation. Some technologies work better in combination with certain types of terrains, some may also require a certain type of terrain.", Textures.fontSmall)
            OrchestraBot.registerBottext(OrchestraBot.BOT_HOVER_NATION, "These are the top 5 technologies that you use most. The numbers below the technology represent the current level of development.", Textures.fontSmall)
        }

        buttonClicked(id:number) {

        }

        update(delta: number) {
            this.cloudy += delta * 0.0002
            this.balloon += delta * 0.00075
        }

        balloonX(): number {
            let scale = 10 / (3 - Math.cos(2 * this.balloon));
            return scale * Math.cos(this.balloon);
        }

        balloonY(): number {
            let scale = 30 / (3 - Math.cos(2 * this.balloon));
            return scale * Math.sin(this.balloon * 2) / 2;
        }

        render(delta: number) {
            if (this.bY) background.scaleHeightToSize(this.bY)
            else if (this.bX) background.scaleWidthToSize(this.bX)
            background.setPivotMove(0.5, 0.5)
            background.moveTo(vWidth / 2, vHeight / 2)
            background.render()

            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.activeImg(Textures.NationSprite.CLOUDY)
            for (let i = 0; i < this.cloudies.length / 2; i++) {
                nationUtits.moveTo(vWidth / 2 - 50 + this.cloudyX(i), vHeight / 2 - 220 + this.cloudyY(i))
                nationUtits.render()
            }
            Plena.forceRender()

            nationUtits.scaleTo(0.55, 0.55)
            nationUtits.setPivotMove(0.5, 0)
            nationUtits.activeImg(Textures.NationSprite.CITY_GREEN)
            nationUtits.moveTo(vWidth / 2, vHeight / 2 - 240)
            nationUtits.render()

            Plena.forceRender()

            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.setPivotMove(0.5, 0.5)
            nationUtits.activeImg(Textures.NationSprite.BALLOON)
            nationUtits.moveTo(vWidth / 2 + 200 + this.balloonX(), vHeight / 2 - 225 + this.balloonY())
            nationUtits.render()

            Plena.forceRender()

            let shad = Shader.getShader(Shader.TEXTURE)

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 0.175])

            nationUtits.activeImg(Textures.NationSprite.DOCK)
            nationUtits.setPivotMove(0.5, 0.5)
            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.moveTo(vWidth / 2, vHeight / 2 + 167)
            nationUtits.render()

            Plena.forceRender()

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])

            nationUtits.scaleTo(0.5, 0.5)
            nationUtits.activeImg(Textures.NationSprite.CLOUDY)
            for (let i = this.cloudies.length / 2; i < this.cloudies.length; i++) {
                nationUtits.moveTo(vWidth / 2 - 50 + this.cloudyX(i), vHeight / 2 - 220 + this.cloudyY(i))
                nationUtits.render()
            }
            Plena.forceRender()

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])

            orchestropia.setPivotMove(0.5, 0.5)
            orchestropia.scaleTo(0.5, 0.5)
            orchestropia.moveTo(vWidth / 2, vHeight / 2 + 60)
            orchestropia.render()

            techs.setPivotMove(0.5, 0.5)
            techs.scaleTo(0.5, 0.5)
            techs.moveTo(vWidth / 2, vHeight / 2 + 90)
            techs.render()

            Plena.forceRender()

            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])

            let x = vWidth / 2 - 240
            let y = vHeight / 2 + 160
            for (let i = 0; i < 5; i++) {
                Technologies.renderFiller(x, y, 0.25)
                x += 120
            }

            Plena.forceRender()

            let mostTech = Technologies.mostUsed(5) 

            x = vWidth/2 - 240
            for (let tech of mostTech) {
                tech.render(x, y, 0.25)
                x += 120
            }

            let tex = Textures.NationSprite
            let icons = [tex.IC_SUN, tex.IC_WIND, tex.IC_SIZE, tex.IC_FERTILE,
                tex.IC_MONEY, tex.IC_COAL, tex.IC_ENERGY, tex.IC_NATURAL,
                tex.IC_MOUNT]

            x = -237
            for (let ic of icons) {
                nationUtits.activeImg(ic)
                nationUtits.scaleTo(0.25, 0.25)
                nationUtits.setPivotMove(0.5, 0.5)
                nationUtits.moveTo(vWidth / 2 + x, vHeight / 2 + 250)
                nationUtits.render()

                x += 60
            }

            Plena.forceRender()
            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])

            x = -237
            for (let ic of icons) {
                if (inCircularRange(vWidth / 2 + x, vHeight / 2 + 250, 16)) {
                    OrchestraBot.freeText.scaleTo(0.5, 0.5)
                    OrchestraBot.freeText.moveTo(vWidth / 2, vHeight / 2 + 285)
                    let text = ""
                    switch (ic) {
                        case tex.IC_SUN:
                            let sun = Nation.getData().landType.sunny
                            text = "Sunny: " + sun.toFixed(0) + "%"
                            OrchestraBot.setActiveBottext(sun >= Model.NationDefaults.SUNNY ? OrchestraBot.BOT_NAT_SUN_M : OrchestraBot.BOT_NAT_SUN_L)
                            break;
                        case tex.IC_WIND:
                            let windy = Nation.getData().landType.windy
                            text = "Windy: " + windy.toFixed(0) + " km/h"
                            OrchestraBot.setActiveBottext(windy >= Model.NationDefaults.WINDY ? OrchestraBot.BOT_NAT_WIND_M : OrchestraBot.BOT_NAT_WIND_L)
                            break;
                        case tex.IC_SIZE:
                            text = "Size: " + (Nation.getData().landType.size / 1000).toFixed(0) + " Thousand km²"
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_SIZE)
                            break;
                        case tex.IC_FERTILE:
                            let fertil = Nation.getData().landType.fertile
                            text = "Fertile: " + Nation.getData().landType.fertile.toFixed(0) + "%"
                            OrchestraBot.setActiveBottext(fertil >= Model.NationDefaults.FERTILE ? OrchestraBot.BOT_NAT_FERT_M : OrchestraBot.BOT_NAT_FERT_L)
                            break;
                        case tex.IC_MONEY:
                            text = "Tax: $" + (Model.Nation.tax(1, Nation.getData(), World.getWorld()) / 1000000000).toFixed(0) + " Bilion per year"
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_TAX)
                            break;
                        case tex.IC_COAL:
                            text = "Fossil Fuels: " + (Nation.getData().landType.resourcesEDensity / 1000).toFixed(0) + " MWh/km²"
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_COAL)
                            break;
                        case tex.IC_ENERGY:
                            text = "Clean Energy: 0%"
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_ENERGY)
                            break;
                        case tex.IC_NATURAL:
                            text = "Materials: ..."
                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_NATURAL)
                            break;
                        case tex.IC_MOUNT:
                            let types = Nation.getData().landType.terrain
                            text = "Terrain types: "

                            for (let type = 0; type < types.length; type++) {
                                text += Model.TERRAIN[types[type]] + (type+1 == types.length ? "" : (type+1 == types.length-1? " and ":", "))
                            }

                            OrchestraBot.setActiveBottext(OrchestraBot.BOT_NAT_TERRAIN)
                            break;
                    }

                    let w = OrchestraBot.freeText.length(text)
                    OrchestraBot.freeText.move(-w/2, 0)
                    OrchestraBot.freeText.freeText(text)
                }
                x += 60
            }

            Plena.forceRender()
            shad.bind()
            shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])
        }

        cloudyX(cloudy: number):number {
            let scale = 400 / (3 - Math.cos(2 * (this.cloudy + this.cloudies[cloudy])));
            return scale * Math.cos((this.cloudy + this.cloudies[cloudy]));
        }

        cloudyY(cloudy: number):number {
            let scale = 250 / (3 - Math.cos(2 * (this.cloudy + this.cloudies[cloudy])));
            return scale * Math.sin((this.cloudy + this.cloudies[cloudy]) * 3)/2;
        }
    }
}
