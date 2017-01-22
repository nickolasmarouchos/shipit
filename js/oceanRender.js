var seaLevel = 40;

function drawWaterFront()
{
    for (var i=0;i<(pixWidth / 8) + 1;i++) {
        
        var x = i * 8;
        var y = waterYAt(x)-64;
        var d = waterYAt(x) - waterYAt(x-1);
        
        if(d < -0.5)
        {
            drawSprite(wave_front_foam2, x, y);
        }
        else if(d<-0.1)
        {
            drawSprite(wave_front_foam, x, y);
        }
        else
        {
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
