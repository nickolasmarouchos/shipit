var gl; // A global variable for the WebGL context

function start() {
    var canvas = document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);

    // Only continue if WebGL is available and working
    if (!gl) {
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var water = "img/square_16x16.png";
    loadSprite(water);

    initShaders();
    initBuffers();
    drawScene();

    setTimeout(function(){drawScene();drawSprite(water);},1000);
}



