var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//fix render function
var Grix = (function () {
    function Grix(customShader) {
        this.mode = gl.TRIANGLES;
        this.drawer = new Render();
        this.isFinal = false;
        this.childs = new Queue();
        this.xT = 0;
        this.yT = 0;
        this.sXT = 1;
        this.sYT = 1;
        this.angle = 0;
        this.pmX = 0;
        this.pmY = 0;
        this.prX = 0;
        this.prY = 0;
        this.relRotP = true;
        this.mirrorX = false;
        this.mirrorY = false;
        this.drawer = new Render();
        if (customShader) {
            this.customeShader = customShader;
            if (!Plena.manager().hasShader(customShader.getId()))
                Plena.manager().addShader(customShader);
        }
    }
    Grix.prototype.start = function () {
        this.drawer.start();
    };
    Grix.prototype.end = function () {
        this.drawer.end();
    };
    Grix.prototype.doRenderAll = function () {
        var size = this.childs.size();
        if (size > 0) {
            this.start();
            for (var i = 0; i < size; i++) {
                var child = this.childs.dequeue();
                this.getShader().getMatHandler().setModelMatrix(child.transform);
                this.doRender(child);
            }
            this.end();
            this.clean();
        }
    };
    Grix.prototype.doRender = function (child) {
        this.drawer.drawElements(0, this.mode);
    };
    Grix.prototype.populate = function () {
        this.drawer.populate(this.getShader());
        Plena.manager().addGrix(this.getShader(), this);
        this.isFinal = true;
        this.clean();
        return this;
    };
    Grix.prototype.isLoaded = function () {
        return true;
    };
    Grix.prototype.render = function () {
        //rotating and mirroring does not work together, I made something to have the displacement of mirroring to be corected, but I did not keep the rotation into account, so only angle==0 will work with mirroring, it does work with scaling
        if (!this.isLoaded())
            return;
        var centerX = ((this.width * this.getXScale()) / 2);
        var centerY = ((this.height * this.getYScale()) / 2);
        var aC = Math.cos(this.angle);
        var aS = Math.sin(this.angle);
        var xTr = centerX + this.xT;
        var yTr = centerY + this.yT;
        var mX = (this.mirrorX ? -1 : 1);
        var mY = (this.mirrorY ? -1 : 1);
        var x2 = !this.relRotP ? -this.prX + this.xT : -centerX - this.prX * (centerX * 2);
        var y2 = !this.relRotP ? -this.prY + this.yT : -centerY - this.prY * (centerY * 2);
        var x3 = this.getXScale() * mX;
        var y3 = this.getYScale() * mY;
        var x1 = xTr + (this.mirrorX ? centerX * 2 : 0) + (!this.relRotP ? this.prX - xTr : this.prX * (centerX * 2)) + aC * x2 + -aS * y2;
        var y1 = yTr + (this.mirrorY ? centerY * 2 : 0) + (!this.relRotP ? this.prY - yTr : this.prY * (centerY * 2)) + aS * x2 + aC * y2;
        var transform = [aC * x3, aS * x3, 0, 0, -aS * y3, aC * y3, 0, 0, 0, 0, 1, 0, x1, y1, 0, 1];
        this.childs.enqueue(this.createGrixc(transform));
    };
    Grix.prototype.getXScale = function () {
        return this.sXT;
    };
    Grix.prototype.getYScale = function () {
        return this.sYT;
    };
    Grix.prototype.createGrixc = function (transform) {
        return { transform: transform };
    };
    Grix.prototype.move = function (x, y) {
        this.xT += x;
        this.yT += y;
    };
    Grix.prototype.moveTo = function (x, y) {
        this.moveXTo(x);
        this.moveYTo(y);
    };
    Grix.prototype.moveXTo = function (x) {
        this.xT = x - (this.width * this.getXScale()) * this.pmX;
    };
    Grix.prototype.moveYTo = function (y) {
        this.yT = y - (this.height * this.getYScale()) * this.pmY;
    };
    Grix.prototype.scale = function (x, y) {
        this.sXT += x;
        this.sYT += y;
    };
    Grix.prototype.scaleTo = function (x, y) {
        this.sXT = x;
        this.sYT = y;
    };
    Grix.prototype.scaleToSize = function (width, height) {
        var x = width / this.width;
        var y = height / this.height;
        this.scaleTo(x, y);
    };
    Grix.prototype.scaleWidthToSize = function (width) {
        var x = width / this.width;
        this.scaleTo(x, x);
    };
    Grix.prototype.scaleHeightToSize = function (height) {
        var y = height / this.height;
        this.scaleTo(y, y);
    };
    Grix.prototype.rotate = function (angle) {
        this.angle += angle;
    };
    Grix.prototype.rotateTo = function (angle) {
        this.angle = angle;
    };
    Grix.prototype.rotateDeg = function (angle) {
        this.rotate(MMath.toRad(angle));
    };
    Grix.prototype.rotateToDeg = function (angle) {
        this.rotateTo(MMath.toRad(angle));
    };
    Grix.prototype.clean = function () {
        this.xT = 0;
        this.yT = 0;
        this.prY = 0;
        this.prX = 0;
        this.pmY = 0;
        this.pmX = 0;
        this.sXT = 1;
        this.sYT = 1;
        this.angle = 0;
        this.relRotP = true;
        this.mirrorX = false;
        this.mirrorY = false;
    };
    Grix.prototype.mirrorHorizontal = function (mirror) {
        this.mirrorX = mirror;
    };
    Grix.prototype.mirrorVertical = function (mirror) {
        this.mirrorY = mirror;
    };
    Grix.prototype.setPivotRot = function (x, y, relative) {
        if (typeof relative == "boolean" && relative == false) {
            this.relRotP = false;
            this.prX = x;
            this.prY = y;
        }
        else {
            this.prX = x - 0.5;
            this.prY = y - 0.5;
            this.relRotP = true;
        }
    };
    Grix.prototype.setPivotMove = function (x, y) {
        this.pmX = x;
        this.pmY = y;
    };
    Grix.prototype.getWidth = function () {
        return this.width * this.getXScale();
    };
    Grix.prototype.getHeight = function () {
        return this.height * this.getYScale();
    };
    return Grix;
})();
var TexturedGrix = (function (_super) {
    __extends(TexturedGrix, _super);
    function TexturedGrix() {
        _super.apply(this, arguments);
        this.minX = Math.min();
        this.minY = Math.min();
        this.maxX = Math.max();
        this.maxY = Math.max();
        this.cound = 0;
    }
    TexturedGrix.prototype.start = function () {
        _super.prototype.start.call(this);
        this.getImg().bind();
    };
    TexturedGrix.prototype.getIndieces = function (indiec, cound) {
        indiec.forEach(function (val, index, array) {
            array[index] = val + cound * 4;
        });
        return indiec;
    };
    TexturedGrix.prototype.populate = function () {
        var _this = this;
        this.height = Math.abs(this.maxY - this.minY);
        this.width = Math.abs(this.maxX - this.minX);
        this.getImg().onLoaded(function () {
            _super.prototype.populate.call(_this);
        });
        return this;
    };
    TexturedGrix.prototype.getShader = function () {
        return !this.customeShader ? Shader.getShader(Shader.TEXTURE) : this.customeShader;
    };
    TexturedGrix.prototype.isLoaded = function () {
        return this.getImg().loaded();
    };
    TexturedGrix.prototype.addRect = function (width, height, x, y) {
        this.drawer.pushVerts([x, y, x + width, y, x + width, y + height, x, y + height]);
        this.drawer.pushIndices(0, this.getIndieces([0, 1, 3, 1, 2, 3], this.cound));
        this.minX = Math.min(x, this.minX);
        this.maxX = Math.max(width + x, this.maxX);
        this.minY = Math.min(y, this.minY);
        this.maxY = Math.max(height + y, this.maxY);
        this.cound++;
    };
    return TexturedGrix;
})(Grix);
//shape intergration into everything to grix -> shapeGrix -> (texturedGrix -> imgGrix)/(colorGrix)...
//easy uv management to grix, to mode to use all transform functions for uv instead of coords
//remove manage system, create optional bundeled rendering system that a user can setup to get the benifits of bulk rendering
var ImgGrix = (function (_super) {
    __extends(ImgGrix, _super);
    function ImgGrix() {
        _super.apply(this, arguments);
    }
    ImgGrix.prototype.add = function (width, height, img, x, y, coords) {
        var _this = this;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (this.texture != null && this.texture != img)
            Plena.log("You cannot use different texture files in one ImgGrix!");
        else
            this.texture = img;
        img.onLoaded(function () {
            var coord = coords ? coords : img.getCoord();
            console.log(coords);
            _this.drawer.pushUV([coord.getXMin(), coord.getYMin(), coord.getXMax(), coord.getYMin(), coord.getXMax(), coord.getYMax(), coord.getXMin(), coord.getYMax()]);
        });
        this.addRect(width, height, x, y);
        return this;
    };
    ImgGrix.prototype.mkEllipse = function (img, radiusX, radiusY, radiusU, radiusV, x, y, u, v, parts, drawParts) {
        var _this = this;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (u === void 0) { u = 0; }
        if (v === void 0) { v = 0; }
        if (parts === void 0) { parts = 35; }
        if (this.texture != null && this.texture != img)
            Plena.log("You cannot use different texture files in one ImgGrix!");
        else
            this.texture = img;
        if (!drawParts)
            drawParts = parts;
        this.mode = gl.TRIANGLE_FAN;
        var coords = [x + radiusX, y + radiusY];
        var indicies = [0];
        for (var i = 0; i < drawParts + 1; i++) {
            var angle = i * ((Math.PI * 2) / parts);
            coords.push(x + radiusX + Math.cos(angle) * radiusX);
            coords.push(y + radiusY + Math.sin(angle) * radiusY);
            indicies.push(1 + i);
        }
        this.drawer.pushVerts(coords);
        this.drawer.pushIndices(0, indicies);
        this.setMaxMin(x - radiusX, x + radiusX, y - radiusX, y + radiusX);
        img.onLoaded(function () {
            coords = [(u + radiusU) / img.maxX(), (v + radiusV) / img.maxY()];
            for (var i = 0; i < drawParts + 1; i++) {
                var angle = i * ((Math.PI * 2) / parts);
                coords.push((u + radiusU + Math.cos(angle) * radiusU) / img.maxX());
                coords.push((v + radiusV + Math.sin(angle) * radiusV) / img.maxY());
            }
            _this.drawer.pushUV(coords);
        });
        return this;
    };
    ImgGrix.prototype.setMaxMin = function (xl, xh, yl, yh) {
        this.setMaxMinX(xl, xh);
        this.setMaxMinY(yl, yh);
    };
    ImgGrix.prototype.setMaxMinX = function (xl, xh) {
        this.minX = Math.min(this.minX, xl);
        this.maxX = Math.max(this.maxX, xh);
    };
    ImgGrix.prototype.setMaxMinY = function (yl, yh) {
        this.minY = Math.min(this.minY, yl);
        this.maxY = Math.max(this.maxY, yh);
    };
    ImgGrix.prototype.mkCircle = function (img, radius, radiusImg, x, y, u, v, parts, drawParts) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (u === void 0) { u = 0; }
        if (v === void 0) { v = 0; }
        if (parts === void 0) { parts = 35; }
        return this.mkEllipse(img, radius, radius, radiusImg, radiusImg, x, y, u, v, parts, drawParts);
    };
    ImgGrix.prototype.mkPolygon = function (img, radius, radiusImg, corners, x, y, u, v) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (u === void 0) { u = 0; }
        if (v === void 0) { v = 0; }
        return this.mkCircle(img, radius, radiusImg, x, y, u, v, corners);
    };
    ImgGrix.prototype.fromTexture = function (img, width, height) {
        var _this = this;
        img.onLoaded(function () {
            _this.add(width ? width : img.getWidth(), height ? height : img.getHeight(), img);
            _this.populate();
        });
        return this;
    };
    ImgGrix.prototype.getImg = function () {
        return this.texture;
    };
    ImgGrix.prototype.populate = function () {
        _super.prototype.populate.call(this);
        return this;
    };
    return ImgGrix;
})(TexturedGrix);
var Grix;
(function (Grix) {
    function fromTexture(img, width, height, options) {
        return new ImgGrix().fromTexture(toImg(img, options), width, height);
    }
    Grix.fromTexture = fromTexture;
    function toImg(img, options) {
        if (img.getCoord)
            return img;
        else if (img.getBaseImg)
            return img.getBaseImg();
        else {
            var canvas = img.canvas;
            if (!canvas)
                canvas = img;
            return Assets.getTexture(canvas, options);
        }
    }
})(Grix || (Grix = {}));
var WritableGrix = (function (_super) {
    __extends(WritableGrix, _super);
    function WritableGrix(tex, customShader) {
        _super.call(this, customShader);
        this.wX = 0;
        this.wY = 0;
        this.pwX = 0;
        this.pwY = 0;
        this.writable = tex;
        this.texture = tex.getImg();
    }
    WritableGrix.prototype.startWrite = function (view) {
        if (this.color) {
            this.oldColor = Plena.getCurrCol();
            Plena.setColor(this.color);
        }
        this.writable.startWrite(view);
    };
    WritableGrix.prototype.endWrite = function () {
        this.writable.stopWrite();
        if (this.color)
            Plena.setColor(this.oldColor);
    };
    WritableGrix.prototype.moveWirte = function (x, y) {
        this.moveTo(this.wX + x, this.wY + y);
    };
    WritableGrix.prototype.moveWirteTo = function (x, y) {
        this.moveWirteXTo(x);
        this.moveWirteYTo(y);
    };
    WritableGrix.prototype.moveWirteXTo = function (x) {
        this.wX = x - this.writable.getWidth() * this.pwX;
        this.writable.x = this.wX;
    };
    WritableGrix.prototype.setBackground = function (color) {
        this.color = color;
    };
    WritableGrix.prototype.moveWirteYTo = function (y) {
        this.wY = y - this.writable.getHeight() * this.pwY;
        this.writable.y = this.wY;
    };
    WritableGrix.prototype.setPivotWirte = function (x, y) {
        this.pwX = x;
        this.pwY = y;
    };
    WritableGrix.prototype.clean = function () {
        _super.prototype.clean.call(this);
    };
    WritableGrix.prototype.populate = function () {
        _super.prototype.populate.call(this);
        return this;
    };
    return WritableGrix;
})(ImgGrix);
var Grix;
(function (Grix) {
    function writable(img) {
        return new WritableGrix(img).fromTexture(img.getImg());
    }
    Grix.writable = writable;
})(Grix || (Grix = {}));
var SpriteGrix = (function (_super) {
    __extends(SpriteGrix, _super);
    function SpriteGrix(sprite, customShader) {
        var _this = this;
        _super.call(this, customShader);
        this.step = 0;
        this.autoSize = false;
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.texture = sprite;
        sprite.onLoaded(function () {
            if (sprite.hasSubImg())
                _this.activeImg(sprite.arbImgName());
            else if (sprite.hasAnime())
                _this.activeAnime(sprite.arbAnimName());
            else
                Plena.log("No sub images or animations found in sprite file!");
        });
    }
    SpriteGrix.prototype.add = function (width, height, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.drawer.pushUV([0, 0, 1, 0, 1, 1, 0, 1]);
        this.addRect(width, height, x, y);
        return this;
    };
    SpriteGrix.prototype.fromSprite = function () {
        var _this = this;
        this.texture.onLoaded(function () {
            var img = _this.defaultImg ? _this.texture.getImg(_this.defaultImg) : _this.texture.getAnim(_this.defaultAnime)[0];
            _this.add(1, 1);
            _this.autoSize = true;
            _this.populate();
        });
        return this;
    };
    SpriteGrix.prototype.getImg = function () {
        return this.texture.getBaseImg();
    };
    SpriteGrix.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.img = this.defaultImg;
        this.anime = this.defaultAnime;
        if (this.autoSize) {
            this.imgWidth = ((this.img) ? this.texture.getImg(this.img) : this.texture.getAnim(this.anime)[0]).getWidth();
            this.imgHeight = ((this.img) ? this.texture.getImg(this.img) : this.texture.getAnim(this.anime)[0]).getHeight();
        }
    };
    SpriteGrix.prototype.activeImg = function (img) {
        if (this.autoSize) {
            this.imgWidth = this.texture.getImg(img).getWidth();
            this.imgHeight = this.texture.getImg(img).getHeight();
        }
        if (this.isFinal)
            this.img = img;
        else
            this.defaultImg = img;
        this.anime = null;
        if (!this.isFinal)
            this.defaultAnime = null;
        return this;
    };
    SpriteGrix.prototype.activeAnime = function (anime) {
        if (this.autoSize) {
            this.imgWidth = this.texture.getAnim(anime)[0].getWidth();
            this.imgHeight = this.texture.getAnim(anime)[0].getHeight();
        }
        if (this.isFinal)
            this.anime = anime;
        else
            this.defaultAnime = anime;
        this.img = null;
        if (!this.isFinal)
            this.defaultImg = null;
        return this;
    };
    SpriteGrix.prototype.scaleToSize = function (width, height) {
        var x = width / this.getImgWidth();
        var y = height / this.getImgHeight();
        this.scaleTo(x, y);
    };
    SpriteGrix.prototype.scaleWidthToSize = function (width) {
        var x = width / this.getImgWidth();
        this.scaleTo(x, x);
    };
    SpriteGrix.prototype.scaleHeightToSize = function (height) {
        var y = height / this.getImgHeight();
        this.scaleTo(y, y);
    };
    SpriteGrix.prototype.getImgWidth = function () {
        return (this.autoSize ? this.imgWidth : this.width);
    };
    SpriteGrix.prototype.getImgHeight = function () {
        return (this.autoSize ? this.imgHeight : this.height);
    };
    SpriteGrix.prototype.getXScale = function () {
        return this.sXT * ((this.autoSize) ? this.imgWidth : 1);
    };
    SpriteGrix.prototype.getYScale = function () {
        return this.sYT * ((this.autoSize) ? this.imgHeight : 1);
    };
    SpriteGrix.prototype.animeStep = function (step) {
        if (this.anime == null)
            Plena.log("Cannot set animation setp, no active animation was set");
        else
            this.step = step % this.texture.getAnim(this.anime).length;
    };
    SpriteGrix.prototype.createGrixc = function (transform) {
        var child = { transform: transform, img: this.img, anime: this.anime, step: this.step };
        return child;
    };
    SpriteGrix.prototype.doRender = function (grixC) {
        var child = grixC;
        if (child.anime != null || child.img != null) {
            var coords = (child.anime == null ? this.texture.getImg(child.img) : this.texture.getAnim(child.anime)[child.step]).getCoord();
            var width_1 = coords.getXMax() - coords.getXMin();
            var height_1 = coords.getYMax() - coords.getYMin();
            var mat = [width_1, 0, 0, 0, 0, height_1, 0, 0, 0, 0, 1, 0, coords.getXMin(), coords.getYMin(), 0, 1];
            this.getShader().getMatHandler().setUVMatrix(mat);
            this.drawer.drawElements(0, this.mode);
        }
        else
            Plena.log("AnimeGrix has no active animation or image! Maybe you fotgot to setup your sprite?");
    };
    SpriteGrix.prototype.populate = function () {
        _super.prototype.populate.call(this);
        return this;
    };
    SpriteGrix.prototype.end = function () {
        _super.prototype.end.call(this);
        this.getShader().getMatHandler().setUVMatrix(Matrix.Mat4.identity());
    };
    return SpriteGrix;
})(TexturedGrix);
var Grix;
(function (Grix) {
    function fromSprite(sprite) {
        return new SpriteGrix(sprite).fromSprite();
    }
    Grix.fromSprite = fromSprite;
})(Grix || (Grix = {}));
//slow for many, two new types try, one mk textue of text and store than draw tex, two mk render of text and just draw.
var TextGrix = (function (_super) {
    __extends(TextGrix, _super);
    //align in tecxt grid, espcially for goood move transforms
    function TextGrix(fontMap, customShader) {
        _super.call(this, fontMap.getMap(), customShader);
        this.yOffset = 0;
        this.xOffset = 0;
        this.add(1, 1);
        this.populate();
        this.fontMap = fontMap;
    }
    TextGrix.prototype.fontsize = function (px) {
        var size = px / this.fontMap.defaultSize();
        this.scaleTo(size, size);
    };
    TextGrix.prototype.offsetY = function (offset) {
        this.yOffset = offset;
    };
    TextGrix.prototype.offsetX = function (offset) {
        this.xOffset = offset;
    };
    TextGrix.prototype.storeText = function (id, text, maxWidth) {
        if (maxWidth === void 0) { maxWidth = -1; }
        //stores text for future draw
    };
    TextGrix.prototype.cleanText = function (id) {
    };
    TextGrix.prototype.drawText = function (id) {
    };
    TextGrix.prototype.text = function (text, maxWidth) {
        if (maxWidth === void 0) { maxWidth = -1; }
        //stores text but discards them the first time the text is not drawn during a render
    };
    TextGrix.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.yOffset = 0;
        this.xOffset = 0;
    };
    TextGrix.prototype.freeText = function (text, maxWidth) {
        if (maxWidth === void 0) { maxWidth = -1; }
        var x = this.xT;
        var y = this.yT;
        if (maxWidth != -1) {
            var textArr = text.split(" ");
            var width = 0;
            for (var i = 0; i < textArr.length; i++) {
                var tx = textArr[i];
                if (width > 0 && width + this.length(tx) > maxWidth) {
                    width = 0;
                    this.moveXTo(x);
                    this.move(0, (this.fontMap.getDim("a")[1] + this.yOffset) * this.sYT);
                    width += this.do_text(tx + " ");
                }
                else {
                    width += this.do_text(tx + " ");
                }
            }
        }
        else {
            this.do_text(text);
        }
    };
    TextGrix.prototype.length = function (text) {
        var length = 0;
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            length += this.fontMap.getDim(char)[0] * this.sXT + this.xOffset;
        }
        return length;
    };
    TextGrix.prototype.textSplit = function (text, max, ctx) {
        var retText = [];
        var textArr = text.split(" ");
        var flag = "";
        for (var i = 0; i < textArr.length; i++) {
            if (flag.length == 0)
                flag = textArr[i];
            else {
                var subFlag = flag + " " + textArr[i];
                if (ctx.measureText(subFlag).width > max) {
                    retText.push(flag);
                    flag = textArr[i];
                }
                else
                    flag = subFlag;
            }
        }
        if (flag.length > 0)
            retText.push(flag);
        return retText;
    };
    TextGrix.prototype.do_text = function (text) {
        var dX = this.sXT;
        var dY = this.sYT;
        var widthTotal = 0;
        for (var i = 0; i < text.length; i++) {
            var a = text.charAt(i);
            if (a == " ") {
                this.move(this.fontMap.spacing() * dX + this.xOffset, 0);
                widthTotal += this.fontMap.spacing() * dX + this.xOffset;
            }
            else {
                var dim = this.fontMap.getDim(a);
                var height = dim[1];
                var width = dim[0];
                this.activeImg(a);
                this.scaleToSize(width * dX, height * dY);
                this.render();
                this.move(width * dX + this.xOffset, 0);
                widthTotal += width * dX + this.xOffset;
            }
        }
        this.scaleTo(dX, dY);
        return widthTotal;
    };
    return TextGrix;
})(SpriteGrix);
var Grix;
(function (Grix) {
    function text(text, font, options, maxWidth, offset, background) {
        if (options === void 0) { options = Assets.LETTERS; }
        if (maxWidth === void 0) { maxWidth = -1; }
        if (offset === void 0) { offset = 0; }
        return Grix.fromTexture(Assets.mkTextImg(text, font, options, maxWidth, offset, background));
    }
    Grix.text = text;
    function fromFontMap(fontMap) {
        return new TextGrix(fontMap);
    }
    Grix.fromFontMap = fromFontMap;
})(Grix || (Grix = {}));
var ShapeGrix = (function (_super) {
    __extends(ShapeGrix, _super);
    function ShapeGrix() {
        _super.apply(this, arguments);
        //draw offset affecting all x and y coords
        //render one id indieces only, give spoecific draw mode for render real time
        //color per index
        //ellipse
        this.minX = Math.min();
        this.minY = Math.min();
        this.maxX = Math.max();
        this.maxY = Math.max();
        this.colorDefault = Color.Gray.BLACK;
        this.indiece = 0;
        this.drawModes = [gl.TRIANGLES];
        this.index = [0];
        this.indexDefault = [0];
    }
    ShapeGrix.prototype.populate = function () {
        this.height = Math.abs(this.maxY - this.minY);
        this.width = Math.abs(this.maxX - this.minX);
        _super.prototype.populate.call(this);
        return this;
    };
    ShapeGrix.prototype.getShader = function () {
        return !this.customeShader ? Shader.getShader(Shader.COLOR) : this.customeShader;
    };
    ShapeGrix.prototype.setColor = function (color) {
        if (this.isFinal)
            this.color = color;
        else
            this.colorDefault = color;
        return this;
    };
    ShapeGrix.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.color = this.colorDefault;
        this.index = this.indexDefault;
    };
    ShapeGrix.prototype.setMaxMin = function (xl, xh, yl, yh) {
        this.setMaxMinX(xl, xh);
        this.setMaxMinY(yl, yh);
    };
    ShapeGrix.prototype.setMaxMinX = function (xl, xh) {
        this.minX = Math.min(this.minX, xl);
        this.maxX = Math.max(this.maxX, xh);
    };
    ShapeGrix.prototype.setMaxMinY = function (yl, yh) {
        this.minY = Math.min(this.minY, yl);
        this.maxY = Math.max(this.maxY, yh);
    };
    ShapeGrix.prototype.point = function (x, y, index) {
        if (index === void 0) { index = 0; }
        this.drawer.pushVerts([x, y]);
        this.drawer.pushIndices(index, [this.indiece]);
        this.indiece += 1;
        this.setMaxMin(x, x, y, y);
        return this;
    };
    ShapeGrix.prototype.line = function (x, y, xo, yo, index) {
        if (index === void 0) { index = 0; }
        this.drawer.pushVerts([x, y, xo, yo]);
        this.drawer.pushIndices(index, [this.indiece, this.indiece + 1]);
        this.indiece += 2;
        this.setMaxMin(x, xo, y, yo);
        return this;
    };
    ShapeGrix.prototype.quad = function (width, height, x, y, index) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (index === void 0) { index = 0; }
        if (x < 0 || y < 0)
            Plena.log("A negative value for x or y was passed to a grix, grix might not behave as sespected during transformation before drawing, try to make this positive. The positioning is not meant for presise positioning in a world, only for relative location to other shapes in this grix, use move transformation in grix for presise transformation in your world");
        var ind = this.indiece;
        this.drawer.pushVerts([x, y, x + width, y, x + width, y + height, x, y + height]);
        this.drawer.pushIndices(index, [ind, ind + 1, ind + 2, ind + 2, ind + 3, ind + 0]);
        this.setMaxMin(x, x + width, y, y + height);
        this.indiece += 4;
        return this;
    };
    ShapeGrix.prototype.ellipse = function (radiusX, radiusY, x, y, index, center, parts, drawParts) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (index === void 0) { index = 0; }
        if (center === void 0) { center = true; }
        if (parts === void 0) { parts = 35; }
        var coords = center ? [x + radiusX, y + radiusY] : [];
        var indicies = center ? [this.indiece] : [];
        if (center)
            this.indiece += 1;
        if (!drawParts)
            drawParts = parts;
        for (var i = 0; i < drawParts + 1; i++) {
            var angle = i * ((Math.PI * 2) / parts);
            coords.push(x + radiusX + Math.cos(angle) * radiusX);
            coords.push(y + radiusY + Math.sin(angle) * radiusY);
            indicies.push(i + this.indiece);
        }
        this.drawer.pushVerts(coords);
        this.drawer.pushIndices(index, indicies);
        this.setMaxMin(x - radiusX, x + radiusX, y - radiusX, y + radiusX);
        this.indiece += drawParts + 1;
        return this;
    };
    ShapeGrix.prototype.addIndicie = function (ind, index) {
        this.drawer.pushIndices(index, ind);
    };
    ShapeGrix.prototype.circle = function (radius, x, y, index, center, parts, drawParts) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (index === void 0) { index = 0; }
        if (center === void 0) { center = true; }
        if (parts === void 0) { parts = 35; }
        return this.ellipse(radius, radius, x, y, index, center, parts, drawParts);
    };
    ShapeGrix.prototype.polygon = function (radius, corners, x, y, index, center) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (index === void 0) { index = 0; }
        if (center === void 0) { center = true; }
        return this.circle(radius, x, y, index, center, corners);
    };
    ShapeGrix.prototype.drawmode = function (mode, index) {
        if (index === void 0) { index = 0; }
        this.drawModes[index] = mode;
        return this;
    };
    ShapeGrix.prototype.drawmodes = function (modes) {
        for (var mode in modes) {
            this.drawModes[mode] = modes[mode];
        }
        return this;
    };
    ShapeGrix.prototype.add = function (vertex, indieces, index) {
        if (index === void 0) { index = 0; }
        if ((vertex.length & 1) != 0)
            Plena.log("Uneven vertex coords supplied to drawer!");
        for (var i = 0; i < vertex.length; i++) {
            if ((i & 1) == 0) {
                this.setMaxMinX(vertex[i], vertex[i]);
            }
            else {
                this.setMaxMinY(vertex[i], vertex[i]);
            }
        }
        this.drawer.pushVerts(vertex);
        if (indieces)
            this.drawer.pushIndices(index, indieces);
        else {
            var ind = [];
            for (var i_1 = vertex.length / 2; i_1 > 0; i_1--) {
                ind.push(this.indiece + ((vertex.length / 2) - i_1));
            }
            this.indiece += vertex.length / 2;
            this.drawer.pushIndices(index, ind);
        }
        return this;
    };
    ShapeGrix.prototype.setIndex = function (index) {
        if (this.isFinal)
            this.index = index;
        else
            this.indexDefault = index;
        return this;
    };
    ShapeGrix.prototype.drawOffset = function () {
    };
    ShapeGrix.prototype.createGrixc = function (transform) {
        var child = { transform: transform, color: this.color.vec(), index: this.index };
        return child;
    };
    ShapeGrix.prototype.doRender = function (grixC) {
        var child = grixC;
        this.getShader().setVec4(Shader.Uniforms.COLOR, child.color);
        for (var _i = 0, _a = child.index; _i < _a.length; _i++) {
            var index = _a[_i];
            this.drawer.drawElements(index, this.drawModes[index]);
        }
    };
    return ShapeGrix;
})(Grix);
var DrawModes;
(function (DrawModes) {
    DrawModes.POINTS = 0, DrawModes.LINES = 1, DrawModes.LINES_LOOP = 2, DrawModes.LINES_STRIP = 3, DrawModes.TRIANGLES = 4, DrawModes.TRIANGLE_STRIP = 5, DrawModes.TRIANGLE_FAN = 6;
})(DrawModes || (DrawModes = {}));
var Grix;
(function (Grix) {
    function shape() {
        return new ShapeGrix();
    }
    Grix.shape = shape;
})(Grix || (Grix = {}));
//# sourceMappingURL=grix.js.map