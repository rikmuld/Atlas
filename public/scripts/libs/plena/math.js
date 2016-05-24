var Vector;
(function (Vector) {
    function clean(n) {
        var vector = [];
        for (var i = 0; i < n; i++) {
            vector[i] = 0;
        }
        return vector;
    }
    Vector.clean = clean;
    function create() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i - 0] = arguments[_i];
        }
        var vector = [];
        for (var i = 0; i < values.length; i++) {
            vector[i] = values[i];
        }
        return vector;
    }
    Vector.create = create;
    function dot(vec1, vec2) {
        var dot = 0;
        for (var i = 0; i < vec1.length; i++) {
            dot += vec1[i] * vec2[i];
        }
        return dot;
    }
    Vector.dot = dot;
    function magnitude(vec) {
        return Math.sqrt(Vector.dot(vec, vec));
    }
    Vector.magnitude = magnitude;
    function angle(vec1, vec2) {
        return Math.acos(Vector.dot(vec1, vec2) / (Vector.magnitude(vec1) * Vector.magnitude(vec2)));
    }
    Vector.angle = angle;
    var Vec2;
    (function (Vec2) {
        function clean() {
            return [0, 0];
        }
        Vec2.clean = clean;
        function create(x, y) {
            return [x, y];
        }
        Vec2.create = create;
        function dot(vec1, vec2) {
            return vec1[0] * vec2[0] + vec1[1] * vec2[1];
        }
        Vec2.dot = dot;
    })(Vec2 = Vector.Vec2 || (Vector.Vec2 = {}));
    var Vec3;
    (function (Vec3) {
        function clean() {
            return [0, 0, 0];
        }
        Vec3.clean = clean;
        function create(x, y, z) {
            return [x, y, z];
        }
        Vec3.create = create;
        function dot(vec1, vec2) {
            return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
        }
        Vec3.dot = dot;
    })(Vec3 = Vector.Vec3 || (Vector.Vec3 = {}));
    var Vec4;
    (function (Vec4) {
        function clean() {
            return [0, 0, 0, 0];
        }
        Vec4.clean = clean;
        function create(x, y, z, w) {
            return [x, y, z, w];
        }
        Vec4.create = create;
        function dot(vec1, vec2) {
            return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2] + vec1[3] * vec2[3];
        }
        Vec4.dot = dot;
    })(Vec4 = Vector.Vec4 || (Vector.Vec4 = {}));
})(Vector || (Vector = {}));
var Matrix;
(function (Matrix) {
    function clean(size) {
        return Vector.clean(size * size);
    }
    Matrix.clean = clean;
    function identity(size) {
        var mat = [];
        for (var i = 0; i < size * size; i++) {
            mat[i] = (Math.floor(i / size) - i % size) == 0 ? 1 : 0;
        }
        return mat;
    }
    Matrix.identity = identity;
    function copy(mat) {
        return mat.slice();
    }
    Matrix.copy = copy;
    function getRow(mat, row) {
        var size = Matrix.size(mat);
        var vec = [];
        for (var i = 0; i < size; i++) {
            vec[i] = mat[row + i * size];
        }
        return vec;
    }
    Matrix.getRow = getRow;
    function getColom(mat, colom) {
        var size = Matrix.size(mat);
        var vec = [];
        for (var i = 0; i < size; i++) {
            vec[i] = mat[colom * size + i];
        }
        return vec;
    }
    Matrix.getColom = getColom;
    function getValue(mat, row, colom) {
        var size = Matrix.size(mat);
        return mat[row + colom * size];
    }
    Matrix.getValue = getValue;
    function setRow(mat, row, value) {
        var size = Matrix.size(mat);
        for (var i = 0; i < size; i++) {
            mat[row + i * size] = value[i];
        }
        return mat;
    }
    Matrix.setRow = setRow;
    function setColom(mat, colom, value) {
        var size = Matrix.size(mat);
        for (var i = 0; i < size; i++) {
            mat[colom * size + i] = value[i];
        }
        return mat;
    }
    Matrix.setColom = setColom;
    function setvalue(mat, row, colom, value) {
        var size = Matrix.size(mat);
        mat[row + colom * size] = value;
        return mat;
    }
    Matrix.setvalue = setvalue;
    function size(mat) {
        return Math.sqrt(mat.length);
    }
    Matrix.size = size;
    function getTranspose(mat) {
        var size = Matrix.size(mat);
        var matOut = Matrix.clean(size);
        for (var i = 0; i < size; i++) {
            Matrix.setColom(matOut, i, Matrix.getRow(mat, i));
        }
        return matOut;
    }
    Matrix.getTranspose = getTranspose;
    var Mat4;
    (function (Mat4) {
        function identity() {
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
        Mat4.identity = identity;
        function mul(mat1, mat2) {
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
        Mat4.mul = mul;
        function translate(p1, p2, p3) {
            if (typeof p3 == "number") {
                var x = p2;
                var y = p3;
                var mat = p1;
                var newColom = Vector.Vec4.create(mat[0] * x + mat[4] * y + mat[12], mat[1] * x + mat[5] * y + mat[13], mat[2] * x + mat[6] * y + mat[14], mat[3] * x + mat[7] * y + mat[15]);
                return setColom(mat, 3, newColom);
            }
            else {
                var x = p1;
                var y = p2;
                return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1];
            }
        }
        Mat4.translate = translate;
        function scale(p1, p2, p3) {
            if (typeof p3 == "number") {
                var width = p2;
                var height = p3;
                var mat = p1;
                var newColom1 = Vector.Vec4.create(mat[0] * width, mat[1] * width, mat[2] * width, mat[3] * width);
                var newColom2 = Vector.Vec4.create(mat[4] * height, mat[5] * height, mat[6] * height, mat[7] * height);
                setColom(mat, 0, newColom1);
                setColom(mat, 1, newColom2);
                return mat;
            }
            else {
                var width = p1;
                var height = p2;
                return [width, 0, 0, 0, 0, height, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            }
        }
        Mat4.scale = scale;
        function rotate(p1, p2) {
            if (typeof p2 == "number") {
                var rad = p2;
                var mat = p1;
                var newColom1 = Vector.Vec4.create(mat[0] * Math.cos(rad) + mat[4] * Math.sin(rad), mat[1] * Math.cos(rad) + mat[5] * Math.sin(rad), mat[2] * Math.cos(rad) + mat[6] * Math.sin(rad), mat[3] * Math.cos(rad) + mat[7] * Math.sin(rad));
                var newColom2 = Vector.Vec4.create(mat[0] * -Math.sin(rad) + mat[4] * Math.cos(rad), mat[1] * -Math.sin(rad) + mat[5] * Math.cos(rad), mat[2] * -Math.sin(rad) + mat[6] * Math.cos(rad), mat[3] * -Math.sin(rad) + mat[7] * Math.cos(rad));
                setColom(mat, 0, newColom1);
                setColom(mat, 1, newColom2);
                return mat;
            }
            else {
                var rad = p1;
                return [Math.cos(rad), Math.sin(rad), 0, 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            }
        }
        Mat4.rotate = rotate;
        function ortho(left, right, bottom, top) {
            return [2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, -2 / (-1 - 1), 0, -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(-1 + 1) / (-1 - 1), 1];
        }
        Mat4.ortho = ortho;
    })(Mat4 = Matrix.Mat4 || (Matrix.Mat4 = {}));
    var Mat3;
    (function (Mat3) {
        function identity() {
            return [1, 0, 0, 0, 1, 0, 0, 0, 1];
        }
        Mat3.identity = identity;
        function mul(mat1, mat2) {
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
        Mat3.mul = mul;
    })(Mat3 = Matrix.Mat3 || (Matrix.Mat3 = {}));
    var Mat2;
    (function (Mat2) {
        function identity() {
            return [1, 0, 0, 1];
        }
        Mat2.identity = identity;
        function mul(mat1, mat2) {
            return [
                mat1[0] * mat2[0] + mat1[2] * mat2[1],
                mat1[1] * mat2[0] + mat1[3] * mat2[1],
                mat1[0] * mat2[2] + mat1[2] * mat2[3],
                mat1[1] * mat2[2] + mat1[3] * mat2[3],
            ];
        }
        Mat2.mul = mul;
    })(Mat2 = Matrix.Mat2 || (Matrix.Mat2 = {}));
})(Matrix || (Matrix = {}));
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