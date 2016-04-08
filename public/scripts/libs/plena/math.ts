type Vec2 = number[];
type Vec3 = number[];
type Vec4 = number[];
type Mat2 = number[];
type Mat3 = number[];
type Mat4 = number[];

type Vec = number[];
type Mat = number[];

class Vector {
    static clean(n: number): Vec {
        var vector: Vec = [];
        for (var i = 0; i < n; i++) {
            vector[i] = 0;
        }
        return vector;
    }
    static create(...values: number[]): Vec {
        var vector: Vec = [];
        for (var i = 0; i < values.length; i++) {
            vector[i] = values[i];
        }
        return vector;
    }
    static dot(vec1: Vec, vec2: Vec): number {
        var dot: number = 0;
        for (var i = 0; i < vec1.length; i++) {
            dot += vec1[i] * vec2[i];
        }
        return dot;
    }
    static magnitude(vec: Vec): number {
        return Math.sqrt(Vector.dot(vec, vec));
    }
    static angle(vec1: Vec, vec2: Vec): number {
        return Math.acos(Vector.dot(vec1, vec2) / (Vector.magnitude(vec1) * Vector.magnitude(vec2)));
    }
}

class Vector2 extends Vector {
    static clean(): Vec2 {
        return [0, 0];
    }
    static create(x: number, y: number): Vec2 {
        return [x, y];
    }
    static dot(vec1: Vec2, vec2: Vec2): number {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1];
    }
}

class Vector3 extends Vector {
    static clean(): Vec3 {
        return [0, 0, 0];
    }
    static create(x: number, y: number, z: number): Vec3 {
        return [x, y, z];
    }
    static dot(vec1: Vec3, vec2: Vec3): number {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
    }
}

class Vector4 extends Vector {
    static clean(): Vec4 {
        return [0, 0, 0, 0];
    }
    static create(x: number, y: number, z: number, w: number): Vec4 {
        return [x, y, z, w];
    }
    static dot(vec1: Vec4, vec2: Vec4): number {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2] + vec1[3] * vec2[3];
    }
}

class Matrix {
    static clean(size: number): Mat {
        return Vector.clean(size*size);
    }
    static identity(size:number): Mat {
        var mat = [];
        for (var i = 0; i < size*size; i++) {
            mat[i] = (Math.floor(i / size) - i % size) == 0? 1:0;
        }

        return mat;
    }
    static copy(mat: Mat):Mat {
        return mat.slice();
    }
    static getRow(mat: Mat, row:number): Vec {
        var size = Matrix.size(mat);
        var vec:Vec = [];

        for (var i = 0; i < size; i++) {
            vec[i] = mat[row + i * size];
        }

        return vec;
    }
    static getColom(mat: Mat, colom:number): Vec {
        var size = Matrix.size(mat);
        var vec:Vec = [];

        for (var i = 0; i < size; i++) {
            vec[i] = mat[colom * size + i];
        }

        return vec;
    }
    static getValue(mat: Mat, row: number, colom: number): number {
        var size = Matrix.size(mat);
        return mat[row + colom * size];
    }
    static setRow(mat: Mat, row: number, value: Vector): Mat {
        var size = Matrix.size(mat);
        for (var i = 0; i < size; i++) {
            mat[row + i * size] = value[i];
        }

        return mat;
    }
    static setColom(mat: Mat, colom: number, value:Vector): Mat {
        var size = Matrix.size(mat);
        for (var i = 0; i < size; i++) {
            mat[colom * size + i] = value[i];
        }

        return mat;
    }
    static setvalue(mat: Mat, row: number, colom: number, value:number): Mat {
        var size = Matrix.size(mat);
        mat[row + colom * size] = value;
        return mat;
    }
    static size(mat: Mat): number {
        return Math.sqrt(mat.length);
    }
    static getTranspose(mat: Mat) {
        var size = Matrix.size(mat);
        var matOut: Mat = Matrix.clean(size);

        for (var i = 0; i < size; i++) {
            Matrix.setColom(matOut, i, Matrix.getRow(mat, i));
        }

        return matOut;
    }
}

