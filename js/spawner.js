
function spawnBoat(name)
{
    activeBoats.push(makeBoat(BOATS[name]));
}

var acc = 5;

function updateSpawner()
{
    acc += deltaTime;

    if (acc > 5)
    {
        spawnBoat("barrel");
        acc = 0;
    }
}
