//color gradients implement with mixin for style and require that one for where style is needed, e.x. canvas.

type Col = AColor | Color

class AColor {
    private theColor: Color;
    private alpha: number;

    constructor(r: number, g: number, b: number, a: number);
    constructor(color: Color, a: number);
    constructor(r: Color | number, g: number, b?: number, a?: number) {
        if (typeof a == "number") {
            this.theColor = new Color(r as number, g, b)
            this.alpha = a;
        } else {
            this.theColor = r as Color;
            this.alpha = b;
        }
    }

    color(): Color {
        return this.theColor
    }

    a() {
        return this.a;
    }

    r(): number {
        return this.theColor.r();
    }

    b(): number {
        return this.theColor.b();
    }

    g(): number {
        return this.theColor.g();
    }

    style(): string {
        return this.theColor.style(this.alpha);
    }

    vec(): Vec {
        return this.theColor.vec(this.alpha);
    }

    hex(): string {
        return this.theColor.hex();
    }

    clearcolor() {
        let c = this.vec();
        gl.clearColor(c[0], c[1], c[2], c[3]);
    }
}

class Color {
    private rV: number;
    private gV: number;
    private bV: number;

    constructor(r: number, g: number, b: number);
    constructor(color: Vec);
    constructor(hex: string);
    constructor(par1: number | Vec | string, g?: number, b?: number) {
        if (typeof b == 'number') {
            this.rV = par1 as number;
            this.gV = g;
            this.bV = b;
        } else {
            let color: Vec;
            if (typeof par1 == 'string') {
                color = Color.toRGB(par1 as string);
            } else color = par1 as Vec;

            this.rV = color[0] * 255;
            this.bV = color[1] * 255;
            this.gV = color[2] * 255;
        }
    }

    r(): number {
        return this.rV;
    }

    b(): number {
        return this.bV;
    }

    g(): number {
        return this.gV;
    }

    style(a: number = 1): string {
        return `rgba(${this.rV}, ${this.gV}, ${this.bV}, ${a})`
    }

    vec(a: number = 1): Vec {
        return [this.rV / 255, this.gV / 255, this.bV / 255, a]
    }

    hex(): string {
        return Color.toHex(this.rV, this.gV, this.bV)
    }

    clearcolor() {
        let c = this.vec();
        gl.clearColor(c[0], c[1], c[2], c[3]);
    }

    static toRGB(hex: string): Vec3 {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    }

    private static componentToHex(c: number): string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    static toHex(r: number, g: number, b: number): string {
        return "#" + Color.componentToHex(r) + Color.componentToHex(g) + Color.componentToHex(b);
    }
}

namespace Color {
    export function mkColor(r: number, g: number, b: number): Color;
    export function mkColor(color: Vec): Color;
    export function mkColor(hex: string): Color;
    export function mkColor(par1: number | Vec | string, g?: number, b?: number): Color {
        if (typeof par1 == "number") return new Color(par1 as number, g, b)
        else if (typeof par1 == "string") return new Color(par1 as string)
        else return new Color(par1 as Vec)
    }

    export function mkAlphaColor(r: number, g: number, b: number, a: number): AColor;
    export function mkAlphaColor(color: Color, a: number): AColor;
    export function mkAlphaColor(r: Color | number, g: number, b?: number, a?: number): AColor {
        if (typeof a == "number") return new AColor(r as number, g, b, a)
        else return new AColor(r as Color, g)
    }

    export namespace Pink {
        export const PINK = new Color(255, 192, 203);
        export function pink(a: number = 1): AColor {
            return new AColor(PINK, a);
        }
        export const PINK_LIGHT = new Color(255, 182, 193);
        export function pinkLight(a: number = 1): AColor {
            return new AColor(PINK_LIGHT, a);
        }
        export const PINK_HOT = new Color(255, 105, 180);
        export function pinkHot(a: number = 1): AColor {
            return new AColor(PINK_HOT, a);
        }
        export const PINK_DEEP = new Color(255, 20, 147);
        export function pinkDeep(a: number = 1): AColor {
            return new AColor(PINK_DEEP, a);
        }
        export const VIOLET_RED_PALE = new Color(219, 112, 147);
        export function violetRedPale(a: number = 1): AColor {
            return new AColor(VIOLET_RED_PALE, a);
        }
        export const VIOLET_RED_MEDIUM = new Color(199, 21, 133);
        export function violetRedMedium(a: number = 1): AColor {
            return new AColor(VIOLET_RED_MEDIUM, a);
        }
    }

