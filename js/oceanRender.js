
function drawWater()
{
    for (var i=0;i<NUM_WATER_SEGMENTS;i++) {
        var x = i;
        var y = waterLevels[i];
        drawSprite(wave_back, x * 8, y);
    }
}
