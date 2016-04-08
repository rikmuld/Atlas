var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector = (function () {
    function Vector() {
    }
    Vector.clean = function (n) {
        var vector = [];
        for (var i = 0; i < n; i++) {
            vector[i] = 0;
        }
        return vector;
    };
    Vector.create = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i - 0] = arguments[_i];
        }
        var vector = [];
        for (var i = 0; i < values.length; i++) {
            vector[i] = values[i];
        }
        return vector;
    };
    Vector.dot = function (vec1, vec2) {
        var dot = 0;
        for (var i = 0; i < vec1.length; i++) {
            dot += vec1[i] * vec2[i];
        }
        return dot;
    };
    Vector.magnitude = function (vec) {
        return Math.sqrt(Vector.dot(vec, vec));
    };
    Vector.angle = function (vec1, vec2) {
        return Math.acos(Vector.dot(vec1, vec2) / (Vector.magnitude(vec1) * Vector.magnitude(vec2)));
    };
    return Vector;
})();
var Vector2 = (function (_super) {
    __extends(Vector2, _super);
    function Vector2() {
        _super.apply(this, arguments);
    }
    Vector2.clean = function () {
        return [0, 0];
    };
    Vector2.create = function (x, y) {
        return [x, y];
    };
    Vector2.dot = function (vec1, vec2) {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1];
    };
    return Vector2;
})(Vector);
var Vector3 = (function (_super) {
    __extends(Vector3, _super);
    function Vector3() {
        _super.apply(this, arguments);
    }
    Vector3.clean = function () {
        return [0, 0, 0];
    };
    Vector3.create = function (x, y, z) {
        return [x, y, z];
    };
    Vector3.dot = function (vec1, vec2) {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
    };
    return Vector3;
})(Vector);
var Vector4 = (function (_super) {
    __extends(Vector4, _super);
    function Vector4() {
        _super.apply(this, arguments);
    }
    Vector4.clean = function () {
        return [0, 0, 0, 0];
    };
    Vector4.create = function (x, y, z, w) {
        return [x, y, z, w];
    };
    Vector4.dot = function (vec1, vec2) {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2] + vec1[3] * vec2[3];
    };
    return Vector4;
})(Vector);
var Matrix = (function () {
    function Matrix() {
    }
    Matrix.clean = function (size) {
        return Vector.clean(size * size);
    };
    Matrix.identity = function (size) {
        var mat = [];
        for (var i = 0; i < size * size; i++) {
            mat[i] = (Math.floor(i / size) - i % size) == 0 ? 1 : 0;
        }
        return mat;
    };
    Matrix.copy = function (mat) {
        return mat.slice();
    };
    Matrix.getRow = function (mat, row) {
        var size = Matrix.size(mat);
        var vec = [];
        for (var i = 0; i < size; i++) {
            vec[i] = mat[row + i * size];
        }
        return vec;
    };
    Matrix.getColom = function (mat, colom) {
        var size = Matrix.size(mat);
        var vec = [];
        for (var i = 0; i < size; i++) {
            vec[i] = mat[colom * size + i];
        }
        return vec;
    };
    Matrix.getValue = function (mat, row, colom) {
        var size = Matrix.size(mat);
        return mat[row + colom * size];
    };
    Matrix.setRow = function (mat, row, value) {
        var size = Matrix.size(mat);
        for (var i = 0; i < size; i++) {
            mat[row + i * size] = value[i];
        }
        return mat;
    };
    Matrix.setColom = function (mat, colom, value) {
        var size = Matrix.size(mat);
        for (var i = 0; i < size; i++) {
            mat[colom * size + i] = value[i];
        }
        return mat;
    };
    Matrix.setvalue = function (mat, row, colom, value) {
        var size = Matrix.size(mat);
        mat[row + colom * size] = value;
        return mat;
    };
    Matrix.size = function (mat) {
        return Math.sqrt(mat.length);
    };
    Matrix.getTranspose = function (mat) {
        var size = Matrix.size(mat);
        var matOut = Matrix.clean(size);
        for (var i = 0; i < size; i++) {
            Matrix.setColom(matOut, i, Matrix.getRow(mat, i));
        }
        return matOut;
    };
    return Matrix;
})();
var Matrix4 = (function (_super) {
    __extends(Matrix4, _super);
    function Matrix4() {
        _super.apply(this, arguments);
    }
    Matrix4.identity = function () {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    };
    Matrix4.mul = function (mat1, mat2) {
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
    };
    Matrix4.translate = function (p1, p2, p3) {
        if (typeof p3 == "number") {
            var x = p2;
            var y = p3;
            var mat = p1;
            var newColom = Vector4.create(mat[0] * x + mat[4] * y + mat[12], mat[1] * x + mat[5] * y + mat[13], mat[2] * x + mat[6] * y + mat[14], mat[3] * x + mat[7] * y + mat[15]);
            return Matrix4.setColom(mat, 3, newColom);
        }
        else {
            var x = p1;
            var y = p2;
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1];
        }
    };
    Matrix4.scale = function (p1, p2, p3) {
        if (typeof p3 == "number") {
            var width = p2;
            var height = p3;
            var mat = p1;
            var newColom1 = Vector4.create(mat[0] * width, mat[1] * width, mat[2] * width, mat[3] * width);
            var newColom2 = Vector4.create(mat[4] * height, mat[5] * height, mat[6] * height, mat[7] * height);
            Matrix4.setColom(mat, 0, newColom1);
            Matrix4.setColom(mat, 1, newColom2);
            return mat;
        }
        else {
            var width = p1;
            var height = p2;
            return [width, 0, 0, 0, 0, height, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    };
    Matrix4.rotate = function (p1, p2) {
        if (typeof p2 == "number") {
            var rad = p2;
            var mat = p1;
            var newColom1 = Vector4.create(mat[0] * Math.cos(rad) + mat[4] * Math.sin(rad), mat[1] * Math.cos(rad) + mat[5] * Math.sin(rad), mat[2] * Math.cos(rad) + mat[6] * Math.sin(rad), mat[3] * Math.cos(rad) + mat[7] * Math.sin(rad));
            var newColom2 = Vector4.create(mat[0] * -Math.sin(rad) + mat[4] * Math.cos(rad), mat[1] * -Math.sin(rad) + mat[5] * Math.cos(rad), mat[2] * -Math.sin(rad) + mat[6] * Math.cos(rad), mat[3] * -Math.sin(rad) + mat[7] * Math.cos(rad));
            Matrix4.setColom(mat, 0, newColom1);
            Matrix4.setColom(mat, 1, newColom2);
            return mat;
        }
        else {
            var rad = p1;
            return [Math.cos(rad), Math.sin(rad), 0, 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    };
    Matrix4.ortho = function (left, right, bottom, top) {
        return [2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, -2 / (-1 - 1), 0, -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(-1 + 1) / (-1 - 1), 1];
    };
    return Matrix4;
})(Matrix);
var Matrix3 = (function (_super) {
    __extends(Matrix3, _super);
    function Matrix3() {
        _super.apply(this, arguments);
    }
    Matrix3.identity = function () {
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    };
    Matrix3.mul = function (mat1, mat2) {
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
    };
    return Matrix3;
})(Matrix);
var Matrix2 = (function (_super) {
    __extends(Matrix2, _super);
    function Matrix2() {
        _super.apply(this, arguments);
    }
    Matrix2.identity = function () {
        return [1, 0, 0, 1];
    };
    Matrix2.mul = function (mat1, mat2) {
        return [
            mat1[0] * mat2[0] + mat1[2] * mat2[1],
            mat1[1] * mat2[0] + mat1[3] * mat2[1],
            mat1[0] * mat2[2] + mat1[2] * mat2[3],
            mat1[1] * mat2[2] + mat1[3] * mat2[3],
        ];
    };
    return Matrix2;
})(Matrix);
var MMath;
(function (MMath) {
    var SEED = 0;
    var TO_RAD = (Math.PI * 2) / 360;
    var TO_DEG = 360 / (Math.PI * 2);
    function setRandomSeed(seed) {
        SEED = seed;
    }
    MMath.setRandomSeed = setRandomSeed;
    function random(min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        SEED = (SEED * 9301 + 49297) % 233280;
        var rnd = SEED / 233280;
        return min + rnd * (max - min);
    }
    MMath.random = random;
    function toRad(deg) {
        return deg * TO_RAD;
    }
    MMath.toRad = toRad;
    function toDeg(rad) {
        return rad * TO_DEG;
    }
    MMath.toDeg = toDeg;
    function mod(num, max) {
        return ((num % max) + max) % max;
    }
    MMath.mod = mod;
    function logN(base, num) {
        return Math.log(num) / Math.log(base);
    }
    MMath.logN = logN;
    function isPowerOf2(n) {
        if (n == 0)
            return false;
        else
            return (n & (n - 1)) == 0;
    }
    MMath.isPowerOf2 = isPowerOf2;
})(MMath || (MMath = {}));
//# sourceMappingURL=math.js.map