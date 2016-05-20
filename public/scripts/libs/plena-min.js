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
                this.rV = color[0];
                this.gV = color[1];
                this.bV = color[2];
            }
            else {
                color = par1;
                this.rV = color[0] * 255;
                this.gV = color[1] * 255;
                this.bV = color[2] * 255;
            }
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
    function mkColor(par1, g, b) {
        if (typeof par1 == "number")
            return new Color(par1, g, b);
        else if (typeof par1 == "string")
            return new Color(par1);
        else
            return new Color(par1);
    }
    Color.mkColor = mkColor;
    function mkAlphaColor(r, g, b, a) {
        if (typeof a == "number")
            return new AColor(r, g, b, a);
        else
            return new AColor(r, g);
    }
    Color.mkAlphaColor = mkAlphaColor;
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
//big mess, needs a ton of work
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NUMBER_COMPARE = function (a, b) {
    return a - b;
};
var STRING_COMPARE = function (a, b) {
    return a.localeCompare(b);
};
//class HashMap<Key, Value> {
//}
//class DeepHashMap<Key, Value> {
//}
var Comparable = (function () {
    function Comparable(compare) {
        this.compare = compare;
    }
    return Comparable;
})();
var RBColor;
(function (RBColor) {
    RBColor[RBColor["RED"] = 0] = "RED";
    RBColor[RBColor["BLACK"] = 1] = "BLACK";
})(RBColor || (RBColor = {}));
;
var RBItemNode = (function () {
    function RBItemNode(value, color, size) {
        this.color = color;
        this.key = value;
        this.size = size;
    }
    return RBItemNode;
})();
var TreeSet = (function (_super) {
    __extends(TreeSet, _super);
    function TreeSet() {
        _super.apply(this, arguments);
    }
    TreeSet.prototype.clear = function () {
        this.root = null;
    };
    TreeSet.prototype.isEqual = function (that) {
        if (this.size() != that.size())
            return false;
        var ittr1 = this.iterator();
        var ittr2 = that.iterator();
        for (var i = 0; i < ittr1.length; i++) {
            if (ittr1[i] != ittr2[i])
                return false;
        }
        return true;
    };
    TreeSet.prototype.size = function () {
        if (this.root != null)
            return this.sizeAt(this.root);
        return 0;
    };
    TreeSet.prototype.sizeAt = function (node) {
        if (node == null)
            return 0;
        return node.size;
    };
    TreeSet.prototype.childSize = function (node) {
        return this.sizeAt(node.left) + this.sizeAt(node.right);
    };
    TreeSet.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    TreeSet.prototype.isRed = function (node) {
        if (node == null)
            return false;
        return node.color == RBColor.RED;
    };
    TreeSet.prototype.applyAt = function (node, key) {
        if (node == null)
            return null;
        else {
            var comp = this.compare(key, node.key);
            if (comp < 0)
                return this.applyAt(node.left, key);
            else if (comp > 0)
                return this.applyAt(node.right, key);
            return node.key;
        }
    };
    TreeSet.prototype.contains = function (key) {
        return this.applyAt(this.root, key) != null;
    };
    TreeSet.prototype.pick = function () {
        return this.root.key;
    };
    TreeSet.prototype.add = function (item) {
        this.root = this.putAt(this.root, item);
        this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.putAt = function (node, key) {
        if (node == null)
            return new RBItemNode(key, RBColor.RED, 1);
        var comp = this.compare(key, node.key);
        if (comp < 0)
            node.left = this.putAt(node.left, key);
        else if (comp > 0)
            node.right = this.putAt(node.right, key);
        else
            node.key;
        if (this.isRed(node.right) && !this.isRed(node.left))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.sizeAt(node.left) + this.sizeAt(node.right) + 1;
        return node;
    };
    TreeSet.prototype.rightRot = function (node) {
        return this.rotate(node, false);
    };
    TreeSet.prototype.leftRot = function (node) {
        return this.rotate(node, true);
    };
    TreeSet.prototype.rotate = function (node, left) {
        var nwTop = left ? node.right : node.left;
        if (left) {
            node.right = nwTop.left;
            nwTop.left = node;
            nwTop.color = nwTop.left.color;
            nwTop.left.color = RBColor.RED;
            nwTop.size = node.size;
        }
        else {
            node.left = nwTop.right;
            nwTop.right = node;
            nwTop.color = nwTop.right.color;
            nwTop.right.color = RBColor.RED;
            nwTop.size = node.size;
        }
        node.size = this.childSize(node) + 1;
        return nwTop;
    };
    TreeSet.prototype.flipColors = function (node) {
        this.flipColor(node);
        if (node.left != null)
            this.flipColor(node.left);
        if (node.right != null)
            this.flipColor(node.right);
    };
    TreeSet.prototype.flipColor = function (node) {
        switch (node.color) {
            case RBColor.BLACK: node.color = RBColor.RED;
            case RBColor.RED: node.color = RBColor.BLACK;
        }
    };
    TreeSet.prototype.redToLeft = function (node) {
        this.flipColors(node);
        if (this.isRed(node.right.left)) {
            node.right = this.rightRot(node.right);
            node = this.leftRot(node);
            this.flipColors(node);
        }
        return node;
    };
    TreeSet.prototype.redToRight = function (node) {
        this.flipColors(node);
        if (this.isRed(node.left.left)) {
            node = this.rightRot(node.right);
            this.flipColors(node);
        }
        return node;
    };
    TreeSet.prototype.balance = function (node) {
        if (this.isRed(node.right))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.childSize(node) + 1;
        return node;
    };
    TreeSet.prototype.iterator = function () {
        var itterator = [];
        this.iteratorAt(this.root, itterator);
        return itterator;
    };
    TreeSet.prototype.iteratorAt = function (node, array) {
        if (node == null)
            return;
        array.push(node.key);
        this.iteratorAt(node.left, array);
        this.iteratorAt(node.right, array);
    };
    TreeSet.prototype.remove = function (item) {
        if (!this.contains(item))
            return false;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.removeAt(this.root, item);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.removeAt = function (node, key) {
        if (this.compare(key, node.key) < 0) {
            if (!this.isRed(node.left) && !this.isRed(node.left.left))
                node = this.redToLeft(node);
            node.left = this.removeAt(node.left, key);
        }
        else {
            if (this.isRed(node.left))
                node = this.rightRot(node);
            if (this.compare(key, node.key) == 0 && (node.right == null))
                return null;
            if (!this.isRed(node.right) && !this.isRed(node.right.left))
                node = this.redToRight(node);
            if (this.compare(key, node.key) == 0) {
                var nwNode = this.minAt(node.right);
                node.key = nwNode.key;
                node.right = this.deleteMinAt(node.right);
            }
            else
                node.right = this.removeAt(node.right, key);
        }
        return this.balance(node);
    };
    TreeSet.prototype.min = function () {
        if (this.isEmpty())
            return null;
        return this.minAt(this.root).key;
    };
    TreeSet.prototype.minAt = function (node) {
        if (node.left == null)
            return node;
        else
            return this.minAt(node.left);
    };
    TreeSet.prototype.max = function () {
        if (this.isEmpty())
            return null;
        return this.maxAt(this.root).key;
    };
    TreeSet.prototype.maxAt = function (node) {
        if (node.right == null)
            return node;
        else
            return this.minAt(node.right);
    };
    TreeSet.prototype.deleteMin = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMinAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.deleteMinAt = function (node) {
        if (node.left == null)
            return null;
        if (!this.isRed(node.left) && !this.isRed(node.left.left))
            node = this.redToLeft(node);
        node.left = this.deleteMinAt(node.left);
        return this.balance(node);
    };
    TreeSet.prototype.deleteMax = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMaxAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.deleteMaxAt = function (node) {
        if (this.isRed(node.left))
            node = this.rightRot(node);
        if (node.right == null)
            return null;
        if (!this.isRed(node.right) && !this.isRed(node.right.left))
            node = this.redToRight(node);
        node.right = this.deleteMaxAt(node.right);
        return this.balance(node);
    };
    TreeSet.prototype.floor = function (item) {
        if (this.isEmpty)
            return null;
        var retNode = this.floorAt(this.root, item);
        return (retNode == null) ? null : retNode.key;
    };
    TreeSet.prototype.floorAt = function (node, item) {
        if (node == null)
            return null;
        var comp = this.compare(item, node.key);
        if (comp == 0)
            return node;
        if (comp < 0)
            return this.floorAt(node.left, item);
        var retNode = this.floorAt(node.right, item);
        return (retNode == null) ? null : retNode;
    };
    TreeSet.prototype.ceil = function (item) {
        if (this.isEmpty)
            return null;
        var retNode = this.ceilAt(this.root, item);
        return (retNode == null) ? null : retNode.key;
    };
    TreeSet.prototype.ceilAt = function (node, item) {
        if (node == null)
            return null;
        var comp = this.compare(item, node.key);
        if (comp == 0)
            return node;
        if (comp > 0)
            return this.floorAt(node.right, item);
        var retNode = this.floorAt(node.left, item);
        return (retNode == null) ? null : retNode;
    };
    return TreeSet;
})(Comparable);
var RBNode = (function (_super) {
    __extends(RBNode, _super);
    function RBNode(key, value, color, size) {
        _super.call(this, key, color, size);
        this.value = value;
    }
    return RBNode;
})(RBItemNode);
var TreeMap = (function (_super) {
    __extends(TreeMap, _super);
    function TreeMap(comp) {
        _super.call(this, comp);
    }
    TreeMap.prototype.clear = function () {
        this.root = null;
    };
    TreeMap.prototype.isEqual = function (that) {
        if (this.size() != that.size())
            return false;
        var ittr1 = this.itterator();
        var ittr2 = that.itterator();
        for (var i = 0; i < ittr1.length; i++) {
            if (ittr1[i][0] != ittr2[i][0] || ittr1[i][1] != ittr2[i][1])
                return false;
        }
        return true;
    };
    TreeMap.prototype.size = function () {
        if (this.root != null)
            return this.sizeAt(this.root);
        return 0;
    };
    TreeMap.prototype.sizeAt = function (node) {
        if (node == null)
            return 0;
        return node.size;
    };
    TreeMap.prototype.childSize = function (node) {
        return this.sizeAt(node.left) + this.sizeAt(node.right);
    };
    TreeMap.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    TreeMap.prototype.isRed = function (node) {
        if (node == null)
            return false;
        return node.color == RBColor.RED;
    };
    TreeMap.prototype.apply = function (key) {
        return this.applyAt(this.root, key);
    };
    TreeMap.prototype.applyAt = function (node, key) {
        if (node == null)
            return null;
        else {
            var comp = this.compare(key, node.key);
            if (comp < 0)
                return this.applyAt(node.left, key);
            else if (comp > 0)
                return this.applyAt(node.right, key);
            return node.value;
        }
    };
    TreeMap.prototype.contains = function (key) {
        return this.apply(key) != null;
    };
    TreeMap.prototype.put = function (key, val) {
        this.root = this.putAt(this.root, key, val);
        this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.putAt = function (node, key, value) {
        if (node == null)
            return new RBNode(key, value, RBColor.RED, 1);
        var comp = this.compare(key, node.key);
        if (comp < 0)
            node.left = this.putAt(node.left, key, value);
        else if (comp > 0)
            node.right = this.putAt(node.right, key, value);
        else
            node.value = value;
        if (this.isRed(node.right) && !this.isRed(node.left))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.sizeAt(node.left) + this.sizeAt(node.right) + 1;
        return node;
    };
    TreeMap.prototype.rightRot = function (node) {
        return this.rotate(node, false);
    };
    TreeMap.prototype.leftRot = function (node) {
        return this.rotate(node, true);
    };
    TreeMap.prototype.rotate = function (node, left) {
        var nwTop = left ? node.right : node.left;
        if (left) {
            node.right = nwTop.left;
            nwTop.left = node;
            nwTop.color = nwTop.left.color;
            nwTop.left.color = RBColor.RED;
            nwTop.size = node.size;
        }
        else {
            node.left = nwTop.right;
            nwTop.right = node;
            nwTop.color = nwTop.right.color;
            nwTop.right.color = RBColor.RED;
            nwTop.size = node.size;
        }
        node.size = this.childSize(node) + 1;
        return nwTop;
    };
    TreeMap.prototype.flipColors = function (node) {
        this.flipColor(node);
        if (node.left != null)
            this.flipColor(node.left);
        if (node.right != null)
            this.flipColor(node.right);
    };
    TreeMap.prototype.flipColor = function (node) {
        switch (node.color) {
            case RBColor.BLACK: node.color = RBColor.RED;
            case RBColor.RED: node.color = RBColor.BLACK;
        }
    };
    TreeMap.prototype.redToLeft = function (node) {
        this.flipColors(node);
        if (this.isRed(node.right.left)) {
            node.right = this.rightRot(node.right);
            node = this.leftRot(node);
            this.flipColors(node);
        }
        return node;
    };
    TreeMap.prototype.redToRight = function (node) {
        this.flipColors(node);
        if (this.isRed(node.left.left)) {
            node = this.rightRot(node.right);
            this.flipColors(node);
        }
        return node;
    };
    TreeMap.prototype.balance = function (node) {
        if (this.isRed(node.right))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.childSize(node) + 1;
        return node;
    };
    TreeMap.prototype.itterator = function () {
        var itterator = [];
        this.itteratorAt(this.root, itterator);
        return itterator;
    };
    TreeMap.prototype.itteratorAt = function (node, itterator) {
        if (node == null)
            return;
        itterator.push([node.key, node.value]);
        this.itteratorAt(node.left, itterator);
        this.itteratorAt(node.right, itterator);
    };
    TreeMap.prototype.keys = function () {
        var itterator = [];
        this.keysAt(this.root, itterator);
        return itterator;
    };
    TreeMap.prototype.keysAt = function (node, array) {
        if (node == null)
            return;
        array.push(node.key);
        this.keysAt(node.left, array);
        this.keysAt(node.right, array);
    };
    TreeMap.prototype.values = function () {
        var itterator = [];
        this.valuesAt(this.root, itterator);
        return itterator;
    };
    TreeMap.prototype.valuesAt = function (node, array) {
        if (node == null)
            return;
        array.push(node.value);
        this.valuesAt(node.left, array);
        this.valuesAt(node.right, array);
    };
    TreeMap.prototype.remove = function (key) {
        if (!this.contains(key))
            return false;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.removeAt(this.root, key);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.removeAt = function (node, key) {
        if (this.compare(key, node.key) < 0) {
            if (!this.isRed(node.left) && !this.isRed(node.left.left))
                node = this.redToLeft(node);
            node.left = this.removeAt(node.left, key);
        }
        else {
            if (this.isRed(node.left))
                node = this.rightRot(node);
            if (this.compare(key, node.key) == 0 && (node.right == null))
                return null;
            if (!this.isRed(node.right) && !this.isRed(node.right.left))
                node = this.redToRight(node);
            if (this.compare(key, node.key) == 0) {
                var nwNode = this.minAt(node.right);
                node.key = nwNode.key;
                node.value = nwNode.value;
                node.right = this.deleteMinAt(node.right);
            }
            else
                node.right = this.removeAt(node.right, key);
        }
        return this.balance(node);
    };
    TreeMap.prototype.min = function () {
        if (this.isEmpty())
            return null;
        return this.minAt(this.root).key;
    };
    TreeMap.prototype.minAt = function (node) {
        if (node.left == null)
            return node;
        else
            return this.minAt(node.left);
    };
    TreeMap.prototype.max = function () {
        if (this.isEmpty())
            return null;
        return this.maxAt(this.root).key;
    };
    TreeMap.prototype.maxAt = function (node) {
        if (node.right == null)
            return node;
        else
            return this.minAt(node.right);
    };
    TreeMap.prototype.deleteMin = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMinAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.deleteMinAt = function (node) {
        if (node.left == null)
            return null;
        if (!this.isRed(node.left) && !this.isRed(node.left.left))
            node = this.redToLeft(node);
        node.left = this.deleteMinAt(node.left);
        return this.balance(node);
    };
    TreeMap.prototype.deleteMax = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMaxAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.deleteMaxAt = function (node) {
        if (this.isRed(node.left))
            node = this.rightRot(node);
        if (node.right == null)
            return null;
        if (!this.isRed(node.right) && !this.isRed(node.right.left))
            node = this.redToRight(node);
        node.right = this.deleteMaxAt(node.right);
        return this.balance(node);
    };
    TreeMap.prototype.floor = function (key) {
        if (this.isEmpty)
            return null;
        var retNode = this.floorAt(this.root, key);
        return (retNode == null) ? null : retNode.key;
    };
    TreeMap.prototype.floorAt = function (node, key) {
        if (node == null)
            return null;
        var comp = this.compare(key, node.key);
        if (comp == 0)
            return node;
        if (comp < 0)
            return this.floorAt(node.left, key);
        var retNode = this.floorAt(node.right, key);
        return (retNode == null) ? null : retNode;
    };
    TreeMap.prototype.ceil = function (key) {
        if (this.isEmpty)
            return null;
        var retNode = this.ceilAt(this.root, key);
        return (retNode == null) ? null : retNode.key;
    };
    TreeMap.prototype.ceilAt = function (node, key) {
        if (node == null)
            return null;
        var comp = this.compare(key, node.key);
        if (comp == 0)
            return node;
        if (comp > 0)
            return this.floorAt(node.right, key);
        var retNode = this.floorAt(node.left, key);
        return (retNode == null) ? null : retNode;
    };
    return TreeMap;
})(Comparable);
var DeepTreeMap = (function () {
    function DeepTreeMap(compare) {
        this.map = new TreeMap(compare);
    }
    DeepTreeMap.prototype.put = function (key, value) {
        if (!this.contains(key))
            this.map.put(key, new Bag());
        this.map.apply(key).insert(value);
    };
    DeepTreeMap.prototype.putAll = function (key) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        if (!this.contains(key))
            this.map.put(key, new Bag());
        this.map.apply(key).insertArray(value);
    };
    DeepTreeMap.prototype.putArray = function (key, value) {
        if (!this.contains(key))
            this.map.put(key, new Bag());
        this.map.apply(key).insertArray(value);
    };
    DeepTreeMap.prototype.itterator = function (key) {
        var val = this.map.apply(key);
        if (val != null)
            return val.iterator();
        else
            return [];
    };
    DeepTreeMap.prototype.clear = function () {
        this.map.clear();
    };
    DeepTreeMap.prototype.isEqual = function (that) {
        return this.map.isEqual(that.map);
    };
    DeepTreeMap.prototype.size = function (key) {
        if (typeof key == "undefined")
            return this.map.size();
        else
            return this.map.apply(key).size();
    };
    DeepTreeMap.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    DeepTreeMap.prototype.apply = function (key) {
        return this.map.apply(key);
    };
    DeepTreeMap.prototype.contains = function (key) {
        return this.apply(key) != null;
    };
    DeepTreeMap.prototype.remove = function (key) {
        return this.map.remove(key);
    };
    return DeepTreeMap;
})();
var List = (function () {
    function List() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        if (typeof items != 'undefined' && items.length > 0)
            this.data = items;
        else
            this.data = [];
    }
    List.prototype.filter = function (call) {
        var nw = this.clone();
        var ittr = this.iterator();
        var list = this.empty();
        for (var a = 0; a < this.size(); a++) {
            if (call(ittr[a], a, ittr))
                list.data.push(ittr[a]);
        }
        return list;
    };
    List.prototype.map = function (call) {
        var nw = this.clone();
        var ittr = this.iterator();
        var list = new List();
        for (var a = 0; a < this.size(); a++) {
            list.data.push(call(list[a], a, ittr));
        }
        return list;
    };
    List.prototype.empty = function () {
        return new List();
    };
    List.prototype.foreach = function (call) {
        this.data.forEach(call);
    };
    List.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    List.prototype.size = function () {
        return this.data.length;
    };
    List.prototype.iterator = function () {
        return this.data.slice();
    };
    List.prototype.toArray = function () {
        return this.data;
    };
    List.prototype.join = function (data) {
        this.data = this.toArray().concat(data.toArray());
    };
    List.prototype.apply = function (index) {
        return this.data[index];
    };
    List.prototype.clone = function () {
        var arr = this.iterator();
        var l = new List();
        l.data = arr;
        return l;
    };
    List.prototype.isEqual = function (that) {
        if (this.size() != that.size())
            return false;
        for (var i = 0; i < this.size(); i++) {
            if (this.data[i] != that.data[i])
                return false;
        }
        return true;
    };
    List.prototype.exch = function (index, index2) {
        var old = this.data[index];
        var old2 = this.data[index2];
        this.data[index] = old2;
        this.data[index2] = old;
    };
    List.exch = function (data, index, index2) {
        var old = data[index];
        var old2 = data[index2];
        data[index] = old2;
        data[index2] = old;
    };
    return List;
})();
var Bag = (function (_super) {
    __extends(Bag, _super);
    function Bag() {
        _super.apply(this, arguments);
    }
    Bag.prototype.insert = function (item) {
        this.data.push(item);
    };
    Bag.prototype.insertAll = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Bag.prototype.insertArray = function (items) {
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Bag.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Bag();
        l.data = arr;
        return l;
    };
    Bag.prototype.empty = function () {
        return new Bag();
    };
    Bag.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    Bag.prototype.clear = function () {
        this.data = [];
    };
    return Bag;
})(List);
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList() {
        _super.apply(this, arguments);
    }
    MutableList.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index >= 0)
            this.removeAt(index);
        return index;
    };
    MutableList.prototype.removeAt = function (index) {
        return this.data.splice(index, 1)[0];
    };
    MutableList.prototype.replace = function (index, number, item) {
        this.data[index] = item;
    };
    MutableList.prototype.indexOf = function (item) {
        return this.data.indexOf(item);
    };
    MutableList.prototype.contains = function (item) {
        return this.indexOf(item) >= 0;
    };
    MutableList.prototype.clear = function () {
        this.data = [];
    };
    MutableList.prototype.clone = function () {
        var arr = this.iterator();
        var l = new MutableList();
        l.data = arr;
        return l;
    };
    MutableList.prototype.empty = function () {
        return new MutableList();
    };
    MutableList.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return MutableList;
})(Bag);
var Queue = (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        _super.apply(this, arguments);
        this.low = 0;
    }
    Queue.prototype.size = function () {
        return _super.prototype.size.call(this) - this.low;
    };
    Queue.prototype.enqueue = function (item) {
        this.data.push(item);
    };
    Queue.prototype.dequeue = function () {
        var sample = this.sample();
        delete this.data[this.low];
        this.low++;
        if (this.data.length >= 16 && this.low >= this.size() * 2) {
            this.toArray();
        }
        return sample;
    };
    Queue.prototype.sample = function () {
        return this.apply(this.low);
    };
    Queue.prototype.toArray = function () {
        this.data = this.data.slice(this.low, this.data.length);
        this.low = 0;
        return this.data;
    };
    Queue.prototype.iterator = function () {
        return this.data.slice(this.low, this.data.length);
    };
    Queue.prototype.clear = function () {
        this.data = [];
    };
    Queue.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Queue();
        l.data = arr;
        l.low = this.low;
        return l;
    };
    Queue.prototype.empty = function () {
        return new Queue();
    };
    Queue.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return Queue;
})(List);
var Stack = (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        _super.apply(this, arguments);
    }
    Stack.prototype.push = function (item) {
        this.data.push(item);
    };
    Stack.prototype.pop = function () {
        return this.data.pop();
    };
    Stack.prototype.sample = function () {
        return this.data[this.size() - 1];
    };
    Stack.prototype.clear = function () {
        this.data = [];
    };
    Stack.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Stack();
        l.data = arr;
        return l;
    };
    Stack.prototype.empty = function () {
        return new Stack();
    };
    Stack.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return Stack;
})(List);
var ComparableList = (function (_super) {
    __extends(ComparableList, _super);
    function ComparableList(compare) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        _super.call(this);
        if (typeof items != 'undefined')
            this.data = items;
        this.compare = compare;
    }
    ComparableList.prototype.sort = function () {
        return this.iterator().sort(this.compare);
    };
    ComparableList.prototype.empty = function () {
        return new ComparableList(this.compare);
    };
    ComparableList.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    ComparableList.prototype.less = function (index, index2) {
        return this.compare(this.data[index], this.data[index2]) < 0;
    };
    ComparableList.prototype.more = function (index, index2) {
        return this.compare(this.data[index], this.data[index2]) > 0;
    };
    ComparableList.prototype.equal = function (index, index2) {
        return this.compare(this.data[index], this.data[index2]) == 0;
    };
    ComparableList.less = function (data, compare, index, index2) {
        return compare(data[index], data[index2]) < 0;
    };
    ComparableList.more = function (data, compare, index, index2) {
        return compare(data[index], data[index2]) > 0;
    };
    ComparableList.equal = function (data, compare, index, index2) {
        return compare(data[index], data[index2]) == 0;
    };
    return ComparableList;
})(List);
var Heap = (function (_super) {
    __extends(Heap, _super);
    function Heap(compare, max) {
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        this.isMaxList = max;
        if (!max) {
            var oldComp = compare;
            compare = function (a, b) {
                return oldComp(b, a);
            };
        }
        _super.call(this, compare);
        if (typeof items != 'undefined')
            this.data = Heap.heapefy(items.slice(), compare, true);
        else
            this.data = [];
    }
    Heap.prototype.insertAll = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Heap.prototype.insertArray = function (items) {
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Heap.prototype.insert = function (item) {
        this.data.push(item);
        this.swim(this.size() - 1);
    };
    Heap.prototype.clear = function () {
        this.data = [];
    };
    Heap.prototype.empty = function () {
        return new Heap(this.compare, this.isMaxList);
    };
    Heap.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    Heap.prototype.pop = function () {
        this.exch(0, this.size() - 1);
        var item = this.data.pop();
        this.sink(0);
        return item;
    };
    Heap.prototype.sample = function () {
        return this.data[0];
    };
    Heap.prototype.join = function (collection) {
        this.insertArray(collection.toArray());
    };
    Heap.prototype.sort = function () {
        return Heap.sort(this.iterator(), this.compare, true, true);
    };
    Heap.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Heap(this.compare, this.isMaxList);
        l.data = arr;
        return l;
    };
    Heap.sort = function (arr, compare, max, isHeap) {
        if (!max) {
            var oldComp = compare;
            compare = function (a, b) {
                return oldComp(b, a);
            };
        }
        if (typeof isHeap == 'undefined' || !isHeap)
            Heap.heapefy(arr, compare, true);
        var size = arr.length;
        while (size > 0) {
            List.exch(arr, 0, size - 1);
            Heap.sink(arr, compare, 0, --size);
        }
        return arr;
    };
    Heap.heapefy = function (arr, compare, max) {
        if (!max) {
            var oldComp = compare;
            compare = function (a, b) {
                return oldComp(b, a);
            };
        }
        var size = arr.length;
        for (var i = Math.ceil(size / 2); i >= 0; i--) {
            Heap.sink(arr, compare, i, size);
        }
        return arr;
    };
    Heap.prototype.swim = function (index) {
        var parent = Math.floor((index - 1) / 2);
        while (index > 0 && this.less(parent, index)) {
            this.exch(index, parent);
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    };
    Heap.prototype.sink = function (index) {
        var child = index * 2 + 1;
        while (child < this.size()) {
            if (child < this.size() - 1 && this.less(child, child + 1))
                child++;
            if (this.less(index, child)) {
                this.exch(index, child);
                index = child;
                child = index * 2 + 1;
            }
            else
                break;
        }
    };
    Heap.sink = function (arr, compare, index, size) {
        var child = index * 2 + 1;
        while (child < size) {
            if (child < size - 1 && ComparableList.less(arr, compare, child, child + 1))
                child++;
            if (ComparableList.less(arr, compare, index, child)) {
                List.exch(arr, index, child);
                index = child;
                child = index * 2 + 1;
            }
            else
                break;
        }
    };
    return Heap;
})(ComparableList);
var PriorityQueue = (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue() {
        _super.apply(this, arguments);
    }
    PriorityQueue.prototype.dequeue = function () {
        return this.pop();
    };
    PriorityQueue.prototype.clone = function () {
        var arr = this.iterator();
        var l = new PriorityQueue(this.compare, this.isMaxList);
        l.data = arr;
        return l;
    };
    PriorityQueue.prototype.empty = function () {
        return new PriorityQueue(this.compare, this.isMaxList);
    };
    PriorityQueue.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return PriorityQueue;
})(Heap);
//# sourceMappingURL=data.js.map
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
/**
 * Mouse helper functions
 */