class Matrix4 extends Matrix {
    static identity(): number[] {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    static mul(mat1: Mat4, mat2: Mat4) {
        return [
            mat1[0] * mat2[0] + mat1[4] * mat2[1] + mat1[8] * mat2[2] + mat1[12] * mat2[3],
            mat1[1] * mat2[0] + mat1[5] * mat2[1] + mat1[9] * mat2[2] + mat1[13] * mat2[3],
            mat1[2] * mat2[0] + mat1[6] * mat2[1] + mat1[10] * mat2[2] + mat1[14] * mat2[3],
            mat1[3] * mat2[0] + mat1[7] * mat2[1] + mat1[11] * mat2[2] + mat1[15] * mat2[3],

            mat1[0] * mat2[4] + mat1[4] * mat2[5] + mat1[8] * mat2[6] + mat1[12] * mat2[7],
            mat1[1] * mat2[4] + mat1[5] * mat2[5] + mat1[9] * mat2[6] + mat1[13] * mat2[7],
            mat1[2] * mat2[4] + mat1[6] * mat2[5] + mat1[10] * mat2[6] + mat1[14] * mat2[7],
            mat1[3] * mat2[4] + mat1[7] * mat2[5] + mat1[11] * mat2[6] + mat1[15] * mat2[7],

            mat1[0] * mat2[8] + mat1[4] * mat2[9] + mat1[8] * mat2[10] + mat1[12] * mat2[11],
            mat1[1] * mat2[8] + mat1[5] * mat2[9] + mat1[9] * mat2[10] + mat1[13] * mat2[11],
            mat1[2] * mat2[8] + mat1[6] * mat2[9] + mat1[10] * mat2[10] + mat1[14] * mat2[11],
            mat1[3] * mat2[8] + mat1[7] * mat2[9] + mat1[11] * mat2[10] + mat1[15] * mat2[11],

            mat1[0] * mat2[12] + mat1[4] * mat2[13] + mat1[8] * mat2[14] + mat1[12] * mat2[15],
            mat1[1] * mat2[12] + mat1[5] * mat2[13] + mat1[9] * mat2[14] + mat1[13] * mat2[15],
            mat1[2] * mat2[12] + mat1[6] * mat2[13] + mat1[10] * mat2[14] + mat1[14] * mat2[15],
            mat1[3] * mat2[12] + mat1[7] * mat2[13] + mat1[11] * mat2[14] + mat1[15] * mat2[15]
        ];
    }

    static translate(x: number, y: number): Mat4;
    static translate(mat: Mat4, x: number, y: number): Mat4;
    static translate(p1: Mat4|number, p2: number, p3?: number): Mat4 {
        if (typeof p3 == "number") {
            var x: number = p2;
            var y: number = p3;
            var mat: Mat4 = <Mat4>p1;

            var newColom = Vector4.create(
                mat[0] * x + mat[4] * y + mat[12],
                mat[1] * x + mat[5] * y + mat[13],
                mat[2] * x + mat[6] * y + mat[14],
                mat[3] * x + mat[7] * y + mat[15]);

            return Matrix4.setColom(mat, 3, newColom);
        } else {
            var x: number = <number>p1;
            var y: number = p2;

            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1];
        }
    }

