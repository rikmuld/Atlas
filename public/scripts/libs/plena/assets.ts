type TextureOptions = Assets.TextureOptions;

//make all assets load async, use queue

/**
 * Helper functions for loading and creating assets
 */
namespace Assets {
    type QueueListner = (queue: number) => void;

    var queue = 0;
    var queueListners: QueueListner[] = [];
    var error: boolean = false;

    /**
     * Pre set TextureOption handy for non pixel perfect textures (smooth = true, safe = false, repeat = false)
     */
    export const NORMAL = options(true, false, false);
    /**
     * Pre set TextureOption handy for pixel perfect textures (smooth = false, safe = false, repeat = false)
     */
    export const PIXEL_NORMAL = options(false, false, false);
    /**
     * Pre set TextureOption (same as TILE_SHEET) handy for rendering letters (smooth = true, safe = true, repeat = false)
     */
    export const LETTERS = options(true, true, false);
    /**
     * Pre set TextureOption (same as LETTERS) handy for non pixel perfect tile sheets (smooth = true, safe = true, repeat = false)
     */
    export const TILE_SHEET = options(true, true, false);
    /**
     * Per set TextureOption handy for pixel perfect tile sheets (smooth = false, safe = true, repeat = false)
     */
    export const PIXEL_TILE_SHEET = options(false, true, false);
    /**
     * Per set TextureOption handy for endless non pixel perfect backgrounds (smooth = true, safe = false, repeat = true)
     */
    export const BACKGROUND = options(true, false, true);
    /**
     * Per set TextureOption handy for endless pixel perfect backgrounds (smooth = false, safe = false, repeat = true)
     */
    export const PIXEL_BACKGROUND = options(false, false, true);

    /**
     * Options for loading/creation of textures
     *
     * Smooth, when true a linear filter will be used, false for a nearest filter
     * Safe, set true for tilesheets, will remove possible artifacts by slightly decresing uv coord bounds
     * Repeat, whether or not a texture should repeat itself when uv coords are out of the textures bounds
     */
    export interface TextureOptions {
        smooth?: boolean;
        safe?: boolean;
        repeat?: boolean;
    }

    /**
     * Create a new TextureOptions
     *
     * @param smooth when true a linear filter will be used, false for a nearest filter (defaults to false)
     * @param safe will remove possible artifacts by slightly decresing uv coord bounds, use for tilesheets (defaults to false)
     * @param repeat whether or not a texture should repeat itself when uv coords are out of the textures bounds (defaults to false)
     */
    export function options(smooth: boolean = false, safe: boolean = false, repeat: boolean = false): TextureOptions {
        let options: TextureOptions = {};

        options.smooth = smooth;
        options.safe = safe;
        options.repeat = repeat;

        return options;
    }

    export function addQueueListner(listner: QueueListner) {
        queueListners.push(listner);
    }

    function queueChanged() {
        for (let listner of queueListners) listner(queue);
    }

    export function hasError(): boolean {
        return error;
    }

    export function getQueue(): number {
        return queue;
    }

    function startLoad() {
        queue++;
        queueChanged();
    }

    function endLoad() {
        queue--;
        queueChanged();
    }

    function errorLoad(type: string, src: string): () => void {
        return function () {
            error = true;
            Plena.log(`Cannot load ${type} file with souorce: ${src}, skipping...`)
            endLoad();
        }
    }

    /**
     * Load an img file
     *
     * @param src filepath
     * @param options texture options used when loading img
     */
    export function loadImg(src: string, options: TextureOptions = PIXEL_NORMAL): Img {
        let texture = gl.createTexture();
        let retImg = new Img(texture);
        let img = new Image();

        startLoad()
        img.onload = imgLoaded(img, retImg, texture)
        img.onerror = errorLoad("image", src)
        img.src = src;

        return retImg;
    }

