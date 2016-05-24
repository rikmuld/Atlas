var Views;
(function (Views) {
    var views = new TreeMap(STRING_COMPARE);
    var View = (function () {
        function View(defaultShaders) {
            this.viewM = Matrix.Mat4.identity();
            this.shaders = [];
            this.defaultShaders = defaultShaders;
            this.changeProjection(0, Plena.width, Plena.height, 0);
        }
        View.prototype.addShaders = function () {
            var shaders = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                shaders[_i - 0] = arguments[_i];
            }
            this.shaders = this.shaders.concat(shaders);
        };
        View.prototype.bindCamera = function (camera) {
            this.camera = camera;
        };
        View.prototype.bindCameraTo = function (entity) {
            if (!this.camera)
                this.camera = new Camera();
            this.camera.bindTo(entity);
        };
        View.prototype.fixedResolutionH = function (height) {
            this.changeProjection(height * (window.innerWidth / window.innerHeight), height);
        };
        View.prototype.fixedResolutionW = function (width) {
            this.changeProjection(width, width * (window.innerHeight / window.innerWidth));
        };
        View.prototype.changeProjection = function (left, right, bottom, top) {
            if (typeof bottom == 'number') {
                this.projectionData = [left, right, bottom, top];
            }
            else {
                this.projectionData = [0, left, right, 0];
            }
            this.setProjection(this.projectionData);
        };
        View.prototype.setProjection = function (proj) {
            this.projectionM = Matrix.Mat4.ortho(proj[0], proj[1], proj[2], proj[3]);
        };
        View.prototype.getProjection = function (full) {
            if (full === void 0) { full = false; }
            return full ? this.projectionM : this.projectionData;
        };
        View.prototype.getView = function () {
            return this.viewM;
        };
        View.prototype.view = function () {
            Plena.forceRender();
            if (this.camera) {
                this.camera.update();
                this.viewM = this.camera.getViewMatrix();
            }
            var shads = this.getShaders();
            for (var _i = 0; _i < shads.length; _i++) {
                var shader = shads[_i];
                shader.bind();
                shader.getMatHandler().setProjectionMatrix(this.projectionM);
                shader.getMatHandler().setViewMatrix(this.viewM);
            }
        };
        View.prototype.getShaders = function () {
            var shads = this.shaders;
            if (this.defaultShaders)
                shads = shads.concat(Shader.getBasicShaders());
            return shads;
        };
        View.prototype.getWidth = function () {
            return this.mapX(Plena.width);
        };
        View.prototype.getHeight = function () {
            return this.mapY(Plena.height);
        };
        View.prototype.mapX = function (x, canvas) {
            var l = this.projectionData[0];
            var r = this.projectionData[1];
            return l + (Math.abs(r - l) / Plena.width) * (x - (canvas ? Plena.canvasX : 0));
        };
        View.prototype.mapY = function (y, canvas) {
            var t = this.projectionData[3];
            var b = this.projectionData[2];
            return t + (Math.abs(b - t) / Plena.height) * (y - (canvas ? Plena.canvasY : 0));
        };
        return View;
    })();
    Views.View = View;
    function createView(defaultShaders) {
        if (defaultShaders === void 0) { defaultShaders = true; }
        return new View(defaultShaders);
    }
    Views.createView = createView;
    var Camera = (function () {
        function Camera(x, y) {
            this.x = 0;
            this.y = 0;
            if (typeof x == 'number')
                this.setView(x, y);
            else if (x)
                this.bindTo(x);
        }
        Camera.prototype.setView = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Camera.prototype.getX = function () {
            return this.x;
        };
        Camera.prototype.getY = function () {
            return this.y;
        };
        Camera.prototype.setX = function (x) {
            this.x = x;
        };
        Camera.prototype.setY = function (y) {
            this.y = y;
        };
        Camera.prototype.getViewMatrix = function () {
            return Matrix.Mat4.translate(-this.x, -this.y);
        };
        Camera.prototype.update = function () {
            this.x = this.entity.getX();
            this.y = this.entity.getY();
        };
        Camera.prototype.bindTo = function (entity) {
            this.entity = entity;
        };
        return Camera;
    })();
    Views.Camera = Camera;
})(Views || (Views = {}));
//# sourceMappingURL=view.js.map