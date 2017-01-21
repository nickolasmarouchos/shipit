
function drawWater()
{
    var seaLevel = 40;
    
    for (var i=0;i<NUM_WATER_SEGMENTS;i++) {
        
        var x = i * 8;
        //var y = Math.floor(waterLevels[i])+seaLevel-32;
        var y = waterLevels[i]+seaLevel-32;
        
        drawSprite(wave_back, x, y);
        if((waterLevels[i-1]-0.5)>=waterLevels[i])
        {
            drawSprite(wave_front_foam, x, y);
        }else{
            drawSprite(wave_front_rest, x, y);
        }
    }
}
