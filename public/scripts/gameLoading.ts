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

function loadGame() {
    $("#mess").fadeOut(500)
    $("h1").fadeOut(500)
    $("button").fadeOut(500, function () {
        setTimeout(function () {
            $(".container").hide()
        }, 10)
        init()
    })
}

$(document).mousemove(function (event: JQueryMouseEventObject) {
    if (!started) {
        let x = 5 * (event.clientX / window.innerHeight) -2.5
        let y = 5 * (event.clientY / window.innerHeight) - 2.5
        $('#clouds').css('transition', '0s')
        $('#clouds').css('transform', 'translate(' + x + '%,' + y + '%)')
    }
})

$(window).resize(function () {
    $('#clouds').css('transition', '0.2s')
})