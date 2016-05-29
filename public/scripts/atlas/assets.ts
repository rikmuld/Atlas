module Textures {
    export let worldSprite: Sprite
    export let iconSprite: Sprite
    export let mapImg: Img
    export let nation: Img
    export let cities: Sprite
    export let fontBig: Font
    export let fontSmall: Font

    export function load() {
        console.log("Registering Assets")

        worldSprite = Assets.loadSprite("/images/worldUtils.png", Assets.TILE_SHEET)
        mapImg = Assets.loadImg("/images/worldMap.png", Assets.NORMAL)
        iconSprite = Assets.loadSprite("/images/techs.png", Assets.TILE_SHEET)
        nation = Assets.loadImg("/images/nation.png", Assets.NORMAL)
        cities = Assets.loadSprite("/images/cities.png", Assets.TILE_SHEET)

        cities.addImgs([NationSprite.CITY_GREEN, NationSprite.CITY_POLLUTED], 0, 0, 901, 433, 2, true)
        cities.addImg(NationSprite.CLOUDY, 0, 866, 171, 71)

        let names = []
        for (let name = 0; name < 20; name++) {
            names.push(name.toString())
        }
        iconSprite.addImgs(names, 0, 0, 395, 395, 20)

        worldSprite.addImg(WorldSprite.CLOUDS, 0, 0, 1024, 1024)
        worldSprite.addImg(WorldSprite.BACK, 1024, 0, 1024, 1024)
        worldSprite.addImg(WorldSprite.CRESANT, 0, 1024, 1024, 1024)
        worldSprite.addImg(WorldSprite.DOCK, 1024, 1024, 433, 101)
        worldSprite.addImg(WorldSprite.BUBBLE, 1024, 1135, 299, 59)
        worldSprite.addImg(WorldSprite.SPUTNIK, 1536, 1024, 148, 148)
        worldSprite.addImg(WorldSprite.ICON_WORLD, 1024, 1536, 200, 200)
        worldSprite.addImg(WorldSprite.ICON_NATIO, 1224, 1536, 200, 200)
        worldSprite.addImg(WorldSprite.ICON_STORE, 1424, 1536, 200, 200)
        worldSprite.addImg(WorldSprite.ICON_LEAVE, 1624, 1536, 200, 200)

        fontBig = new Font(Font.CONSOLAS, 24).fill(new Color(250, 250, 250))
        fontSmall = new Font(Font.CONSOLAS, 20).fill(new Color(250, 250, 250))
    }

    export namespace NationSprite {
        export const CITY_GREEN = "greenCity"
        export const CITY_POLLUTED = "pollutedCity"
        export const CLOUDY = "cloudy"
    }

    export namespace WorldSprite {
        export const CLOUDS = "clouds"
        export const BACK = "back"
        export const CRESANT = "cresant"
        export const DOCK = "dock"
        export const BUBBLE = "bubble"
        export const SPUTNIK = "sputnik"
        export const ICON_STORE = "store"
        export const ICON_WORLD = "world"
        export const ICON_NATIO = "nation"
        export const ICON_LEAVE = "exit"
    }

    export function getTechIcon(index: number):string {
        return index.toString()
    }
}