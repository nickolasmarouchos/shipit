var gl; // A global variable for the WebGL context

var background = "img/background.png";
var wave_back = "img/wave_back.png";
var wave_front_rest = "img/wave_front_rest.png";
var wave_front_foam = "img/wave_front_foam.png";


function start() {
    var canvas = document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);

    // Only continue if WebGL is available and working
    if (!gl) {
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    loadSprite(background);
    
    loadSprite(wave_back);
    loadSprite(wave_front_rest);
    loadSprite(wave_front_foam);


    for (var boatKey in BOATS) {
        var tug = BOATS[boatKey];

        tug.parts.forEach(function (p) {
            loadSprite(p.img);
        });
    }

    
    initShaders();

    window.requestAnimationFrame(drawScene);

    initInput();

    reset();
}

var isPaused = false;
var time = 0;
var deltaTime = 1/60;

function reset() {
    time = 0;

    resetInput();
    resetWater();
    resetBoats();
}

function drawScene()
{
    var loadProgress = spritesLoadingProgress();
    if (loadProgress < 1)
    {
        gl.clearColor(0.0, 0.0, loadProgress, 1.0);
        clearScreen();
    } else {

        time += deltaTime;

        if (!isPaused) {
            updateWater();
            updateSpawner();
            updateBoats();
        }

        //Create Background
        drawSprite(background, pixWidth / 2, pixHeight / 2);

        drawWaterBack();
        drawBoats();
        drawWaterFront();

    }
    window.requestAnimationFrame(drawScene);
}

