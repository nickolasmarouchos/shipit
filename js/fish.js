var FISH = ["img/fish/f1.png","img/fish/f2.png"];

var activeFish = [];

function resetFish()
{
    activeFish = [];
}

function spawnFish(x,y)
{
    activeFish.push({
        x:x,
        y:y,
        f:0
    });
}

function updateFish() {
    for (var fi = 0; fi < activeFish.length; fi++) {
        var fish = activeFish[fi];

        if (fish.x < -10) {
            fish.x = pixWidth + Math.random() * 50;
        }

        fish.x -= 0.3;
        fish.f+=0.1;
    }
}
function drawFish()
{
    for (var fi =0; fi<activeFish.length;fi++)
    {
        var fish = activeFish[fi];
        drawSprite(FISH[Math.floor(fish.f) % 2], fish.x, fish.y);
    }
}
