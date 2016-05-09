//server code (most code currently) can be found in ../../scripts/world.ts

let started = false

module World {
    let seaLevel
    let pollution
    let temperature
    let time

    export function init() {
        socket.on('gameData', update)
    }

    function update(ticks: number, sea: number, temp: number, poll: number) {
        time = ticks
        seaLevel = sea
        temperature = temp
        pollution = poll

        updateServer()
    }

    function getTime(): number {
        return time
    }

    function getPollution(): number {
        return pollution
    }

    function getTemperature(): number {
        return temperature
    }

    function getSea(): number {
        return seaLevel
    }
}

module Model {
    export module Pollution {
        export function absorbPollution(pollution: number, landSize: number, landType: Nation.LandType): number {
            return pollution
        }
    }
}

module Nation {
    let pollution

    export function init() {
        socket.on('pollution', setPollution)
    }

    export function update() {
        setPollution(Model.Pollution.absorbPollution(pollution, 0, LandType.NONE))

        socket.emit('pollution', pollution)
    }

    function setPollution(poll: number) {
        this.pollution = poll
    }

    export function getPollution() {
        return pollution
    }

    export enum LandType {
        NONE
    }
}

let pollution: number
let stars: ImgGrix
let worldBack: ShapeGrix
let worldCres: ImgGrix
let worldMap: ImgGrix
let clouds: ImgGrix
let view: Views.View
let worldOffset = 0.2

function setupClient() {
    view = Plena.getDefaultView()
    view.fixedResolutionH(1000)

    World.init()
    Nation.init()

    let starImg = Assets.loadImg("/images/stars.jpg", Assets.BACKGROUND)
    starImg.onLoaded(function () {
        stars = new ImgGrix()
            .add(view.getWidth(), view.getHeight(), starImg, 0, 0, starImg.getCoord().newCoords(starImg, view.getWidth(), view.getHeight()))
            .populate()
    }) //'advanced' stuff ;). If you are curious what the above 6 lines exactly do, just ask

    worldBack = Grix.shape().circle(300, 0, 0, 0, true, 200).setColor(Color.mkColor(58, 195, 212)).drawmode(gl.TRIANGLE_FAN).populate()
    clouds = Grix.fromTexture(Assets.loadImg("/images/clouds.png", Assets.NORMAL))
    worldMap = new ImgGrix().mkCircle(Assets.loadImg("/images/worldMap.png", Assets.NORMAL), 300, 300, 0, 0, 0, 0, 200).populate()
}

function render(delta: number) {
    stars.render()
    Plena.forceRender()

    worldBack.setPivotMove(0.5, 0.5)
    worldBack.moveTo(view.getWidth() / 2, view.getHeight() / 2)
    worldBack.render()
    Plena.forceRender()

    Shader.getShader(Shader.TEXTURE).bind()
    Shader.getShader(Shader.TEXTURE).getMatHandler().setUVMatrix(Matrix.Mat4.translate(worldOffset, 0))

    worldMap.setPivotMove(0.5, 0.5)
    worldMap.moveTo(view.getWidth() / 2, view.getHeight() / 2)
    worldMap.render()

    Plena.forceRender()
    Shader.getShader(Shader.TEXTURE).bind()
    Shader.getShader(Shader.TEXTURE).getMatHandler().setUVMatrix(Matrix.Mat4.identity())

    let x = (50 * (Mouse.getX(view) / view.getHeight()) - 25) | 0
    let y = (50 * (Mouse.getY(view) / view.getHeight()) - 25) | 0

    clouds.setPivotMove(0.5, 0.5)
    clouds.moveTo(view.getWidth() / 2, view.getHeight() / 2)
    clouds.move(x, y)
    clouds.render()

    //Shader.getShader(Shader.TEXTURE).getMatHandler().setUVMatrix(Matrix.Mat4.translate(worldOffset, 0)) <-- the line that makes scrolling the world work
}

function updateClient(delta: number) {
    if (Keyboard.isDown(Keyboard.KEY_LEFT)) worldOffset -= 0.0003 * delta
    if (Keyboard.isDown(Keyboard.KEY_RIGHT)) worldOffset += 0.0003 * delta
}

function updateServer() {

}

function init() {
    started = true
    Plena.init(setupClient, render, updateClient, Color.mkAlphaColor(0, 0, 0, 0))
}
//uncommend for testing client, comment for testing server
//Plena.init(setupClient, render, updateClient, Color.mkColor(0, 0, 10))
//$(".container").hide()