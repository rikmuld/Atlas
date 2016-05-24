module Textures {
    export let worldSprite: Sprite
    export let iconSprite: Sprite
    export let mapImg: Img

    export function load() {
        worldSprite = Assets.loadSprite("/images/worldUtils.png", Assets.TILE_SHEET)
        mapImg = Assets.loadImg("/images/worldMap.png", Assets.NORMAL)
        iconSprite = Assets.loadSprite("/images/techs.png", Assets.TILE_SHEET)

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