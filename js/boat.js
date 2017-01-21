
function makeBoat(config)
{
    var x = pixWidth  + 30;
    var y = waterYAt(x);

    var items = config.sailors;

    var numSailors = items[Math.floor(Math.random()*items.length)];

    var possibleSailors = 0;

    config.parts.forEach(function(part){
        if (part.sailors) {
            possibleSailors += part.sailors.length;
        }
    });

    var sailorOffset = Math.floor(Math.random() * (possibleSailors - numSailors));


  return {
      x:x,
      y:y,
      sinkingVX:0,
      vy:0,
      config:config,
      yHist:[y,y,y,y,y],
      invTime: 0,
      hp:numSailors,
      sailorOffset:sailorOffset
  };
};

var activeBoats = [];

var SPRING = 2;
var MERMAID_X = 10;
var BOAT_HARDNESS = 20;
var INV_TIME = 60;

function resetBoats()
{
    activeBoats = [];
}

function updateAliveBoat(boat)
{
    boat.x -= boat.config.speed * deltaTime;
    if (boat.x < MERMAID_X)
    {
        console.log("GAME OVER");
        isPaused = true;
    }
    var waterC = waterYAt(boat.x);

    var prevVY = boat.vy;

    var dY = waterC - boat.y;
    if (dY < 0) {
        // free fall
        boat.vy -= SPRING * 3;
    } else {
        boat.vy *= 0.9;
        boat.vy += SPRING * dY;
    }

    boat.y += boat.vy * deltaTime * 0.3;

    if (boat.invTime > 0)
    {
        boat.invTime--;
    }

    var acceleration = boat.vy - prevVY;
    if (Math.abs(acceleration) > BOAT_HARDNESS && boat.invTime == 0) {
        boat.hp--;
        boat.sinkingVX = boat.config.speed;
        boat.invTime = INV_TIME;
        killSailor(boat.x, boat.y);
    }
}

function updateSinkingBoat(boat)
{
    boat.vy = 0.9 * boat.vy + 0.1 * -25;
    boat.x -= boat.sinkingVX * deltaTime;
    boat.sinkingVX *= 0.97;

    if (boat.y > 10) {
        boat.y += boat.vy * deltaTime * 0.3;
    }
}

function updateBoats()
{
    for (var boatI = 0; boatI < activeBoats.length;boatI++) {
        var boat = activeBoats[boatI];

        var prevY = boat.y;

        boat.yHist.unshift(prevY);
        boat.yHist.length = 5;

        if (boat.hp > 0)
        {
            updateAliveBoat(boat);
        } else {
            updateSinkingBoat(boat);
        }

    }
}
