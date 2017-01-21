
var chargeCurrent = 0;

var isKeyDown = false;

var CHARGE_SPEED = 5;
var CHARGE_MAX = 100;


function resetInput()
{
    chargeCurrent = 0;
}

function initInput(){
    document.addEventListener("keydown", charge, false);
    document.addEventListener("keyup", release, false);
}


function charge(){
    if(chargeCurrent < CHARGE_MAX){
        chargeCurrent += CHARGE_SPEED;
    }
    isKeyDown = true;
}

function release(){

    isKeyDown = false;

    var power = 0.2+(chargeCurrent / CHARGE_MAX);

    power = 15;

    var templateWave = simpleWave;
    if (chargeCurrent < 50)
    {
        templateWave = tinyWave;
    }
    var newWave = [];
    for (var i=0;i<templateWave.length;i++)
    {
        newWave.push(templateWave[i] * power);
    }

    activeWaves.push(newWave);

    chargeCurrent = 0;
}

function drawChargeIndicator()
{
    for (var i=0;i<chargeCurrent/5;i++)
    {
        drawSprite(chargeIndicator,0,i * 5);
    }
}
