var socket = io();
socket.on('gameWaiting', setPlayers);
socket.on('full', displayFull);
socket.on("gameStarted", loadGame);
var waiting = false;
var quickLoading = true;
function setPlayers(players) {
    $("#mess").html("Players in waiting: " + players + "/6");
}
function displayFull() {
    waiting = false;
    $("#mess").html("Game room full, please wait...");
    $('.container button').text("Try again");
    if (quickLoading) {
        setPlayers(1);
        setTimeout(function () {
            loadGame(0);
        }, 500);
    }
}
function tryPlay() {
    if (!waiting) {
        socket.emit("requestJoin");
        waiting = true;
    }
}
function loadGame(id) {
    setTimeout(function () {
        $(".container").fadeOut(250, function () {
            $("#loading").fadeIn(250);
            setTimeout(function () {
                init(id);
                $("canvas").hide();
                Assets.addQueueListner(function (left) {
                    if (left == 0) {
                        $("#loading").remove();
                        $("#stars").remove();
                        $("#stars2").remove();
                        $("#stars3").remove();
                        $("body").css("background", "rgb(0, 0, 0)");
                        $("canvas").fadeIn(250);
                    }
                });
            }, 250);
        });
    }, 100);
}
$(document).mousemove(function (event) {
    if (!started) {
        var x = 5 * (event.clientX / window.innerHeight) - 2.5;
        var y = 5 * (event.clientY / window.innerHeight) - 2.5;
        $('#clouds').css('transform', 'translate(' + x + '%,' + y + '%)');
    }
});
//# sourceMappingURL=gameLoading.js.map