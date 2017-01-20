
var canvasWidth;
var canvasHeight;

var pixWidth = 160;
var pixHeight = 100;

function initWebGL(canvas) {
    gl = null;

    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    gl.viewport(0, 0, canvasWidth, canvasHeight);

    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }

    return gl;
}

function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


}
