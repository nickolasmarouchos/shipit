
function spawnBoat(name)
{
    activeBoats.push(makeBoat(BOATS[name]));
}

var gameTime = 0;
var gameStage = 0;
var waveTime = 0;

function resetSpawner()
{
    gameTime = 0;
    gameStage = 0;
    waveTime = 0;
}

var shipTypes = [
	"tube",
	"barrel",
	"rowboat",
	"fishboat", 
	"tug",
	"pirate",
	"titanic"
];

var spawnOffset = [
	0,
	0,
	1,
	0, 
	2,
	3,
	4
];

//frequency per ship [min,max]
var spawnWeights = [
	[[1],[1],[1],[0],[0],[0],[0]],
	[[1],[1],[1],[3],[3],[1],[0]],
	[[1],[1],[1],[1],[1],[1],[1]]
];

var stageWaveOffset = [
	2,
	1,
	0
];

var waveOffsetMultiplier = [
	1.0,
	0.8,
	0.5
];

var waveSailorMax = [
	1,
	2,
	10
];


//how much time per stage / affects spawn frequency - 45s to stage 2
var stageTime = [
	15,
	60,
	90
];

function checkSpawn()
{
	waveTime -= deltaTime;
	if(waveTime <= 0){
		spawnWave();
	}
	
}

function spawnWave()
{
	var spawnWeightTotal = 0;
	for(var x = 0; x< spawnWeights[gameStage].length;x++)
	{
		spawnWeightTotal += spawnWeights[gameStage][x][0];
	}
	var selectWeight = Math.round(Math.random()*spawnWeightTotal);
		
	var selectedBoat = 0;
	for(var x = 0; x< spawnWeights[gameStage].length;x++)
	{
		selectWeight -= spawnWeights[gameStage][x];
		if(selectWeight <= 0){
			selectedBoat = x;
			break;
		}
	}
	
	spawnBoat(shipTypes[selectedBoat],waveSailorMax[gameStage]);
	
	waveTime = stageWaveOffset[gameStage]+spawnOffset[selectedBoat]*waveOffsetMultiplier[gameStage];
	
}


function updateSpawner()
{
	checkSpawn();

    gameTime += deltaTime;

    if(gameTime >= stageTime[gameStage] ){
    	gameStage++;
        if (gameStage > spawnWeights.length - 1)
        {
            gameStage = spawnWeights.length - 1;
        }
    	//console.log("Stage: " + (gameStage + 1));
    }
}