    export namespace Red {
        export const SALMON_LIGHT = new Color(255, 160, 122);
        export function salmonLight(a: number = 1): AColor {
            return new AColor(SALMON_LIGHT, a);
        }
        export const SALMON = new Color(250, 128, 114);
        export function salmon(a: number = 1): AColor {
            return new AColor(SALMON, a);
        }
        export const SALMON_DARK = new Color(233, 150, 122);
        export function salmonDark(a: number = 1): AColor {
            return new AColor(SALMON_DARK, a);
        }
        export const CORAL_LIGHT = new Color(240, 128, 128);
        export function colalLight(a: number = 1): AColor {
            return new AColor(CORAL_LIGHT, a);
        }
        export const RED_INDIAN = new Color(205, 92, 92);
        export function redIndian(a: number = 1): AColor {
            return new AColor(RED_INDIAN, a);
        }
        export const CRIMSON = new Color(220, 20, 60);
        export function crimson(a: number = 1): AColor {
            return new AColor(CRIMSON, a);
        }
        export const FIREBRIK = new Color(178, 34, 34);
        export function firebrik(a: number = 1): AColor {
            return new AColor(FIREBRIK, a);
        }
        export const RED_DARK = new Color(139, 0, 0);
        export function redDark(a: number = 1): AColor {
            return new AColor(RED_DARK, a);
        }
        export const RED = new Color(255, 0, 0);
        export function red(a: number = 1): AColor {
            return new AColor(RED, a);
        }
    }

    export namespace Orange {
        export const ORANGE_RED = new Color(255, 69, 0);
        export function orangeRed(a: number = 1): AColor {
            return new AColor(ORANGE_RED, a);
        }
        export const TOMATO = new Color(255, 99, 71);
        export function tomato(a: number = 1): AColor {
            return new AColor(TOMATO, a);
        }
        export const CORAL = new Color(255, 127, 80);
        export function coral(a: number = 1): AColor {
            return new AColor(CORAL, a);
        }
        export const ORANGE_DARK = new Color(255, 140, 0);
        export function orangeDark(a: number = 1): AColor {
            return new AColor(ORANGE_DARK, a);
        }
        export const ORANGE = new Color(255, 165, 0);
        export function orange(a: number = 1): AColor {
            return new AColor(ORANGE, a);
        }
    }

    export namespace Yellow {
        export const YELLOW = new Color(255, 255, 0);
        export function yellow(a: number = 1): AColor {
            return new AColor(YELLOW, a);
        }
        export const YELLOW_LIGHT = new Color(255, 255, 224);
        export function yellowLight(a: number = 1): AColor {
            return new AColor(YELLOW_LIGHT, a);
        }
        export const LEMON_CHIFFON = new Color(255, 250, 205);
        export function lemonChiffon(a: number = 1): AColor {
            return new AColor(LEMON_CHIFFON, a);
        }
        export const GOLDENROD_YELLO_LIGHT = new Color(250, 250, 210);
        export function goldenrodYellowLight(a: number = 1): AColor {
            return new AColor(GOLDENROD_YELLO_LIGHT, a);
        }
        export const PAPAYA_WHIP = new Color(255, 239, 213);
        export function papayaWhip(a: number = 1): AColor {
            return new AColor(PAPAYA_WHIP, a);
        }
        export const MOCCASIN = new Color(255, 228, 181);
        export function moccasin(a: number = 1): AColor {
            return new AColor(MOCCASIN, a);
        }
        export const PEACH_PUFF = new Color(255, 218, 185);
        export function peachPuff(a: number = 1): AColor {
            return new AColor(PEACH_PUFF, a);
        }
        export const GOLDENROD_PALE = new Color(238, 232, 170);
        export function goldenrodPale(a: number = 1): AColor {
            return new AColor(GOLDENROD_PALE, a);
        }
        export const KHAKI = new Color(240, 230, 140);
        export function khaki(a: number = 1): AColor {
            return new AColor(KHAKI, a);
        }
        export const KHAKI_DARK = new Color(189, 183, 107);
        export function khakiDark(a: number = 1): AColor {
            return new AColor(KHAKI_DARK, a);
        }
        export const GOLD = new Color(255, 215, 0);
        export function gold(a: number = 1): AColor {
            return new AColor(GOLD, a);
        }
    }

