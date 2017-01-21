
function spawnBoat(name)
{
    activeBoats.push(makeBoat(BOATS[name]));
}

var acc = 0;

function updateSpawner()
{
    acc += deltaTime;

    if (acc > 1)
    {
        spawnBoat("tug");
        acc = 0;
    }
}