    function imgLoaded(img: HTMLImageElement, retImg: Img, texture: WebGLTexture): () => void {
        return function () {
            if (MMath.isPowerOf2(img.height) && MMath.isPowerOf2(img.width)) {
                retImg.imgLoaded(img.width, img.height, 0, 0, img.width, img.height, false);
                dataToTexture(img, texture, options);
            } else {
                let ctx = mkCanvas(Math.pow(2, Math.ceil(MMath.logN(2, img.width))), Math.pow(2, Math.ceil(MMath.logN(2, img.height))));
                let c = ctx.canvas;

                ctx.drawImage(img, 0, 0);
                retImg.imgLoaded(c.width, c.height, 0, 0, img.width, img.height, false);
                dataToTexture(ctx, texture, options);
            }
            endLoad()
        }
    }
    
    /**
     * Load a sprite sheet. Same as loadImg, but wraps the Img in a Sprite
     *
     * @param src filepath
     * @param options texture options used when loading img
     */
    export function loadSprite(src: string, options: TextureOptions = PIXEL_NORMAL): Sprite {
        return new Sprite(loadImg(src, options), options.safe);
    }

    /**
     * Load an audio file
     *
     * @param src filepath
     */
    export function loadAudio(src: string): AudioObj {
        let audio = new Audio();

        startLoad();
        audio.oncanplaythrough = endLoad;
        audio.onerror = errorLoad("audio", src)
        audio.src = src;

        return new AudioObj(audio);
    }

    /**
     * Creates a new canvas of specific size and returns its 2d context, later you can use getTexure to create a texture from the context
     *
     * @param with the with of the canvas
     * @param height the height of the canvas
     */
    export function mkCanvas(width: number, height: number): CanvasRenderingContext2D {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext('2d');
    }

    /**
     * Creates a FontMap which can be used in a TextGrix for drawing mutable text
     *
     * @param font the Font to create a FontMap from
     * @param options texture options used when creating a fontmap (defaults to LETTERS)
     * @param characters string of characters that will be drawn in the fontmap, and can be used to draw text later on, 
     * defaults to a character set with all standard keyboard characters. You can also specify any character as long as it is
     * supported by the font (chinees, greek, etc...).
     * @param xOffset spacing between letters in fontmap, defaults to 2, increse when other characters in a font are visibale when drawing a character
     * will almost never happen, 2 is pretty safe already (texture size may increse when xOffset is higher).
     * @param background the background color of the FontMap, defults to full transparancy
     */
    export function mkFontMap(font: Font, options?: TextureOptions, characters?: string, xOffset?: number, background?: Col): FontMap;
    /**
     * Creates a FontMap which can be used in a TextGrix to mutable text, use for bitmap fonts
     *
     * @param bitmapFont sprite with all characters as sub images
     * @param options fontsize of the text in the sprite
     * @param spacing with of a cpace character
     */
    export function mkFontMap(bitmapFont: Sprite, size: number, spacing: number): FontMap;
    export function mkFontMap(par1: Font | Sprite, par2: TextureOptions | number = LETTERS, par3?: string | number, xOffset?: number, background?: Col): FontMap {
        if (isFont(par1)) {
            return new FontMap(par1, par2 as TextureOptions, par3 as string, xOffset, background);
        }
        else return new FontMap(par1, par2 as number, par3 as number);
    }

    function isFont(f: any): f is Font {
        return (f.getFontSize) ? true : false;
    }

