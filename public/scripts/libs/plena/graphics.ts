class Shader {
    private program: WebGLProgram;

    private vertices: number;
    private UVCoords: number;

    private shadVarData: WebGLUniformLocation[] = [];

    private matrix: MatrixHandler;
    private id;

    constructor(id: string, shaderVars: {}, vertex: string, fragment: string);
    constructor(id: string, shaderVars: {}, name: string);
    constructor(id: string, shaderVars: {}, p2: string, p3?: string) {
        this.id = id;
        Shader.addShader(this, id)

        var fragmentShader, vertexShader;
        if (typeof p3 == 'undefined') {
            fragmentShader = this.getShader(p2 + "-fs");
            vertexShader = this.getShader(p2 + "-vs");
        } else {
            fragmentShader = this.createShader(p3, gl.FRAGMENT_SHADER);
            vertexShader = this.createShader(p2, gl.VERTEX_SHADER);
        }

        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program.");
        }
        this.bind();

        this.vertices = gl.getAttribLocation(this.program, "vertexPos");
        this.UVCoords = gl.getAttribLocation(this.program, "vertexUV");

        for (var key in shaderVars) {
            if (shaderVars.hasOwnProperty(key)) {
                this.shadVarData[shaderVars[key]] = gl.getUniformLocation(this.program, key);
            }
        }

        this.matrix = new MatrixHandler(this);
    }

    getId(): string {
        return this.id;
    }

    getVerticesLoc() {
        return this.vertices;
    }

    getUVLoc() {
        return this.UVCoords;
    }

    getMatHandler(): MatrixHandler {
        return this.matrix;
    }

    bind() {
        gl.useProgram(this.program);
    }

    setMatrix4(shadVar: number, matrix: number[]) {
        gl.uniformMatrix4fv(this.shadVarData[shadVar], false, new Float32Array(matrix));
    }

    setInt(shadVar: number, num: number) {
        gl.uniform1i(this.shadVarData[shadVar], num);
    }

    setFloat(shadVar: number, num: number) {
        gl.uniform1f(this.shadVarData[shadVar], num);
    }

    setVec2(shadVar: number, vec2: number[]) {
        gl.uniform2f(this.shadVarData[shadVar], vec2[0], vec2[1]);
    }

    setVec3(shadVar: number, vec3: number[]) {
        gl.uniform3f(this.shadVarData[shadVar], vec3[0], vec3[1], vec3[2]);
    }

    setVec4(shadVar: number, vec4: number[]) {
        gl.uniform4f(this.shadVarData[shadVar], vec4[0], vec4[1], vec4[2], vec4[3]);
    }

    private createShader(data: string, shaderType) {
        var shader = gl.createShader(shaderType)
        gl.shaderSource(shader, data);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    private getShader(id: string) {
        var shaderScript, theSource, currentChild, shader;

        shaderScript = document.getElementById(id);

        if (!shaderScript) {
            return null;
        }

        theSource = "";
        currentChild = shaderScript.firstChild;

        while (currentChild) {
            if (currentChild.nodeType == currentChild.TEXT_NODE) {
                theSource += currentChild.textContent;
            }

            currentChild = currentChild.nextSibling;
        }

        if (shaderScript.type == "x-shader/x-fragment") {
            return this.createShader(theSource, gl.FRAGMENT_SHADER)
        } else if (shaderScript.type == "x-shader/x-vertex") {
            return this.createShader(theSource, gl.VERTEX_SHADER)
        } else {
            return null;
        }
    }
}

namespace Shader {
    export const COLOR = "plenaColorShader"
    export const TEXTURE = "plenaTextureShader"

    var shaders = new TreeMap<string, Shader>(STRING_COMPARE);

    export function initBasicShaders() {
        createBasicShader(ShaderType.COLOR, COLOR);
        createBasicShader(ShaderType.TEXTURE, TEXTURE);
    }

