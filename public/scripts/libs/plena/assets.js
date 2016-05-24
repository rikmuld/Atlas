//make all assets load async, use queue
/**
 * Helper functions for loading and creating assets
 */
var Assets;
(function (Assets) {
    var queue = 0;
    var queueListners = [];
    var error = false;
    /**
     * Pre set TextureOption handy for non pixel perfect textures (smooth = true, safe = false, repeat = false)
     */
    Assets.NORMAL = options(true, false, false);
    /**
     * Pre set TextureOption handy for pixel perfect textures (smooth = false, safe = false, repeat = false)
     */
    Assets.PIXEL_NORMAL = options(false, false, false);
    /**
     * Pre set TextureOption (same as TILE_SHEET) handy for rendering letters (smooth = true, safe = true, repeat = false)
     */
    Assets.LETTERS = options(true, true, false);
    /**
     * Pre set TextureOption (same as LETTERS) handy for non pixel perfect tile sheets (smooth = true, safe = true, repeat = false)
     */
    Assets.TILE_SHEET = options(true, true, false);
    /**
     * Per set TextureOption handy for pixel perfect tile sheets (smooth = false, safe = true, repeat = false)
     */
    Assets.PIXEL_TILE_SHEET = options(false, true, false);
    /**
     * Per set TextureOption handy for endless non pixel perfect backgrounds (smooth = true, safe = false, repeat = true)
     */
    Assets.BACKGROUND = options(true, false, true);
    /**
     * Per set TextureOption handy for endless pixel perfect backgrounds (smooth = false, safe = false, repeat = true)
     */
    Assets.PIXEL_BACKGROUND = options(false, false, true);
    /**
     * Create a new TextureOptions
     *
     * @param smooth when true a linear filter will be used, false for a nearest filter (defaults to false)
     * @param safe will remove possible artifacts by slightly decresing uv coord bounds, use for tilesheets (defaults to false)
     * @param repeat whether or not a texture should repeat itself when uv coords are out of the textures bounds (defaults to false)
     */
    function options(smooth, safe, repeat) {
        if (smooth === void 0) { smooth = false; }
        if (safe === void 0) { safe = false; }
        if (repeat === void 0) { repeat = false; }
        var options = {};
        options.smooth = smooth;
        options.safe = safe;
        options.repeat = repeat;
        return options;
    }
    Assets.options = options;
    function addQueueListner(listner) {
        queueListners.push(listner);
    }
    Assets.addQueueListner = addQueueListner;
    function queueChanged() {
        for (var _i = 0; _i < queueListners.length; _i++) {
            var listner = queueListners[_i];
            listner(queue);
        }
    }
    function hasError() {
        return error;
    }
    Assets.hasError = hasError;
    function getQueue() {
        return queue;
    }
    Assets.getQueue = getQueue;
    function startLoad() {
        queue++;
        queueChanged();
    }
    function endLoad() {
        queue--;
        queueChanged();
    }
    function errorLoad(type, src) {
        return function () {
            error = true;
            Plena.log("Cannot load " + type + " file with souorce: " + src + ", skipping...");
            endLoad();
        };
    }
    /**
     * Load an img file
     *
     * @param src filepath
     * @param options texture options used when loading img
     */
    function loadImg(src, options) {
        if (options === void 0) { options = Assets.PIXEL_NORMAL; }
        var texture = gl.createTexture();
        var retImg = new Img(texture);
        var img = new Image();
        startLoad();
        img.onload = imgLoaded(img, retImg, texture);
        img.onerror = errorLoad("image", src);
        img.src = src;
        return retImg;
    }
    Assets.loadImg = loadImg;
    function imgLoaded(img, retImg, texture) {
        return function () {
            if (MMath.isPowerOf2(img.height) && MMath.isPowerOf2(img.width)) {
                retImg.imgLoaded(img.width, img.height, 0, 0, img.width, img.height, false);
                dataToTexture(img, texture, options);
            }
            else {
                var ctx = mkCanvas(Math.pow(2, Math.ceil(MMath.logN(2, img.width))), Math.pow(2, Math.ceil(MMath.logN(2, img.height))));
                var c = ctx.canvas;
                ctx.drawImage(img, 0, 0);
                retImg.imgLoaded(c.width, c.height, 0, 0, img.width, img.height, false);
                dataToTexture(ctx, texture, options);
            }
            endLoad();
        };
    }
    /**
     * Load a sprite sheet. Same as loadImg, but wraps the Img in a Sprite
     *
     * @param src filepath
     * @param options texture options used when loading img
     */
    function loadSprite(src, options) {
        if (options === void 0) { options = Assets.PIXEL_NORMAL; }
        return new Sprite(loadImg(src, options), options.safe);
    }
    Assets.loadSprite = loadSprite;
    /**
     * Load an audio file
     *
     * @param src filepath
     */
    function loadAudio(src) {
        var audio = new Audio();
        startLoad();
        audio.oncanplaythrough = endLoad;
        audio.onerror = errorLoad("audio", src);
        audio.src = src;
        return new AudioObj(audio);
    }
    Assets.loadAudio = loadAudio;
    /**
     * Creates a new canvas of specific size and returns its 2d context, later you can use getTexure to create a texture from the context
     *
     * @param with the with of the canvas
     * @param height the height of the canvas
     */
    function mkCanvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext('2d');
    }
    Assets.mkCanvas = mkCanvas;
    function mkFontMap(par1, par2, par3, xOffset, background) {
        if (par2 === void 0) { par2 = Assets.LETTERS; }
        if (isFont(par1)) {
            return new FontMap(par1, par2, par3, xOffset, background);
        }
        else
            return new FontMap(par1, par2, par3);
    }
    Assets.mkFontMap = mkFontMap;
    function isFont(f) {
        return (f.getFontSize) ? true : false;
    }
    /**
     * Creates a WritableImg of specific size, you can write to it with a WritableGrix (uses framebuffers)
     *
     * @param width width of the texture
     * @param height height of the texture
     * @param options texture options when creating texture
     */
    function mkWritableImg(width, height, x, y, resX, resY, options) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (options === void 0) { options = Assets.NORMAL; }
        return new WritableImg(x, y, width, height, resX, resY, options.smooth, options.repeat);
    }
    Assets.mkWritableImg = mkWritableImg;
    /**
     * Creates a texture from a string of text
     *
     * @param text string of text to draw
     * @param font font to draw the text in
     * @param options texture options when creating texture
     * @param maxWidth line break length, -1 for endless lines (defaults to -1)
     * @param yOffset y offset between lines, 0 for normal offset (defaults to 0)
     * @param background background color of texture (defaults to full transparancy)
     */
    function mkTextImg(text, font, options, maxWidth, yOffset, background) {
        if (maxWidth === void 0) { maxWidth = -1; }
        if (yOffset === void 0) { yOffset = 0; }
        if (!options)
            options = Assets.LETTERS;
        var texture = gl.createTexture();
        var retImg = new Img(texture);
        var c = document.createElement('canvas');
        var ctx = c.getContext('2d');
        font.apply(ctx);
        var splitText;
        if (maxWidth >= 0) {
            splitText = textSplit(text, maxWidth, ctx);
            maxWidth = Math.max(maxWidth, getMaxLength(ctx, splitText));
        }
        var width = maxWidth >= 0 ? maxWidth : ctx.measureText(text).width + 3;
        var height = splitText ? (splitText.length * (font.getFontSize() + yOffset)) - yOffset : font.getFontSize();
        var align = (font.getAlign() == "center") ? width / 2 : font.getAlign() == "right" ? width : 0;
        height = height += font.getFontSize();
        c.width = Math.pow(2, Math.ceil(MMath.logN(2, width)));
        c.height = Math.pow(2, Math.ceil(MMath.logN(2, height)));
        retImg.imgLoaded(c.width, c.height, 0, 0, width, height, false);
        font.apply(ctx);
        if (background) {
            ctx.fillStyle = background.style();
            ctx.fillRect(0, 0, width, height);
        }
        if (splitText) {
            if (font.getFill()) {
                ctx.fillStyle = font.getFill();
                for (var i = 0; i < splitText.length; i++) {
                    ctx.fillText(splitText[i], align, i * (font.getFontSize() + yOffset) + font.getFontSize() / 2);
                }
            }
            if (font.getStroke()) {
                ctx.strokeStyle = font.getStroke();
                for (var i = 0; i < splitText.length; i++) {
                    ctx.strokeText(splitText[i], align, i * (font.getFontSize() + yOffset) + font.getFontSize() / 2);
                }
            }
        }
        else {
            if (font.getFill()) {
                ctx.fillStyle = font.getFill();
                ctx.fillText(text, align, font.getFontSize() / 2);
            }
            if (font.getStroke()) {
                ctx.strokeStyle = font.getStroke();
                ctx.strokeText(text, align, font.getFontSize() / 2);
            }
        }
        dataToTexture(ctx, texture, options);
        return retImg;
    }
    Assets.mkTextImg = mkTextImg;
    function getMaxLength(ctx, text) {
        var max = 0;
        for (var _i = 0; _i < text.length; _i++) {
            var tx = text[_i];
            var l = ctx.measureText(tx).width;
            if (l > max)
                max = l;
        }
        return max;
    }
    function textSplit(text, max, ctx) {
        var retText = [];
        var textArr = text.split(" ");
        var flag = "";
        for (var _i = 0; _i < textArr.length; _i++) {
            var tx = textArr[_i];
            if (flag.length == 0)
                flag = tx;
            else {
                var subFlag = flag + " " + tx;
                if (ctx.measureText(subFlag).width > max) {
                    retText.push(flag);
                    flag = tx;
                }
                else
                    flag = subFlag;
            }
        }
        if (flag.length > 0)
            retText.push(flag);
        return retText;
    }
    /**
     * Creates a new Font, most font properties can be set later
     *
     * @param family font family of font, cannot be changed
     * @param size, fontsize, can be changed
     */
    function getFont(family, size) {
        return new Font(family, size);
    }
    Assets.getFont = getFont;
    /**
     * Create a texture from a CanvasRenderingContext2D
     *
     * @param ctx the context
     * @param options texture options used when creating texture
     */
    function getTexture(ct, options) {
        if (options === void 0) { options = Assets.PIXEL_NORMAL; }
        var ctx;
        if (!isCtx(ct))
            ctx = ct.getContext('2d');
        else
            ctx = ct;
        var c = ctx.canvas;
        var width = c.width;
        var height = c.height;
        var texture = gl.createTexture();
        var retImg = new Img(texture);
        var data = ctx.getImageData(0, 0, width, height);
        c.width = Math.pow(2, Math.ceil(MMath.logN(2, width)));
        c.height = Math.pow(2, Math.ceil(MMath.logN(2, height)));
        retImg.imgLoaded(c.width, c.height, 0, 0, width, height, options.safe);
        ctx.putImageData(data, 0, 0);
        dataToTexture(ctx, texture, options);
        return retImg;
    }
    Assets.getTexture = getTexture;
    function dataToTexture(thing, texture, options) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        if (isCtx(thing)) {
            var c = thing.canvas;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, thing.getImageData(0, 0, c.width, c.height));
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, thing);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, options.smooth ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, options.smooth ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST_MIPMAP_NEAREST);
        if (options.repeat) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        }
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    function isCtx(c) {
        return (c.canvas) ? true : false;
    }
})(Assets || (Assets = {}));
var TexCoord = (function () {
    function TexCoord(xMin, yMin, width, height, maxX, maxY, safe) {
        this.minX = (xMin + (safe ? 0.5 : 0)) / maxX;
        this.minY = (yMin + (safe ? 0.5 : 0)) / maxY;
        this.maxX = xMin / maxX + ((width - (safe ? 0.5 : 0)) / maxX);
        this.maxY = yMin / maxY + ((height - (safe ? 0.5 : 0)) / maxY);
        this.width = width;
        this.height = height;
    }
    TexCoord.prototype.newCoords = function (img, width, height, xMin, yMin, safe) {
        if (xMin === void 0) { xMin = 0; }
        if (yMin === void 0) { yMin = 0; }
        if (safe === void 0) { safe = false; }
        return new TexCoord(xMin, yMin, width, height, img.maxX(), img.maxY(), safe);
    };
    TexCoord.prototype.relNewCoords = function (img, width, height, xMin, yMin, safe) {
        if (xMin === void 0) { xMin = 0; }
        if (yMin === void 0) { yMin = 0; }
        if (safe === void 0) { safe = false; }
        return new TexCoord(xMin, yMin, width * img.maxX(), height * img.maxY(), img.maxX(), img.maxY(), safe);
    };
    TexCoord.prototype.widthFHeight = function (height) {
        return ((this.maxX - this.minX) / (this.maxY - this.minY)) * height;
    };
    TexCoord.prototype.heightFWidth = function (width) {
        return ((this.maxY - this.minY) / (this.maxX - this.minX)) * width;
    };
    TexCoord.prototype.getXMax = function () {
        return this.maxX;
    };
    TexCoord.prototype.getXMin = function () {
        return this.minX;
    };
    TexCoord.prototype.getYMax = function () {
        return this.maxY;
    };
    TexCoord.prototype.getYMin = function () {
        return this.minY;
    };
    return TexCoord;
})();
var Img = (function () {
    function Img(texture) {
        this.callbackLoaded = new Queue();
        this.isLoaded = false;
        this.texture = texture;
    }
    Img.prototype.imgLoaded = function (maxX, maxY, x, y, width, height, safe) {
        this.sizeX = maxX;
        this.sizeY = maxY;
        this.width = width;
        this.height = height;
        this.coord = new TexCoord(x, y, width, height, maxX, maxY, safe);
        this.isLoaded = true;
        var size = this.callbackLoaded.size();
        for (var i = 0; i < size; i++) {
            this.callbackLoaded.dequeue()(this);
        }
        this.callbackLoaded = null;
    };
    Img.prototype.onLoaded = function (call) {
        if (this.isLoaded == false)
            this.callbackLoaded.enqueue(call);
        else
            call(this);
    };
    Img.prototype.getCoord = function () {
        return this.coord;
    };
    Img.prototype.bind = function () {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    };
    Img.prototype.loaded = function () {
        return this.isLoaded;
    };
    Img.prototype.maxX = function () {
        return this.sizeX;
    };
    Img.prototype.maxY = function () {
        return this.sizeY;
    };
    Img.prototype.getWidth = function () {
        return this.width;
    };
    Img.prototype.getHeight = function () {
        return this.height;
    };
    Img.prototype.getGLTexture = function () {
        return this.texture;
    };
    return Img;
})();
var Sprite = (function () {
    function Sprite(img, safe) {
        this.img = img;
        this.subImages = new TreeMap(STRING_COMPARE);
        if (safe)
            this.safe = true;
    }
    Sprite.prototype.onLoaded = function (call) {
        this.img.onLoaded(call);
    };
    Sprite.prototype.getImgs = function () {
        return this.subImages.values();
    };
    Sprite.prototype.getImgNames = function () {
        return this.subImages.keys();
    };
    Sprite.prototype.addImg = function (key, x, y, width, height) {
        this.img.onLoaded(this.do_addImg(this, key, x, y, width, height));
        return this;
    };
    Sprite.prototype.addImgs = function (key, x, y, width, height, count, vertical) {
        this.img.onLoaded(this.do_addImgs(this, key, x, y, width, height, count, vertical));
        return this;
    };
    Sprite.prototype.addAnimImgs = function (key, x, y, width, height, count, vertical) {
        this.img.onLoaded(this.do_addImgs(this, key, x, y, width, height, count, vertical));
        return this;
    };
    Sprite.prototype.getAnims = function () {
        return this.animations.values();
    };
    Sprite.prototype.getAnim = function (key) {
        return this.animations.apply(key);
    };
    Sprite.prototype.getAnimNames = function () {
        return this.animations.keys();
    };
    Sprite.prototype.arbAnimName = function () {
        return this.animations.min();
    };
    Sprite.prototype.arbAnim = function () {
        return this.animations.apply(this.arbAnimName());
    };
    Sprite.prototype.hasAnime = function () {
        return this.animations != null && this.animations.size() > 0;
    };
    Sprite.prototype.hasSubImg = function () {
        return this.subImages != null && this.subImages.size() > 0;
    };
    Sprite.prototype.do_addImgs = function (ths, ids, x, y, width, height, count, vertical) {
        return function (img) {
            var imgAr;
            var isAnim = false;
            var key;
            if (typeof ids == "string") {
                imgAr = [];
                isAnim = true;
            }
            for (var i = 0; i < count; i++) {
                vertical = vertical == true ? true : false;
                key = (typeof ids == "string") ? ids + "_" + i : ids[i];
                var rowCount;
                if (vertical)
                    rowCount = Math.floor((img.getHeight() - y) / height);
                else
                    rowCount = Math.floor((img.getWidth() - x) / width);
                var colom = vertical ? i % rowCount : Math.floor(i / rowCount);
                var row = vertical ? Math.floor(i / rowCount) : i % rowCount;
                var subImg = new Img(img.getGLTexture());
                subImg.imgLoaded(img.maxX(), img.maxY(), x + row * width, y + colom * height, width, height, ths.safe);
                if (!isAnim)
                    ths.subImages.put(key, subImg);
                else
                    imgAr.push(subImg);
            }
            if (isAnim) {
                if (ths.animations == null)
                    ths.animations = new TreeMap(STRING_COMPARE);
                ths.animations.put(ids, imgAr);
            }
        };
    };
    Sprite.prototype.do_addImg = function (ths, key, x, y, width, height) {
        return function (img) {
            var subImg = new Img(img.getGLTexture());
            subImg.imgLoaded(img.maxX(), img.maxY(), x, y, width, height, ths.safe);
            ths.subImages.put(key, subImg);
        };
    };
    Sprite.prototype.bind = function () {
        this.img.bind();
    };
    Sprite.prototype.getBaseImg = function () {
        return this.img;
    };
    Sprite.prototype.getImg = function (key) {
        return this.subImages.apply(key);
    };
    Sprite.prototype.arbImgName = function () {
        return this.subImages.min();
    };
    Sprite.prototype.arbImg = function () {
        return this.subImages.apply(this.arbImgName());
    };
    Sprite.prototype.hasImg = function (key) {
        return this.subImages.contains(key);
    };
    return Sprite;
})();
var FontMap = (function () {
    function FontMap(thing, info, info2, xOffset, background) {
        if (info2 === void 0) { info2 = FontMap.BASIC_KEYS; }
        this.dim = new TreeMap(STRING_COMPARE);
        if (thing.getFontSize) {
            xOffset = typeof xOffset == 'number' ? xOffset : 2;
            var font = thing;
            var fontString = FontMap.mkCharSet(info2, xOffset);
            this.fontMap = new Sprite(Assets.mkTextImg(fontString, font.align("left"), info, font.getFontSize() * 12, 20, background), info.safe);
            var c = document.createElement('canvas');
            var ctx = c.getContext('2d');
            font.apply(ctx);
            this.size = font.getFontSize();
            this.spaceWidth = ctx.measureText(" ").width;
            var text = fontString.replace(/\s/g, "");
            var width = 0;
            var height = 0;
            for (var i = 0; i < text.length; i++) {
                var a = text.charAt(i);
                var textWidth = ctx.measureText(a).width;
                var textHeight = font.getFontSize() * 1.20;
                if (width + textWidth > font.getFontSize() * 12) {
                    width = 0;
                    height += font.getFontSize() * 1 + 20;
                }
                this.fontMap.addImg(a, width, height, textWidth, textHeight);
                this.dim.put(a, [textWidth, textHeight]);
                width += textWidth + this.spaceWidth * xOffset;
            }
        }
        else {
            this.fontMap = thing;
            this.spaceWidth = info;
            this.size = info2;
            var letters = this.fontMap.getImgs();
            var keys = this.fontMap.getImgNames();
            for (var i = 0; i < letters.length; i++) {
                var key = keys[i];
                var letter = letters[i];
                this.dim.put(key, [letter.getWidth(), letter.getHeight()]);
            }
        }
    }
    FontMap.mkCharSet = function (text, spaces) {
        if (spaces === void 0) { spaces = 2; }
        var chars = text.replace(/\s/g, "");
        var retChars = "";
        for (var i = 0; i < chars.length; i++) {
            if (i > 0)
                for (var j = 0; j < spaces; j++)
                    retChars += " ";
            retChars += chars.charAt(i);
        }
        return retChars;
    };
    FontMap.prototype.defaultSize = function () {
        return this.size;
    };
    FontMap.prototype.getMap = function () {
        return this.fontMap;
    };
    FontMap.prototype.getLetter = function (char) {
        return this.fontMap.getImg(char);
    };
    FontMap.prototype.spacing = function () {
        return this.spaceWidth;
    };
    FontMap.prototype.getDim = function (c) {
        return this.dim.apply(c);
    };
    FontMap.BASIC_KEYS = "!@€\"#$%^&*()[]{}-=,.;:'></?\\|1234567890`~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return FontMap;
})();
var WritableImg = (function () {
    function WritableImg(x, y, width, height, resX, resY, smooth, repeat) {
        resX = resX ? resX : width;
        resY = resY ? resY : height;
        var sizeX = Math.pow(2, Math.ceil(MMath.logN(2, resX)));
        var sizeY = Math.pow(2, Math.ceil(MMath.logN(2, resY)));
        this.frame = new Framebuffer(sizeX, sizeY, resX, resY, smooth, repeat);
        this.img = new Img(this.frame.getTexture());
        this.img.imgLoaded(sizeX, sizeY, 0, 0, resX, resY, false);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    WritableImg.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    WritableImg.prototype.getWidth = function () {
        return this.width;
    };
    WritableImg.prototype.getHeight = function () {
        return this.height;
    };
    WritableImg.prototype.startWrite = function (view) {
        Plena.forceRender();
        this.projectionSave = view.getProjection();
        this.lastView = view;
        view.setProjection([this.x, this.x + this.width, this.y, this.y + this.height]);
        view.view();
        this.frame.startRenderTo();
    };
    WritableImg.prototype.stopWrite = function () {
        Plena.forceRender();
        this.frame.stopRenderTo();
        this.lastView.setProjection(this.projectionSave);
        this.lastView.view();
    };
    WritableImg.prototype.getTexture = function () {
        return this.frame.getTexture();
    };
    WritableImg.prototype.getImg = function () {
        return this.img;
    };
    WritableImg.prototype.bind = function () {
        this.img.bind();
    };
    return WritableImg;
})();
var Font = (function () {
    function Font(family, size) {
        this.textAlign = "left";
        this.fontsize = size;
        this.family = family;
    }
    Font.prototype.getFontSize = function () {
        return this.fontsize;
    };
    Font.prototype.getFamily = function () {
        return this.family;
    };
    Font.prototype.getAlign = function () {
        return this.textAlign;
    };
    Font.prototype.getFill = function () {
        return this.textFill;
    };
    Font.prototype.getStroke = function () {
        return this.textStroke;
    };
    Font.prototype.apply = function (ctx) {
        ctx.textAlign = this.getAlign();
        ctx.textBaseline = "middle";
        ctx.font = this.getFontSize() + "px " + this.getFamily();
    };
    Font.prototype.size = function (size) {
        this.fontsize = size;
        return this;
    };
    Font.prototype.fill = function (color) {
        this.textFill = color.style();
        return this;
    };
    Font.prototype.stroke = function (color) {
        this.textStroke = color.style();
        return this;
    };
    Font.prototype.align = function (align) {
        this.textAlign = align;
        return this;
    };
    return Font;
})();
var Font;
(function (Font) {
    Font.ARIAL = "Arial, 'Helvetica Neue', Helvetica, sans-serif", Font.ARIAL_BOLD = "'Arial Black', 'Arial Bold', Gadget, sans-serif", Font.ARIAL_NARROW = "'Arial Narrow', Arial, sans-serif", Font.ARIAL_ROUNDED = "'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif", Font.CALIBRI = "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif", Font.CANDARA = "Candara, Calibri, Segoe, 'Segoe UI', Optima, Arial, sans-serif", Font.CENTURY_GOTHIC = "'Century Gothic', CenturyGothic, AppleGothic, sans-serif", Font.GILL_SANS = "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif", Font.HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif", Font.TAHOMA = "Tahoma, Verdana, Segoe, sans-serif", Font.TREBUCHET_MS = "'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif", Font.VERDANA = "Verdana, Geneva, sans-serif", Font.BOOK_ANTIQUA = "'Book Antiqua', Palatino, 'Palatino Linotype', 'Palatino LT STD', Georgia, serif", Font.CAMBRIA = "Cambria, Georgia, serif", Font.GARAMOND = "Garamond, Baskerville, 'Baskerville Old Face', 'Hoefler Text', 'Times New Roman', serif", Font.GEORGRIA = "Georgia, Times, 'Times New Roman', serif", Font.LUCIDA_BRIGHT = "'Lucida Bright', Georgia, serif", Font.PALATINO = "Palatino, 'Palatino Linotype', 'Palatino LT STD', 'Book Antiqua', Georgia, serif", Font.BASKERVILLE = "Baskerville, 'Baskerville Old Face', 'Hoefler Text', Garamond, 'Times New Roman', serif", Font.TIMES_NEW_ROMAN = "TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif", Font.CONSOLAS = "Consolas, monaco, monospace", Font.COURIER_NEW = "'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace", Font.MONACO = "monaco, Consolas, 'Lucida Console', monospace", Font.COPPERPLATE = "Copperplate, 'Copperplate Gothic Light', fantasy", Font.PAPYRUS = "Papyrus, fantasy", Font.BRUSH_SCRIPT_MT = "'Brush Script MT', cursive";
})(Font || (Font = {}));
var AudioObj = (function () {
    function AudioObj(audio) {
        this.audio = audio;
    }
    AudioObj.prototype.play = function () {
        this.audio.play();
    };
    AudioObj.prototype.pause = function () {
        this.audio.pause();
    };
    AudioObj.prototype.isRunning = function () {
        return !this.audio.paused;
    };
    AudioObj.prototype.currentTime = function () {
        return this.audio.currentTime;
    };
    AudioObj.prototype.setTime = function (num) {
        this.audio.currentTime = num;
    };
    AudioObj.prototype.duration = function () {
        return this.audio.duration;
    };
    AudioObj.prototype.setRunSpeed = function (speed) {
        this.audio.playbackRate = speed;
    };
    AudioObj.prototype.audioElement = function () {
        return this.audio;
    };
    return AudioObj;
})();
//# sourceMappingURL=assets.js.map