    static scale(width: number, height: number): Mat4;
    static scale(mat: Mat4, width: number, height: number): Mat4;
    static scale(p1: Mat4|number, p2: number, p3?: number): Mat4 {
        if (typeof p3 == "number") {
            var width: number = p2;
            var height: number = p3;
            var mat: Mat4 = <Mat4>p1;

            var newColom1 = Vector4.create(
                mat[0] * width,
                mat[1] * width,
                mat[2] * width,
                mat[3] * width);

            var newColom2 = Vector4.create(
                mat[4] * height,
                mat[5] * height,
                mat[6] * height,
                mat[7] * height);

            Matrix4.setColom(mat, 0, newColom1);
            Matrix4.setColom(mat, 1, newColom2);

            return mat;
        } else {
            var width: number = <number>p1;
            var height: number = p2;

            return [width, 0, 0, 0, 0, height, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    }

    static rotate(rad:number): Mat4;
    static rotate(mat: Mat4, rad: number): Mat4;
    static rotate(p1: Mat4|number, p2?: number): Mat4 {
        if (typeof p2 == "number") {
            var rad: number = p2;
            var mat: Mat4 = <Mat4>p1;

            var newColom1 = Vector4.create(
                mat[0] * Math.cos(rad) + mat[4] * Math.sin(rad),
                mat[1] * Math.cos(rad) + mat[5] * Math.sin(rad),
                mat[2] * Math.cos(rad) + mat[6] * Math.sin(rad),
                mat[3] * Math.cos(rad) + mat[7] * Math.sin(rad));

            var newColom2 = Vector4.create(
                mat[0] * -Math.sin(rad) + mat[4] * Math.cos(rad),
                mat[1] * -Math.sin(rad) + mat[5] * Math.cos(rad),
                mat[2] * -Math.sin(rad) + mat[6] * Math.cos(rad),
                mat[3] * -Math.sin(rad) + mat[7] * Math.cos(rad));

            Matrix4.setColom(mat, 0, newColom1);
            Matrix4.setColom(mat, 1, newColom2);

            return mat;
        } else {
            var rad: number = <number>p1;

            return [Math.cos(rad), Math.sin(rad), 0, 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    }

    static ortho(left: number, right: number, bottom: number, top: number): Mat4 {
        return [2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, -2 / (-1 - 1), 0, -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(-1 + 1) / (-1 - 1), 1]
    }
}

class Matrix3 extends Matrix {
    static identity(): Mat3 {
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    static mul(mat1: Mat3, mat2: Mat3) {
        return [
            mat1[0] * mat2[0] + mat1[3] * mat2[1] + mat1[6] * mat2[2],
            mat1[1] * mat2[0] + mat1[4] * mat2[1] + mat1[7] * mat2[2],
            mat1[2] * mat2[0] + mat1[5] * mat2[1] + mat1[8] * mat2[2],

            mat1[0] * mat2[3] + mat1[3] * mat2[4] + mat1[6] * mat2[5],
            mat1[1] * mat2[3] + mat1[4] * mat2[4] + mat1[7] * mat2[5],
            mat1[2] * mat2[3] + mat1[5] * mat2[4] + mat1[8] * mat2[5],

            mat1[0] * mat2[6] + mat1[3] * mat2[7] + mat1[6] * mat2[8],
            mat1[1] * mat2[6] + mat1[4] * mat2[7] + mat1[7] * mat2[8],
            mat1[2] * mat2[6] + mat1[5] * mat2[7] + mat1[8] * mat2[8],
        ];
    }
}

class Matrix2 extends Matrix {
    static identity(): Mat2 {
        return [1, 0, 0, 1];
    }

    static mul(mat1: Mat4, mat2: Mat4) {
        return [
            mat1[0] * mat2[0] + mat1[2] * mat2[1],
            mat1[1] * mat2[0] + mat1[3] * mat2[1],

            mat1[0] * mat2[2] + mat1[2] * mat2[3],
            mat1[1] * mat2[2] + mat1[3] * mat2[3],
        ];
    }
}

module MMath {
    var SEED: number = 0;
    var TO_RAD: number = (Math.PI * 2) / 360;
    var TO_DEG: number = 360 / (Math.PI * 2);

    export function setRandomSeed(seed: number) {
        SEED = seed;
    }

    export function random(min: number = 0, max: number = 1): number {
        SEED = (SEED * 9301 + 49297) % 233280;
        var rnd = SEED / 233280;

        return min + rnd * (max - min);
    }

    export function toRad(deg: number): number {
        return deg * TO_RAD;
    }
    
    export function toDeg(rad: number): number {
        return rad * TO_DEG;
    }

    export function mod(num: number, max: number): number {
        return ((num % max) + max) % max;
    }

    export function logN(base, num) {
        return Math.log(num) / Math.log(base);
    }

    export function isPowerOf2(n: number): boolean {
        if (n == 0) return false;
        else return (n & (n - 1)) == 0
    }
}