    export function getBasicShaders(): Shader[] {
        return [shaders.apply(COLOR), shaders.apply(TEXTURE)]
    }

    export function addShader(shader: Shader, id: string) {
        shaders.put(id, shader);
    }

    export function getShader(id: string): Shader {
        return shaders.apply(id);
    }

    export enum ShaderType { COLOR, TEXTURE }

    export function createBasicShader(type: ShaderType, id: string): Shader {
        var shad: Shader;
        if (type == ShaderType.COLOR) {
            shad = new Shader(id, {
                "projectionMatrix": Shader.Uniforms.PROJECTION_MATRIX,
                "viewMatrix": Shader.Uniforms.VIEW_MATRIX,
                "modelMatrix": Shader.Uniforms.MODEL_MATRIX,
                "color": Shader.Uniforms.COLOR
            }, Shader.Shaders.COLOR_V, Shader.Shaders.COLOR_F);
        } else if (type == ShaderType.TEXTURE) {
            shad = new Shader(id, {
                "projectionMatrix": Shader.Uniforms.PROJECTION_MATRIX,
                "viewMatrix": Shader.Uniforms.VIEW_MATRIX,
                "modelMatrix": Shader.Uniforms.MODEL_MATRIX,
                "UVMatrix": Shader.Uniforms.UV_MATRIX,
                "color": Shader.Uniforms.COLOR
            }, Shader.Shaders.TEX_V, Shader.Shaders.TEX_F);
            shad.getMatHandler().setUVMatrix(Matrix.Mat4.identity());
            shad.setVec4(Shader.Uniforms.COLOR, Color.Red.crimson(1).vec())
        } else return null;

        shad.getMatHandler().setModelMatrix(Matrix.Mat4.identity());
        shad.getMatHandler().setProjectionMatrix(Matrix.Mat4.identity());
        shad.getMatHandler().setViewMatrix(Matrix.Mat4.identity());

        return shad;
    }

    export namespace Uniforms {
        export const
            PROJECTION_MATRIX: number = 100,
            VIEW_MATRIX: number = 101,
            MODEL_MATRIX: number = 102,
            UV_MATRIX: number = 103,
            COLOR: number = 104
    }

    export namespace Shaders {
        export const COLOR_F = `
            precision highp float;

            uniform vec4 color;

            void main(void){
                gl_FragColor = color;
            }`

        export const COLOR_V = `
            precision highp float;

            uniform mat4 modelMatrix;
            uniform mat4 projectionMatrix;
            uniform mat4 viewMatrix;

            attribute vec2 vertexPos;

            void main(void){
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);
            }`;

        export const TEX_F = `
            precision highp float;

            varying vec2 UV;

            uniform sampler2D sampler;
            uniform vec4 color;

            void main(void){
                gl_FragColor = texture2D(sampler, UV) * color;
            }`;

        export const TEX_V = `
            precision highp float;

            uniform mat4 modelMatrix;
            uniform mat4 projectionMatrix;
            uniform mat4 viewMatrix;
            uniform mat4 UVMatrix;

            varying vec2 UV;

            attribute vec2 vertexPos;
            attribute vec2 vertexUV;

            void main(void){
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);
                UV = (UVMatrix * vec4(vertexUV, 1, 1)).xy;
            }`;
    }
}

class MatrixHandler {
    private shader: Shader;
    private projMat = Matrix.Mat4.identity();
    private viewMat = Matrix.Mat4.identity();

    constructor(shader: Shader) {
        this.shader = shader;
    }

    setProjectionMatrix(matrix) {
        this.shader.setMatrix4(Shader.Uniforms.PROJECTION_MATRIX, matrix)
        this.projMat = matrix;
    }

    setModelMatrix(matrix) {
        this.shader.setMatrix4(Shader.Uniforms.MODEL_MATRIX, matrix)
    }

    setViewMatrix(matrix) {
        this.shader.setMatrix4(Shader.Uniforms.VIEW_MATRIX, matrix)
        this.viewMat = matrix;
    }