//context disable add
var Mouse;
(function (Mouse) {
    var pressCalls = new DeepTreeMap(NUMBER_COMPARE);
    var releaseCalls = new DeepTreeMap(NUMBER_COMPARE);
    var browserControl = true;
    /**
     * Button code
     */
    Mouse.LEFT = 0, Mouse.RIGHT = 1, Mouse.MIDDLE = 2;
    var mouseX;
    var mouseY;
    var buttons = [];
    /**
     * Enable the default listners, is needed for a lot of other Mouse functionality
     */
    function enable() {
        document.body.onmouseup = mouseUp;
        document.body.onmousedown = mouseDown;
        document.onmousemove = mouseMoved;
    }
    Mouse.enable = enable;
    /**
     * Register custom mouse moved listners
     *
     * @param mouseMoved move moved listner, will be triggerd when the mouse position has changed
     */
    function customListenPos(mouseMoved) {
        document.onmousemove = mouseMoved;
    }
    Mouse.customListenPos = customListenPos;
    /**
     * Register custom button listners
     *
     * Note that you can also register them with addPressedEvent and addReleasedEvent,
     * listners registerd by those will be triggerd by the default button listner. Specific keys
     * for those events can be specified.
     *
     * @param mouseDown mouse button down listner, will be triggered when a button is pressed (will be fired
     * repeadidly until released [in contrast to listners registerd with addPressedEvent])
     * @param mouseUp mouse button up listner, will be triggerd when a button is released (firied once)
     */
    function customListen(mouseDown, mouseUp) {
        document.body.onmouseup = mouseUp;
        document.body.onmousedown = mouseDown;
    }
    Mouse.customListen = customListen;
    function mouseMoved(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    function mouseUp(event) {
        var button = event.button;
        setButton(button, false);
        triggerButtons(releaseCalls, button, event);
    }
    function mouseDown(event) {
        var button = event.button;
        if (!isDown(button)) {
            triggerButtons(pressCalls, button, event);
        }
        setButton(button, true);
    }
    function setButton(button, value) {
        buttons[button] = value;
    }
    /**
     * Hide the mouse cursor
     */
    function hide() {
        document.body.style.cursor = "none";
    }
    Mouse.hide = hide;
    /**
     * Show the mouse cursor
     */
    function show() {
        document.body.style.cursor = "auto";
    }
    Mouse.show = show;
    /**
     * Get the current x position of the mouse
     */
    function getX(view) {
        return view.mapX(mouseX, true);
    }
    Mouse.getX = getX;
    /**
     * Get the current y position of the mouse
     */
    function getY(view) {
        return view.mapY(mouseY, true);
    }
    Mouse.getY = getY;
    /**
     * Get the current x position of the mouse in pixels (entire browser screen, not the canvas)
     */
    function getScreenX() {
        return mouseX;
    }
    Mouse.getScreenX = getScreenX;
    /**
     * Get the current y position of the mouse in pixels (entire browser screen, not the canvas)
     */
    function getScreenY() {
        return mouseY;
    }
    Mouse.getScreenY = getScreenY;
    /**
     * Check if a button is currently pressed
     *
     * @param button button code
     */
    function isDown(button) {
        return buttons[button];
    }
    Mouse.isDown = isDown;
    /**
     * Set availability of all default button controlls in the browser
     *
     * @param allow whather or not the browser key controlls will be triggered
     */
    function browserControll(allow) {
        browserControl = allow;
    }
    Mouse.browserControll = browserControll;
    function triggerButtons(collection, button, event) {
        if (collection.contains(button)) {
            var calls = collection.itterator(button);
            for (var _i = 0; _i < calls.length; _i++) {
                var call = calls[_i];
                call(event);
            }
        }
        var calls2 = collection.itterator(-1);
        for (var _a = 0; _a < calls2.length; _a++) {
            var call = calls2[_a];
            call(event);
        }
    }
    /**
     * Add an event for when a button is released
     *
     * @param callback callback triggered when a button is released
     * @param keys the buttons that will trigger the callback, no buttons means any button will be a trigger
     */
    function addReleasedEvent(callback) {
        var buttons = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            buttons[_i - 1] = arguments[_i];
        }
        addEvent(releaseCalls, callback, buttons);
    }
    Mouse.addReleasedEvent = addReleasedEvent;
    /**
     * Add an event for when a button is pressed (will only fire once when the key is pressed)
     *
     * @param callback callback triggered when a button is pressed
     * @param keys the buttons that will trigger the callback, no buttons means any button will be a trigger
     */
    function addPressedEvent(callback) {
        var buttons = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            buttons[_i - 1] = arguments[_i];
        }
        addEvent(pressCalls, callback, buttons);
    }
    Mouse.addPressedEvent = addPressedEvent;
    function addEvent(collection, callback, buttons) {
        if (buttons.length == 0)
            collection.put(-1, callback);
        else
            for (var _i = 0; _i < buttons.length; _i++) {
                var button = buttons[_i];
                collection.put(button, callback);
            }
    }
})(Mouse || (Mouse = {}));
/**
 * Keyboard helper functions
 */
