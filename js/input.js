var number = 5;
var numTest = document.getElementById("gl");
//var wave_amplitude = document.getElementById("wave_amplitude");

var canvas = document.getElementById("glcanvas");
var chargeCurrent = 0; 
var chargeSpeed = 5;
var charageMax = 100; 


function initInput(){
    canvas.addEventListener("keydown", charge, false);
    canvas.addEventListener("keyup", release, false);
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
    chargePlus = chargeCurrent;
    chargeCurrent = 0;
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


