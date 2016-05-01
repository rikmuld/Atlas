//NOTE, feel free to experiment and edit whatever in this file

/*

INTRODUCTION

(some important) Plena modules and their use:

- Plena 
    inital setup and some handy global functions (you don't really need to use this one)
- Assets
    for the loading of everything audio / images (textues, sprites), functions start with load
    furthermore assets can create some assets from nothing (canvases, fontmaps, text images, writable textures), functions start with mk
    And you can also transform assets canvas -> image for example (getTexture) and a function to get a font from a family and size (getFont)
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

Every example has a commented and a clean version below it.
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

//clean version
module DefaultPlanaSetup {
    function setup() { }
    function render(delta: number) { }
    function update(delta: number) { }

    //Plena.init(setup, render, update)
}

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

    //Plena.init(setup, render, update, 700, 700, Color.Gray.GRAY_SLATE_LIGHT);
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
module GrixTransformationsClean {
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

    //Plena.init(setup, render, update, 700, 700, Color.Gray.GRAY_SLATE_LIGHT);
}

/*
 * ID : persp
 */

//some stuff about keysbindings input etc.. and perspective (in this example the keys s, up, down, left and right do stuff)
module PerspectiveAndInput {
    let cat: ImgGrix

    let rotation: number = 0

    let rotDir: number = 1
    let rotSpeed: number = 1

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
        //these functions can be done is a more efficient way than to write new functions, but this is more clear for an example
    }

    function update(delta: number) {
        rotation += rotDir * rotSpeed * 0.001 * delta
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
        if (rotSpeed > 0) rotSpeed -= 100
    }
}

//clean version
module PerspectiveAndInputClean {
    let cat: ImgGrix

    let rotation: number = 0

    let rotDir: number = 1
    let rotSpeed: number = 1

    function setup() {
        cat = Grix.fromTexture(Assets.loadImg("/scripts/tutorials/cat.png"))

        Plena.getDefaultView().fixedResolutionH(1000)

        Keyboard.addPressedEvent(clockwise, Keyboard.KEY_RIGHT)
        Keyboard.addPressedEvent(counterClockwise, Keyboard.KEY_LEFT)
        Keyboard.addPressedEvent(increaseSpeed, Keyboard.KEY_UP) 
        Keyboard.addPressedEvent(decreaseSpeed, Keyboard.KEY_DOWN)
    }

    function update(delta: number) {
        rotation += rotDir * rotSpeed * 0.001 * delta
    }

    function render(delta: number) {
        let view = Plena.getDefaultView()

        cat.setPivotMove(0.5, 0.5)
        cat.scaleWidthToSize((Keyboard.isDown(Keyboard.KEY_S))? 200:500) 
        cat.scaleWidthToSize(500)
        cat.moveTo(view.getWidth() / 2, view.getHeight() / 2) 
        cat.rotateTo(rotation)

        cat.render()
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
        if (rotSpeed > 0) rotSpeed -= 100
    }

    //Plena.init(setup, render, update, Color.Gray.GRAY_SLATE_LIGHT);
}

/*
 * ID : assets
 */

//some more assets example, this might be a tad hard to run for your pc, but it will
//probabely do just fine. In this example we will render 266664 verticies (or +3333300 if you go crazy).
//the below example can also be done much more efficient by not rnedering all those verticies
//sepperate, but bunderd as a texture, verticies can be reduced to about 160 (1666 times more efficient!). 
//But it is fun to render them sepperate to test pcs :). Also becuase of doing this sepperate, it
//would be possible to animate every single vertici sepperate (so having them all do differnet things, rotating, moving or so) 
//as well, which is not possible if they are bundered in a texture. Not that I did that for this example though.
//well, just forget this text and go through the example, you will see what I meant.
module MoreAssets {
    let text: ImgGrix
    let music: AudioObj
    let shape: ShapeGrix
    let crazy: ShapeGrix
    let view: Views.View

    let rotate = 0;
    let random = (Math.random() * 12387) //making sure the spiral has different colors every time

