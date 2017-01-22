
var NUM_WATER_SEGMENTS = pixWidth + 100;// offscreen water

var waterLevels = [];

function waterYAt(x)
{
    return waterLevels[Math.round(x)] + seaLevel;
}

var activeWaves = [];

var waterChargePower = 0;

function resetWater()
{
    activeWaves = [];
    waterLevels = [];
    for (var i=0;i<NUM_WATER_SEGMENTS;i++)
    {
        waterLevels.push(0);
    }

    for (var i=0; i<NUM_WATER_SEGMENTS;i++)
    {
        updateWater();
        // FAKE HAXX!
        time += deltaTime;
    }
}

function updateWater() {

   if (waterChargePower< chargeCurrent)
   {
       waterChargePower++;
   } else if (waterChargePower > chargeCurrent){
       waterChargePower--;
   }

    var leftMost = 0;//Math.sin(time * 7) * 2 + Math.sin(time * 3) * 3;
    var mermaidWave =  0;//-1 * (waterChargePower / CHARGE_MAX) * 10;
    for (var wi = 0;wi<activeWaves.length;wi++)
    {
        var wave = activeWaves[wi];
        if (wave.length == 0)
        {
            activeWaves.splice(wi,1);
            wi--;
        } else {
            var waveY = wave.shift();
            mermaidWave += waveY;
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

        if (i < MERMAID_X)
        {
            l+=mermaidWave * (i / MERMAID_X) * 0.4;
        }


        waterLevels[i] = l;
    }
}

