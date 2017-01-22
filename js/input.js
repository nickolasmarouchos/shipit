
var chargeCurrent = 0;
var chargeStep = 0;

var isKeyDown = false;

var CHARGE_SPEED = 50;
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

    document.addEventListener("touchstart", charge, false);
    document.addEventListener("touchend", release, false);
}


function charge(){
    isKeyDown = true;
}

function updateInput()
{
    if (isKeyDown && !mermaidRelaxing) {
        if (chargeCurrent < CHARGE_MAX) {
            chargeCurrent += CHARGE_SPEED * deltaTime;
        } else {
            if (chargeStep < 3) {
                chargeStep++;
                chargeCurrent = 0;
            }
        }
    }

    if (mermaidRelaxing) {
        mermaidYV += -0.1 * mermaidY;
        mermaidYV *= 0.8;
        mermaidY += mermaidYV * 0.5;
        if (Math.abs(mermaidYV) < 0.1) {
            mermaidYV = 0;
            mermaidY = 0;
            mermaidRelaxing = false;
        }
    }
}

function release(){
    isKeyDown = false;

    if (isPaused)
    {
        return;
    }

    if (mermaidRelaxing)
    {
        return;
    }


    var splash = createAudio('audio/wave01.wav', { volume: 0.1, loop: false }, function() {});
    splash.play();

    mermaidRelaxing = true;
    mermaidY =chargeMermaidY();
    mermaidYV = 0;

    if (chargeCurrent > CHARGE_MIN || chargeStep > 0) {
        var power = 0.2 + (3.5 * chargeStep + 1);

        activeWaves.push(makeWave(power, chargeStep + 2));
    }

    chargeCurrent = 0;
    chargeStep = 0;
}

var mermaidRelaxing = false;
var mermaidYV = 0;
var mermaidY = 0;

function chargeMermaidY()
{
    var c = chargeCurrent / CHARGE_MAX;
    var y = (c + chargeStep)*10;
    return y;
}

function drawMermaid()
{
    var y = chargeMermaidY();
    if (mermaidRelaxing)
    {
        y = mermaidY;
    }
    drawSprite(mermaid, 17, 49 - y*1.8);
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
