module Views {
    var views = new TreeMap<string, View>(STRING_COMPARE);

    export class View {
        projectionData: Vec4;
        projectionM: Mat4;
        viewM: Mat4 = Matrix4.identity();

        camera: Camera;

        defaultShaders: boolean;
        shaders: Shader[] = [];

        constructor(defaultShaders: boolean) {
            this.defaultShaders = defaultShaders;
            this.changeProjection(0, Plena.width, Plena.height, 0)
        }

        addShaders(...shaders: Shader[]) {
            this.shaders = this.shaders.concat(shaders);
        }

        bindCamera(camera: Camera) {
            this.camera = camera;
        }
        bindCameraTo(entity: Entity) {
            if (!this.camera) this.camera = new Camera()
            this.camera.bindTo(entity);
        }
        fixedResolutionH(height: number) {
            this.changeProjection(height * (window.innerWidth / window.innerHeight), height)
        }
        fixedResolutionW(width: number) {
            this.changeProjection(width, width * (window.innerHeight / window.innerWidth))
        }
        changeProjection(left: number, bottom: number);
        changeProjection(left: number, right: number, bottom: number, top: number);
        changeProjection(left: number, right: number, bottom?: number, top?: number) {
            if (typeof bottom == 'number') {
                this.projectionData = [left, right, bottom, top];
            } else {
                this.projectionData = [0, left, right, 0];
            }

            this.setProjection(this.projectionData)
        }

        setProjection(proj: Vec4) {
            this.projectionM = Matrix4.ortho(proj[0], proj[1], proj[2], proj[3])
        }

        getProjection(full: boolean = false):number[] {
            return full ? this.projectionM : this.projectionData
        }

        getView():Mat4 {
            return this.viewM
        }

        view() {
            Plena.forceRender();
            if (this.camera) {
                this.camera.update();
                this.viewM = this.camera.getViewMatrix();
            }

            let shads = this.getShaders();
            for (let shader of shads) {
                shader.bind()
                shader.getMatHandler().setProjectionMatrix(this.projectionM);
                shader.getMatHandler().setViewMatrix(this.viewM);
            }
        }

        getShaders(): Shader[] {
            let shads: Shader[] = this.shaders;
            if (this.defaultShaders) shads = shads.concat(Shader.getBasicShaders())
            return shads
        }

        getWidth(): number {
            return this.mapX(Plena.width);
        }
        getHeight(): number {
            return this.mapY(Plena.height);
        }

        mapX(x: number, canvas?: boolean): number {
            let l = this.projectionData[0];
            let r = this.projectionData[1];

            return l + (Math.abs(r - l) / Plena.width) * (x - (canvas ? Plena.canvasX : 0))
        }

        mapY(y: number, canvas?: boolean): number {
            let t = this.projectionData[3];
            let b = this.projectionData[2];

            return t + (Math.abs(b - t) / Plena.height) * (y - (canvas ? Plena.canvasY : 0));
        }
    }

    export function createView(defaultShaders:boolean = true):View {
        return new View(defaultShaders)
    }

    export class Camera {
        private x = 0;
        private y = 0;

        private entity: Entity;

        constructor(x: number, y: number);
        constructor(entity: Entity);
        constructor();
        constructor(x?: number | Entity, y?: number) {
            if (typeof x == 'number') this.setView(<number>x, y)
            else if (x) this.bindTo(<Entity>x);
        }

        setView(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        getX(): number {
            return this.x;
        }

        getY(): number {
            return this.y;
        }

        setX(x: number) {
            this.x = x;
        }

        setY(y: number) {
            this.y = y;
        }

        getViewMatrix() {
            return Matrix4.translate(-this.x, -this.y);
        }

        update() {
            this.x = this.entity.getX();
            this.y = this.entity.getY();
        }

        bindTo(entity: Entity) {
            this.entity = entity;
        }
    }
}