    export namespace Brown {
        export const CORNSILK = new Color(255, 248, 220);
        export function ornSilk(a: number = 1): AColor {
            return new AColor(CORNSILK, a);
        }
        export const ALMOND_BLANCHED = new Color(255, 235, 205);
        export function almondBlanched(a: number = 1): AColor {
            return new AColor(ALMOND_BLANCHED, a);
        }
        export const BISQUE = new Color(255, 228, 196);
        export function bisque(a: number = 1): AColor {
            return new AColor(BISQUE, a);
        }
        export const NAVAJO_WHITE = new Color(255, 222, 173);
        export function navajoWhite(a: number = 1): AColor {
            return new AColor(NAVAJO_WHITE, a);
        }
        export const WHEAT = new Color(245, 222, 179);
        export function wheat(a: number = 1): AColor {
            return new AColor(WHEAT, a);
        }
        export const WOOD_BLURY = new Color(222, 184, 135);
        export function woodBlury(a: number = 1): AColor {
            return new AColor(WOOD_BLURY, a);
        }
        export const TAN = new Color(210, 180, 140);
        export function tan(a: number = 1): AColor {
            return new AColor(TAN, a);
        }
        export const BROWN_ROSY = new Color(188, 143, 143);
        export function brownRosy(a: number = 1): AColor {
            return new AColor(BROWN_ROSY, a);
        }
        export const BROWN_SANDY = new Color(244, 164, 96);
        export function brownSandy(a: number = 1): AColor {
            return new AColor(BROWN_SANDY, a);
        }
        export const GOLDENROD = new Color(218, 165, 32);
        export function goldenrod(a: number = 1): AColor {
            return new AColor(GOLDENROD, a);
        }
        export const GOLDENROD_DARK = new Color(184, 134, 11);
        export function goldenrodDark(a: number = 1): AColor {
            return new AColor(GOLDENROD_DARK, a);
        }
        export const PERU = new Color(205, 133, 63);
        export function peru(a: number = 1): AColor {
            return new AColor(PERU, a);
        }
        export const CHOCOLATE = new Color(210, 105, 30);
        export function chocolate(a: number = 1): AColor {
            return new AColor(CHOCOLATE, a);
        }
        export const BROWN_SADDLE = new Color(139, 69, 19);
        export function brownSaddle(a: number = 1): AColor {
            return new AColor(BROWN_SADDLE, a);
        }
        export const SIENNA = new Color(160, 82, 45);
        export function sienna(a: number = 1): AColor {
            return new AColor(SIENNA, a);
        }
        export const BROWN = new Color(165, 42, 42);
        export function brown(a: number = 1): AColor {
            return new AColor(BROWN, a);
        }
        export const MAROON = new Color(128, 0, 0);
        export function maroon(a: number = 1): AColor {
            return new AColor(MAROON, a);
        }
    }

