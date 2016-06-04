/*
 * The three screen rules ;)
 *
 * Every screen should be loaded with this and should implement IScreen.
 * Every screen should have a static setup function, this will be called once, the constructor of the screen will be called every time upon loading the screen
 * Every screen should be in its on module named the same in its own file, named whatever you want, also the model should have an export named NAME with the name of the module
 *
 * Look at worldScreen.ts for an example
 * Also note that worldScreen.js needs to be included into atlas.jade
 */ 

module GuiManager {
    let hud: OrchestraBot.OrchestraBot
    let hudAlpha: number

    export interface IScreen {
        render(delta: number): void
        update(delta: number): void
    }

    export interface IButton {
        width: number
        height: number
        x: number
        y: number
        id: number

        click(x: number, y: number): boolean
        render(delta: number): void
        update(x: number, y: number, delta: number): void
    }

    let screens = new TreeMap<String, any>(STRING_COMPARE)
    let currentScreen: IScreen
    let screenKey:string

    export function registerScreen(screenModule: any) {
        screenModule[screenModule["NAME"]].setup()
        screens.put(screenModule["NAME"], screenModule)

        console.log("Setting up screen: " + screenModule["NAME"])
    }

    export function getCurrentScreen(): IScreen {
        return currentScreen
    }

    export function getCurrentScreenName(): string {
        return screenKey
    }

    export function loadScreen(key: string): IScreen {
        console.log("Loading screen: " + key)

        hudAlpha = null

        currentScreen = new (screens.apply(key))[key]()
        screenKey = key
        return currentScreen
    }

    export function update(delta: number) {
        setCursor("default")

        if (resized) {
            loadScreen(screenKey)
            newHud()
        } else if (!hud) newHud()
        else {
            currentScreen.update(delta)
            hud.update(delta)
        }
    }

    export function setHudAlpha(a:number){
        hudAlpha = a
    }

    export function getHudAlpha(): number {
        return hudAlpha
    }

    export function getHUD(): OrchestraBot.OrchestraBot {
        if(!hud)newHud()
        return hud
    }

    function newHud() {
        hud = new OrchestraBot.OrchestraBot()
    }

    export function render(delta: number) {
        currentScreen.render(delta)
        hud.render(delta)
    }
}


abstract class ClickableScreen implements GuiManager.IScreen {
    buttons: GuiManager.IButton[]
    clickOpen: boolean

    constructor(buttons: GuiManager.IButton[]) {
        this.buttons = buttons
        this.clickOpen = false
    }

    render(delta: number) {
        for (let button of this.buttons) {
            button.render(delta)
        }
    }

    update(delta: number) {
        let mouseX = vmx
        let mouseY = vmy

        for (let button of this.buttons) {
            button.update(mouseX, mouseY, delta)
        }
        if (Mouse.isDown(Mouse.LEFT) && this.clickOpen) {
            this.clickOpen = false
            this.clicked(mouseX, mouseY)
        }
        else if (!Mouse.isDown(Mouse.LEFT)) this.clickOpen = true
    }

    clicked(x: number, y: number) {
        for (let button of this.buttons) {
            if (button.click(x, y)) this.buttonClicked(button.id)
        }
    }

    abstract buttonClicked(id: number): void
}

abstract class SimpleButton implements GuiManager.IButton {
    width: number
    height: number
    x: number
    y: number
    id: number
    hover: boolean

    constructor(x: number, y: number, width: number, height: number, id: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.id = id
    }

    click(x: number, y: number): boolean {
        return this.hover
    }

    isInBox(x:number, y:number): boolean {
        return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)
    }

    abstract render(delta: number): void

    isMouseOver():boolean {
        return this.hover
    }

    update(x: number, y: number, delta: number) {
        this.hover = this.isInBox(x, y)

        if (this.hover) setCursor("pointer")
    }
}

class FillerButton extends SimpleButton {
    static circle: ShapeGrix

    constructor(x: number, y: number, width: number, height: number, id: number) {
        super(x, y, width, height, id)

        if (FillerButton.circle == null) FillerButton.circle = Grix.shape().circle(100).drawmode(gl.TRIANGLE_FAN).setColor(Color.Blue.BLUE_MIDNIGHT).populate()
    }

    render(delta: number) {
        let draw = FillerButton.circle
        draw.clean()
        draw.moveTo(this.x, this.y)
        draw.scaleToSize(this.width, this.height)
        if (this.isMouseOver()) draw.setColor(Color.Blue.BLUE_MEDIUM)
        draw.render()
    }
}

function inCircularRange(centerX: number, centerY: number, range: number) {
    let dx = Math.pow((vmx - centerX), 2)
    let dy = Math.pow((vmy - centerY), 2)

    return (Math.sqrt(dx + dy) <= range)
}