    /**
     * Creates a WritableImg of specific size, you can write to it with a WritableGrix (uses framebuffers)
     *
     * @param width width of the texture
     * @param height height of the texture
     * @param options texture options when creating texture
     */
    export function mkWritableImg(width: number, height: number, x: number = 0, y: number = 0, resX?: number, resY?: number, options: TextureOptions = NORMAL): WritableImg {
        return new WritableImg(x, y, width, height, resX, resY, options.smooth, options.repeat);
    }

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
    export function mkTextImg(text: string, font: Font, options?: TextureOptions, maxWidth: number = -1, yOffset: number = 0, background?: Col): Img {
        if (!options) options = LETTERS;

        let texture = gl.createTexture();
        let retImg = new Img(texture);
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');

        font.apply(ctx);

        let splitText: string[];
        if (maxWidth >= 0) {
            splitText = textSplit(text, maxWidth, ctx);
            maxWidth = Math.max(maxWidth, getMaxLength(ctx, splitText))
        }

        let width = maxWidth >= 0 ? maxWidth : ctx.measureText(text).width + 3;
        let height = splitText ? (splitText.length * (font.getFontSize() + yOffset)) - yOffset : font.getFontSize();
        let align = (font.getAlign() == "center") ? width / 2 : font.getAlign() == "right" ? width : 0;

        height = height += font.getFontSize();

        c.width = Math.pow(2, Math.ceil(MMath.logN(2, width)))
        c.height = Math.pow(2, Math.ceil(MMath.logN(2, height)))
        retImg.imgLoaded(c.width, c.height, 0, 0, width, height, false);
        font.apply(ctx)

        if (background) {
            ctx.fillStyle = background.style();
            ctx.fillRect(0, 0, width, height);
        }

        if (splitText) {
            if (font.getFill()) {
                ctx.fillStyle = font.getFill();
                for (let i = 0; i < splitText.length; i++) {
                    ctx.fillText(splitText[i], align, i * (font.getFontSize() + yOffset) + font.getFontSize() / 2)
                }
            }
            if (font.getStroke()) {
                ctx.strokeStyle = font.getStroke();
                for (let i = 0; i < splitText.length; i++) {
                    ctx.strokeText(splitText[i], align, i * (font.getFontSize() + yOffset) + font.getFontSize() / 2)
                }
            }
        } else {
            if (font.getFill()) {
                ctx.fillStyle = font.getFill();
                ctx.fillText(text, align, font.getFontSize() / 2)
            }

            if (font.getStroke()) {
                ctx.strokeStyle = font.getStroke();
                ctx.strokeText(text, align, font.getFontSize() / 2)
            }
        }

        dataToTexture(ctx, texture, options);
        return retImg;
    }

    function getMaxLength(ctx: CanvasRenderingContext2D, text: string[]): number {
        let max = 0;
        for (let tx of text) {
            let l = ctx.measureText(tx).width;
            if (l > max) max = l;
        }
        return max;
    }

    function textSplit(text: string, max: number, ctx: CanvasRenderingContext2D): string[] {
        let retText: string[] = [];
        let textArr = text.split(" ");
        let flag = "";

        for (let tx of textArr) {
            if (flag.length == 0) flag = tx;
            else {
                let subFlag = flag + " " + tx;
                if (ctx.measureText(subFlag).width > max) {
                    retText.push(flag);
                    flag = tx;
                } else flag = subFlag;
            }
        }
        if (flag.length > 0) retText.push(flag);

        return retText;
    }

    /**
     * Creates a new Font, most font properties can be set later
     *
     * @param family font family of font, cannot be changed
     * @param size, fontsize, can be changed
     */
    export function getFont(family: string, size: number): Font {
        return new Font(family, size);
    }

    /**
     * Create a texture from a CanvasRenderingContext2D
     *
     * @param ctx the context
     * @param options texture options used when creating texture
     */
    export function getTexture(ct: CanvasRenderingContext2D | HTMLCanvasElement, options: TextureOptions = PIXEL_NORMAL): Img {
        let ctx: CanvasRenderingContext2D

        if (!isCtx(ct)) ctx = ct.getContext('2d')
        else ctx = ct

        let c = ctx.canvas;
        let width = c.width;
        let height = c.height;
        let texture = gl.createTexture();
        let retImg = new Img(texture);
        let data = ctx.getImageData(0, 0, width, height);

        c.width = Math.pow(2, Math.ceil(MMath.logN(2, width)));
        c.height = Math.pow(2, Math.ceil(MMath.logN(2, height)));
        retImg.imgLoaded(c.width, c.height, 0, 0, width, height, options.safe);
        ctx.putImageData(data, 0, 0);
        dataToTexture(ctx, texture, options);

        return retImg;
    }

    function dataToTexture(thing: CanvasRenderingContext2D | HTMLImageElement, texture, options: TextureOptions) {
        gl.bindTexture(gl.TEXTURE_2D, texture);

        if (isCtx(thing)) {
            let c = thing.canvas;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, thing.getImageData(0, 0, c.width, c.height));
        } else {
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

    function isCtx(c: any): c is CanvasRenderingContext2D {
        return (c.canvas) ? true : false;
    }
}

class TexCoord {
    private maxX: number;
    private maxY: number;
    private minX: number;
    private minY: number;

    private width: number;
    private height: number;

