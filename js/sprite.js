
function makeSprite(width,height,vert,tris,numTri,col)
{
    return {
        width:width,
        height:height,
        vert:vert,
        tris:tris,
        numTri:numTri,
        col:col
    };
}

var spritesToLoad = 0;
var spritesLoaded = 0;

function spritesLoadingProgress()
{
    if ( spritesToLoad == 0)
    {
        return 0;
    }
    return spritesLoaded / spritesToLoad;
}

var spritesRegistry = {};

function registerSprite(id,sprite)
{
    spritesRegistry[id] = sprite;
}

function loadSprite(source) {
    var image = new Image();
    spritesToLoad++;
    image.onload = function () {
        var canvas = document.createElement('canvas');
        var width = image.width;
        var height = image.height;
        canvas.width = width;
        canvas.height = height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        var vertices = [];
        var colors = [];
        var tris = [];
        var numTri = 0;

        // Now you can access pixel data from imageData.data.
        // It's a one-dimensional array of RGBA values.
        // Here's an example of how to get a pixel's color at (x,y)
        for (var y=0;y<height;y++) {
            for (var x = 0; x<width; x++) {

                var index = (y * width + x) * 4;
                var pixIndex = ((height-y-1) * width + x) * 4;
                var red = imageData.data[pixIndex] / 255.0;
                var green = imageData.data[pixIndex + 1] / 255.0;
                var blue = imageData.data[pixIndex + 2] / 255.0;
                var alpha = imageData.data[pixIndex + 3] / 255.0;

                vertices.push(x);
                vertices.push(y);
                vertices.push(0);

                vertices.push(x+1);
                vertices.push(y);
                vertices.push(0);

                vertices.push(x);
                vertices.push(y+1);
                vertices.push(0);

                vertices.push(x+1);
                vertices.push(y+1);
                vertices.push(0);

                for (var i=0;i<4;i++) {
                    colors.push(red);
                    colors.push(green);
                    colors.push(blue);
                    colors.push(alpha);
                }

                if (alpha != 0) {
                    tris.push(index);
                    tris.push(index + 1);
                    tris.push(index + 2);

                    tris.push(index + 1);
                    tris.push(index + 2);
                    tris.push(index + 3);
                    numTri+=6;
                }
            }
        }

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        var trisBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trisBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tris), gl.STATIC_DRAW);

        registerSprite(source, makeSprite(width,height,vertexBuffer,trisBuffer, numTri,colorBuffer));

        spritesLoaded++;
    };
    image.src = source;
}

var DEFAULT_COLOR = [1,1,1,1];

var lastSprite = "";

function drawSprite(spriteKey,x,y,color) {
    var sprite = spritesRegistry[spriteKey];

    if (sprite) {
        var numTri = sprite.numTri;

        if (!color)
        {
            color = DEFAULT_COLOR;
        }

        //setDrawCallColor(color[0],color[1],color[2],color[3]);

        setDrawCallPosition(x - sprite.width/2, y - sprite.height / 2);
        if (sprite != lastSprite) {
            gl.bindBuffer(gl.ARRAY_BUFFER, sprite.vert);
            gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, sprite.col);
            gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sprite.tris);
            lastSprite = sprite;
        }
        gl.drawElements(gl.TRIANGLES, numTri, gl.UNSIGNED_SHORT, 0);
    }
}