    export namespace Green {
        export const OLIVE_GREEN_DARK = new Color(85, 107, 47);
        export function oliveGreenDark(a: number = 1): AColor {
            return new AColor(OLIVE_GREEN_DARK, a);
        }
        export const OLIVE = new Color(128, 128, 0);
        export function olive(a: number = 1): AColor {
            return new AColor(OLIVE, a);
        }
        export const OLIVE_DRAB = new Color(107, 142, 35);
        export function oliveDrab(a: number = 1): AColor {
            return new AColor(OLIVE_DRAB, a);
        }
        export const YELLOW_GREEN = new Color(154, 205, 50);
        export function yellowGreen(a: number = 1): AColor {
            return new AColor(YELLOW_GREEN, a);
        }
        export const LIME_GREEN = new Color(50, 205, 50);
        export function limeGreen(a: number = 1): AColor {
            return new AColor(LIME_GREEN, a);
        }
        export const LIME = new Color(0, 255, 0);
        export function lime(a: number = 1): AColor {
            return new AColor(LIME, a);
        }
        export const GREEN_LAWN = new Color(124, 252, 0);
        export function greenlawn(a: number = 1): AColor {
            return new AColor(GREEN_LAWN, a);
        }
        export const CHARTEUSE = new Color(127, 255, 0);
        export function charteuse(a: number = 1): AColor {
            return new AColor(CHARTEUSE, a);
        }
        export const GREEN_YELLOW = new Color(173, 255, 47);
        export function greenYellow(a: number = 1): AColor {
            return new AColor(GREEN_YELLOW, a);
        }
        export const GREEN_SPRING = new Color(0, 255, 127);
        export function greenSpring(a: number = 1): AColor {
            return new AColor(GREEN_SPRING, a);
        }
        export const GREEN_SPRING_MEDIUM = new Color(0, 250, 154);
        export function greenSpringMedium(a: number = 1): AColor {
            return new AColor(GREEN_SPRING_MEDIUM, a);
        }
        export const GREEN_LIGHT = new Color(144, 238, 144);
        export function greenLight(a: number = 1): AColor {
            return new AColor(GREEN_LIGHT, a);
        }
        export const GREEN_PALE = new Color(152, 251, 152);
        export function greenPale(a: number = 1): AColor {
            return new AColor(GREEN_PALE, a);
        }
        export const GREEN_SEA_DARK = new Color(143, 188, 143);
        export function greenSeaDark(a: number = 1): AColor {
            return new AColor(GREEN_SEA_DARK, a);
        }
        export const AQUAMARINE_MEDIUM = new Color(102, 205, 170);
        export function aquamarineMedium(a: number = 1): AColor {
            return new AColor(AQUAMARINE_MEDIUM, a);
        }
        export const GREEN_SEA_MEDIUM = new Color(60, 179, 113);
        export function greenSeaMedium(a: number = 1): AColor {
            return new AColor(GREEN_SEA_MEDIUM, a);
        }
        export const GREEN_SEA = new Color(46, 139, 87);
        export function greenSea(a: number = 1): AColor {
            return new AColor(GREEN_SEA, a);
        }
        export const GREEN_FORREST = new Color(34, 139, 34);
        export function greenForrest(a: number = 1): AColor {
            return new AColor(GREEN_FORREST, a);
        }
        export const GREEN = new Color(0, 128, 0);
        export function green(a: number = 1): AColor {
            return new AColor(GREEN, a);
        }
        export const GREEN_DARK = new Color(0, 100, 0);
        export function greenDark(a: number = 1): AColor {
            return new AColor(GREEN_DARK, a);
        }
    }