    function setup() {
        let calibri = Assets.getFont(Font.CALIBRI, 48) //the number defines resolution, not size per so, since we can scale
        //it is possible to add custom fonts, but I won't go into that, more a html/css thing. But once the font is added it can be used as follows:
        //let myFont = Assets.getFont("MY_COSTOME_FONT_NAME", 48)

        calibri.fill(Color.Gray.BLACK)//set the fill color of the font, can also use own colors with Color.mkColor, it also accepts alpha colors
        //another option for fonts is FONT.stroke(COLOR) which creates a colored outline. 

        //creates an image of text
        let hello = Assets.mkTextImg("Flight of the Bumblebee!", calibri) //also possible to set things such as max width (so you get new lines) and background color

        text = Grix.fromTexture(hello)
        view = Plena.getDefaultView()

        //loads some music
        music = Assets.loadAudio("/scripts/tutorials/musics.mp3")
        //crate a grix from a shape you can arbitrarely define, you can add tris, quads
        //circles and polygons however much you want to one grix and draw them as a group
        shape = Grix.shape()
            .quad(15, 100)
            .quad(50, 15, 15, 40)
            .quad(15, 100, 65, 0)
            .quad(15, 70, 95, 0)
            .quad(15, 15, 95, 85)
            .setColor(Color.Gray.BLACK)
            .populate()

        //;)
        crazy = Grix.shape()
        for (var i = 0; i < 5000; i++) {
            if (i % 3 == 0) crazy.quad(5, 5, (i % 50) * 10, Math.floor(i / 50) * 10);
        }
        crazy.populate()

        Plena.getDefaultView().fixedResolutionH(1000)
    }

    function render(delta: number) {
        //render the intro during first 2 seconds of the music
        //during other part... I sugest you see what happens :)
        if (music.currentTime() > 2) {
            for (var i = 0; i < 20; i++) drawSpiral(i) //increase the 20 in there to
            //mkae stuff even more crazy, my pc could handle 250 before starting to lag
            //slightly (that are 3333300 verticies!!!). I have found 50 to give pretty 
            //nice effects as well
        } else drawIntro()
    }

    function drawSpiral(offset: number) {
        MMath.setRandomSeed(offset * random)//making the next random based on the offset
        //is used to make the colors

        crazy.setColor(Color.mkAlphaColor(MMath.random(0, 255), MMath.random(0, 255), MMath.random(0, 255), Math.min(music.currentTime() - 2, 1)))
        crazy.setPivotMove(0.5, 0.5)
        crazy.moveTo(view.getWidth() / 2, view.getHeight() / 2)
        crazy.rotateDeg(rotate * Math.min(music.currentTime() / 10, 15))
        crazy.render();
    }

    function drawIntro() {
        text.setPivotMove(0.5, 0.5)
        text.moveTo(view.getWidth() / 2, view.getHeight() / 2)
        text.render()

        shape.moveTo(20, 20);
        shape.render();
        shape.setPivotMove(1, 0);
        shape.moveTo(view.getWidth() - 20, 20)
        shape.render()
        shape.setPivotMove(0, 1);
        shape.moveTo(20, view.getHeight() - 20);
        shape.render();
        shape.setPivotMove(1, 1);
        shape.moveTo(view.getWidth() - 20, view.getHeight() - 20)
        shape.render()
    }

    function update(delta: number) {
        //plays the music if it is not running
        if (!music.isRunning()) music.play()

        rotate += delta * 0.002
    }

    export function run() {
        Plena.init(setup, render, update)
    }
}

//clean version
module MoreAssetsClean {
    let text: ImgGrix
    let music: AudioObj
    let shape: ShapeGrix
    let crazy: ShapeGrix
    let view: Views.View

    let rotate = 0;
    let random = Math.random() * 12387

    function setup() {
        let calibri = Assets.getFont(Font.CALIBRI, 48).fill(Color.Gray.BLACK)

        view = Plena.getDefaultView()
        text = Grix.fromTexture(Assets.mkTextImg("Flight of the Bumblebee!", calibri))
        music = Assets.loadAudio("/scripts/tutorials/musics.mp3")
        shape = Grix.shape()
            .quad(15, 100)
            .quad(50, 15, 15, 40)
            .quad(15, 100, 65, 0)
            .quad(15, 70, 95, 0)
            .quad(15, 15, 95, 85)
            .setColor(Color.Gray.BLACK)
            .populate()

        crazy = Grix.shape()
        for (var i = 0; i < 5000; i++) {
            if (i % 3 == 0) crazy.quad(5, 5, (i % 50) * 10, Math.floor(i / 50) * 10);
        }
        crazy.populate()

        Plena.getDefaultView().fixedResolutionH(1000)
    }

