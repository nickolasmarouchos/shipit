
function spawnBoat(name)
{
    activeBoats.push(makeBoat(BOATS[name]));
}

var gameTime = 0;
var gameStage = 0;


var shipTypes = [
"barrel", 
"fish", 
"tug",
"pirate",
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
	45,
	90
]

var spawnFrequency = [
	[
		[7,10], [0,0], [0,0], [0,0], [0,0]
	], [
		[7,10], [15,20], [0,0], [0,0], [0,0]
	], [
		[4,7], [2,3], [9,12], [5,8], [10,15]
	]

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