    export namespace Cyan {
        export const AQUA = new Color(0, 255, 255);
        export function aqua(a: number = 1): AColor {
            return new AColor(AQUA, a);
        }
        export const CYAN = new Color(0, 255, 255);
        export function cyan(a: number = 1): AColor {
            return new AColor(CYAN, a);
        }
        export const CYAN_LIGHT = new Color(224, 255, 255);
        export function cyanLight(a: number = 1): AColor {
            return new AColor(CYAN_LIGHT, a);
        }
        export const TURQUOISE_PALE = new Color(175, 238, 238);
        export function turquoisePale(a: number = 1): AColor {
            return new AColor(TURQUOISE_PALE, a);
        }
        export const AQUARMARINE = new Color(127, 255, 212);
        export function aquamarine(a: number = 1): AColor {
            return new AColor(AQUARMARINE, a);
        }
        export const TURQUOISE = new Color(64, 224, 208);
        export function turquoise(a: number = 1): AColor {
            return new AColor(TURQUOISE, a);
        }
        export const TURQUOISE_MEDIUM = new Color(72, 209, 204);
        export function turquoiseMedium(a: number = 1): AColor {
            return new AColor(TURQUOISE_MEDIUM, a);
        }
        export const TURQUOISE_DARK = new Color(0, 206, 209);
        export function turquoiseDark(a: number = 1): AColor {
            return new AColor(TURQUOISE_DARK, a);
        }
        export const GREEN_SEA_LIGHT = new Color(32, 178, 170);
        export function greenSeaLight(a: number = 1): AColor {
            return new AColor(GREEN_SEA_LIGHT, a);
        }
        export const BLUE_CADET = new Color(95, 158, 160);
        export function blueCadet(a: number = 1): AColor {
            return new AColor(BLUE_CADET, a);
        }
        export const CYAN_DARK = new Color(0, 139, 139);
        export function cyanDark(a: number = 1): AColor {
            return new AColor(CYAN_DARK, a);
        }
        export const TEAL = new Color(0, 128, 128);
        export function teal(a: number = 1): AColor {
            return new AColor(TEAL, a);
        }
    }

    export namespace Blue {
        export const BLUE_STEEL_LIGHT = new Color(176, 196, 222);
        export function blueSteelLight(a: number = 1): AColor {
            return new AColor(BLUE_STEEL_LIGHT, a);
        }
        export const BLUE_POWDER = new Color(176, 224, 230);
        export function bluePowder(a: number = 1): AColor {
            return new AColor(BLUE_POWDER, a);
        }
        export const BLUE_LIGHT = new Color(173, 216, 230);
        export function blueLight(a: number = 1): AColor {
            return new AColor(BLUE_LIGHT, a);
        }
        export const BLUE_SKY = new Color(135, 206, 235);
        export function blueSky(a: number = 1): AColor {
            return new AColor(BLUE_SKY, a);
        }
        export const BLUE_SKY_LIGHT = new Color(135, 206, 250);
        export function blueSkyLight(a: number = 1): AColor {
            return new AColor(BLUE_SKY_LIGHT, a);
        }
        export const BLUE_SKY_DEEP = new Color(0, 191, 255);
        export function blueSkyDeep(a: number = 1): AColor {
            return new AColor(BLUE_SKY_DEEP, a);
        }
        export const BLUE_DODGER = new Color(30, 144, 255);
        export function blueDodger(a: number = 1): AColor {
            return new AColor(BLUE_DODGER, a);
        }
        export const BLUE_CORNFLOWER = new Color(100, 149, 237);
        export function blueCornflower(a: number = 1): AColor {
            return new AColor(BLUE_CORNFLOWER, a);
        }
        export const BLUE_STEEL = new Color(70, 130, 180);
        export function blueSteel(a: number = 1): AColor {
            return new AColor(BLUE_STEEL, a);
        }
        export const BLUE_ROYAL = new Color(65, 105, 225);
        export function blueRoyal(a: number = 1): AColor {
            return new AColor(BLUE_ROYAL, a);
        }
        export const BLUE = new Color(0, 0, 255);
        export function blue(a: number = 1): AColor {
            return new AColor(BLUE, a);
        }
        export const BLUE_MEDIUM = new Color(0, 0, 205);
        export function blueMedium(a: number = 1): AColor {
            return new AColor(BLUE_MEDIUM, a);
        }
        export const BLUE_DARK = new Color(0, 0, 139);
        export function blueDark(a: number = 1): AColor {
            return new AColor(BLUE_DARK, a);
        }
        export const NAVY = new Color(0, 0, 128);
        export function navy(a: number = 1): AColor {
            return new AColor(NAVY, a);
        }
        export const BLUE_MIDNIGHT = new Color(25, 25, 112);
        export function blueMidnight(a: number = 1): AColor {
            return new AColor(BLUE_MIDNIGHT, a);
        }
    }

