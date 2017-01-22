
function makeBoat(config,maxSailors)
{
    var x = pixWidth + 30;
    var y = waterYAt(x)

    var speed = config.speed + Math.random();

    var items = config.sailors;

    var numSailors = items[Math.floor(Math.random()*items.length)];
    if (numSailors>maxSailors) numSailors=maxSailors;
    
    var possibleSailors = 0;

    config.parts.forEach(function(part){
        if (part.sailors) {
            possibleSailors += part.sailors.length;
        }
    });

    var sailors = [];
    var sailorsDistributed = 0;
    var escCounter=0;
    while (sailorsDistributed < numSailors)
    {
        var randomSailor = Math.floor(Math.random() * possibleSailors);
        if (sailors.indexOf(randomSailor) == -1)
        {
            sailors.push(randomSailor);
            sailorsDistributed++;
        }
        escCounter++;
        if (escCounter > 10000)
        {
            console.error("escCounter triggered");
            break;
        }
    }

  return {
      x:x,
      y:y,
      sinkingVX:0,
      vx:0,
      vy:0,
      speed:speed,
      config:config,
      yHist:[y,y,y,y,y,y,y,y,y,y],
      invTime: 0,
      hp:numSailors,
      sailors:sailors
  };
};

var activeBoats = [];

var MERMAID_X = 17;
var BOAT_HARDNESS = 11;
var INV_TIME = 60;

function resetBoats()
{
    activeBoats = [];
}

function updateAliveBoat(boat)
{
    boat.x += (boat.vx-boat.config.speed) * 2 * deltaTime;
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
        boat.vy -= 9;
        if (boat.x < pixWidth) {
            // on screen
            boat.vx += 0.2;
        }
    } else {
        boat.vy *= 0.95;
        boat.vx *= 0.9;
        boat.vy += 3 * Math.sqrt(dY);
    }

    boat.y += boat.vy * deltaTime * 0.3;

    if (boat.invTime > 0)
    {
        boat.invTime--;
    }

    var acceleration = boat.vy - prevVY;

    if (Math.abs(acceleration) > BOAT_HARDNESS && boat.invTime <= 0) {
        if (boat.x < pixWidth) {
            // on screen

            boat.hp--;
            score++;
            boat.sinkingVX = boat.config.speed;
            boat.invTime = INV_TIME;
            boat.sailors.shift();
            killSailor(boat.x, boat.y);
        }
    }
}


function updateSinkingBoat(boat)
{
    boat.vy = 0.9 * boat.vy + 0.1 * -25;
    boat.x -= boat.sinkingVX * deltaTime;
    boat.sinkingVX *= 0.97;

    if (boat.y > -10) {
        boat.y += boat.vy * deltaTime * 0.3;
    }
}

function updateBoats()
{
    for (var boatI = 0; boatI < activeBoats.length;boatI++) {
        var boat = activeBoats[boatI];

        var prevY = boat.y;

        boat.yHist.unshift(prevY);
        boat.yHist.length -= 1;

        if (boat.hp > 0)
        {
            updateAliveBoat(boat);
        } else {
            updateSinkingBoat(boat);
        }

    }
}
