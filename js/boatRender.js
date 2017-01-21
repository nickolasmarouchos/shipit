
function drawBoatsBack()
{
    //Draw people behind boat
}

function drawBoats()
{
    for (var boatI = 0; boatI < activeBoats.length;boatI++) {
        var boat = activeBoats[boatI];
        var config = boat.config;

        //Draw main boat
        var x = boat.x;
        for (var pi = 0; pi<config.parts.length; pi++)
        {
            var y = boat.y;

            var part = config.parts[pi];
            var delay = part.delay;
            if (delay > 0)
            {
                y = boat.yHist[delay];
            }
            y+=config.offset;
            drawSprite(part.img, x, y);
        }
        //drawSprite(boat1, x, y);
    }
}


function drawBoatsFront()
{   
    //Draw people in front of boat
}
