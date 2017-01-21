var seaLevel = 40;

function drawMermaid() {
    drawSprite(mermaid, MERMAID_X, mermaidY+5);
}

function drawWaterFront()
{
    for (var i=0;i<(pixWidth / 8) + 1;i++) {
        
        var x = i * 8;
        var y = waterYAt(x)-64;
        
        if(waterYAt(x-1)-0.1>waterYAt(x))
        {
            drawSprite(wave_front_foam, x, y);
        }else{
            drawSprite(wave_front_rest, x, y);
        }
    }
}

function drawWaterBack()
{   
    for (var i=0;i<(pixWidth / 8) + 1;i++) {
        var x = i * 8;
        var y = waterYAt(x)-64;

        drawSprite(wave_back, x, y);
    }
}