    function render(delta: number) {
        if (music.currentTime() > 2) {
            for (var i = 0; i < 20; i++) drawSpiral(i)
        } else drawIntro()
    }

    function drawSpiral(offset:number) {
        MMath.setRandomSeed(offset * random)

        crazy.setColor(Color.mkAlphaColor(MMath.random(0, 255), MMath.random(0, 255), MMath.random(0, 255), Math.min(music.currentTime() - 2, 1)))
        crazy.setPivotMove(0.5, 0.5)
        crazy.moveTo(view.getWidth() / 2, view.getHeight() / 2)
        crazy.rotateDeg(rotate * Math.min(music.currentTime() / 10, 15))
        crazy.render();
    }

    function drawIntro() {
        text.setPivotMove(0.5, 0.5)
        text.moveTo(view.getWidth() / 2, view.getHeight() / 2)
        text.render()

        shape.moveTo(20, 20);
        shape.render();
        shape.setPivotMove(1, 0);
        shape.moveTo(view.getWidth() - 20, 20)
        shape.render()
        shape.setPivotMove(0, 1);
        shape.moveTo(20, view.getHeight() - 20);
        shape.render();
        shape.setPivotMove(1, 1);
        shape.moveTo(view.getWidth() - 20, view.getHeight() - 20)
        shape.render()
    }

    function update(delta: number) {
        if (!music.isRunning()) music.play()

        rotate += delta * 0.002
    }

    //Plena.init(setup, render, update)
}

/*
 * ID : sprite
 */

module Sprites {
    let cat: SpriteGrix
    let view: Views.View

    //map of ids we use for animation, will become clear
    let cats = ["catBlack", "catBlue", "catWhite", "catOrange"]
    let dir = ["_back", "_left", "_right", "_top"]

    //variables we use to render, will become clear
    let currCat = 0;
    let animation = 0;
    let direction = 1;

    //the position of the cat, just something random. I could also have made this the middle.
    //In that case I would have set them in setup
    let x = 500
    let y = 500

    //the width and height of the cat, I just picked something arbetrary
    let catWidth = 100
    let catHeight = 100

    //this maps the direction the cat moves to how we loaded it in the sprite
    let dirMap = [2, 0, 1, 3]


    function setup() {
        //loading the sprite with assets module
        let catSprite = Assets.loadSprite("/scripts/tutorials/cats.png", { safe: true })
        //with any asset we load we can set options on how to render it, we did not see
        //this before. If no options are specified, teh default options are used.
        //safe basically means that this will be an animation and we want to cut a bit from
        //the edge of the texture (0.0001% or so) to avoid texture artifacts (random 
        //texture pieces). Don't worry about other options, de defaults will suffice

        //setting up all the images in the sprite (please look at the function setupCats now, before continuing)
        setupCats(catSprite)

        //creating a grix from the sprite
        cat = Grix.fromSprite(catSprite)
        view = Plena.getDefaultView()

        //we wanna make the cat walk, and change color. To do so we bind some keys, this you have seen before. (note that you can indefenetly add more keys to
        //the function if you want to bind the function to more keys, also no keys means any key).
        Keyboard.addPressedEvent(top, Keyboard.KEY_W, Keyboard.KEY_UP)
        Keyboard.addPressedEvent(left, Keyboard.KEY_A, Keyboard.KEY_LEFT)
        Keyboard.addPressedEvent(right, Keyboard.KEY_D, Keyboard.KEY_RIGHT)
        Keyboard.addPressedEvent(back, Keyboard.KEY_S, Keyboard.KEY_DOWN)
        Keyboard.addPressedEvent(swich, Keyboard.KEY_SPACE)

        Plena.getDefaultView().fixedResolutionH(1000)
    }

