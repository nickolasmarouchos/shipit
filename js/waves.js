
var simpleWave = [];
var tinyWave = [];

(function() {
    var LENGTH = 100;

    for (var i = 0; i < LENGTH; i++) {
        var y = Math.sin(i / 10);
        y *= (LENGTH - i) / LENGTH;
        simpleWave.push(y);
    }

})();

(function() {
    var LENGTH = 60;

    for (var i = 0; i < LENGTH; i++) {
        var y = Math.sin(i / 7) * 0.6;
        y *= (LENGTH - i) / LENGTH;
        tinyWave.push(y);
    }

})();
