
function spawnBoat(name)
{
    activeBoats.push(makeBoat(BOATS[name]));
}

var gameTime = 0;
var gameStage = 0;


var shipTypes = [
"tug", 
"barrel", 
"pirate",
"fish",
"titanic"
];


var spawnTime = [
	0,
	0,
	0,
	0,
	0
]

var stageTime = [
	1,
	2
]

var spawnFrequency = [
	[
		[4,8], [2,3], [0,0], [0,0], [0,0]
	], [
		[4,7], [2,3], [0,0], [5,8], [0,0]
	], [
		[4,7], [2,3], [9,12], [5,8], [10,15]
	]

]

function updateSpawner()
{

    for(var i = 0; i < shipTypes.length; i++){
  		if(spawnFrequency[gameStage][i][1] != 0){
  			spawnTime[i] += deltaTime;
  			if(spawnTime[i] >= Math.floor(Math.random() * spawnFrequency[gameStage][i][1]) + spawnFrequency[gameStage][i][0]){
  				//console.log("spawned: " + shipTypes[i]);
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




