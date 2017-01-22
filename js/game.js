var gl; // A global variable for the WebGL context

var gameStartScreen = "img/gamestart.png";
var gameOverScreen = "img/gameover.png";
var background = "img/background.png";
var wave_back = "img/wave_back.png";
var wave_front_rest = "img/wave_front_rest.png";
var wave_front_foam = "img/wave_front_foam.png";
var rock = "img/rock2.png";
var mermaid = "img/mermaid.png";
var tombstone = "img/tombstone2.png";

function start() {
    var canvas = document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);

    // Only continue if WebGL is available and working
    if (!gl) {
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    loadSprite(gameStartScreen);
    loadSprite(gameOverScreen);
    loadSprite(background);
    
    loadSprite(wave_back);
    loadSprite(wave_front_rest);
    loadSprite(wave_front_foam);

    loadSprite(rock);
    loadSprite(mermaid);
    loadSprite(tombstone);
    
    setupSounds();
    
    music.play();

    numbersSprites.forEach(function(s){
        loadSprite(s);
    });

    INPUT_SPRITES.forEach(function(s){
        loadSprite(s);
    });

    SAILORS.forEach(function(s){
        loadSprite(s);
    });
    
    for (var boatKey in BOATS) {
        var tug = BOATS[boatKey];

        tug.parts.forEach(function (p) {
            loadSprite(p.img);
        });
    }
    
    initShaders();

    window.requestAnimationFrame(drawScene);

    initInput();
}


var didSeeStartScreen = false;
var isPaused = true;
var pauseTimer = 0;
var time = 0;
var deltaTime = 1/60;

function reset() {
    time = 0;
    pauseTimer = 0;
    isPaused = false;

    resetInput();
    resetWater();
    resetBoats();
    resetDeadSailors();

    resetSpawner();

    resetScore();

    spawnBoat("tube");
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
            updateInput();
            updateWater();
            updateSpawner();
            updateBoats();
            updateDeadSailors();
        }

        //Create Background
        drawSprite(background, pixWidth / 2, pixHeight / 2);
        
        
        drawWaterBack();
        drawSprite(rock, 16, 25);
        drawMermaid();

        drawBoats();
        drawTombstones();
        drawDeadSailors();
        drawWaterFront();

//        drawChargeIndicator();

        if (isPaused)
        {
            pauseTimer ++;

            if (didSeeStartScreen) {
                drawSprite(gameOverScreen, pixWidth / 2, pixHeight / 2);
            } else {
                drawSprite(gameStartScreen, pixWidth / 2, pixHeight / 2);
            }

            if (isKeyDown && (pauseTimer > 120 || !didSeeStartScreen))
            {
                didSeeStartScreen = true;
                reset();
            }
        }

        if (!isPaused || didSeeStartScreen) {
            drawScore();
        }
    }
    window.requestAnimationFrame(drawScene);
}

