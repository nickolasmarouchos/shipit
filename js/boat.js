
function makeBoat(config)
{
    var x = (pixWidth /2);
    var y = pixHeight / 2 + 100;
  return {
      x:x,
      y:y,
      vx:0,
      vy:0,
      config:config,
      yHist:[y,y,y,y,y]
  };
};

var activeBoats = [];

var SPRING = 2;

function resetBoats()
{
    activeBoats = [];
    activeBoats.push(makeBoat(BOATS["tug"]));
}

function updateBoats()
{
    for (var boatI = 0; boatI < activeBoats.length;boatI++) {
        var boat = activeBoats[boatI];
        var waterC = waterYAt(boat.x);

        var dY = waterC - boat.y;
        if (dY < 0) {
            // free fall
            boat.vy -= SPRING * 3;
        } else {
            boat.vy *= 0.9;
            boat.vy += SPRING * dY;
        }

        boat.yHist.unshift(boat.y);
        boat.yHist.length = 5;

        boat.y += boat.vy * deltaTime * 0.3;
    }
}
