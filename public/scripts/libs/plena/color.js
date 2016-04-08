//color gradients implement with mixin for style and require that one for where style is needed, e.x. canvas.
var AColor = (function () {
    function AColor(r, g, b, a) {
        if (typeof a == "number") {
            this.theColor = new Color(r, g, b);
            this.alpha = a;
        }
        else {
            this.theColor = r;
            this.alpha = b;
        }
    }
    AColor.prototype.color = function () {
        return this.theColor;
    };
    AColor.prototype.a = function () {
        return this.a;
    };
    AColor.prototype.r = function () {
        return this.theColor.r();
    };
    AColor.prototype.b = function () {
        return this.theColor.b();
    };
    AColor.prototype.g = function () {
        return this.theColor.g();
    };
    AColor.prototype.style = function () {
        return this.theColor.style(this.alpha);
    };
    AColor.prototype.vec = function () {
        return this.theColor.vec(this.alpha);
    };
    AColor.prototype.hex = function () {
        return this.theColor.hex();
    };
    AColor.prototype.clearcolor = function () {
        var c = this.vec();
        gl.clearColor(c[0], c[1], c[2], c[3]);
    };
    return AColor;
})();
var Color = (function () {
    function Color(par1, g, b) {
        if (typeof b == 'number') {
            this.rV = par1;
            this.gV = g;
            this.bV = b;
        }
        else {
            var color;
            if (typeof par1 == 'string') {
                color = Color.toRGB(par1);
            }
            else
                color = par1;
            this.rV = color[0] * 255;
            this.bV = color[1] * 255;
            this.gV = color[2] * 255;
        }
    }
    Color.prototype.r = function () {
        return this.rV;
    };
    Color.prototype.b = function () {
        return this.bV;
    };
    Color.prototype.g = function () {
        return this.gV;
    };
    Color.prototype.style = function (a) {
        if (a === void 0) { a = 1; }
        return "rgba(" + this.rV + ", " + this.gV + ", " + this.bV + ", " + a + ")";
    };
    Color.prototype.vec = function (a) {
        if (a === void 0) { a = 1; }
        return [this.rV / 255, this.gV / 255, this.bV / 255, a];
    };
    Color.prototype.hex = function () {
        return Color.toHex(this.rV, this.gV, this.bV);
    };
    Color.prototype.clearcolor = function () {
        var c = this.vec();
        gl.clearColor(c[0], c[1], c[2], c[3]);
    };
    Color.toRGB = function (hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    };
    Color.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    Color.toHex = function (r, g, b) {
        return "#" + Color.componentToHex(r) + Color.componentToHex(g) + Color.componentToHex(b);
    };
    return Color;
})();
var Color;
(function (Color) {
    var Pink;
    (function (Pink) {
        Pink.PINK = new Color(255, 192, 203);
        function pink(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Pink.PINK, a);
        }
        Pink.pink = pink;
        Pink.PINK_LIGHT = new Color(255, 182, 193);
        function pinkLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Pink.PINK_LIGHT, a);
        }
        Pink.pinkLight = pinkLight;
        Pink.PINK_HOT = new Color(255, 105, 180);
        function pinkHot(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Pink.PINK_HOT, a);
        }
        Pink.pinkHot = pinkHot;
        Pink.PINK_DEEP = new Color(255, 20, 147);
        function pinkDeep(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Pink.PINK_DEEP, a);
        }
        Pink.pinkDeep = pinkDeep;
        Pink.VIOLET_RED_PALE = new Color(219, 112, 147);
        function violetRedPale(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Pink.VIOLET_RED_PALE, a);
        }
        Pink.violetRedPale = violetRedPale;
        Pink.VIOLET_RED_MEDIUM = new Color(199, 21, 133);
        function violetRedMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Pink.VIOLET_RED_MEDIUM, a);
        }
        Pink.violetRedMedium = violetRedMedium;
    })(Pink = Color.Pink || (Color.Pink = {}));
    var Red;
    (function (Red) {
        Red.SALMON_LIGHT = new Color(255, 160, 122);
        function salmonLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.SALMON_LIGHT, a);
        }
        Red.salmonLight = salmonLight;
        Red.SALMON = new Color(250, 128, 114);
        function salmon(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.SALMON, a);
        }
        Red.salmon = salmon;
        Red.SALMON_DARK = new Color(233, 150, 122);
        function salmonDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.SALMON_DARK, a);
        }
        Red.salmonDark = salmonDark;
        Red.CORAL_LIGHT = new Color(240, 128, 128);
        function colalLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.CORAL_LIGHT, a);
        }
        Red.colalLight = colalLight;
        Red.RED_INDIAN = new Color(205, 92, 92);
        function redIndian(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.RED_INDIAN, a);
        }
        Red.redIndian = redIndian;
        Red.CRIMSON = new Color(220, 20, 60);
        function crimson(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.CRIMSON, a);
        }
        Red.crimson = crimson;
        Red.FIREBRIK = new Color(178, 34, 34);
        function firebrik(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.FIREBRIK, a);
        }
        Red.firebrik = firebrik;
        Red.RED_DARK = new Color(139, 0, 0);
        function redDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.RED_DARK, a);
        }
        Red.redDark = redDark;
        Red.RED = new Color(255, 0, 0);
        function red(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Red.RED, a);
        }
        Red.red = red;
    })(Red = Color.Red || (Color.Red = {}));
    var Orange;
    (function (Orange) {
        Orange.ORANGE_RED = new Color(255, 69, 0);
        function orangeRed(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Orange.ORANGE_RED, a);
        }
        Orange.orangeRed = orangeRed;
        Orange.TOMATO = new Color(255, 99, 71);
        function tomato(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Orange.TOMATO, a);
        }
        Orange.tomato = tomato;
        Orange.CORAL = new Color(255, 127, 80);
        function coral(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Orange.CORAL, a);
        }
        Orange.coral = coral;
        Orange.ORANGE_DARK = new Color(255, 140, 0);
        function orangeDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Orange.ORANGE_DARK, a);
        }
        Orange.orangeDark = orangeDark;
        Orange.ORANGE = new Color(255, 165, 0);
        function orange(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Orange.ORANGE, a);
        }
        Orange.orange = orange;
    })(Orange = Color.Orange || (Color.Orange = {}));
    var Yellow;
    (function (Yellow) {
        Yellow.YELLOW = new Color(255, 255, 0);
        function yellow(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.YELLOW, a);
        }
        Yellow.yellow = yellow;
        Yellow.YELLOW_LIGHT = new Color(255, 255, 224);
        function yellowLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.YELLOW_LIGHT, a);
        }
        Yellow.yellowLight = yellowLight;
        Yellow.LEMON_CHIFFON = new Color(255, 250, 205);
        function lemonChiffon(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.LEMON_CHIFFON, a);
        }
        Yellow.lemonChiffon = lemonChiffon;
        Yellow.GOLDENROD_YELLO_LIGHT = new Color(250, 250, 210);
        function goldenrodYellowLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.GOLDENROD_YELLO_LIGHT, a);
        }
        Yellow.goldenrodYellowLight = goldenrodYellowLight;
        Yellow.PAPAYA_WHIP = new Color(255, 239, 213);
        function papayaWhip(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.PAPAYA_WHIP, a);
        }
        Yellow.papayaWhip = papayaWhip;
        Yellow.MOCCASIN = new Color(255, 228, 181);
        function moccasin(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.MOCCASIN, a);
        }
        Yellow.moccasin = moccasin;
        Yellow.PEACH_PUFF = new Color(255, 218, 185);
        function peachPuff(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.PEACH_PUFF, a);
        }
        Yellow.peachPuff = peachPuff;
        Yellow.GOLDENROD_PALE = new Color(238, 232, 170);
        function goldenrodPale(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.GOLDENROD_PALE, a);
        }
        Yellow.goldenrodPale = goldenrodPale;
        Yellow.KHAKI = new Color(240, 230, 140);
        function khaki(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.KHAKI, a);
        }
        Yellow.khaki = khaki;
        Yellow.KHAKI_DARK = new Color(189, 183, 107);
        function khakiDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.KHAKI_DARK, a);
        }
        Yellow.khakiDark = khakiDark;
        Yellow.GOLD = new Color(255, 215, 0);
        function gold(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Yellow.GOLD, a);
        }
        Yellow.gold = gold;
    })(Yellow = Color.Yellow || (Color.Yellow = {}));
    var Brown;
    (function (Brown) {
        Brown.CORNSILK = new Color(255, 248, 220);
        function ornSilk(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.CORNSILK, a);
        }
        Brown.ornSilk = ornSilk;
        Brown.ALMOND_BLANCHED = new Color(255, 235, 205);
        function almondBlanched(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.ALMOND_BLANCHED, a);
        }
        Brown.almondBlanched = almondBlanched;
        Brown.BISQUE = new Color(255, 228, 196);
        function bisque(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.BISQUE, a);
        }
        Brown.bisque = bisque;
        Brown.NAVAJO_WHITE = new Color(255, 222, 173);
        function navajoWhite(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.NAVAJO_WHITE, a);
        }
        Brown.navajoWhite = navajoWhite;
        Brown.WHEAT = new Color(245, 222, 179);
        function wheat(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.WHEAT, a);
        }
        Brown.wheat = wheat;
        Brown.WOOD_BLURY = new Color(222, 184, 135);
        function woodBlury(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.WOOD_BLURY, a);
        }
        Brown.woodBlury = woodBlury;
        Brown.TAN = new Color(210, 180, 140);
        function tan(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.TAN, a);
        }
        Brown.tan = tan;
        Brown.BROWN_ROSY = new Color(188, 143, 143);
        function brownRosy(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.BROWN_ROSY, a);
        }
        Brown.brownRosy = brownRosy;
        Brown.BROWN_SANDY = new Color(244, 164, 96);
        function brownSandy(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.BROWN_SANDY, a);
        }
        Brown.brownSandy = brownSandy;
        Brown.GOLDENROD = new Color(218, 165, 32);
        function goldenrod(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.GOLDENROD, a);
        }
        Brown.goldenrod = goldenrod;
        Brown.GOLDENROD_DARK = new Color(184, 134, 11);
        function goldenrodDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.GOLDENROD_DARK, a);
        }
        Brown.goldenrodDark = goldenrodDark;
        Brown.PERU = new Color(205, 133, 63);
        function peru(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.PERU, a);
        }
        Brown.peru = peru;
        Brown.CHOCOLATE = new Color(210, 105, 30);
        function chocolate(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.CHOCOLATE, a);
        }
        Brown.chocolate = chocolate;
        Brown.BROWN_SADDLE = new Color(139, 69, 19);
        function brownSaddle(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.BROWN_SADDLE, a);
        }
        Brown.brownSaddle = brownSaddle;
        Brown.SIENNA = new Color(160, 82, 45);
        function sienna(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.SIENNA, a);
        }
        Brown.sienna = sienna;
        Brown.BROWN = new Color(165, 42, 42);
        function brown(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.BROWN, a);
        }
        Brown.brown = brown;
        Brown.MAROON = new Color(128, 0, 0);
        function maroon(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Brown.MAROON, a);
        }
        Brown.maroon = maroon;
    })(Brown = Color.Brown || (Color.Brown = {}));
    var Green;
    (function (Green) {
        Green.OLIVE_GREEN_DARK = new Color(85, 107, 47);
        function oliveGreenDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.OLIVE_GREEN_DARK, a);
        }
        Green.oliveGreenDark = oliveGreenDark;
        Green.OLIVE = new Color(128, 128, 0);
        function olive(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.OLIVE, a);
        }
        Green.olive = olive;
        Green.OLIVE_DRAB = new Color(107, 142, 35);
        function oliveDrab(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.OLIVE_DRAB, a);
        }
        Green.oliveDrab = oliveDrab;
        Green.YELLOW_GREEN = new Color(154, 205, 50);
        function yellowGreen(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.YELLOW_GREEN, a);
        }
        Green.yellowGreen = yellowGreen;
        Green.LIME_GREEN = new Color(50, 205, 50);
        function limeGreen(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.LIME_GREEN, a);
        }
        Green.limeGreen = limeGreen;
        Green.LIME = new Color(0, 255, 0);
        function lime(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.LIME, a);
        }
        Green.lime = lime;
        Green.GREEN_LAWN = new Color(124, 252, 0);
        function greenlawn(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_LAWN, a);
        }
        Green.greenlawn = greenlawn;
        Green.CHARTEUSE = new Color(127, 255, 0);
        function charteuse(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.CHARTEUSE, a);
        }
        Green.charteuse = charteuse;
        Green.GREEN_YELLOW = new Color(173, 255, 47);
        function greenYellow(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_YELLOW, a);
        }
        Green.greenYellow = greenYellow;
        Green.GREEN_SPRING = new Color(0, 255, 127);
        function greenSpring(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_SPRING, a);
        }
        Green.greenSpring = greenSpring;
        Green.GREEN_SPRING_MEDIUM = new Color(0, 250, 154);
        function greenSpringMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_SPRING_MEDIUM, a);
        }
        Green.greenSpringMedium = greenSpringMedium;
        Green.GREEN_LIGHT = new Color(144, 238, 144);
        function greenLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_LIGHT, a);
        }
        Green.greenLight = greenLight;
        Green.GREEN_PALE = new Color(152, 251, 152);
        function greenPale(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_PALE, a);
        }
        Green.greenPale = greenPale;
        Green.GREEN_SEA_DARK = new Color(143, 188, 143);
        function greenSeaDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_SEA_DARK, a);
        }
        Green.greenSeaDark = greenSeaDark;
        Green.AQUAMARINE_MEDIUM = new Color(102, 205, 170);
        function aquamarineMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.AQUAMARINE_MEDIUM, a);
        }
        Green.aquamarineMedium = aquamarineMedium;
        Green.GREEN_SEA_MEDIUM = new Color(60, 179, 113);
        function greenSeaMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_SEA_MEDIUM, a);
        }
        Green.greenSeaMedium = greenSeaMedium;
        Green.GREEN_SEA = new Color(46, 139, 87);
        function greenSea(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_SEA, a);
        }
        Green.greenSea = greenSea;
        Green.GREEN_FORREST = new Color(34, 139, 34);
        function greenForrest(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_FORREST, a);
        }
        Green.greenForrest = greenForrest;
        Green.GREEN = new Color(0, 128, 0);
        function green(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN, a);
        }
        Green.green = green;
        Green.GREEN_DARK = new Color(0, 100, 0);
        function greenDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Green.GREEN_DARK, a);
        }
        Green.greenDark = greenDark;
    })(Green = Color.Green || (Color.Green = {}));
    var Cyan;
    (function (Cyan) {
        Cyan.AQUA = new Color(0, 255, 255);
        function aqua(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.AQUA, a);
        }
        Cyan.aqua = aqua;
        Cyan.CYAN = new Color(0, 255, 255);
        function cyan(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.CYAN, a);
        }
        Cyan.cyan = cyan;
        Cyan.CYAN_LIGHT = new Color(224, 255, 255);
        function cyanLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.CYAN_LIGHT, a);
        }
        Cyan.cyanLight = cyanLight;
        Cyan.TURQUOISE_PALE = new Color(175, 238, 238);
        function turquoisePale(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.TURQUOISE_PALE, a);
        }
        Cyan.turquoisePale = turquoisePale;
        Cyan.AQUARMARINE = new Color(127, 255, 212);
        function aquamarine(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.AQUARMARINE, a);
        }
        Cyan.aquamarine = aquamarine;
        Cyan.TURQUOISE = new Color(64, 224, 208);
        function turquoise(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.TURQUOISE, a);
        }
        Cyan.turquoise = turquoise;
        Cyan.TURQUOISE_MEDIUM = new Color(72, 209, 204);
        function turquoiseMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.TURQUOISE_MEDIUM, a);
        }
        Cyan.turquoiseMedium = turquoiseMedium;
        Cyan.TURQUOISE_DARK = new Color(0, 206, 209);
        function turquoiseDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.TURQUOISE_DARK, a);
        }
        Cyan.turquoiseDark = turquoiseDark;
        Cyan.GREEN_SEA_LIGHT = new Color(32, 178, 170);
        function greenSeaLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.GREEN_SEA_LIGHT, a);
        }
        Cyan.greenSeaLight = greenSeaLight;
        Cyan.BLUE_CADET = new Color(95, 158, 160);
        function blueCadet(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.BLUE_CADET, a);
        }
        Cyan.blueCadet = blueCadet;
        Cyan.CYAN_DARK = new Color(0, 139, 139);
        function cyanDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.CYAN_DARK, a);
        }
        Cyan.cyanDark = cyanDark;
        Cyan.TEAL = new Color(0, 128, 128);
        function teal(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Cyan.TEAL, a);
        }
        Cyan.teal = teal;
    })(Cyan = Color.Cyan || (Color.Cyan = {}));
    var Blue;
    (function (Blue) {
        Blue.BLUE_STEEL_LIGHT = new Color(176, 196, 222);
        function blueSteelLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_STEEL_LIGHT, a);
        }
        Blue.blueSteelLight = blueSteelLight;
        Blue.BLUE_POWDER = new Color(176, 224, 230);
        function bluePowder(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_POWDER, a);
        }
        Blue.bluePowder = bluePowder;
        Blue.BLUE_LIGHT = new Color(173, 216, 230);
        function blueLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_LIGHT, a);
        }
        Blue.blueLight = blueLight;
        Blue.BLUE_SKY = new Color(135, 206, 235);
        function blueSky(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_SKY, a);
        }
        Blue.blueSky = blueSky;
        Blue.BLUE_SKY_LIGHT = new Color(135, 206, 250);
        function blueSkyLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_SKY_LIGHT, a);
        }
        Blue.blueSkyLight = blueSkyLight;
        Blue.BLUE_SKY_DEEP = new Color(0, 191, 255);
        function blueSkyDeep(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_SKY_DEEP, a);
        }
        Blue.blueSkyDeep = blueSkyDeep;
        Blue.BLUE_DODGER = new Color(30, 144, 255);
        function blueDodger(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_DODGER, a);
        }
        Blue.blueDodger = blueDodger;
        Blue.BLUE_CORNFLOWER = new Color(100, 149, 237);
        function blueCornflower(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_CORNFLOWER, a);
        }
        Blue.blueCornflower = blueCornflower;
        Blue.BLUE_STEEL = new Color(70, 130, 180);
        function blueSteel(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_STEEL, a);
        }
        Blue.blueSteel = blueSteel;
        Blue.BLUE_ROYAL = new Color(65, 105, 225);
        function blueRoyal(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_ROYAL, a);
        }
        Blue.blueRoyal = blueRoyal;
        Blue.BLUE = new Color(0, 0, 255);
        function blue(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE, a);
        }
        Blue.blue = blue;
        Blue.BLUE_MEDIUM = new Color(0, 0, 205);
        function blueMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_MEDIUM, a);
        }
        Blue.blueMedium = blueMedium;
        Blue.BLUE_DARK = new Color(0, 0, 139);
        function blueDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_DARK, a);
        }
        Blue.blueDark = blueDark;
        Blue.NAVY = new Color(0, 0, 128);
        function navy(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.NAVY, a);
        }
        Blue.navy = navy;
        Blue.BLUE_MIDNIGHT = new Color(25, 25, 112);
        function blueMidnight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Blue.BLUE_MIDNIGHT, a);
        }
        Blue.blueMidnight = blueMidnight;
    })(Blue = Color.Blue || (Color.Blue = {}));
    var Purple;
    (function (Purple) {
        Purple.LAVENDAR = new Color(230, 230, 250);
        function lavendar(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.LAVENDAR, a);
        }
        Purple.lavendar = lavendar;
        Purple.THISTLE = new Color(216, 191, 216);
        function thistle(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.THISTLE, a);
        }
        Purple.thistle = thistle;
        Purple.PLUM = new Color(221, 160, 221);
        function plum(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.PLUM, a);
        }
        Purple.plum = plum;
        Purple.VIOLET = new Color(238, 130, 238);
        function violet(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.VIOLET, a);
        }
        Purple.violet = violet;
        Purple.ORCHID = new Color(218, 112, 214);
        function orchid(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.ORCHID, a);
        }
        Purple.orchid = orchid;
        Purple.FUCHSIA = new Color(255, 0, 255);
        function fuchsia(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.FUCHSIA, a);
        }
        Purple.fuchsia = fuchsia;
        Purple.MAGENTA = new Color(255, 0, 255);
        function magenta(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.MAGENTA, a);
        }
        Purple.magenta = magenta;
        Purple.ORCHID_MEDIUM = new Color(186, 85, 211);
        function orchidMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.ORCHID_MEDIUM, a);
        }
        Purple.orchidMedium = orchidMedium;
        Purple.PURPLE_MEDIUM = new Color(147, 112, 219);
        function purpleMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.PURPLE_MEDIUM, a);
        }
        Purple.purpleMedium = purpleMedium;
        Purple.VIOLET_BLUE = new Color(138, 43, 226);
        function violetBlue(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.VIOLET_BLUE, a);
        }
        Purple.violetBlue = violetBlue;
        Purple.VIOLET_DARK = new Color(148, 0, 211);
        function violetDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.VIOLET_DARK, a);
        }
        Purple.violetDark = violetDark;
        Purple.ORCHID_DARK = new Color(153, 50, 204);
        function orchidDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.ORCHID_DARK, a);
        }
        Purple.orchidDark = orchidDark;
        Purple.MAGENTA_DARK = new Color(139, 0, 139);
        function magentaDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.MAGENTA_DARK, a);
        }
        Purple.magentaDark = magentaDark;
        Purple.PURPLE = new Color(128, 0, 128);
        function purple(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.PURPLE, a);
        }
        Purple.purple = purple;
        Purple.INDIGO = new Color(75, 0, 130);
        function indigo(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.INDIGO, a);
        }
        Purple.indigo = indigo;
        Purple.BLUE_SLATE_DARK = new Color(72, 61, 139);
        function blueSlateDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.BLUE_SLATE_DARK, a);
        }
        Purple.blueSlateDark = blueSlateDark;
        Purple.PURPLE_REBECCA = new Color(102, 51, 153);
        function purpleRebecca(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.PURPLE_REBECCA, a);
        }
        Purple.purpleRebecca = purpleRebecca;
        Purple.BLUE_SLATE = new Color(106, 90, 205);
        function blueSlate(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.BLUE_SLATE, a);
        }
        Purple.blueSlate = blueSlate;
        Purple.BLUE_SLATE_MEDIUM = new Color(123, 104, 238);
        function blueStaeMedium(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Purple.BLUE_SLATE_MEDIUM, a);
        }
        Purple.blueStaeMedium = blueStaeMedium;
    })(Purple = Color.Purple || (Color.Purple = {}));
    var White;
    (function (White) {
        White.WHITE = new Color(255, 255, 255);
        function white(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.WHITE, a);
        }
        White.white = white;
        White.SNOW = new Color(255, 250, 250);
        function snow(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.SNOW, a);
        }
        White.snow = snow;
        White.HONEYDEW = new Color(240, 255, 240);
        function honeydew(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.HONEYDEW, a);
        }
        White.honeydew = honeydew;
        White.MIND_CREAM = new Color(245, 255, 250);
        function mindCream(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.MIND_CREAM, a);
        }
        White.mindCream = mindCream;
        White.AZURE = new Color(240, 255, 255);
        function azure(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.AZURE, a);
        }
        White.azure = azure;
        White.BLUE_ALICE = new Color(240, 248, 255);
        function blueAlice(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.BLUE_ALICE, a);
        }
        White.blueAlice = blueAlice;
        White.WHITE_GHOST = new Color(248, 248, 255);
        function whiteGhost(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.WHITE_GHOST, a);
        }
        White.whiteGhost = whiteGhost;
        White.WHITE_SMOKE = new Color(245, 245, 245);
        function whiteSmoke(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.WHITE_SMOKE, a);
        }
        White.whiteSmoke = whiteSmoke;
        White.SEASHELL = new Color(255, 245, 238);
        function seashell(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.SEASHELL, a);
        }
        White.seashell = seashell;
        White.BEIGE = new Color(245, 245, 220);
        function beige(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.BEIGE, a);
        }
        White.beige = beige;
        White.OLDLACE = new Color(253, 245, 230);
        function oldlace(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.OLDLACE, a);
        }
        White.oldlace = oldlace;
        White.WHITE_FLORAL = new Color(255, 250, 240);
        function whiteFloral(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.WHITE_FLORAL, a);
        }
        White.whiteFloral = whiteFloral;
        White.IVORY = new Color(255, 255, 240);
        function ivory(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.IVORY, a);
        }
        White.ivory = ivory;
        White.WHITE_ANTIQUE = new Color(250, 235, 215);
        function whiteAntique(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.WHITE_ANTIQUE, a);
        }
        White.whiteAntique = whiteAntique;
        White.LINEN = new Color(250, 240, 230);
        function linen(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.LINEN, a);
        }
        White.linen = linen;
        White.LAVENDER_BLUSH = new Color(255, 240, 245);
        function lavandarBlush(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.LAVENDER_BLUSH, a);
        }
        White.lavandarBlush = lavandarBlush;
        White.ROSE_MISTY = new Color(255, 228, 225);
        function roseMisty(a) {
            if (a === void 0) { a = 1; }
            return new AColor(White.ROSE_MISTY, a);
        }
        White.roseMisty = roseMisty;
    })(White = Color.White || (Color.White = {}));
    var Gray;
    (function (Gray) {
        Gray.GAINSBORO = new Color(220, 220, 220);
        function gainsboro(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GAINSBORO, a);
        }
        Gray.gainsboro = gainsboro;
        Gray.GRAY_LIGHT = new Color(211, 211, 211);
        function grayLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GRAY_LIGHT, a);
        }
        Gray.grayLight = grayLight;
        Gray.SILVER = new Color(192, 192, 192);
        function silver(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.SILVER, a);
        }
        Gray.silver = silver;
        Gray.GRAY_DARK = new Color(169, 169, 169);
        function grayDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GRAY_DARK, a);
        }
        Gray.grayDark = grayDark;
        Gray.GRAY = new Color(128, 128, 128);
        function gray(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GRAY, a);
        }
        Gray.gray = gray;
        Gray.GRAY_DIM = new Color(105, 105, 105);
        function grayDim(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GRAY_DIM, a);
        }
        Gray.grayDim = grayDim;
        Gray.GRAY_SLATE_LIGHT = new Color(119, 136, 153);
        function graySlateLight(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GRAY_SLATE_LIGHT, a);
        }
        Gray.graySlateLight = graySlateLight;
        Gray.GRAY_SLATE = new Color(112, 128, 144);
        function graySlate(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GRAY_SLATE, a);
        }
        Gray.graySlate = graySlate;
        Gray.GRAY_SLATE_DARK = new Color(47, 79, 79);
        function graySlateDark(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.GRAY_SLATE_DARK, a);
        }
        Gray.graySlateDark = graySlateDark;
        Gray.BLACK = new Color(0, 0, 0);
        function black(a) {
            if (a === void 0) { a = 1; }
            return new AColor(Gray.BLACK, a);
        }
        Gray.black = black;
    })(Gray = Color.Gray || (Color.Gray = {}));
})(Color || (Color = {}));
//# sourceMappingURL=color.js.map