    function setupCats(catSprite: Sprite) {
        //ok, this might seem complicated, but it is not. Just read/look carefully. Make sure to have cats.png open so you can actually see the image
        //so what is a sprite? A sprite contains multiple subimages. Sprites can be used to bundle textures together, to to create animations. We will
        //use the catSprite for both purposes all with one sprite grix.

        //In a Sprite (the object which we cretaed with Assets.loadSprite) we can define two sub Image types. Simple images, and animations. In the sprite we loaded
        //are five differnet colored cats (we will use the bottom four), all four have images to animate the movement in any direction. Look at the image!

        //So, what do we want to get from this image? We want 4 animations, one for every direction for every cat (the bottom ones). And we want one image for 
        //every cat (just to show how to do images).
        for (let color = 0; color < 4; color++) {
            //first we add the cat image. The method is id, x, y, width, height. Everything is in pixels. So for the first cat (color = 0 [black one]). 
            //we get an image on x=0, y=6*32, with width 32 * 32 (every cat image is 32 * 32), if you look at the image you see this is the right looking black
            //cat. For other colors this image gets shifted color * 3 * 32 to the right the get the right looking cat of other colors
            catSprite.addImg(cats[color], color * 3 * 32, 6 * 32, 32, 32)
                //if you are confsed by the . and not the catSprite. We can do this because addImage returns the sprite itself and typescript does not care about
                //new lines. But feel free to put catSprite in you mind before it.
                //the method for addAnimImages is id, x, y, with, height, count (and an optional parameter to say whether it goes vertical or horizontal (default))
                //so with these four lines we add all the animations for a cat, every line is for a differnet direction.
                .addAnimImgs(cats[color] + dir[0], color * 3 * 32, 4 * 32, 32, 32, 3)
                .addAnimImgs(cats[color] + dir[1], color * 3 * 32, 5 * 32, 32, 32, 3)
                .addAnimImgs(cats[color] + dir[2], color * 3 * 32, 6 * 32, 32, 32, 3)
                .addAnimImgs(cats[color] + dir[3], color * 3 * 32, 7 * 32, 32, 32, 3)

            //finally, we specified an id for every one so we can later get them back. A grix will need that id to know what to render as you will see below. 
        }
    }

    function render(delta: number) {
        //drawing the four cat images
        for (var i = 0; i < 4; i++) {
            cat.moveTo(cat.getWidth() * i, 0); //here is a more dynamic way of getting the current width and height of an grix
            //this is now 32*32, the default size (pixel size), later we scale it to the arbetrarely defined size, so now we cannot use those.
            cat.activeImg(cats[i]) //we use the id of the image we used during loading to tell the grix what we want to draw.
            cat.render();
        }

        //we clean our transformations
        cat.clean();
        cat.setPivotMove(0, 0)
        cat.scaleToSize(catWidth, catHeight) //now the cat has the size we picked
        cat.moveTo(x, y)//rendering the cat at its position
        cat.activeAnime(cats[currCat] + dir[dirMap[direction]]) //we now put in the id we used during loading of the spirte for the animations.
        cat.animeStep(Math.floor(animation))//we are setting how far we are in the animation 0 = first image, 1 = second image, 2 = thrid image....
        cat.render();
    }

    function update(delta: number) {
        animation += delta * 0.005;

        //move the cat
        x += 0.2 * delta * Math.cos((Math.PI / 2) * direction);
        y += 0.2 * delta * Math.sin((Math.PI / 2) * direction);

        //if cat moves out of the screen, move it to the other side
        if (x > view.getWidth()) x = -catWidth
        else if (x < -catWidth) x = view.getWidth();
        if (y > view.getHeight()) y = -catHeight
        else if (y < -catHeight) y = view.getHeight();
    }

    function top() { direction = 3 }
    function left() { direction = 2 }
    function right() { direction = 0 }
    function back() { direction = 1 }
    function swich() { currCat = (currCat + 1) % 4 }

    export function run() {
        Plena.init(setup, render, update, Color.Gray.GRAY_SLATE_LIGHT)
    }

    //maybe a fun challenge? Try to make the cat smaller if it is closer to the top of the screen
    //so it look as if it moves away from us. Or maybe bigger in the center smaller to the sides, 
    //to get the effect of an hill? (just a ranom thought, might be cool)
}


