var gl: WebGLRenderingContext;

//all textures loaded cheack and only then call render/update stuff (option)
//fullscreen option
//loader at start option
//different shader/projection for hud no view
//mess, redo, also manager system redo
module Plena {
    var renderLp, updateLp: (delta: number) => void;
    var canvas: HTMLCanvasElement;
    var lastTick:number;
    var doLog: boolean = true;
    var currCol: Col = Color.White.WHITE;
    var view: Views.View

    export var width: number;
    export var height: number;

    var spriteManager: Manager;
    
    export var canvasX: number;
    export var canvasY: number;

    var totalQueue: number = 0;

    export function init(setupFunc: () => void, renderLoop: (delta: number) => void, updateLoop: (delta: number) => void);
    export function init(setupFunc: () => void, renderLoop: (delta: number) => void, updateLoop: (delta: number) => void, x: number, y: number, width: number, height: number);
    export function init(setupFunc: () => void, renderLoop: (delta: number) => void, updateLoop: (delta: number) => void, width: number, height: number);
    export function init(setupFunc: () => void, renderLoop: (delta: number) => void, updateLoop: (delta: number) => void, width: number, height: number, color: Col);
    export function init(setupFunc: () => void, renderLoop: (delta: number) => void, updateLoop: (delta: number) => void, color: Col);
    export function init(setupFunc: () => void, renderLoop: (delta: number) => void, updateLoop: (delta: number) => void, x: number, y: number, width: number, height: number, color: Col);
    export function init(setupFunc: () => void, renderLoop: (delta: number) => void, updateLoop: (delta: number) => void, p1?: number | Col, p2?: number, p3?: number | Col, p4?: number, p5?: Col) {
        var width, height, x, y: number;

        if (typeof p3 == 'number') {
            width = p3;
            height = p4;
            x = p1;
            y = p2;
            if (p5) currCol = (p5 as Col)
        } else if (typeof p2 == 'number') {
            width = p1;
            height = p2;
            x = window.innerWidth / 2 - width / 2;
            y = window.innerHeight / 2 - height / 2;
            if (p3) currCol = (p3 as Col)
        } else {
            width = window.innerWidth;
            height = window.innerHeight;
            x = 0;
            y = 0;
            if (p1) currCol = (p1 as Col);
        }

        canvas = document.createElement('canvas');
        canvas.setAttribute("width", "" + width);
        canvas.setAttribute("height", "" + height);
        canvas.setAttribute("style", "position:fixed; top:" + y + "px; left:" + x + "px")
        document.body.appendChild(canvas)

        canvasX = x;
        canvasY = y;

        Plena.width = width;
        Plena.height = height;

        gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext
        
        gl.viewport(0, 0, width, height)
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        currCol.clearcolor()
        gl.clear(gl.COLOR_BUFFER_BIT)

        Keyboard.enable();
        Mouse.enable();

        Shader.initBasicShaders();

        spriteManager = createManager();
        spriteManager.addShader(Shader.getShader(Shader.COLOR));
        spriteManager.addShader(Shader.getShader(Shader.TEXTURE));

        renderLp = renderLoop;
        updateLp = updateLoop;

        view = Views.createView()

        lastTick = Date.now();
        setupFunc();

        totalQueue = Assets.getQueue();
        if (totalQueue > 0) {
            log(`Started loading assets, total: ${totalQueue}`);
            Assets.addQueueListner(asssetsLoadStep);
        } else looper();
    }

    function asssetsLoadStep(queue: number) {
        log(`Loading Assets... progress ${totalQueue-queue}/${totalQueue} assets`);

        if (queue == 0) {
            if (Assets.hasError()) log(`Assets loading finished with errors`)
            else log(`Assets loading finished without error`)
            lastTick = Date.now();
            looper()
        }
    }

    export function log(text:string) {
        if(doLog)console.log(text);
    }

    export function suppresLog() {
        doLog = false;
    }
    export function setColor(col: Col) {
        currCol = col;
        col.clearcolor();
    }
    export function getCurrCol(): Col {
        return currCol;
    }

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

    export function getDefaultView(): Views.View {
        return view
    }

    export function forceRender() {
        spriteManager.render();
    }

    export function manager(): Manager {
        return spriteManager;
    }

    export function createManager(): Manager {
        return new Manager();
    }

    class Manager {
        private shaders = new TreeMap<string, Shader>(STRING_COMPARE);
        private grixs = new DeepTreeMap<string, Grix>(STRING_COMPARE);

        hasShader(shader: string): boolean {
            return this.shaders.contains(shader);
        }

        addShader(shader: Shader) {
            this.shaders.put(shader.getId(), shader);
        }

        getShader(key: string): Shader {
            return this.shaders.apply(key)
        }

        addGrix(key: string, grix: Grix);
        addGrix(key: Shader, grix: Grix);
        addGrix(key: string|Shader, grix: Grix) {
            this.grixs.put((typeof key == "string") ? (<string>key) : (<Shader>key).getId(), grix);
        }

        render() {
            var ittr = this.shaders.itterator();
            for (var i = 0; i < ittr.length; i++) {
                var entry = ittr[i];
                entry[1].bind();
                var grixs = this.grixs.itterator(entry[0]);
                for (var j = 0; j < grixs.length; j++) {
                    grixs[j].doRenderAll();
                }
            }
        }
    }
}