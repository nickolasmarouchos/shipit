
function makeSprite(width,height,vert,tris,col)
{
    return {
        width:width,
        height:height,
        vert:vert,
        tris:tris,
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
        var tris = [];

        // Now you can access pixel data from imageData.data.
        // It's a one-dimensional array of RGBA values.
        // Here's an example of how to get a pixel's color at (x,y)
        for (var y=0;y<height;y++) {
            for (var x = 0; x <width; x++) {

                var index = (y * width + x) * 4;
                var red = imageData.data[index] / 255.0;
                var green = imageData.data[index + 1] / 255.0;
                var blue = imageData.data[index + 2] / 255.0;
                var alpha = imageData.data[index + 3] / 255.0;

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

                tris.push(index);
                tris.push(index+1);
                tris.push(index+2);

                tris.push(index+1);
                tris.push(index+2);
                tris.push(index+3);
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

        registerSprite(source, makeSprite(width,height,vertexBuffer,trisBuffer,colorBuffer));

        console.log("done");
    };
    image.src = source
}

function drawSprite(spriteKey) {
    var sprite = spritesRegistry[spriteKey];

    var numTri = (sprite.width * sprite.height) * 3 * 2;

    setDrawCallPosition(0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.vert);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.vert);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.col);
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sprite.tris);
    gl.drawElements(gl.TRIANGLES, numTri, gl.UNSIGNED_SHORT, 0);
}
