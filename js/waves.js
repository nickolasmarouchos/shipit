
var simpleWave = [];

var LENGTH = 100;

for (var i=0; i<LENGTH;i++)
{
    var y =Math.sin(i/10);
    y *= (LENGTH - i) / LENGTH
    simpleWave.push(y);
}
