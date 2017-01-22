//var SOUNDS = ['die'];

var effects = {
"die":{
    "src":"audio/die.mp3",
    "volume":0.5
},
"splash":{
    "src":"audio/die.mp3",
    "volume":0.5
}
};

var music = createAudio('audio/music_relaxed.mp3', { volume: 0.1 }, function() {});

function setupSounds()
{
    

}

function createAudio(src, options, canplay)
{
    var audio = document.createElement('audio');
    audio.addEventListener('canplay', canplay, false);
    audio.volume = options.volume || 0.5;
    audio.loop   = options.loop;
    audio.src    = src;
    return audio;
}



