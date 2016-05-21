module Textures {
    export let starImg: Img
    export let worldSprite: Sprite
    export let mapImg: Img

    export function load() {
        starImg = Assets.loadImg("/images/stars.jpg", Assets.BACKGROUND)
        worldSprite = Assets.loadSprite("/images/worldUtils.png", Assets.TILE_SHEET)
        mapImg = Assets.loadImg("/images/worldMap.png", Assets.NORMAL)

        worldSprite.addImg(WorldSprite.CLOUDS, 0, 0, 1024, 1024)
        worldSprite.addImg(WorldSprite.BACK, 1024, 0, 1024, 1024)
        worldSprite.addImg(WorldSprite.CRESANT, 0, 1024, 1024, 1024)
        worldSprite.addImg(WorldSprite.DOCK, 1024, 1024, 433, 111)
        worldSprite.addImg(WorldSprite.BUBBLE, 1024, 1135, 331, 59)
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
}