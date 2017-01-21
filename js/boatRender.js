
function drawBoats()
{
    for (var boatI = 0; boatI < activeBoats.length;boatI++) {
        var boat = activeBoats[boatI];
        var config = boat.config;

        var sailorCount = 0;

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
            
            
            if (part.sailors)
            {
                for(var slr = 0; slr<part.sailors.length; slr++)
                {
                    if ( boat.sailors.indexOf(sailorCount) != -1) {
                        var slrx = x - config.width / 2 + part.sailors[slr].x;
                        var slry = boat.yHist[1] + part.sailors[slr].y;
                        drawSprite(sailor, slrx, slry);
                    }
                    sailorCount++;
                }
            }
            drawSprite(part.img, x, y);
        }
    }
}

