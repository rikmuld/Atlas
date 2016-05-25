declare let io
let socket: SocketIO.Adapter = io()

socket.on('gameWaiting', setPlayers)
socket.on('full', displayFull)
socket.on("gameStarted", loadGame)

let waiting = false
let quickLoading = false

function setPlayers(players: number) {
    $("#mess").html("Players in waiting: " + players + "/6");
}

function displayFull() {
    waiting = false
    $("#mess").html("Game room full, please wait...")
    $('.container button').text("Try again")
}

function tryPlay() {
    if (quickLoading) {
        setPlayers(1)
        setTimeout(() => {
            loadGame(0)
        }, 500)
    }
    else if (!waiting) {
        socket.emit("requestJoin")
        waiting = true
    }
}

function loadGame(id: number) {
    setTimeout(() => {
        $(".container").fadeOut(250, function () {
            $("#loading").fadeIn(250)

            setTimeout(() => {
                init(id)
                $("canvas").hide()
                Assets.addQueueListner((left: number) => {
                    if (left == 0) {
                        $("#loading").remove()
                        $("#stars").remove()
                        $("#stars2").remove()
                        $("#stars3").remove()
                        $("body").css("background", "rgb(0, 0, 0)")
                        $("canvas").fadeIn(250)
                    }
                })
            }, 250)
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