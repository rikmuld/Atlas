let started = false
let timer = 0
let view: Views.View
let width: number
let height: number
let resized: boolean
let id: number
let camera: Views.Camera

function setup() {
    console.log("Setting up ATLAS")

    view = Plena.getDefaultView()
    camera = new Views.Camera()

    resize()

    Textures.load()

    Technologies.init()
    World.init()
    Nation.init(id)

    GuiManager.registerScreen(OrchestraBot)
    GuiManager.registerScreen(StarsScreen)
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
    let nWidth = Plena.width
    let nHeight = Plena.height

    if (height != nHeight || width != nWidth) {
        view = Plena.getDefaultView()
        view.bindCamera(camera)

        if (Plena.height > 1500) view.fixedResolutionH(Plena.height / 2)
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
    Plena.init(setup, render, update, new Color("#131923"))
}

function setCursor(cursor: string) {
    $("body").css("cursor", cursor)
}

quickLoading = true//skip server