//clean version
module SpritesClean {
    let cat: SpriteGrix
    let view: Views.View

    let cats = ["catBlack", "catBlue", "catWhite", "catOrange"]
    let dir = ["_back", "_left", "_right", "_top"]

    let currCat = 0;
    let animation = 0;
    let direction = 1;

    let x = 500
    let y = 500

    let catWidth = 100
    let catHeight = 100

    let dirMap = [2, 0, 1, 3]

    function setup() {
        let catSprite = Assets.loadSprite("/scripts/tutorials/cats.png", { safe: true })

        setupCats(catSprite)

        cat = Grix.fromSprite(catSprite)
        view = Plena.getDefaultView()

        Keyboard.addPressedEvent(top, Keyboard.KEY_W, Keyboard.KEY_UP)
        Keyboard.addPressedEvent(left, Keyboard.KEY_A, Keyboard.KEY_LEFT)
        Keyboard.addPressedEvent(right, Keyboard.KEY_D, Keyboard.KEY_RIGHT)
        Keyboard.addPressedEvent(back, Keyboard.KEY_S, Keyboard.KEY_DOWN)
        Keyboard.addPressedEvent(swich, Keyboard.KEY_SPACE)

        Plena.getDefaultView().fixedResolutionH(1000)
    }

    function setupCats(catSprite: Sprite) {
        for (let color = 0; color < 4; color++) {
            catSprite.addImg(cats[color], color * 3 * 32, 6 * 32, 32, 32)
                .addAnimImgs(cats[color] + dir[0], color * 3 * 32, 4 * 32, 32, 32, 3)
                .addAnimImgs(cats[color] + dir[1], color * 3 * 32, 5 * 32, 32, 32, 3)
                .addAnimImgs(cats[color] + dir[2], color * 3 * 32, 6 * 32, 32, 32, 3)
                .addAnimImgs(cats[color] + dir[3], color * 3 * 32, 7 * 32, 32, 32, 3)
        }
    }

    function render(delta: number) {
        for (var i = 0; i < 4; i++) {
            cat.moveTo(cat.getWidth() * i, 0); 
            cat.activeImg(cats[i])
            cat.render();
        }

        cat.clean();
        cat.setPivotMove(0, 0)
        cat.scaleToSize(catWidth, catHeight) 
        cat.moveTo(x, y)
        cat.activeAnime(cats[currCat] + dir[dirMap[direction]])
        cat.animeStep(Math.floor(animation))
        cat.render();
    }

    function update(delta: number) {
        animation += delta * 0.005;

        x += 0.2 * delta * Math.cos((Math.PI / 2) * direction);
        y += 0.2 * delta * Math.sin((Math.PI / 2) * direction);

        if (x > view.getWidth()) x = -catWidth
        else if (x < -catWidth) x = view.getWidth();
        if (y > view.getHeight()) y = -catHeight
        else if (y < -catHeight) y = view.getHeight();
    }

    function top() { direction = 3 }
    function left() { direction = 2 }
    function right() { direction = 0 }
    function back() { direction = 1 }
    function swich() { currCat = (currCat + 1) % 4 }

    //Plena.init(setup, render, update, Color.Gray.GRAY_SLATE_LIGHT)
}

/*
some possible future examples (but I will probabely leave it at this)
although there is much more

maybe writable textures
maybe mutable text and fontmaps
maybe canvas textures
maybe custom shads, more input and views stuff
maybe advanced grix use with new GRIX_TYPEGrix(OPTIONS).FUNCTIONS.populate() instead of Grix.GRIX_TYPE(OPTIONS)
 */

//this last part is nothing for you to worry about, this will run the examples.
//but you can add your own to this if you feel like experimenting, I configured the webserver so that it will just work run the script with id: localhost:3000/examples/ID <- so that ID on a 
//simple webpage
function runExample(example: string) {
    switch (example) {
        case "setup": DefaultPlanaSetup.run(); break
        case "texture": SimpleTextureDrawing.run(); break
        case "trans": GrixTransformations.run(); break
        case "persp": PerspectiveAndInput.run(); break
        case "assets": MoreAssets.run(); break
        case "sprite": Sprites.run(); break
    }
}