    export namespace Purple {
        export const LAVENDAR = new Color(230, 230, 250);
        export function lavendar(a: number = 1): AColor {
            return new AColor(LAVENDAR, a);
        }
        export const THISTLE = new Color(216, 191, 216);
        export function thistle(a: number = 1): AColor {
            return new AColor(THISTLE, a);
        }
        export const PLUM = new Color(221, 160, 221);
        export function plum(a: number = 1): AColor {
            return new AColor(PLUM, a);
        }
        export const VIOLET = new Color(238, 130, 238);
        export function violet(a: number = 1): AColor {
            return new AColor(VIOLET, a);
        }
        export const ORCHID = new Color(218, 112, 214);
        export function orchid(a: number = 1): AColor {
            return new AColor(ORCHID, a);
        }
        export const FUCHSIA = new Color(255, 0, 255);
        export function fuchsia(a: number = 1): AColor {
            return new AColor(FUCHSIA, a);
        }
        export const MAGENTA = new Color(255, 0, 255);
        export function magenta(a: number = 1): AColor {
            return new AColor(MAGENTA, a);
        }
        export const ORCHID_MEDIUM = new Color(186, 85, 211);
        export function orchidMedium(a: number = 1): AColor {
            return new AColor(ORCHID_MEDIUM, a);
        }
        export const PURPLE_MEDIUM = new Color(147, 112, 219);
        export function purpleMedium(a: number = 1): AColor {
            return new AColor(PURPLE_MEDIUM, a);
        }
        export const VIOLET_BLUE = new Color(138, 43, 226);
        export function violetBlue(a: number = 1): AColor {
            return new AColor(VIOLET_BLUE, a);
        }
        export const VIOLET_DARK = new Color(148, 0, 211);
        export function violetDark(a: number = 1): AColor {
            return new AColor(VIOLET_DARK, a);
        }
        export const ORCHID_DARK = new Color(153, 50, 204);
        export function orchidDark(a: number = 1): AColor {
            return new AColor(ORCHID_DARK, a);
        }
        export const MAGENTA_DARK = new Color(139, 0, 139);
        export function magentaDark(a: number = 1): AColor {
            return new AColor(MAGENTA_DARK, a);
        }
        export const PURPLE = new Color(128, 0, 128);
        export function purple(a: number = 1): AColor {
            return new AColor(PURPLE, a);
        }
        export const INDIGO = new Color(75, 0, 130);
        export function indigo(a: number = 1): AColor {
            return new AColor(INDIGO, a);
        }
        export const BLUE_SLATE_DARK = new Color(72, 61, 139);
        export function blueSlateDark(a: number = 1): AColor {
            return new AColor(BLUE_SLATE_DARK, a);
        }
        export const PURPLE_REBECCA = new Color(102, 51, 153);
        export function purpleRebecca(a: number = 1): AColor {
            return new AColor(PURPLE_REBECCA, a);
        }
        export const BLUE_SLATE = new Color(106, 90, 205);
        export function blueSlate(a: number = 1): AColor {
            return new AColor(BLUE_SLATE, a);
        }
        export const BLUE_SLATE_MEDIUM = new Color(123, 104, 238);
        export function blueStaeMedium(a: number = 1): AColor {
            return new AColor(BLUE_SLATE_MEDIUM, a);
        }
    }

