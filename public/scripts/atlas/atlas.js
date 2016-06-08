var started = false;
var timer = 0;
var view;
var width;
var height;
var resized;
var id;
var camera;
var vWidth;
var vHeight;
var vmx;
var vmy;
//orchestra bot text
//investing works
//nice invest button
//experience level on tech and experience arround tech
//fix icons
//musics
//nation view
//stats on HUD
function setup() {
    console.log("Setting up ATLAS");
    view = Plena.getDefaultView();
    camera = new Views.Camera();
    resize();
    Textures.load();
    Technologies.init();
    World.init();
    Nation.init(id);
    GuiManager.registerScreen(OrchestraBot);
    GuiManager.registerScreen(StarsScreen);
    GuiManager.registerScreen(WorldScreen);
    GuiManager.registerScreen(StoreScreen);
    GuiManager.registerScreen(CityScreen);
    GuiManager.registerScreen(TechScreen);
    GuiManager.loadScreen(WorldScreen.NAME);
}
function render(delta) {
    var resized = resize();
    if (!resized) {
        GuiManager.render(delta);
    }
}
function update(delta) {
    GuiManager.update(delta);
    vmx = Mouse.getX(view);
    vmy = Mouse.getY(view);
    resized = false;
}
function resize() {
    var nWidth = Plena.width;
    var nHeight = Plena.height;
    if (height != nHeight || width != nWidth) {
        view = Plena.getDefaultView();
        view.bindCamera(camera);
        if (Plena.height > 1500)
            view.fixedResolutionH(Plena.height / 2);
        if (Plena.height < 720) {
            view.fixedResolutionH(Plena.height * 2);
        }
        height = nHeight;
        width = nWidth;
        resized = true;
        vWidth = view.getWidth();
        vHeight = view.getHeight();
        return true;
    }
    return false;
}
function init(city) {
    started = true;
    id = city;
    Plena.init(setup, render, update, new Color("#131923"));
}
function setCursor(cursor) {
    $("body").css("cursor", cursor);
}
//quickLoading = true//skip server
//black and white shaders (in horrible compiled JS format)
//Shaders.COLOR_F = "\n            precision highp float;\n\n            uniform vec4 color;\n\n            void main(void){\n                float average = (color.r + color.b + color.g) / 3.0;\n                gl_FragColor = vec4(average,average,average,color.a);\n            }";
//Shaders.COLOR_V = "\n            precision highp float;\n\n            uniform mat4 modelMatrix;\n            uniform mat4 projectionMatrix;\n            uniform mat4 viewMatrix;\n\n            attribute vec2 vertexPos;\n\n            void main(void){\n                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);\n            }";
//Shaders.TEX_F = "\n            precision highp float;\n\n            varying vec2 UV;\n\n            uniform sampler2D sampler;\n            uniform vec4 color;\n\n            void main(void){\n                vec4 col = texture2D(sampler, UV);\n                float average = (col.r + col.b + col.g) / 3.0;\n                gl_FragColor = vec4(average, average, average, col.a);\n            }";
//Shaders.TEX_V = "\n            precision highp float;\n\n            uniform mat4 modelMatrix;\n            uniform mat4 projectionMatrix;\n            uniform mat4 viewMatrix;\n            uniform mat4 UVMatrix;\n\n            varying vec2 UV;\n\n            attribute vec2 vertexPos;\n            attribute vec2 vertexUV;\n\n            void main(void){\n                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);\n                UV = (UVMatrix * vec4(vertexUV, 1, 1)).xy;\n            }";
//# sourceMappingURL=atlas.js.map