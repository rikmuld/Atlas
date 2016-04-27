//NOTE, feel free to experiment and edit whatever in this file

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
- Vector and Matrix
    You can create one of those if you want to do some operations with matrixes or vectors, such as making non standard transformations with images (if have got simple funcitons for the standart transforamtions, so you will probabily not use it)

And that concludes some of the most important parts of the library which we will use.
There is much more, especially on the graphics side (first level), but don't worry about it and be happy it is used by the second level. 
Next to this, I have a file callsed data.ts which contains some datastructures such as lists, maps and trees, javascript and typescrpt do not have inbuild datasctures execpt for the array (which can be used as a map and a list), so I though about writing those myself.
But it is not neccacary to use and array will do just fine for everything. If you are interested, it contains (List, Bag, Queue, Stack, Heap, PriorityQueue, TreeMap, and a DeepTreeMap (something original, the others are default datastructures))

Don't worry if you forget everything from the above, but make sure to remember:

- Assets. -> you get methods for creating and loading assets (also called resources)
- Grix -> methods for creating drawable objects, then use those objects to draw.

Below are some examples that will make everything clear :).

*/

/*******
EXAMPLES, the examples can be viewed/run by running the server (the triangle button at the top, and then you can o to: localhost:3000/examples/EXAMPLE_ID). 
You can find the example id at every example.
*******/

/*
 * ID : setup
 */

//This is how the default plena setup looks, as you can see the code for the game also has this.
module DefaultPlanaSetup {
    //This wil be run once
    function setup() {

    }

    //This will run every tick/frame, rendering code will be placed here
    function render(delta: number) {

    }

    //This will run every tick, logic will be placed here
    function update(delta: number) {

    }

    //normally this would not be in a function (so function run would not be there). It is here now so I cna have multiple examples in one file.
    export function run() {
        //The following line will setup the library, creaing a canvas etc.. does some magic (you won't see anything though).
        Plena.init(setup, render, update)

        //We can also gives background color, size and position of the game screen we want to create to the init function, nothing as above, means full window with a white background
        //example of a 200 by 200 window colored crimson poisitioned in the center (that is default):
        //Plena.init(setup, render, update, 500, 500, Color.Red.crimson())

        //Here follows an example of a 500 by 500 window colored crimson positiond in the top left corner:
        //Plena.init(setup, render, update, 0, 0, 500, 500, Color.Red.crimson())

        //And this will create a fullscreen canvas with wheat color
        //Plena.init(setup, render, update, Color.Brown.wheat())

        //You can uncomment the inits (commend the other out) to see what it does, you can also experiment of course
    }
}
//But do not worry too much about the setup, I did that already for the game.

/*
 * ID : texture
 */

//note that I put this all into modules (DefaultPlanaSetup/SimpleTextureDrawing/etc.. to make sure code does not collide, it is not neccesary to put stuff into modules.)
module SimpleTextureDrawing {
    let cat: ImgGrix // you can see the type of grix you get when you use Grix.SOME_METHOD

    function setup() {
        //loading an image with Assets, and using it in Grix to create something from it which we can draw.
        //Two more paraeters are anvailable which can be used to set default width ans height, it defaults to the size of the image 
        cat = Grix.fromTexture(Assets.loadImg("/scripts/tutorials/cat.png")) //width height bug, I just fixed it in the code, fix it in plena and push and new build here
    }

    function update(delta: number) {

    }

    function render(delta: number) {
        cat.render()//renders the cat at the 0, 0 position (left top) of our screen (the 500 by 500 thing we create below with the init function)
    }

    export function run() {
        //some random 700 by 700 screen colored gray slate light
        Plena.init(setup, render, update, 700, 700, Color.Gray.GRAY_SLATE_LIGHT);
    }
} 

//a clean version
module SimpleTextureDrawingClean {
    let cat: ImgGrix

    function setup() {
        cat = Grix.fromTexture(Assets.loadImg("/scripts/tutorials/cat.png"))
    }

    function update(delta: number) { }
    function render(delta: number) {
        cat.render()
    }

    Plena.init(setup, render, update, 700, 700, Color.Gray.GRAY_SLATE_LIGHT);
}


/*
 * ID : trans
 */

//everything about render transformations, moving, scaling, rotating etc..
module GrixTransformations {
    let cat: ImgGrix
    let rotation:number = 0

    function setup() {
        cat = Grix.fromTexture(Assets.loadImg("/scripts/tutorials/cat.png"))
    }

    function update(delta: number) {
        rotation += 0.001 * delta //delta depends on the clockspeed of a computer
        //multiplying things with it makes the update tick independent of the speed
        //of a computer we multiply everything concerning movement, updates etc.. 
        //so it will run with the same speed on any computer
    }

