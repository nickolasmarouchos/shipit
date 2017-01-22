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
    
    var die = createAudio('audio/scream01.wav', { volume: 0.5, loop: false }, function() {});
    die.play();
    
    deadSailors.push(deadSailor);
    //console.log("dead sailor");
}

function createTombstone(locx)
{
    var tombstone = {
        "x": locx,
        "y": 8
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
        drawSprite(tombstone, tombstones[i].x, tombstones[i].y);
    }
}

function updateDeadSailor(deadSailor)
{
    
    var gravity = -0.15;
    
    deadSailor.velocity += gravity;
    
    deadSailor.y += deadSailor.velocity;
    
    if(deadSailor.y < 0)
    {
        createTombstone(deadSailor.x);
        deadSailors.splice(deadSailors.indexOf(deadSailor),1);
    }else{
        drawSprite(sailor, deadSailor.x, deadSailor.y);
    }
    
}