    constructor(xMin: number, yMin: number, width: number, height: number, maxX: number, maxY: number, safe: boolean) {
        this.minX = (xMin + (safe ? 0.5 : 0)) / maxX;
        this.minY = (yMin + (safe ? 0.5 : 0)) / maxY;
        this.maxX = xMin / maxX + ((width - (safe ? 0.5 : 0)) / maxX);
        this.maxY = yMin / maxY + ((height - (safe ? 0.5 : 0)) / maxY);

        this.width = width;
        this.height = height;
    }

    widthFHeight(height: number): number {
        return ((this.maxX - this.minX) / (this.maxY - this.minY)) * height;
    }

    heightFWidth(width: number): number {
        return ((this.maxY - this.minY) / (this.maxX - this.minX)) * width;
    }

    getXMax(): number {
        return this.maxX;
    }

    getXMin(): number {
        return this.minX;
    }

    getYMax(): number {
        return this.maxY;
    }

    getYMin(): number {
        return this.minY;
    }
}


class Img {
    private texture;
    private width: number;
    private height: number;
    private coord: TexCoord;
    private callbackLoaded = new Queue<(Img) => void>();
    private isLoaded = false;
    private sizeX: number;
    private sizeY: number;

    constructor(texture) {
        this.texture = texture;
    }

    imgLoaded(maxX: number, maxY, x: number, y: number, width: number, height: number, safe: boolean) {
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
    }

    onLoaded(call: (Img) => void) {
        if (this.isLoaded == false) this.callbackLoaded.enqueue(call);
        else call(this);
    }

    getCoord(): TexCoord {
        return this.coord;
    }

    bind() {
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
    }

    loaded(): boolean {
        return this.isLoaded
    }

    maxX(): number {
        return this.sizeX;
    }

    maxY(): number {
        return this.sizeY;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getGLTexture() {
        return this.texture;
    }
}

class Sprite {
    private img: Img;
    private safe: boolean;
    private subImages: TreeMap<string, Img>;
    private animations: TreeMap<string, Img[]>;

    constructor(img: Img, safe?: boolean) {
        this.img = img;
        this.subImages = new TreeMap<string, Img>(STRING_COMPARE);
        if (safe) this.safe = true;
    }

    onLoaded(call: (Img) => void) {
        this.img.onLoaded(call);
    }

    getImgs(): Img[] {
        return this.subImages.values();
    }

    getImgNames(): string[] {
        return this.subImages.keys();
    }

    addImg(key: string, x: number, y: number, width: number, height: number): Sprite {
        this.img.onLoaded(this.do_addImg(this, key, x, y, width, height))
        return this;
    }

    addImgs(key: string[], x: number, y: number, width: number, height: number, count: number, vertical?: boolean): Sprite {
        this.img.onLoaded(this.do_addImgs(this, key, x, y, width, height, count, vertical))
        return this;
    }

    addAnimImgs(key: string, x: number, y: number, width: number, height: number, count: number, vertical?: boolean): Sprite {
        this.img.onLoaded(this.do_addImgs(this, key, x, y, width, height, count, vertical))
        return this;
    }

    getAnims(): Img[][] {
        return this.animations.values();
    }

    getAnim(key: string): Img[] {
        return this.animations.apply(key);
    }

    getAnimNames(): string[] {
        return this.animations.keys();
    }

    arbAnimName(): string {
        return this.animations.min();
    }

    arbAnim(): Img[] {
        return this.animations.apply(this.arbAnimName());
    }

    hasAnime(): boolean {
        return this.animations != null && this.animations.size() > 0;
    }

    hasSubImg(): boolean {
        return this.subImages != null && this.subImages.size() > 0;
    }

