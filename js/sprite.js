
function makeSprite(width,height,vert,col)
{
    return {
        width:width,
        height:height,
        vert:vert,
        col:col
    };
}

var spritesRegistry = {};

function registerSprite(id,sprite)
{
    spritesRegistry[id] = sprite;
}

function loadSprite(source) {
    var image = new Image();
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

        // Now you can access pixel data from imageData.data.
        // It's a one-dimensional array of RGBA values.
        // Here's an example of how to get a pixel's color at (x,y)
        for (var y=0;y<height;y++)
        {
            for (var x=0; x<width; x++)
            {
                var index = (y * width + x) * 4;
                var red = imageData.data[index];
                var green = imageData.data[index + 1];
                var blue = imageData.data[index + 2];
                var alpha = imageData.data[index + 3];

                vertices.push(x);
                vertices.push(y);
                vertices.push(0);

                vertices.push(x + 1);
                vertices.push(y);
                vertices.push(0);

                colors.push(red);
                colors.push(green);
                colors.push(blue);
                colors.push(alpha);
            }
        }

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        registerSprite(source, makeSprite(width,height,vertexBuffer,colorBuffer));

        console.log("done");
    };
    image.src = source
}

function drawSprite(spriteKey) {
    var sprite = spritesRegistry[spriteKey];
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.vert);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.vert);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.col);
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, sprite.width*sprite.height);
}