    function render(delta: number) {
        // here follow the basic transfoamtions that can be done with any grix

        //translation methods:
        //move, moveTo, moveXTo, moveYTo, setPiovtMove
        
        //default position of any grix is (0, 0)
        //move(x, y) : it moves the grix from (x_0, y_0) to (x_0 + x, y_0 + y)
        //moveTo(x, y) : it moves the grix from (x_0, y_0) to (x, y)
        //moveXTo(x) : it moves the grix (x_0, y_0) to (x_0 + x, y_0)
        //moveYTo(y) : it moves the grix (x_0, y_0) to (x_0, y_0 + y)
        //setPivotMove(x, y) : the coordinates are relative to the size of the image
        //which means that (0, 0) is the left top corner of the image, (1, 1) the 
        //right bottom and (0.5, 0.5) the middle of the image. Use this to set the main
        //point of the grix, that where the grix is moved to. So with (0.5, 0.5) you set
        //the middle of the image to some location, which is handy for centering stuff.
        //and (0, 0) is handy for setting things in the top left corner etc...

        //scale methods:
        //scale, scaleTo, scaleToSize, scaleWithToSize, scaleHeightToSize
        
        //default scale of any grix is (1, 1) which is equal to the default width and the height
        //scale and scale to work the same as the move functions, now with scale
        //scale size is can be used to work instead of in a relative scale of 1 equals width/height
        //in a absolute scale were the width and height is put in units (pixels)

        //rotate methods:
        //rotate, rotateTo, rotateDeg, rotateToDeg, setPivotRotate
        //same as other methods above, two versions of for redians and one for degrees
        //you can also use MMath.toRad/toDeg to change between them.
        //use setPivotRotate to set the point of rotation, works the same as for the move one
        //it defaults to the middle so, (0.5, 0.5)
        
        //mirror methods:
        //mirrorHorizontal, mirrowVertical
        //should be intuitive enough
        
        //cleaning transformations:
        //clean
        //resets all translatoins, all translations are reset by default after one tick (as shoul be expected)

        //here is an example of the cat drawn in the middle of the screen, rotating arround with a width of 200 units (pixels, see text below)
        cat.setPivotMove(0.5, 0.5)
        cat.scaleWidthToSize(200)
        cat.moveTo(350, 350)//half of the screen size we set below (the default projection is 1:1, so one pixel is one unit in the game, this can also be changed)
        //to make sure you have always, say, the half of the view, you use: VIEW.getWith() / 2 and VIEW.getHeight() / 2. If you don't have a view you are most likely
        //using the default view which can be got by doing: Plena.getDefaultView()
        cat.rotateTo(rotation)
        cat.render()
    }

    export function run() {
        //some random 700 by 700 screen colored gray slate light
        Plena.init(setup, render, update, 700, 700, Color.Gray.GRAY_SLATE_LIGHT);
    }
} 

//clean version without comments
module GrixTransformations {
    let cat: ImgGrix
    let rotation: number = 0

    function setup() {
        cat = Grix.fromTexture(Assets.loadImg("/scripts/tutorials/cat.png"))
    }

    function update(delta: number) {
        rotation += 0.001 * delta
    }

    function render(delta: number) {
        cat.setPivotMove(0.5, 0.5)
        cat.scaleWidthToSize(200)
        cat.moveTo(350, 350)
        cat.rotateTo(rotation)

        cat.render()
    }

    Plena.init(setup, render, update, 700, 700, Color.Gray.GRAY_SLATE_LIGHT);
}

/*
 * ID : persp
 */

//some stuff about keysbindings input etc.. and perspective (in this example the keys s, up, down, left and right do stuff)
module PerspectiveAndInput {
    let cat: ImgGrix

    let rotation: number = 0

    let rotDir: number = 1
    let rotSpeed :number = 1

    function setup() {
        cat = Grix.fromTexture(Assets.loadImg("/scripts/tutorials/cat.png"))

        //defining everything in pixels is not handy, it will cause probelsm and akwarness when computer screens do not all have the same resolutions, or 
        //the screen is resizes etc..

        //we can define a fixed resolution for either the width or the height for a view. That view will then always have that specific size.
        //So for example when we set the height to a fixed value of 1000, setting the height of an image to 200 it will then always be 1/5th of the screen.
        //So we no longer work in pixels
        Plena.getDefaultView().fixedResolutionH(1000) // try making the screen very small in height, you can see everything still looks as intended, in contrast to the last examples
        //refresh after resizing though

        Keyboard.addPressedEvent(clockwise, Keyboard.KEY_RIGHT) //binding a fucntion to the perssing of a key, this means function clockwise is called if we press the right arrow key
        Keyboard.addPressedEvent(counterClockwise, Keyboard.KEY_LEFT) //same as above, differnet function and differnent key though
        Keyboard.addPressedEvent(increaseSpeed, Keyboard.KEY_UP) //same as above, differnet function and differnent key though, try increasing the speed for a long time, it has curious effects
        Keyboard.addPressedEvent(decreaseSpeed, Keyboard.KEY_DOWN) //same as above, differnet function and differnent key though
    }

    function update(delta: number) {
        rotation += rotDir * rotSpeed  * 0.001 * delta
    }

    function render(delta: number) {
        let view = Plena.getDefaultView()

        cat.setPivotMove(0.5, 0.5)
        if (Keyboard.isDown(Keyboard.KEY_S)) cat.scaleWidthToSize(200) //0.2 of the height, only if we old s
        else cat.scaleWidthToSize(500)//half the height
        cat.moveTo(view.getWidth() / 2, view.getHeight() / 2) //best way to center things, we could have used 500 for the width though.
        cat.rotateTo(rotation)

        cat.render()
    }

    export function run() {
        //we are in fullscreen mode indeed
        Plena.init(setup, render, update, Color.Gray.GRAY_SLATE_LIGHT);
    }

    function clockwise(event: KeyboardEvent) {
        rotDir = 1
    }

    function counterClockwise(event: KeyboardEvent) {
        rotDir = -1
    }

    function increaseSpeed(event: KeyboardEvent) {
        rotSpeed += 100
    }

    function decreaseSpeed(event: KeyboardEvent) {
        if (rotSpeed > 0) rotSpeed-=100
    } 
}

//nothing for you to worry about, this will run the examples.
//but you can add your own to this if you feel like experimenting, I configured the webserver so that it will just work run the script with id: localhost:3000/examples/ID <- so that ID on a 
//simple webpage
function runExample(example: string) {
    switch (example) {
        case "setup": DefaultPlanaSetup.run(); break
        case "texture": SimpleTextureDrawing.run(); break
        case "trans": GrixTransformations.run(); break
        case "persp": PerspectiveAndInput.run(); break
    }
}