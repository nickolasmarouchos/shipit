
var NUM_WATER_SEGMENTS = pixWidth;

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
    return waterLevels[x] + seaLevel;
}

var activeWaves = [];

var chargeTime = 0;
var chargePlus = 0;

function updateWater() {
    var leftMost = Math.sin(time * 7) * 2 + Math.sin(time * 3) * 3;
    for (var wi = 0;wi<activeWaves.length;wi++)
    {
        var wave = activeWaves[wi];
        if (wave.length == 0)
        {
            activeWaves.splice(wi,1);
            wi--;
        } else {
            var waveY = wave.shift();
            leftMost += waveY;
        }
    }

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

