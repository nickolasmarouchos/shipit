var deadSailors = []
var tombstones = []

function killSailor(locx, locy)
{
    var deadSailor = {
        "x": locx,
        "y": locy,
        "velocity": 3,
        "rotation": 0
    };
    
    deadSailors.push(deadSailor);
    //console.log("dead sailor");
}

function createTombstone(locx,locy)
{
    var tombstone = {
        "x": locx,
        "y": locy
    }
    
    tombstones.push(tombstone);
}

function drawDeadSailors()
{
    for (var i = 0; i<deadSailors.length; i++)
    {
        updateDeadSailor(deadSailors[i]);
    }
}

function drawTombstones()
{
    for (var i = 0; i<tombstones.length; i++)
    {
        drawSprite(sailor, tombstones[i].x, tombstones[i].y);
    }
}

function updateDeadSailor(deadSailor)
{
    
    var gravity = -0.15;
    
    deadSailor.velocity += gravity;
    
    deadSailor.y += deadSailor.velocity;
    
    if(deadSailor.y < 0)
    {
        createTombstone(deadSailor.x, 0);
        deadSailors.splice(deadSailors.indexOf(deadSailor),1);
    }else{
        drawSprite(sailor, deadSailor.x, deadSailor.y);
    }
    
}