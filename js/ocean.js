var SUPER = 2;
var NUM_WATER_SEGMENTS = SUPER * (pixWidth + 100);// offscreen water

var waterLevels = [];

function waterYAt(x) {
    return waterLevels[Math.round(x * SUPER)] + seaLevel;
}

var activeWaves = [];

var mermaidY = 0;
var mermaidYV = 0;

var waterChargePower = 0;
var wvy = 0;

var WATER_CHARGE_MAX = 20;

function resetWater() {
    activeWaves = [];
    waterLevels = [];
    for (var i = 0; i < NUM_WATER_SEGMENTS; i++) {
        waterLevels.push(0);
    }

    for (var i = 0; i < NUM_WATER_SEGMENTS; i++) {
        updateWater();
        // FAKE HAXX!
        time += deltaTime;
    }

    mermaidY = waterYAt(17);
}

var mermaidTimeout = 0;
var mAcc = 0;

function updateWater() {

    var waterAtMermaid = waterYAt(MERMAID_X);

    if (mermaidY < waterAtMermaid) {
        // underwater
        if (isKeyDown) {
            if (mermaidY > 0) {
                mermaidY -= 0.9 * (1-(seaLevel - mermaidY) / seaLevel);
            }
        } else {
            mermaidYV += 0.1;
            mermaidY += mermaidYV;
        }

        if (Math.abs(mermaidYV) > 1 && mermaidY >= waterAtMermaid) {
            // launch
            console.log("launch " + mermaidYV);
            mAcc -= mermaidYV * 1;
        }
    } else {
        // in air
        if (isKeyDown) {
            mermaidYV -= 0.05;
        } else {
            mermaidYV -= 0.15;
        }
        mermaidY += mermaidYV;

        if (Math.abs(mermaidYV) > 1 && mermaidTimeout <=0 && mermaidY < waterAtMermaid) {
            console.log("splash " + mermaidYV);
            var power = mermaidYV * mermaidYV;
            mAcc += power * 2;
            mermaidTimeout = 5;
            mermaidYV = 0;
        }
    }

    wvy += mAcc * 0.5;
    mAcc *= 0.9;

    mermaidTimeout--;
    if (mermaidTimeout < 0)
    {
        mermaidTimeout = 0;
    } else {
        if (mermaidY > waterAtMermaid) {
            mermaidY = waterAtMermaid;
        }
    }

    if (mermaidY < 0) {
        mermaidY = 0;
    }

    if (mermaidY > waterAtMermaid &&  mermaidY < waterAtMermaid - 1) {
        mermaidY = waterAtMermaid;
    }

    wvy -= waterChargePower * 0.1;

    waterChargePower += (wvy * 0.05);
    wvy *= 0.97;
    if (waterChargePower > WATER_CHARGE_MAX) {
        waterChargePower = WATER_CHARGE_MAX;
    } else if (waterChargePower < -WATER_CHARGE_MAX) {
        waterChargePower = -WATER_CHARGE_MAX;
    }


    var leftMost = 0;//Math.sin(time * 7) * 3 + Math.sin(time * 3) * 0.2;
    var mermaidWave = -waterChargePower;
    /*
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
     */

    for (var i = NUM_WATER_SEGMENTS - 1; i >= 0; i--) {

        var l = 0;
        if (i > 0) {
            l = waterLevels[i - 1];
        } else {
            l = leftMost;
        }

        if (i == MERMAID_X) {
            l += mermaidWave;
        }


        waterLevels[i] = l;
    }
}

