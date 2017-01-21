
var chargeCurrent = 0;
var chargeSpeed = 5;
var charageMax = 100; 


function resetInput()
{
    chargeCurrent = 0;
}

function initInput(){
    document.addEventListener("keydown", charge, false);
    document.addEventListener("keyup", release, false);
}


function charge(){
    if(chargeCurrent < charageMax){
        chargeCurrent += chargeSpeed;
    }
    if(chargeCurrent >= charageMax){
        console.log("charged");               
    }
}

function release(){

    var power = chargeCurrent;

    chargePlus = chargeCurrent;
    chargeCurrent = 0;
    chargeTime = 0;

    var templateWave = simpleWave;
    var newWave = [];
    for (var i=0;i<templateWave.length;i++)
    {
        newWave.push(templateWave[i] * power);
    }

    activeWaves.push(newWave);

    console.log("released");
}






//canvas.addEventListener("mousedown", function(){console.log("Position: " + (event.clientX - canvas.getBoundingClientRect().left) + ", " + (event.clientY - canvas.getBoundingClientRect().top))}, false);
//canvas.addEventListener("mousemove", function(){console.log(event.clientX)});
//canvas.addEventListener("mousedown", function(){drawSprite(water, event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top)}, false);
/*canvas.addEventListener("mousedown", function(){
	increaseAmplitude();
	console.log("WORKING2");
});
*/

//canvas.onmousedown = function(){console.log("clicked")}

//function hello() {number++, console.log(number)};

/*
increaseAmplitude(){
	wave_amplitude += 1;
	console.log("WORKING");
}

*/


