module Textures {
    export let starImg: Img
    export let worldSprite: Sprite
    export let mapImg: Img

    export function load() {
        starImg = Assets.loadImg("/images/stars.jpg", Assets.BACKGROUND)
        worldSprite = Assets.loadSprite("/images/worldUtils.png", Assets.NORMAL)
        mapImg = Assets.loadImg("/images/worldMap.png", Assets.NORMAL)

        worldSprite.addImg(WorldSprite.CLOUDS, 0, 0, 1000, 1000)
        worldSprite.addImg(WorldSprite.BACK, 1000, 0, 1000, 1000)
        worldSprite.addImg(WorldSprite.CRESANT, 0, 1000, 1000, 1000)
    }

    export namespace WorldSprite {
        export const CLOUDS = "clouds"
        export const BACK = "back"
        export const CRESANT = "cresant"
    }
}