
function drawBoatsBack()
{
    //Draw people behind boat
}

function drawBoats()
{
    for (var boatI = 0; boatI < activeBoats.length;boatI++) {
        var boat = activeBoats[boatI];

        //Draw main boat
        var x = boat.x;
        var y = boat.y + 16;
        drawSprite(boat1, x, y);
    }
}


function drawBoatsFront()
{   
    //Draw people in front of boat
}
