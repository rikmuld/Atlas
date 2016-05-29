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
    timer += delta;
    if (timer > 1000) {
        Nation.update();
        timer = 0;
    }
    Technologies.update();
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
quickLoading = true; //skip server
//# sourceMappingURL=atlas.js.map