    private do_addImgs(ths: Sprite, ids: string | string[], x: number, y: number, width: number, height: number, count: number, vertical?: boolean): (Img) => void {
        return function (img: Img) {
            var imgAr: Img[];
            var isAnim = false;
            var key: string;

            if (typeof ids == "string") {
                imgAr = [];
                isAnim = true;
            }
            for (var i = 0; i < count; i++) {
                vertical = vertical == true ? true : false;
                key = (typeof ids == "string") ? (<string>ids) + "_" + i : (<string[]>ids)[i];

                var rowCount: number;
                if (vertical) rowCount = Math.floor((img.getHeight() - y) / height);
                else rowCount = Math.floor((img.getWidth() - x) / width);
                var colom = vertical ? i % rowCount : Math.floor(i / rowCount);
                var row = vertical ? Math.floor(i / rowCount) : i % rowCount;
                var subImg = new Img(img.getGLTexture());

                subImg.imgLoaded(img.maxX(), img.maxY(), x + row * width, y + colom * height, width, height, ths.safe);
                if (!isAnim) ths.subImages.put(key, subImg);
                else imgAr.push(subImg)
            }

            if (isAnim) {
                if (ths.animations == null) ths.animations = new TreeMap<string, Img[]>(STRING_COMPARE);
                ths.animations.put(<string>ids, imgAr);
            }
        }
    }

    private do_addImg(ths: Sprite, key: string, x: number, y: number, width: number, height: number): (Img) => void {
        return function (img: Img) {
            var subImg = new Img(img.getGLTexture());
            subImg.imgLoaded(img.maxX(), img.maxY(), x, y, width, height, ths.safe)
            ths.subImages.put(key, subImg);
        }
    }

    bind() {
        this.img.bind()
    }

    getBaseImg(): Img {
        return this.img;
    }

    getImg(key: string): Img {
        return this.subImages.apply(key);
    }

    arbImgName(): string {
        return this.subImages.min();
    }

    arbImg(): Img {
        return this.subImages.apply(this.arbImgName());
    }

    hasImg(key: string): boolean {
        return this.subImages.contains(key);
    }
}

class FontMap {
    static BASIC_KEYS = "!@€\"#$%^&*()[]{}-=,.;:'></?\\|1234567890`~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    private fontMap: Sprite;
    private spaceWidth: number;
    private dim: TreeMap<string, [number, number]>;
    private size: number;

    constructor(sprite: Sprite, space: number, size: number);
    constructor(font: Font, options: TextureOptions, fontString?: string, xOffset?: number, background?: Col);
    constructor(thing: Font | Sprite, info: TextureOptions | number, info2: string | number = FontMap.BASIC_KEYS, xOffset?: number, background?: Col) {
        this.dim = new TreeMap<string, [number, number]>(STRING_COMPARE);
        if ((<Font>thing).getFontSize) {
            xOffset = typeof xOffset == 'number' ? xOffset : 2;
            var font = <Font>thing;
            var fontString = FontMap.mkCharSet(info2 as string, xOffset);
            this.fontMap = new Sprite(Assets.mkTextImg(fontString, font.align("left"), info as TextureOptions, font.getFontSize() * 12, 20, background), (info as TextureOptions).safe);
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
        } else {
            this.fontMap = <Sprite>thing;
            this.spaceWidth = <number>info;
            this.size = <number>info2;
            var letters = this.fontMap.getImgs();
            var keys = this.fontMap.getImgNames();
            for (var i = 0; i < letters.length; i++) {
                var key = keys[i];
                var letter = letters[i];
                this.dim.put(key, [letter.getWidth(), letter.getHeight()]);
            }
        }
    }

    static mkCharSet(text: string, spaces: number = 2): string {
        var chars = text.replace(/\s/g, "");
        var retChars = "";
        for (var i = 0; i < chars.length; i++) {
            if (i > 0) for (let j = 0; j < spaces; j++)retChars += " ";
            retChars += chars.charAt(i);
        }
        return retChars;
    }

    defaultSize(): number {
        return this.size;
    }

    getMap(): Sprite {
        return this.fontMap;
    }

    getLetter(char: string): Img {
        return this.fontMap.getImg(char);
    }

    spacing(): number {
        return this.spaceWidth;
    }

    getDim(c: string): [number, number] {
        return this.dim.apply(c);
    }
}

class WritableImg {
    private img: Img;
    private frame: Framebuffer;

    width: number;
    height: number;
    x: number;
    y: number;

    private lastView: Views.View;
    private projectionSave: Vec4;

