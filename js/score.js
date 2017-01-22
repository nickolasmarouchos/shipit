
var score = 0;

function resetScore()
{
    score = 0;
}

var numbersSprites = [
    "img/numbers/0.png",
    "img/numbers/1.png",
    "img/numbers/2.png",
    "img/numbers/3.png",
    "img/numbers/4.png",
    "img/numbers/5.png",
    "img/numbers/6.png",
    "img/numbers/7.png",
    "img/numbers/8.png",
    "img/numbers/9.png"
];

function drawScore()
{
    var div = 1;
    for (var i=0;i<5;i++) {
        var v = Math.floor(score/div) % 10;
        drawSprite(numbersSprites[v], i * -4 + pixWidth/2 + 8, 11);
        div *= 10;
    }
}
