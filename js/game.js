var gl; // A global variable for the WebGL context

var water = "img/water2.png";

function start() {
    var canvas = document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);

    // Only continue if WebGL is available and working
    if (!gl) {
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    loadSprite(water);

    initShaders();

    window.requestAnimationFrame(wrappedDrawScene);
}

var time = Date.now();
var deltaTime = 0;

function wrappedDrawScene()
{
    var now = Date.now();
    deltaTime = now - time;
    time = now;

    clearScreen();

    for (var x=0;x<30;x++) {
        var y = Math.sin(x * 0.1 + time / 500) * 20 + pixHeight / 2;

        drawSprite(water, x * 5, y);
    }

    window.requestAnimationFrame(wrappedDrawScene);
}

