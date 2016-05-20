declare let io
let socket: SocketIO.Adapter = io()

socket.on('gameWaiting', setPlayers)
socket.on('full', displayFull)
socket.on("gameStarted", loadGame)

let waiting = false

function setPlayers(players: number) {
    $("#mess").html("Players in waiting: " + players + "/6");
}

function displayFull() {
    waiting = false
    $("#mess").html("Game room full, please wait...")
    $('.container button').text("Try again")
}

function tryPlay() {
    if (!waiting) {
        socket.emit("requestJoin")
        waiting = true
    }
}

function loadGame(id: number) {
    setTimeout(()=>{
        $("#mess").fadeOut(500)
        $("h1").fadeOut(500)
        $(".container").fadeOut(500)
        $("button").fadeOut(500, function () {
            setTimeout(() => {
                init(id)
                Assets.addQueueListner((left: number) => {
                    //this is still behind canvas during loading, canvas should be made invisible first... above the assets.addQ...
                    //also loaidng animation and text
                    //better transisiton, maybe fade in canvas
                    if (left == 0) {
                        $("#stars").remove()
                        $("#stars2").remove()
                        $("#stars3").remove()
                        $("body").css("background", "rgb(0, 0, 0)")
                    }
                })
            }, 1000)
        })
    }, 100)
}

$(document).mousemove(function (event: JQueryMouseEventObject) {
    if (!started) {
        let x = 5 * (event.clientX / window.innerHeight) -2.5
        let y = 5 * (event.clientY / window.innerHeight) - 2.5
        $('#clouds').css('transform', 'translate(' + x + '%,' + y + '%)')
    }
})