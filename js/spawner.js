
function spawnBoat(name)
{
    activeBoats.push(makeBoat(BOATS[name]));
}

var gameTime = 0;
var gameStage = 0;


var shipTypes = [
	"tube",
	"barrel",
	"rowboat",
	"fishboat", 
	"tug",
	"pirate",
	"titanic"
];

//value corresponds to ship types
var spawnTime = [
	0,
	0,
	0,
	0,
	0,
	0,
	0
]

//how much time per stage / affects spawn frequency - 45s to stage 2
var stageTime = [
	45,
	90
]

//frequency per ship [min,max]
var spawnFrequency = [
	[[1,4], [3,7], [5,10], [7,13], [9,16], [00,00], [00,00]],
	[[1,4], [3,7], [5,10], [7,13], [9,16], [11,19], [00,00]],
	[[1,4], [3,7], [5,10], [7,13], [9,16], [11,19], [13,22]]
];

function updateSpawner()
{
    for(var i = 0; i < shipTypes.length; i++){
  		if(spawnFrequency[gameStage][i][1] != 0){
  			spawnTime[i] += deltaTime;
  			if(spawnTime[i] >= Math.floor(Math.random() * spawnFrequency[gameStage][i][1]) + spawnFrequency[gameStage][i][0]){
  				console.log("spawned: " + shipTypes[i]);
  				spawnBoat(shipTypes[i]);
  				spawnTime[i] = 0;
  			}
  		}

    }

    gameTime += deltaTime;

    if(gameTime >= stageTime[gameStage] ){
    	gameStage++;
    	console.log("Stage: " + (gameStage + 1));


    }

}




