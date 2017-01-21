
var NUM_WATER_SEGMENTS = pixWidth;

var waterLevels = [];
(function()
{
    for (var i=0;i<NUM_WATER_SEGMENTS;i++)
    {
        waterLevels.push(0);
    }
})();

function updateWater() {
    for (var i=0;i<2;i++) {
        updateWaterTick();
    }
}

function updateWaterTick()
{
    var leftMost = Math.cos(time / 100) * Math.cos(time/1000) * 10;

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