    constructor(x: number, y: number, width: number, height: number, resX?: number, resY?: number, smooth?: boolean, repeat?: boolean) {
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

    setPos(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    startWrite(view: Views.View) {
        Plena.forceRender()
        this.projectionSave = view.getProjection();
        this.lastView = view;
        view.setProjection([this.x, this.x + this.width, this.y, this.y + this.height]);
        view.view()
        this.frame.startRenderTo();
    }

    stopWrite() {
        Plena.forceRender();
        this.frame.stopRenderTo();
        this.lastView.setProjection(this.projectionSave)
        this.lastView.view();
    }

    getTexture(): WebGLTexture {
        return this.frame.getTexture();
    }

    getImg(): Img {
        return this.img;
    }

    bind() {
        this.img.bind();
    }
}

class Font {
    private fontsize: number;
    private family: string;
    private textAlign: string = "left";
    private textFill: string;
    private textStroke: string;

    constructor(family: string, size: number) {
        this.fontsize = size;
        this.family = family;
    }

    getFontSize(): number {
        return this.fontsize;
    }

    getFamily(): string {
        return this.family;
    }

    getAlign(): string {
        return this.textAlign;
    }

    getFill(): string {
        return this.textFill;
    }

    getStroke(): string {
        return this.textStroke;
    }

    apply(ctx: CanvasRenderingContext2D) {
        ctx.textAlign = this.getAlign();
        ctx.textBaseline = "middle";
        ctx.font = this.getFontSize() + "px " + this.getFamily();
    }

    size(size: number): Font {
        this.fontsize = size;
        return this;
    }

    fill(color: Col): Font {
        this.textFill = color.style();
        return this;
    }

    stroke(color: Col): Font {
        this.textStroke = color.style();
        return this;
    }

    align(align: string): Font {
        this.textAlign = align;
        return this;
    }
}

namespace Font {
    export const
        ARIAL = "Arial, 'Helvetica Neue', Helvetica, sans-serif",
        ARIAL_BOLD = "'Arial Black', 'Arial Bold', Gadget, sans-serif",
        ARIAL_NARROW = "'Arial Narrow', Arial, sans-serif",
        ARIAL_ROUNDED = "'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
        CALIBRI = "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
        CANDARA = "Candara, Calibri, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
        CENTURY_GOTHIC = "'Century Gothic', CenturyGothic, AppleGothic, sans-serif",
        GILL_SANS = "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
        HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif",
        TAHOMA = "Tahoma, Verdana, Segoe, sans-serif",
        TREBUCHET_MS = "'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif",
        VERDANA = "Verdana, Geneva, sans-serif",
        BOOK_ANTIQUA = "'Book Antiqua', Palatino, 'Palatino Linotype', 'Palatino LT STD', Georgia, serif",
        CAMBRIA = "Cambria, Georgia, serif",
        GARAMOND = "Garamond, Baskerville, 'Baskerville Old Face', 'Hoefler Text', 'Times New Roman', serif",
        GEORGRIA = "Georgia, Times, 'Times New Roman', serif",
        LUCIDA_BRIGHT = "'Lucida Bright', Georgia, serif",
        PALATINO = "Palatino, 'Palatino Linotype', 'Palatino LT STD', 'Book Antiqua', Georgia, serif",
        BASKERVILLE = "Baskerville, 'Baskerville Old Face', 'Hoefler Text', Garamond, 'Times New Roman', serif",
        TIMES_NEW_ROMAN = "TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif",
        CONSOLAS = "Consolas, monaco, monospace",
        COURIER_NEW = "'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace",
        MONACO = "monaco, Consolas, 'Lucida Console', monospace",
        COPPERPLATE = "Copperplate, 'Copperplate Gothic Light', fantasy",
        PAPYRUS = "Papyrus, fantasy",
        BRUSH_SCRIPT_MT = "'Brush Script MT', cursive"
}

class AudioObj {
    private audio: HTMLAudioElement;

    constructor(audio: HTMLAudioElement) {
        this.audio = audio;
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    isRunning():boolean {
        return !this.audio.paused
    }

    currentTime(): number {
        return this.audio.currentTime;
    }

    setTime(num: number) {
        this.audio.currentTime = num;
    }

    duration(): number {
        return this.audio.duration;
    }

    setRunSpeed(speed: number) {
        this.audio.playbackRate = speed;
    }

    audioElement(): HTMLAudioElement {
        return this.audio;
    }
}