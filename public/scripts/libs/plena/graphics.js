var Shader = (function () {
    function Shader(id, shaderVars, p2, p3) {
        this.shadVarData = [];
        this.id = id;
        Shader.addShader(this, id);
        var fragmentShader, vertexShader;
        if (typeof p3 == 'undefined') {
            fragmentShader = this.getShader(p2 + "-fs");
            vertexShader = this.getShader(p2 + "-vs");
        }
        else {
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
    Shader.prototype.getId = function () {
        return this.id;
    };
    Shader.prototype.getVerticesLoc = function () {
        return this.vertices;
    };
    Shader.prototype.getUVLoc = function () {
        return this.UVCoords;
    };
    Shader.prototype.getMatHandler = function () {
        return this.matrix;
    };
    Shader.prototype.bind = function () {
        gl.useProgram(this.program);
    };
    Shader.prototype.setMatrix4 = function (shadVar, matrix) {
        gl.uniformMatrix4fv(this.shadVarData[shadVar], false, new Float32Array(matrix));
    };
    Shader.prototype.setInt = function (shadVar, num) {
        gl.uniform1i(this.shadVarData[shadVar], num);
    };
    Shader.prototype.setFloat = function (shadVar, num) {
        gl.uniform1f(this.shadVarData[shadVar], num);
    };
    Shader.prototype.setVec2 = function (shadVar, vec2) {
        gl.uniform2f(this.shadVarData[shadVar], vec2[0], vec2[1]);
    };
    Shader.prototype.setVec3 = function (shadVar, vec3) {
        gl.uniform3f(this.shadVarData[shadVar], vec3[0], vec3[1], vec3[2]);
    };
    Shader.prototype.setVec4 = function (shadVar, vec4) {
        gl.uniform4f(this.shadVarData[shadVar], vec4[0], vec4[1], vec4[2], vec4[3]);
    };
    Shader.prototype.createShader = function (data, shaderType) {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, data);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };
    Shader.prototype.getShader = function (id) {
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
            return this.createShader(theSource, gl.FRAGMENT_SHADER);
        }
        else if (shaderScript.type == "x-shader/x-vertex") {
            return this.createShader(theSource, gl.VERTEX_SHADER);
        }
        else {
            return null;
        }
    };
    return Shader;
})();
var Shader;
(function (Shader) {
    Shader.COLOR = "plenaColorShader";
    Shader.TEXTURE = "plenaTextureShader";
    var shaders = new TreeMap(STRING_COMPARE);
    function initBasicShaders() {
        createBasicShader(ShaderType.COLOR, Shader.COLOR);
        createBasicShader(ShaderType.TEXTURE, Shader.TEXTURE);
    }
    Shader.initBasicShaders = initBasicShaders;
    function getBasicShaders() {
        return [shaders.apply(Shader.COLOR), shaders.apply(Shader.TEXTURE)];
    }
    Shader.getBasicShaders = getBasicShaders;
    function addShader(shader, id) {
        shaders.put(id, shader);
    }
    Shader.addShader = addShader;
    function getShader(id) {
        return shaders.apply(id);
    }
    Shader.getShader = getShader;
    (function (ShaderType) {
        ShaderType[ShaderType["COLOR"] = 0] = "COLOR";
        ShaderType[ShaderType["TEXTURE"] = 1] = "TEXTURE";
    })(Shader.ShaderType || (Shader.ShaderType = {}));
    var ShaderType = Shader.ShaderType;
    function createBasicShader(type, id) {
        var shad;
        if (type == ShaderType.COLOR) {
            shad = new Shader(id, {
                "projectionMatrix": Shader.Uniforms.PROJECTION_MATRIX,
                "viewMatrix": Shader.Uniforms.VIEW_MATRIX,
                "modelMatrix": Shader.Uniforms.MODEL_MATRIX,
                "color": Shader.Uniforms.COLOR
            }, Shader.Shaders.COLOR_V, Shader.Shaders.COLOR_F);
        }
        else if (type == ShaderType.TEXTURE) {
            shad = new Shader(id, {
                "projectionMatrix": Shader.Uniforms.PROJECTION_MATRIX,
                "viewMatrix": Shader.Uniforms.VIEW_MATRIX,
                "modelMatrix": Shader.Uniforms.MODEL_MATRIX,
                "UVMatrix": Shader.Uniforms.UV_MATRIX,
                "color": Shader.Uniforms.COLOR
            }, Shader.Shaders.TEX_V, Shader.Shaders.TEX_F);
            shad.getMatHandler().setUVMatrix(Matrix.Mat4.identity());
            shad.setVec4(Shader.Uniforms.COLOR, Color.Red.crimson(1).vec());
        }
        else
            return null;
        shad.getMatHandler().setModelMatrix(Matrix.Mat4.identity());
        shad.getMatHandler().setProjectionMatrix(Matrix.Mat4.identity());
        shad.getMatHandler().setViewMatrix(Matrix.Mat4.identity());
        return shad;
    }
    Shader.createBasicShader = createBasicShader;
    var Uniforms;
    (function (Uniforms) {
        Uniforms.PROJECTION_MATRIX = 100, Uniforms.VIEW_MATRIX = 101, Uniforms.MODEL_MATRIX = 102, Uniforms.UV_MATRIX = 103, Uniforms.COLOR = 104;
    })(Uniforms = Shader.Uniforms || (Shader.Uniforms = {}));
    var Shaders;
    (function (Shaders) {
        Shaders.COLOR_F = "\n            precision highp float;\n\n            uniform vec4 color;\n\n            void main(void){\n                gl_FragColor = color;\n            }";
        Shaders.COLOR_V = "\n            precision highp float;\n\n            uniform mat4 modelMatrix;\n            uniform mat4 projectionMatrix;\n            uniform mat4 viewMatrix;\n\n            attribute vec2 vertexPos;\n\n            void main(void){\n                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);\n            }";
        Shaders.TEX_F = "\n            precision highp float;\n\n            varying vec2 UV;\n\n            uniform sampler2D sampler;\n            uniform vec4 color;\n\n            void main(void){\n                gl_FragColor = texture2D(sampler, UV) * color;\n            }";
        Shaders.TEX_V = "\n            precision highp float;\n\n            uniform mat4 modelMatrix;\n            uniform mat4 projectionMatrix;\n            uniform mat4 viewMatrix;\n            uniform mat4 UVMatrix;\n\n            varying vec2 UV;\n\n            attribute vec2 vertexPos;\n            attribute vec2 vertexUV;\n\n            void main(void){\n                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);\n                UV = (UVMatrix * vec4(vertexUV, 1, 1)).xy;\n            }";
    })(Shaders = Shader.Shaders || (Shader.Shaders = {}));
})(Shader || (Shader = {}));
var MatrixHandler = (function () {
    function MatrixHandler(shader) {
        this.projMat = Matrix.Mat4.identity();
        this.viewMat = Matrix.Mat4.identity();
        this.shader = shader;
    }
    MatrixHandler.prototype.setProjectionMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.PROJECTION_MATRIX, matrix);
        this.projMat = matrix;
    };
    MatrixHandler.prototype.setModelMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.MODEL_MATRIX, matrix);
    };
    MatrixHandler.prototype.setViewMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.VIEW_MATRIX, matrix);
        this.viewMat = matrix;
    };
    MatrixHandler.prototype.setUVMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.UV_MATRIX, matrix);
    };
    return MatrixHandler;
})();
var Render = (function () {
    function Render() {
        this.attrpBuffs = [];
        this.attrpIds = [];
        this.elementBuff = [];
        this.count = [];
        this.verts = [];
        this.uv = [];
        this.indieces = [];
    }
    Render.prototype.addAttrips = function (attripBuff, id) {
        this.attrpBuffs.push(attripBuff);
        this.attrpIds.push(id);
    };
    Render.prototype.addToEnd = function (elementBuff, count) {
        this.elementBuff.push(elementBuff);
        this.count.push(count);
    };
    Render.prototype.populate = function (shader) {
        if (!this.verts)
            Plena.log("You cannot populate a renderer twice!");
        else {
            this.shader = shader;
            this.addVertexes(this.verts);
            if (this.uv.length > 0)
                this.addUVCoords(this.uv);
            for (var _i = 0, _a = this.indieces; _i < _a.length; _i++) {
                var i = _a[_i];
                this.addIndieces(i);
            }
            delete this.verts;
            delete this.uv;
            delete this.indieces;
        }
    };
    Render.prototype.pushVerts = function (verts) {
        if (!this.verts)
            Plena.log("You cannot add new vertices coords to an already populated renderer!");
        else
            this.verts = this.verts.concat(verts);
    };
    Render.prototype.pushUV = function (uv) {
        if (!this.uv)
            Plena.log("You cannot add new UV coords to an already populated renderer!");
        else
            this.uv = this.uv.concat(uv);
    };
    Render.prototype.pushIndices = function (id, indieces) {
        if (id > this.indieces.length)
            Plena.log("Indiece Id is too high, use: " + this.indieces.length);
        else {
            if (id == this.indieces.length)
                this.indieces.push(indieces);
            else
                this.indieces[id] = this.indieces[id].concat(indieces);
        }
    };
    Render.prototype.addVertexes = function (vertices) {
        var buff = gl.createBuffer();
        var id = this.shader.getVerticesLoc();
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(id, 2, gl.FLOAT, false, 0, 0);
        this.addAttrips(buff, id);
    };
    Render.prototype.addUVCoords = function (coords) {
        var buff = gl.createBuffer();
        var id = this.shader.getUVLoc();
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(id, 2, gl.FLOAT, false, 0, 0);
        this.addAttrips(buff, id);
    };
    Render.prototype.addIndieces = function (indieces) {
        var count = indieces.length;
        var elementBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indieces), gl.STATIC_DRAW);
        this.addToEnd(elementBuff, count);
    };
    Render.prototype.switchBuff = function (id) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
    };
    Render.prototype.draw = function (typ, count) {
        gl.drawArrays(typ, 0, count);
    };
    Render.prototype.drawElements = function (id, typ) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
        gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);
    };
    Render.prototype.drawSomeElements = function (ids, typ) {
        for (var id = 0; id < ids.length; id++) {
            if (ids[id]) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
                gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);
            }
        }
    };
    Render.prototype.start = function () {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }
    };
    Render.prototype.end = function () {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    };
    Render.prototype.drawElementsWithStartEnd = function (typ, id) {
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
    };
    Render.prototype.drawWithStartEnd = function (typ, count) {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }
        gl.drawArrays(typ, 0, count);
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    };
    return Render;
})();
var Framebuffer = (function () {
    function Framebuffer(sizeX, sizeY, width, height, smooth, repeat) {
        this.frameTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sizeX, sizeY, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, smooth ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST_MIPMAP_NEAREST);
        if (repeat)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        this.frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        this.frameBuffer.width = width;
        this.frameBuffer.height = height;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.frameTexture, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    Framebuffer.prototype.getTexture = function () {
        return this.frameTexture;
    };
    Framebuffer.prototype.startRenderTo = function () {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.frameBuffer.width, this.frameBuffer.height);
    };
    Framebuffer.prototype.stopRenderTo = function () {
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, Plena.width, Plena.height);
    };
    Framebuffer.prototype.bindTexture = function () {
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
    };
    return Framebuffer;
})();
//# sourceMappingURL=graphics.js.map