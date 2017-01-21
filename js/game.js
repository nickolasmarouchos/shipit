var gl; // A global variable for the WebGL context

var background = "img/background.png";
var wave_back = "img/wave_back.png";
var wave_front_rest = "img/wave_front_rest.png";
var wave_front_foam = "img/wave_front_foam.png";

var boat1 = "img/boat1.png";


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

    loadSprite(boat1);
    
    initShaders();

    window.requestAnimationFrame(wrappedDrawScene);

    canvas.addEventListener("keydown", increaseAmplitude, false);
    canvas.addEventListener("keyup", function(){isPressed = false;}, false);
}

var time = Date.now();
var deltaTime = 0;
var isPressed = false;

var wave_amplitude = 20;

function increaseAmplitude()
{
    isPressed = true;
    if(wave_amplitude < 30){
        wave_amplitude *= 1.05;
    }
    
}

function wrappedDrawScene()
{
    var now = Date.now();
    deltaTime = now - time;
    time = now;

    updateWater();

    clearScreen();
    
    //Create Background
    drawSprite(background, pixWidth/2, pixHeight/2);
    
    drawWaterBack();
    drawBoat();
    drawWaterFront();

    /*
    //Create Wave
    //var wave_amplitude = 20;            //higher number = higher wave
    var wave_frequency = time / 500;    //lower number = faster wave
    var water_level = 30;
    
    for (var x=0;x<20;x++) {
        var y = Math.sin(x * 0.1 + wave_frequency) * wave_amplitude + water_level;

        drawSprite(wave_back, x * 8, y);
        if(Math.sin(x * 0.1 + wave_frequency)<-0.75)
        {
            drawSprite(wave_front_foam, x * 8, y);
        }else{
            drawSprite(wave_front_rest, x * 8, y);
        }
    }

    if(wave_amplitude > 2 && isPressed == false){
        wave_amplitude *= 0.999;
    }
    */


    window.requestAnimationFrame(wrappedDrawScene);
}