    export namespace White {
        export const WHITE = new Color(255, 255, 255);
        export function white(a: number = 1): AColor {
            return new AColor(WHITE, a);
        }
        export const SNOW = new Color(255, 250, 250);
        export function snow(a: number = 1): AColor {
            return new AColor(SNOW, a);
        }
        export const HONEYDEW = new Color(240, 255, 240);
        export function honeydew(a: number = 1): AColor {
            return new AColor(HONEYDEW, a);
        }
        export const MIND_CREAM = new Color(245, 255, 250);
        export function mindCream(a: number = 1): AColor {
            return new AColor(MIND_CREAM, a);
        }
        export const AZURE = new Color(240, 255, 255);
        export function azure(a: number = 1): AColor {
            return new AColor(AZURE, a);
        }
        export const BLUE_ALICE = new Color(240, 248, 255);
        export function blueAlice(a: number = 1): AColor {
            return new AColor(BLUE_ALICE, a);
        }
        export const WHITE_GHOST = new Color(248, 248, 255);
        export function whiteGhost(a: number = 1): AColor {
            return new AColor(WHITE_GHOST, a);
        }
        export const WHITE_SMOKE = new Color(245, 245, 245);
        export function whiteSmoke(a: number = 1): AColor {
            return new AColor(WHITE_SMOKE, a);
        }
        export const SEASHELL = new Color(255, 245, 238);
        export function seashell(a: number = 1): AColor {
            return new AColor(SEASHELL, a);
        }
        export const BEIGE = new Color(245, 245, 220);
        export function beige(a: number = 1): AColor {
            return new AColor(BEIGE, a);
        }
        export const OLDLACE = new Color(253, 245, 230);
        export function oldlace(a: number = 1): AColor {
            return new AColor(OLDLACE, a);
        }
        export const WHITE_FLORAL = new Color(255, 250, 240);
        export function whiteFloral(a: number = 1): AColor {
            return new AColor(WHITE_FLORAL, a);
        }
        export const IVORY = new Color(255, 255, 240);
        export function ivory(a: number = 1): AColor {
            return new AColor(IVORY, a);
        }
        export const WHITE_ANTIQUE = new Color(250, 235, 215);
        export function whiteAntique(a: number = 1): AColor {
            return new AColor(WHITE_ANTIQUE, a);
        }
        export const LINEN = new Color(250, 240, 230);
        export function linen(a: number = 1): AColor {
            return new AColor(LINEN, a);
        }
        export const LAVENDER_BLUSH = new Color(255, 240, 245);
        export function lavandarBlush(a: number = 1): AColor {
            return new AColor(LAVENDER_BLUSH, a);
        }
        export const ROSE_MISTY = new Color(255, 228, 225);
        export function roseMisty(a: number = 1): AColor {
            return new AColor(ROSE_MISTY, a);
        }
    }

    export namespace Gray {
        export const GAINSBORO = new Color(220, 220, 220);
        export function gainsboro(a: number = 1): AColor {
            return new AColor(GAINSBORO, a);
        }
        export const GRAY_LIGHT = new Color(211, 211, 211);
        export function grayLight(a: number = 1): AColor {
            return new AColor(GRAY_LIGHT, a);
        }
        export const SILVER = new Color(192, 192, 192);
        export function silver(a: number = 1): AColor {
            return new AColor(SILVER, a);
        }
        export const GRAY_DARK = new Color(169, 169, 169);
        export function grayDark(a: number = 1): AColor {
            return new AColor(GRAY_DARK, a);
        }
        export const GRAY = new Color(128, 128, 128);
        export function gray(a: number = 1): AColor {
            return new AColor(GRAY, a);
        }
        export const GRAY_DIM = new Color(105, 105, 105);
        export function grayDim(a: number = 1): AColor {
            return new AColor(GRAY_DIM, a);
        }
        export const GRAY_SLATE_LIGHT = new Color(119, 136, 153);
        export function graySlateLight(a: number = 1): AColor {
            return new AColor(GRAY_SLATE_LIGHT, a);
        }
        export const GRAY_SLATE = new Color(112, 128, 144);
        export function graySlate(a: number = 1): AColor {
            return new AColor(GRAY_SLATE, a);
        }
        export const GRAY_SLATE_DARK = new Color(47, 79, 79);
        export function graySlateDark(a: number = 1): AColor {
            return new AColor(GRAY_SLATE_DARK, a);
        }
        export const BLACK = new Color(0, 0, 0);
        export function black(a: number = 1): AColor {
            return new AColor(BLACK, a);
        }
    }
}