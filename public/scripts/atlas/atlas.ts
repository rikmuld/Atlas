let started = false
let timer = 0

function setupClient() {
    Textures.load()

    World.init()
    Nation.init()

    GuiManager.registerScreen(WorldScreen)
    GuiManager.loadScreen(WorldScreen.NAME)
}

function render(delta: number) {
    GuiManager.render(delta)
}

function update(delta: number) {
    GuiManager.update(delta)

    timer += delta
    if (timer > 1000) {
        Nation.update()
        timer = 0
    }
}

function init() {
    started = true
    Plena.init(setupClient, render, update, Color.mkColor(0, 0, 2))
}

loadGame()//quick loading clinet, make a comment for server tests