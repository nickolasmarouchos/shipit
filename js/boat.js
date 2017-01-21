
function makeBoat()
{
  return {
      x:pixWidth /2,
      y:pixHeight,
      vx:0,
      vy:0
  };
};

var activeBoats = [];

var SPRING = 2;

function resetBoats()
{
    activeBoats = [];
    activeBoats.push(makeBoat());
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
        boat.y += boat.vy * deltaTime * 0.3;
    }
}
