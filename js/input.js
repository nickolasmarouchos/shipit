
var chargeCurrent = 0;
var chargeStep = 0;

var isKeyDown = false;

var CHARGE_SPEED = 10;
var CHARGE_MIN = 15;
var CHARGE_MAX = 100;

var INPUT_SPRITES = [
    "img/water_d1.png",
    "img/water_d2.png",
    "img/water_d3.png",
    "img/water_d4.png"
];

function resetInput()
{
    chargeCurrent = 0;
}

function initInput(){
    document.addEventListener("keydown", charge, false);
    document.addEventListener("keyup", release, false);
}


function charge(){
    isKeyDown = true;
    if (isPaused)
    {
        return;
    }
    if(chargeCurrent < CHARGE_MAX){
        chargeCurrent += CHARGE_SPEED;
    } else {
        if (chargeStep < WAVES.length - 1) {
            chargeStep++;
            chargeCurrent = 0;
        }
    }

}

function release(){


    isKeyDown = false;

    if (isPaused)
    {
        return;
    }


    if (chargeCurrent > CHARGE_MIN || chargeStep > 0) {
        var power = 0.2 + (3.5 * chargeStep + 1);

        activeWaves.push(makeWave(power, chargeStep + 2));
    }

    chargeCurrent = 0;
    chargeStep = 0;
}

function drawChargeIndicator()
{
    if (chargeStep > 0)
    {
        for (var j=0;j<CHARGE_MAX/5;j++)
        {
            drawSprite(INPUT_SPRITES[chargeStep-1],0,j * 5);
        }
    }
    for (var i=0;i<chargeCurrent/5;i++)
    {
        drawSprite(INPUT_SPRITES[chargeStep],0,i * 5);
    }
}