    setUVMatrix(matrix) {
        this.shader.setMatrix4(Shader.Uniforms.UV_MATRIX, matrix)
    }
}

class Render {
    private attrpBuffs: WebGLBuffer[] = [];
    private attrpIds: number[] = [];

    private elementBuff: WebGLBuffer[] = [];
    private count = [];

    private shader: Shader;

    private verts: number[] = [];
    private uv: number[] = [];
    private indieces: number[][] = [];

    private addAttrips(attripBuff: WebGLBuffer, id: number) {
        this.attrpBuffs.push(attripBuff);
        this.attrpIds.push(id);
    }
    private addToEnd(elementBuff: WebGLBuffer, count: number) {
        this.elementBuff.push(elementBuff);
        this.count.push(count);
    }
    populate(shader: Shader) {
        if (!this.verts) Plena.log("You cannot populate a renderer twice!")
        else {
            this.shader = shader;

            this.addVertexes(this.verts);
            if (this.uv.length > 0) this.addUVCoords(this.uv);
            for (let i of this.indieces) this.addIndieces(i);

            delete this.verts;
            delete this.uv;
            delete this.indieces;
        }
    }
    pushVerts(verts: number[]) {
        if (!this.verts) Plena.log("You cannot add new vertices coords to an already populated renderer!")
        else this.verts = this.verts.concat(verts);
    }
    pushUV(uv: number[]) {
        if (!this.uv) Plena.log("You cannot add new UV coords to an already populated renderer!")
        else this.uv = this.uv.concat(uv);
    }
    pushIndices(id: number, indieces: number[]) {
        if (id > this.indieces.length) Plena.log("Indiece Id is too high, use: " + this.indieces.length)
        else {
            if (id == this.indieces.length) this.indieces.push(indieces);
            else this.indieces[id] = this.indieces[id].concat(indieces);
        }
    }
    private addVertexes(vertices: number[]) {
        var buff = gl.createBuffer();
        var id = this.shader.getVerticesLoc();

        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(id, 2, gl.FLOAT, false, 0, 0);

        this.addAttrips(buff, id);
    }
    private addUVCoords(coords: number[]) {
        var buff = gl.createBuffer();
        var id = this.shader.getUVLoc();
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(id, 2, gl.FLOAT, false, 0, 0);

        this.addAttrips(buff, id);
    }
    private addIndieces(indieces: number[]) {
        var count = indieces.length;
        var elementBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indieces), gl.STATIC_DRAW);

        this.addToEnd(elementBuff, count);
    }
    switchBuff(id: number) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
    }
    draw(typ, count: number) {
        gl.drawArrays(typ, 0, count);
    }
    drawElements(id: number, typ) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
        gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);
    }
    drawSomeElements(ids: number[], typ) {
        for (var id = 0; id < ids.length; id++) {
            if (ids[id]) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
                gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);
            }
        }
    }
    start() {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }
    }
    end() {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    }
    drawElementsWithStartEnd(typ, id: number) {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
        gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);

        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    }

    drawWithStartEnd(typ, count: number) {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }

        gl.drawArrays(typ, 0, count);

        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    }
}

class Framebuffer {
    private frameBuffer;
    private frameTexture;

    constructor(sizeX: number, sizeY: number, width: number, height: number, smooth?: boolean, repeat?: boolean) {
        this.frameTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sizeX, sizeY, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, smooth ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST_MIPMAP_NEAREST);
        if (repeat) gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        this.frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        this.frameBuffer.width = width;
        this.frameBuffer.height = height;

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.frameTexture, 0);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    getTexture(): WebGLTexture {
        return this.frameTexture;
    }

    startRenderTo() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.frameBuffer.width, this.frameBuffer.height);
    }

    stopRenderTo() {
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, Plena.width, Plena.height);
    }

    bindTexture() {
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
    }
}