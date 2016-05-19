let started = false
let timer = 0
let view: Views.View
let width: number
let height: number
let resized: boolean
let id:number

function setup() {
    view = Plena.getDefaultView()
    width = Plena.width
    height = Plena.height

    Textures.load()

    World.init()
    Nation.init(id)

    GuiManager.registerScreen(WorldScreen)
    GuiManager.registerScreen(StoreScreen)
    GuiManager.registerScreen(CityScreen)

    GuiManager.loadScreen(WorldScreen.NAME)
}

function render(delta: number) {
    let resized = resize()
    if(!resized) GuiManager.render(delta)
}

function update(delta: number) {
    GuiManager.update(delta)

    timer += delta
    if (timer > 1000) {
        Nation.update()
        timer = 0
    }

    resized = false
}

function resize():boolean {
    view = Plena.getDefaultView()

    let nWidth = Plena.width
    let nHeight = Plena.height

    if (height != nHeight || width != nWidth) {
        if (Plena.height > 2000) view.fixedResolutionH(Plena.height / 2)
        if (Plena.height < 720) {
            view.fixedResolutionH(Plena.height * 2)
        }

        height = nHeight
        width = nWidth
        resized = true
        return true
    }

    return false
}

function init(city:number) {
    started = true
    id = city
    Plena.init(setup, render, update, Color.mkColor(0, 0, 2))
}

loadGame(0)//quick loading client, make a comment for server tests
