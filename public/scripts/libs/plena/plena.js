var gl;
//all textures loaded cheack and only then call render/update stuff (option)
//fullscreen option
//loader at start option
//different shader/projection for hud no view
//mess, redo, also manager system redo
var Plena;
(function (Plena) {
    var renderLp, updateLp;
    var canvas;
    var lastTick;
    var doLog = true;
    var currCol = Color.White.WHITE;
    var view;
    var spriteManager;
    var totalQueue = 0;
    function init(setupFunc, renderLoop, updateLoop, p1, p2, p3, p4, p5) {
        var width, height, x, y;
        if (typeof p3 == 'number') {
            width = p3;
            height = p4;
            x = p1;
            y = p2;
            if (p5)
                currCol = p5;
        }
        else if (typeof p2 == 'number') {
            width = p1;
            height = p2;
            x = window.innerWidth / 2 - width / 2;
            y = window.innerHeight / 2 - height / 2;
            if (p3)
                currCol = p3;
        }
        else {
            width = window.innerWidth;
            height = window.innerHeight;
            x = 0;
            y = 0;
            if (p1)
                currCol = p1;
        }
        canvas = document.createElement('canvas');
        canvas.setAttribute("width", "" + width);
        canvas.setAttribute("height", "" + height);
        canvas.setAttribute("style", "position:fixed; top:" + y + "px; left:" + x + "px");
        document.body.appendChild(canvas);
        Plena.canvasX = x;
        Plena.canvasY = y;
        Plena.width = width;
        Plena.height = height;
        gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
        gl.viewport(0, 0, width, height);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        currCol.clearcolor();
        gl.clear(gl.COLOR_BUFFER_BIT);
        Keyboard.enable();
        Mouse.enable();
        Shader.initBasicShaders();
        spriteManager = createManager();
        spriteManager.addShader(Shader.getShader(Shader.COLOR));
        spriteManager.addShader(Shader.getShader(Shader.TEXTURE));
        renderLp = renderLoop;
        updateLp = updateLoop;
        view = Views.createView();
        lastTick = Date.now();
        setupFunc();
        totalQueue = Assets.getQueue();
        if (totalQueue > 0) {
            log("Started loading assets, total: " + totalQueue);
            Assets.addQueueListner(asssetsLoadStep);
        }
        else
            looper();
    }
    Plena.init = init;
    function asssetsLoadStep(queue) {
        log("Loading Assets... progress " + (totalQueue - queue) + "/" + totalQueue + " assets");
        if (queue == 0) {
            if (Assets.hasError())
                log("Assets loading finished with errors");
            else
                log("Assets loading finished without error");
            lastTick = Date.now();
            looper();
        }
    }
    function log(text) {
        if (doLog)
            console.log(text);
    }
    Plena.log = log;
    function suppresLog() {
        doLog = false;
    }
    Plena.suppresLog = suppresLog;
    function setColor(col) {
        currCol = col;
        col.clearcolor();
    }
    Plena.setColor = setColor;
    function getCurrCol() {
        return currCol;
    }
    Plena.getCurrCol = getCurrCol;
    function looper() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        var tick = Date.now();
        var delta = tick - lastTick;
        lastTick = tick;
        view.view();
        renderLp(delta);
        updateLp(delta);
        spriteManager.render();
        requestAnimationFrame(looper);
    }
    function getDefaultView() {
        return view;
    }
    Plena.getDefaultView = getDefaultView;
    function forceRender() {
        spriteManager.render();
    }
    Plena.forceRender = forceRender;
    function manager() {
        return spriteManager;
    }
    Plena.manager = manager;
    function createManager() {
        return new Manager();
    }
    Plena.createManager = createManager;
    var Manager = (function () {
        function Manager() {
            this.shaders = new TreeMap(STRING_COMPARE);
            this.grixs = new DeepTreeMap(STRING_COMPARE);
        }
        Manager.prototype.hasShader = function (shader) {
            return this.shaders.contains(shader);
        };
        Manager.prototype.addShader = function (shader) {
            this.shaders.put(shader.getId(), shader);
        };
        Manager.prototype.getShader = function (key) {
            return this.shaders.apply(key);
        };
        Manager.prototype.addGrix = function (key, grix) {
            this.grixs.put((typeof key == "string") ? key : key.getId(), grix);
        };
        Manager.prototype.render = function () {
            var ittr = this.shaders.itterator();
            for (var i = 0; i < ittr.length; i++) {
                var entry = ittr[i];
                entry[1].bind();
                var grixs = this.grixs.itterator(entry[0]);
                for (var j = 0; j < grixs.length; j++) {
                    grixs[j].doRenderAll();
                }
            }
        };
        return Manager;
    })();
})(Plena || (Plena = {}));
//# sourceMappingURL=plena.js.map