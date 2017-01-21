
var SUPER = 1;
var NUM_WATER_SEGMENTS = pixWidth * SUPER;

var waterLevels = [];
(function()
{
    for (var i=0;i<NUM_WATER_SEGMENTS;i++)
    {
        waterLevels.push(0);
    }
})();

function waterYAt(x)
{
    return waterLevels[x / SUPER] + seaLevel;
}

function updateWater() {
    var leftMost = Math.cos(time * 2) * Math.cos(time) * 10;

    for (var i=NUM_WATER_SEGMENTS-1;i>=0;i--) {

        var l = 0;
        if (i>0)
        {
            l=waterLevels[i-1];
        } else{
            l=leftMost;
        }

        waterLevels[i] = l;
    }
}

