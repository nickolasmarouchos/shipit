var seaLevel = 40;

function drawWaterFront()
{
    
    for (var i=0;i<NUM_WATER_SEGMENTS;i++) {
        
        var x = i * 8;
        var y = waterLevels[i]+seaLevel-32;
        
        if((waterLevels[i-1]-0.5)>=waterLevels[i])
        {
            drawSprite(wave_front_foam, x, y);
        }else{
            drawSprite(wave_front_rest, x, y);
        }
    }
}

function drawWaterBack()
{   
    var x = i * 8;
    var y = waterLevels[i]+seaLevel-32;
    for (var i=0;i<NUM_WATER_SEGMENTS;i++) {    
        drawSprite(wave_back, x, y);
    }
}