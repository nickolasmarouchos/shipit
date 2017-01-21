
var NUM_WATER_SEGMENTS = pixWidth / 8;

var waterLevels = [];
(function()
{
    for (var i=0;i<NUM_WATER_SEGMENTS;i++)
    {
        waterLevels.push(0);
    }
})();

function updateWater()
{
    for (var i=0;i<NUM_WATER_SEGMENTS;i++) {
        waterLevels[i] = Math.sin(i/10.0 + time/500) * 10;
    }
}

