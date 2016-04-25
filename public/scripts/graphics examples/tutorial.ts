/*

INTRODUCTION

(some important) Plena modules and their use:

- Plena 
    inital setup and some handy global functions (you don't really need to use this one)
- Assets
    for the loading of everything audio / images (textues, sprites), functions start with load
    furthermore assets can create some assets from nothing (canvases, fontmaps, text images, writable textures), functions start with mk
    There is even some documentation for this module :), you can see it when you type assets and browser to the methods or start typing one.
- Font
    some predefined fonts, for use in the mkFont... and mkText... of assets. It contains stuff such as arial, times new roman etc...
- Mouse 
    Everything related to the mouse, from adding click events to getting its position relative in the world to hiding the mouse and changing its icon 
- Keyboard
    Everyting related to the keyboard, from binding key events to checking wether keys are down to disableing browser controll keys
- Color
    255 of defualt colors in the Color (a class you can access direcly) format. Means you can get the rbg/hex values easily (you can also set an alpha). Color is used in the libray for everything color related
    you can create your own color with new Color(...) or new AColor(...) for colors with a defined alpha value (you won't really use this, since we have textures)
- Views
    To create a new view, views are used for differnt perspectives, such as the UI and 2D view of the world. After making a view you can use it by calling YOUR_VIEW.view(). You can get the perdefined view with Plena.getDefaultView().
    You probebely wont be using this though, I will probebely set up the views, so you don't need to worry about it.
- MMath
    Some math functions I sometimes use (random, logaritems, angles and some more).
- Grix (MOST IMPORTANT ONE)
    (some information about them, not that imporant, but please read, a TL;DR (to long, didn't read) is below with the most important point)

    This contais funcitons to create specific grixes (grix stands for Graphics), and you need those to do all the drawing of stuff
    Actually, these grixes are the second level drawing classes in this library (second is the highest), which means they are the simpelest to use, but have the most restrictions (although are game can completely be build with them)
    There is also collection of classes in this library for first level (btw, I arbetrarely choose to call them levels and gave them numbers when writing this) drawing (which are used by the grixes), which are more powerfull and much harder to use. 
    Finaly there is the lowest level of drawing, which means to direcly use WebGl for the drawing, this is the most powerfull, but also the most complicated, the first level classes use this. 

    To give you a perspecive of how much harder it is to use a new level:

    To draw a walking cat:
        Second level +- 15 lines of code (HEAVEN!)
        First level +- 100 lines of code (Thats OK!)
        Zero level +500 lines of code (HELL!)

    But the second level, which this game will probaliy only use, is already very powerfull, really.

    TL;DR - with this module you can create objects with which you can easily render everthing you want. (you will mostly be useding these classes)

# not a module but you might want to know:
- (Vector/Matrix)X classes (so I mean: Matrix1, Matrix2... Vector1, Vector2...).
    You can create one of those if you want to do some operations with matrixes or vectors, such as making non standard transformations with images (if have got simple funcitons for the standart transforamtions, so you will probabily not use it)
    Those classes are used in other modules of this graphic library to do all the graphical stuff.

And that concluses some of the most important parts of the library which we will use.
There is much more, especially on the graphics side (first level), but don't worry about it and be happy it is used by the second level. 
Next to this, I have a file callsed data.ts which contains some datastructures such as lists, maps and trees, javascript and typescrpt do not have inbuild datasctures execpt for the array (which can be used as a map and a list), so I though about writing those myself.
But it is not neccacary to use and array will do just fine for everything. If you are interested, it contains (List, Bag, Queue, Stack, Heap, PriorityQueue, TreeMap, and a DeepTreeMap (something original, the others are default datastructures))

Don't worry if you forget everything from the above, but make sure to remember:

- Assets. -> you get methods for creating and loading assets (also called resources)
- Grix -> methods for creating drawable objects, then use those objects to draw.

Below are some examples that will make everything clear :).

*/

/*******
EXAMPLES
*******/

//This is how the default plena setup looks, as you can see the code for the game also has this.
module DefaultPlanaSetup {
    //run once
    function setup() {

    }

    //run every tick/frame, place rendering code here
    function render(delta: number) {

    }

    //run every tick, place logic here
    function update(delta: number) {

    }

    //seting up the library, creaing a canvas etc.. does some magic.
    Plena.init(setup, render, update)

    //We can also gives background color, size and position of the game screen we want to create to the init function, nothing as above, means full window with a white background
    //example of a 200 by 200 window colored crimson poisitioned in the center (that is default):
    Plena.init(setup, render, update, 200, 200, Color.Red.crimson())

    //example of a 200 by 200 window colored crimson positiond in the top left corner:
    Plena.init(setup, render, update, 200, 200, 0, 0, Color.Red.crimson())
}
//But do not worry about the setup, I did that already for the game, jsut so you know what it is and does.

//note that I put this all into modules (DefaultPlanaSetup/SimpleTextureDrawing/etc.. to make sure code does not collide, it is not neccesary to put stuff into modules.)
module SimpleTextureDrawing {
    var cat: ImgGrix // you can see the type of grix you get when you use Grix.SOME_METHOD

    function setup() {
        //as an option you can specify default size (with/height), defualt is the size in pixels. You can also always scale it later during drawing
        //the load image would load the image cat.png from the public directory... if it existed...
        cat = Grix.fromTexture(Assets.loadImg("cat.png"))
    }

    function update(delta: number) {

    }

    function render(delta: number) {
        cat.render()//renders the cat at the 0, 0 position of our screen (the 500 by 500 thing we create below with the init function)
    }

    //some random 500 by 500 screen colored turquoise
    Plena.init(setup, render, update, 500, 500, Color.Cyan.TURQUOISE);
}