
function makeBoat(config)
{
    var x = pixWidth + 30;
    var y = pixHeight / 2 + 10;
  return {
      x:x,
      y:y,
      sinkingVX:0,
      vy:0,
      config:config,
      yHist:[y,y,y,y,y],
      invTime: 0,
      hp:3
  };
};

var activeBoats = [];

var SPRING = 2;
var SPEED = 0.1;
var MERMAID_X = 10;
var INV_TIME = 60;
var HARDINESS = 20;

function resetBoats()
{
    activeBoats = [];
}

function updateAliveBoat(boat)
{
    boat.x -= SPEED;
    if (boat.x < MERMAID_X)
    {
        console.log("GAME OVER");
        reset();
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
    if (Math.abs(acceleration ) > HARDINESS && boat.invTime == 0) {
        boat.hp--;
        boat.sinkingVX = SPEED;
        boat.invTime = INV_TIME;
    }
}

function updateSinkingBoat(boat)
{
    boat.vy = 0.9 * boat.vy + 0.1 * -25;
    boat.x -= boat.sinkingVX;
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