var Keyboard;
(function (Keyboard) {
    var keys = [];
    var pressCalls = new DeepTreeMap(NUMBER_COMPARE);
    var releaseCalls = new DeepTreeMap(NUMBER_COMPARE);
    var browserControl = true;
    /**
     * ASCII key code
     */
    Keyboard.KEY_BACKSPACE = 8, Keyboard.KEY_TAB = 9, Keyboard.KEY_ENTER = 13, Keyboard.KEY_SHIFT = 16, Keyboard.KEY_CTRL = 17, Keyboard.KEY_ALT = 18, Keyboard.KEY_BREAK = 19, Keyboard.KEY_CAPS_LOCK = 20, Keyboard.KEY_ESCAPE = 27, Keyboard.KEY_SPACE = 32, Keyboard.KEY_PAGE_UP = 33, Keyboard.KEY_PAGE_DOWN = 34, Keyboard.KEY_END = 35, Keyboard.KEY_HOME = 36, Keyboard.KEY_LEFT = 37, Keyboard.KEY_UP = 38, Keyboard.KEY_RIGHT = 39, Keyboard.KEY_DOWN = 40, Keyboard.KEY_INSERT = 45, Keyboard.KEY_DELETE = 46, Keyboard.KEY_0 = 48, Keyboard.KEY_1 = 49, Keyboard.KEY_2 = 50, Keyboard.KEY_3 = 51, Keyboard.KEY_4 = 52, Keyboard.KEY_5 = 53, Keyboard.KEY_6 = 54, Keyboard.KEY_7 = 55, Keyboard.KEY_8 = 56, Keyboard.KEY_9 = 57, Keyboard.KEY_A = 65, Keyboard.KEY_B = 66, Keyboard.KEY_C = 67, Keyboard.KEY_D = 68, Keyboard.KEY_E = 69, Keyboard.KEY_F = 70, Keyboard.KEY_G = 71, Keyboard.KEY_H = 72, Keyboard.KEY_I = 73, Keyboard.KEY_J = 74, Keyboard.KEY_K = 75, Keyboard.KEY_L = 76, Keyboard.KEY_M = 77, Keyboard.KEY_N = 78, Keyboard.KEY_O = 79, Keyboard.KEY_P = 80, Keyboard.KEY_Q = 81, Keyboard.KEY_R = 82, Keyboard.KEY_S = 83, Keyboard.KEY_T = 84, Keyboard.KEY_U = 85, Keyboard.KEY_V = 86, Keyboard.KEY_W = 87, Keyboard.KEY_X = 88, Keyboard.KEY_Y = 89, Keyboard.KEY_Z = 90, Keyboard.KEY_WINDOWS_LEFT = 91, Keyboard.KEY_WINDOWS_RIGHT = 92, Keyboard.KEY_SELECT = 93, Keyboard.KEY_NUMPAD_0 = 96, Keyboard.KEY_NUMPAD_1 = 97, Keyboard.KEY_NUMPAD_2 = 98, Keyboard.KEY_NUMPAD_3 = 99, Keyboard.KEY_NUMPAD_4 = 100, Keyboard.KEY_NUMPAD_5 = 101, Keyboard.KEY_NUMPAD_6 = 102, Keyboard.KEY_NUMPAD_7 = 103, Keyboard.KEY_NUMPAD_8 = 104, Keyboard.KEY_NUMPAD_9 = 105, Keyboard.KEY_MULTIPLY = 106, Keyboard.KEY_ADD = 107, Keyboard.KEY_SUBSTRACT = 108, Keyboard.KEY_POINT = 109, Keyboard.KEY_DECIMAL_POINT = 110, Keyboard.DEVIDE = 111, Keyboard.KEY_F1 = 112, Keyboard.KEY_F2 = 113, Keyboard.KEY_F3 = 114, Keyboard.KEY_F4 = 115, Keyboard.KEY_F5 = 116, Keyboard.KEY_F6 = 117, Keyboard.KEY_F7 = 118, Keyboard.KEY_F8 = 119, Keyboard.KEY_F9 = 120, Keyboard.KEY_F10 = 121, Keyboard.KEY_F11 = 122, Keyboard.KEY_F12 = 123, Keyboard.KEY_NUM_LOCK = 144, Keyboard.KEY_SCROLL_LOCK = 145, Keyboard.KEY_SEMI_COLON = 186, Keyboard.KEY_EQUAL_SIGN = 187, Keyboard.KEY_COMMA = 188, Keyboard.KEY_DASH = 189, Keyboard.KEY_PERIOD = 190, Keyboard.KEY_SLASH_FORWARD = 191, Keyboard.KEY_GRAVE_ACCENT = 192, Keyboard.KEY_BRACKET_OPEN = 219, Keyboard.KEY_SLASH_BACK = 220, Keyboard.KEY_BRACKET_CLOSE = 221, Keyboard.KEY_QUOTE_SINGLE = 222;
    /**
     * Register custom key listners
     *
     * Note that you can also register them with addPressedEvent and addReleasedEvent,
     * listners registerd by those will be triggerd by the default key listner. Specific keys
     * for those events can be specified.
     *
     * @param keyDown key down listner, will be triggered when a key is pressed (will be fired
     * repeadidly until released [in contract to listners registerd with addPressedEvent])
     * @param keyUp key up listner, will be triggerd when a key is released (firied once)
     */
    function customListen(keyDown, keyUp) {
        document.onkeydown = keyDown;
        document.onkeyup = keyUp;
    }
    Keyboard.customListen = customListen;
    /**
     * Set availability of all default key controlls in the browser (e.g. backspace trigger back)
     *
     * @param allow whather or not the browser key controlls will be triggered
     */
    function browserControll(allow) {
        browserControl = allow;
    }
    Keyboard.browserControll = browserControll;
    /**
     * Enable the default key listners, is needed for use of every other Keyboard functionality
     */
    function enable() {
        customListen(keyDown, keyUp);
    }
    Keyboard.enable = enable;
    function keyDown(event) {
        var key = event.keyCode;
        if (!isDown(key)) {
            triggerKeys(pressCalls, key, event);
        }
        setKey(key, true);
        return browserControl;
    }
    function keyUp(event) {
        var key = event.keyCode;
        setKey(key, false);
        triggerKeys(releaseCalls, key, event);
    }
    function triggerKeys(collection, key, event) {
        if (collection.contains(key)) {
            var calls = collection.itterator(key);
            for (var _i = 0; _i < calls.length; _i++) {
                var call = calls[_i];
                call(event);
            }
        }
        var calls2 = collection.itterator(-1);
        for (var _a = 0; _a < calls2.length; _a++) {
            var call = calls2[_a];
            call(event);
        }
    }
    /**
     * Check if a key is currently pressed
     *
     * @param key ASCII key code of the key
     */
    function isDown(key) {
        return keys[key];
    }
    Keyboard.isDown = isDown;
    function setKey(key, value) {
        keys[key] = value;
    }
    /**
     * Add an event for when a key is released
     *
     * @param callback callback triggered when a key is released
     * @param keys the keys that will trigger the callback, no keys means any key will be a trigger
     */
    function addReleasedEvent(callback) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        addEvent(releaseCalls, callback, keys);
    }
    Keyboard.addReleasedEvent = addReleasedEvent;
    /**
     * Add an event for when a key is pressed (will only fire once when the key is pressed)
     *
     * @param callback callback triggered when a key is pressed
     * @param keys the keys that will trigger the callback, no keys means any key will be a trigger
     */
    function addPressedEvent(callback) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        addEvent(pressCalls, callback, keys);
    }
    Keyboard.addPressedEvent = addPressedEvent;
    function addEvent(collection, callback, keys) {
        if (keys.length == 0)
            collection.put(-1, callback);
        else
            for (var _i = 0; _i < keys.length; _i++) {
                var key = keys[_i];
                collection.put(key, callback);
            }
    }
})(Keyboard || (Keyboard = {}));
//# sourceMappingURL=input.js.map
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
        !this.audio.paused;
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
var Entity = (function () {
    function Entity() {
    }
    Entity.prototype.getGrix = function () {
        return this.grix;
    };
    Entity.prototype.getX = function () {
        return this.x;
    };
    Entity.prototype.getY = function () {
        return this.y;
    };
    Entity.prototype.update = function () {
    };
    Entity.prototype.render = function () {
        this.grix.moveTo(this.x, this.y);
        this.grix.render();
    };
    return Entity;
})();
//# sourceMappingURL=world.js.map
var gl;
//all textures loaded cheack and only then call render/update stuff (option)
//fullscreen option
//loader at start option
//different shader/projection for hud no view
//mess, redo, also manager system redo
var Plena;
(function (Plena) {
    var renderLp, updateLp;
    var canvas;
    var lastTick;
    var doLog = true;
    var currCol = Color.White.WHITE;
    var view;
    var spriteManager;
    var totalQueue = 0;
    function init(setupFunc, renderLoop, updateLoop, p1, p2, p3, p4, p5) {
        var width, height, x, y;
        if (typeof p3 == 'number') {
            width = p3;
            height = p4;
            x = p1;
            y = p2;
            if (p5)
                currCol = p5;
        }
        else if (typeof p2 == 'number') {
            width = p1;
            height = p2;
            x = window.innerWidth / 2 - width / 2;
            y = window.innerHeight / 2 - height / 2;
            if (p3)
                currCol = p3;
        }
        else {
            width = window.innerWidth;
            height = window.innerHeight;
            x = 0;
            y = 0;
            if (p1)
                currCol = p1;
        }
        canvas = document.createElement('canvas');
        canvas.setAttribute("width", "" + width);
        canvas.setAttribute("height", "" + height);
        canvas.setAttribute("style", "position:fixed; top:" + y + "px; left:" + x + "px");
        document.body.appendChild(canvas);
        Plena.canvasX = x;
        Plena.canvasY = y;
        Plena.width = width;
        Plena.height = height;
        gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
        gl.viewport(0, 0, width, height);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        currCol.clearcolor();
        gl.clear(gl.COLOR_BUFFER_BIT);
        Keyboard.enable();
        Mouse.enable();
        Shader.initBasicShaders();
        spriteManager = createManager();
        spriteManager.addShader(Shader.getShader(Shader.COLOR));
        spriteManager.addShader(Shader.getShader(Shader.TEXTURE));
        renderLp = renderLoop;
        updateLp = updateLoop;
        view = Views.createView();
        lastTick = Date.now();
        setupFunc();
        totalQueue = Assets.getQueue();
        if (totalQueue > 0) {
            log("Started loading assets, total: " + totalQueue);
            Assets.addQueueListner(asssetsLoadStep);
        }
        else
            looper();
    }
    Plena.init = init;
    function asssetsLoadStep(queue) {
        log("Loading Assets... progress " + (totalQueue - queue) + "/" + totalQueue + " assets");
        if (queue == 0) {
            if (Assets.hasError())
                log("Assets loading finished with errors");
            else
                log("Assets loading finished without error");
            lastTick = Date.now();
            looper();
        }
    }
    function log(text) {
        if (doLog)
            console.log(text);
    }
    function resize() {
        if (window.innerWidth != Plena.width || window.innerHeight != Plena.height) {
            gl.canvas.width = window.innerWidth;
            gl.canvas.height = window.innerHeight;
            Plena.width = gl.canvas.width
            Plena.height = gl.canvas.height
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            view = Views.createView();
        }
    }
    Plena.log = log;
    function suppresLog() {
        doLog = false;
    }
    Plena.suppresLog = suppresLog;
    function setColor(col) {
        currCol = col;
        col.clearcolor();
    }
    Plena.setColor = setColor;
    function getCurrCol() {
        return currCol;
    }
    Plena.getCurrCol = getCurrCol;
    function looper() {
        resize();
        gl.clear(gl.COLOR_BUFFER_BIT);
        var tick = Date.now();
        var delta = tick - lastTick;
        lastTick = tick;
        view.view();
        renderLp(delta);
        updateLp(delta);
        spriteManager.render();
        requestAnimationFrame(looper);
    }
    function getDefaultView() {
        return view;
    }
    Plena.getDefaultView = getDefaultView;
    function forceRender() {
        spriteManager.render();
    }
    Plena.forceRender = forceRender;
    function manager() {
        return spriteManager;
    }
    Plena.manager = manager;
    function createManager() {
        return new Manager();
    }
    Plena.createManager = createManager;
    var Manager = (function () {
        function Manager() {
            this.shaders = new TreeMap(STRING_COMPARE);
            this.grixs = new DeepTreeMap(STRING_COMPARE);
        }
        Manager.prototype.hasShader = function (shader) {
            return this.shaders.contains(shader);
        };
        Manager.prototype.addShader = function (shader) {
            this.shaders.put(shader.getId(), shader);
        };
        Manager.prototype.getShader = function (key) {
            return this.shaders.apply(key);
        };
        Manager.prototype.addGrix = function (key, grix) {
            this.grixs.put((typeof key == "string") ? key : key.getId(), grix);
        };
        Manager.prototype.render = function () {
            var ittr = this.shaders.itterator();
            for (var i = 0; i < ittr.length; i++) {
                var entry = ittr[i];
                entry[1].bind();
                var grixs = this.grixs.itterator(entry[0]);
                for (var j = 0; j < grixs.length; j++) {
                    grixs[j].doRenderAll();
                }
            }
        };
        return Manager;
    })();
})(Plena || (Plena = {}));
//# sourceMappingURL=plena.js.map
var Shader = (function () {
    function Shader(id, shaderVars, p2, p3) {
        this.shadVarData = [];
        this.id = id;
        Shader.addShader(this, id);
        var fragmentShader, vertexShader;
        if (typeof p3 == 'undefined') {
            fragmentShader = this.getShader(p2 + "-fs");
            vertexShader = this.getShader(p2 + "-vs");
        }
        else {
            fragmentShader = this.createShader(p3, gl.FRAGMENT_SHADER);
            vertexShader = this.createShader(p2, gl.VERTEX_SHADER);
        }
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program.");
        }
        this.bind();
        this.vertices = gl.getAttribLocation(this.program, "vertexPos");
        this.UVCoords = gl.getAttribLocation(this.program, "vertexUV");
        for (var key in shaderVars) {
            if (shaderVars.hasOwnProperty(key)) {
                this.shadVarData[shaderVars[key]] = gl.getUniformLocation(this.program, key);
            }
        }
        this.matrix = new MatrixHandler(this);
    }
    Shader.prototype.getId = function () {
        return this.id;
    };
    Shader.prototype.getVerticesLoc = function () {
        return this.vertices;
    };
    Shader.prototype.getUVLoc = function () {
        return this.UVCoords;
    };
    Shader.prototype.getMatHandler = function () {
        return this.matrix;
    };
    Shader.prototype.bind = function () {
        gl.useProgram(this.program);
    };
    Shader.prototype.setMatrix4 = function (shadVar, matrix) {
        gl.uniformMatrix4fv(this.shadVarData[shadVar], false, new Float32Array(matrix));
    };
    Shader.prototype.setInt = function (shadVar, num) {
        gl.uniform1i(this.shadVarData[shadVar], num);
    };
    Shader.prototype.setFloat = function (shadVar, num) {
        gl.uniform1f(this.shadVarData[shadVar], num);
    };
    Shader.prototype.setVec2 = function (shadVar, vec2) {
        gl.uniform2f(this.shadVarData[shadVar], vec2[0], vec2[1]);
    };
    Shader.prototype.setVec3 = function (shadVar, vec3) {
        gl.uniform3f(this.shadVarData[shadVar], vec3[0], vec3[1], vec3[2]);
    };
    Shader.prototype.setVec4 = function (shadVar, vec4) {
        gl.uniform4f(this.shadVarData[shadVar], vec4[0], vec4[1], vec4[2], vec4[3]);
    };
    Shader.prototype.createShader = function (data, shaderType) {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, data);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };
    Shader.prototype.getShader = function (id) {
        var shaderScript, theSource, currentChild, shader;
        shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
        theSource = "";
        currentChild = shaderScript.firstChild;
        while (currentChild) {
            if (currentChild.nodeType == currentChild.TEXT_NODE) {
                theSource += currentChild.textContent;
            }
            currentChild = currentChild.nextSibling;
        }
        if (shaderScript.type == "x-shader/x-fragment") {
            return this.createShader(theSource, gl.FRAGMENT_SHADER);
        }
        else if (shaderScript.type == "x-shader/x-vertex") {
            return this.createShader(theSource, gl.VERTEX_SHADER);
        }
        else {
            return null;
        }
    };
    return Shader;
})();
var Shader;
(function (Shader) {
    Shader.COLOR = "plenaColorShader";
    Shader.TEXTURE = "plenaTextureShader";
    var shaders = new TreeMap(STRING_COMPARE);
    function initBasicShaders() {
        createBasicShader(ShaderType.COLOR, Shader.COLOR);
        createBasicShader(ShaderType.TEXTURE, Shader.TEXTURE);
    }
    Shader.initBasicShaders = initBasicShaders;
    function getBasicShaders() {
        return [shaders.apply(Shader.COLOR), shaders.apply(Shader.TEXTURE)];
    }
    Shader.getBasicShaders = getBasicShaders;
    function addShader(shader, id) {
        shaders.put(id, shader);
    }
    Shader.addShader = addShader;
    function getShader(id) {
        return shaders.apply(id);
    }
    Shader.getShader = getShader;
    (function (ShaderType) {
        ShaderType[ShaderType["COLOR"] = 0] = "COLOR";
        ShaderType[ShaderType["TEXTURE"] = 1] = "TEXTURE";
    })(Shader.ShaderType || (Shader.ShaderType = {}));
    var ShaderType = Shader.ShaderType;
    function createBasicShader(type, id) {
        var shad;
        if (type == ShaderType.COLOR) {
            shad = new Shader(id, {
                "projectionMatrix": Shader.Uniforms.PROJECTION_MATRIX,
                "viewMatrix": Shader.Uniforms.VIEW_MATRIX,
                "modelMatrix": Shader.Uniforms.MODEL_MATRIX,
                "color": Shader.Uniforms.COLOR
            }, Shader.Shaders.COLOR_V, Shader.Shaders.COLOR_F);
        }
        else if (type == ShaderType.TEXTURE) {
            shad = new Shader(id, {
                "projectionMatrix": Shader.Uniforms.PROJECTION_MATRIX,
                "viewMatrix": Shader.Uniforms.VIEW_MATRIX,
                "modelMatrix": Shader.Uniforms.MODEL_MATRIX,
                "UVMatrix": Shader.Uniforms.UV_MATRIX,
                "color": Shader.Uniforms.COLOR
            }, Shader.Shaders.TEX_V, Shader.Shaders.TEX_F);
            shad.getMatHandler().setUVMatrix(Matrix.Mat4.identity());
            shad.setVec4(Shader.Uniforms.COLOR, Color.White.white(1).vec());
        }
        else
            return null;
        shad.getMatHandler().setModelMatrix(Matrix.Mat4.identity());
        shad.getMatHandler().setProjectionMatrix(Matrix.Mat4.identity());
        shad.getMatHandler().setViewMatrix(Matrix.Mat4.identity());
        return shad;
    }
    Shader.createBasicShader = createBasicShader;
    var Uniforms;
    (function (Uniforms) {
        Uniforms.PROJECTION_MATRIX = 100, Uniforms.VIEW_MATRIX = 101, Uniforms.MODEL_MATRIX = 102, Uniforms.UV_MATRIX = 103, Uniforms.COLOR = 104;
    })(Uniforms = Shader.Uniforms || (Shader.Uniforms = {}));
    var Shaders;
    (function (Shaders) {
        Shaders.COLOR_F = "\n            precision highp float;\n\n            uniform vec4 color;\n\n            void main(void){\n                gl_FragColor = color;\n            }";
        Shaders.COLOR_V = "\n            precision highp float;\n\n            uniform mat4 modelMatrix;\n            uniform mat4 projectionMatrix;\n            uniform mat4 viewMatrix;\n\n            attribute vec2 vertexPos;\n\n            void main(void){\n                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);\n            }";
        Shaders.TEX_F = "\n            precision highp float;\n\n            varying vec2 UV;\n\n            uniform sampler2D sampler;\n            uniform vec4 color;\n\n            void main(void){\n                gl_FragColor = texture2D(sampler, UV) * color;\n            }";
        Shaders.TEX_V = "\n            precision highp float;\n\n            uniform mat4 modelMatrix;\n            uniform mat4 projectionMatrix;\n            uniform mat4 viewMatrix;\n            uniform mat4 UVMatrix;\n\n            varying vec2 UV;\n\n            attribute vec2 vertexPos;\n            attribute vec2 vertexUV;\n\n            void main(void){\n                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPos, 1, 1);\n                UV = (UVMatrix * vec4(vertexUV, 1, 1)).xy;\n            }";
    })(Shaders = Shader.Shaders || (Shader.Shaders = {}));
})(Shader || (Shader = {}));
var MatrixHandler = (function () {
    function MatrixHandler(shader) {
        this.projMat = Matrix.Mat4.identity();
        this.viewMat = Matrix.Mat4.identity();
        this.shader = shader;
    }
    MatrixHandler.prototype.setProjectionMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.PROJECTION_MATRIX, matrix);
        this.projMat = matrix;
    };
    MatrixHandler.prototype.setModelMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.MODEL_MATRIX, matrix);
    };
    MatrixHandler.prototype.setViewMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.VIEW_MATRIX, matrix);
        this.viewMat = matrix;
    };
    MatrixHandler.prototype.setUVMatrix = function (matrix) {
        this.shader.setMatrix4(Shader.Uniforms.UV_MATRIX, matrix);
    };
    return MatrixHandler;
})();
var Render = (function () {
    function Render() {
        this.attrpBuffs = [];
        this.attrpIds = [];
        this.elementBuff = [];
        this.count = [];
        this.verts = [];
        this.uv = [];
        this.indieces = [];
    }
    Render.prototype.addAttrips = function (attripBuff, id) {
        this.attrpBuffs.push(attripBuff);
        this.attrpIds.push(id);
    };
    Render.prototype.addToEnd = function (elementBuff, count) {
        this.elementBuff.push(elementBuff);
        this.count.push(count);
    };
    Render.prototype.populate = function (shader) {
        if (!this.verts)
            Plena.log("You cannot populate a renderer twice!");
        else {
            this.shader = shader;
            this.addVertexes(this.verts);
            if (this.uv.length > 0)
                this.addUVCoords(this.uv);
            for (var _i = 0, _a = this.indieces; _i < _a.length; _i++) {
                var i = _a[_i];
                this.addIndieces(i);
            }
            delete this.verts;
            delete this.uv;
            delete this.indieces;
        }
    };
    Render.prototype.pushVerts = function (verts) {
        if (!this.verts)
            Plena.log("You cannot add new vertices coords to an already populated renderer!");
        else
            this.verts = this.verts.concat(verts);
    };
    Render.prototype.pushUV = function (uv) {
        if (!this.uv)
            Plena.log("You cannot add new UV coords to an already populated renderer!");
        else
            this.uv = this.uv.concat(uv);
    };
    Render.prototype.pushIndices = function (id, indieces) {
        if (id > this.indieces.length)
            Plena.log("Indiece Id is too high, use: " + this.indieces.length);
        else {
            if (id == this.indieces.length)
                this.indieces.push(indieces);
            else
                this.indieces[id] = this.indieces[id].concat(indieces);
        }
    };
    Render.prototype.addVertexes = function (vertices) {
        var buff = gl.createBuffer();
        var id = this.shader.getVerticesLoc();
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(id, 2, gl.FLOAT, false, 0, 0);
        this.addAttrips(buff, id);
    };
    Render.prototype.addUVCoords = function (coords) {
        var buff = gl.createBuffer();
        var id = this.shader.getUVLoc();
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(id, 2, gl.FLOAT, false, 0, 0);
        this.addAttrips(buff, id);
    };
    Render.prototype.addIndieces = function (indieces) {
        var count = indieces.length;
        var elementBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indieces), gl.STATIC_DRAW);
        this.addToEnd(elementBuff, count);
    };
    Render.prototype.switchBuff = function (id) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
    };
    Render.prototype.draw = function (typ, count) {
        gl.drawArrays(typ, 0, count);
    };
    Render.prototype.drawElements = function (id, typ) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
        gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);
    };
    Render.prototype.drawSomeElements = function (ids, typ) {
        for (var id = 0; id < ids.length; id++) {
            if (ids[id]) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
                gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);
            }
        }
    };
    Render.prototype.start = function () {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }
    };
    Render.prototype.end = function () {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    };
    Render.prototype.drawElementsWithStartEnd = function (typ, id) {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuff[id]);
        gl.drawElements(typ, this.count[id], gl.UNSIGNED_SHORT, 0);
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    };
    Render.prototype.drawWithStartEnd = function (typ, count) {
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.enableVertexAttribArray(this.attrpIds[i]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attrpBuffs[i]);
            gl.vertexAttribPointer(this.attrpIds[i], 2, gl.FLOAT, false, 0, 0);
        }
        gl.drawArrays(typ, 0, count);
        for (var i = 0; i < this.attrpIds.length; i++) {
            gl.disableVertexAttribArray(this.attrpIds[i]);
        }
    };
    return Render;
})();
var Framebuffer = (function () {
    function Framebuffer(sizeX, sizeY, width, height, smooth, repeat) {
        this.frameTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sizeX, sizeY, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, smooth ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST_MIPMAP_NEAREST);
        if (repeat)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        this.frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        this.frameBuffer.width = width;
        this.frameBuffer.height = height;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.frameTexture, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    Framebuffer.prototype.getTexture = function () {
        return this.frameTexture;
    };
    Framebuffer.prototype.startRenderTo = function () {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.frameBuffer.width, this.frameBuffer.height);
    };
    Framebuffer.prototype.stopRenderTo = function () {
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, Plena.width, Plena.height);
    };
    Framebuffer.prototype.bindTexture = function () {
        gl.bindTexture(gl.TEXTURE_2D, this.frameTexture);
    };
    return Framebuffer;
})();
//# sourceMappingURL=graphics.js.map
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
            _this.drawer.pushUV([coord.getXMin(), coord.getYMin(), coord.getXMax(), coord.getYMin(), coord.getXMax(), coord.getYMax(), coord.getXMin(), coord.getYMax()]);
        });
        this.addRect(width, height, x, y);
        return this;
    };
    ImgGrix.prototype.mkEllipse = function (img, radiusX, radiusY, radiusU, radiusV, x, y, u, v, parts) {
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
        this.mode = gl.TRIANGLE_FAN;
        var coords = [x + radiusX, y + radiusY];
        var indicies = [0];
        for (var i = 0; i < parts + 1; i++) {
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
            for (var i = 0; i < parts + 1; i++) {
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
    ImgGrix.prototype.mkCircle = function (img, radius, radiusImg, x, y, u, v, parts) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (u === void 0) { u = 0; }
        if (v === void 0) { v = 0; }
        if (parts === void 0) { parts = 35; }
        return this.mkEllipse(img, radius, radius, radiusImg, radiusImg, x, y, u, v, parts);
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
            var width = coords.getXMax() - coords.getXMin();
            var height = coords.getYMax() - coords.getYMin();
            var mat = [width, 0, 0, 0, 0, height, 0, 0, 0, 0, 1, 0, coords.getXMin(), coords.getYMin(), 0, 1];
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
    ShapeGrix.prototype.ellipse = function (radiusX, radiusY, x, y, index, center, parts) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (index === void 0) { index = 0; }
        if (center === void 0) { center = true; }
        if (parts === void 0) { parts = 35; }
        var coords = center ? [x + radiusX, y + radiusY] : [];
        var indicies = center ? [0] : [];
        if (center)
            this.indiece += 1;
        for (var i = 0; i < parts + 1; i++) {
            var angle = i * ((Math.PI * 2) / parts);
            coords.push(x + radiusX + Math.cos(angle) * radiusX);
            coords.push(y + radiusY + Math.sin(angle) * radiusY);
            indicies.push(i + this.indiece);
        }
        this.drawer.pushVerts(coords);
        this.drawer.pushIndices(index, indicies);
        this.setMaxMin(x - radiusX, x + radiusX, y - radiusX, y + radiusX);
        this.indiece += parts + 1;
        return this;
    };
    ShapeGrix.prototype.circle = function (radius, x, y, index, center, parts) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (index === void 0) { index = 0; }
        if (center === void 0) { center = true; }
        if (parts === void 0) { parts = 35; }
        return this.ellipse(radius, radius, x, y, index, center, parts);
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
    ShapeGrix.prototype.drawOffset = function () {
    };
    ShapeGrix.prototype.createGrixc = function (transform) {
        var child = { transform: transform, color: this.color.vec() };
        return child;
    };
    ShapeGrix.prototype.doRender = function (grixC) {
        var child = grixC;
        this.getShader().setVec4(Shader.Uniforms.COLOR, child.color);
        for (var index in this.drawModes) {
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