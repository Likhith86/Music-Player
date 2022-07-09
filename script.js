console.log("Welcome to LR Player")

let songIndex = 1;
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let audioElement = new Audio('songs/1.mp3');
let mainPlay = document.getElementById('mainPlay');
let gif = document.getElementById('gif');
let songs = [
    {songName : "Thoda Thoda Pyaar", filePath : "songs/1.mp3",coverPath : "images/1.jfif"},
    {songName : "kgf", filePath : "songs/2.mp3",coverPath : "images/2.webp"},
    {songName : "Airtel La La", filePath : "songs/3.mp3",coverPath : "images/3.png"},
    {songName : "Baguntundi Nuvvu", filePath : "songs/4.mp3",coverPath : "images/4.jpg"},
    {songName : "Bekhayali", filePath : "songs/5.mp3",coverPath : "images/5.jfif"},
    {songName : "Faded", filePath : "songs/6.mp3",coverPath : "images/6.png"},
    {songName : "Shiva Tandavam", filePath : "songs/7.mp3",coverPath : "images/7.jfif"}
];
let songItems = Array.from(document.getElementsByClassName('songItem'));
let progressBar = document.getElementById('progressBar');

songItems.forEach((element,index)=>{
    element.getElementsByClassName('songName')[0].innerHTML = songs[index].songName;
    element.getElementsByTagName('img')[0].src = songs[index].coverPath;
})

function nextSong(index){
    pauseOld(index);
    if(index >= 7){
        index = 1;
    }
    else {
        index += 1;
    }
    songIndex = index;
    playNew(songIndex);
    mainPlayChange();
}

function previousSong(index){
    pauseOld(index);
    if(index <= 1){
        index = 7;
    }
    else {
        index -= 1;
    }
    songIndex = index;
    playNew(songIndex);
    mainPlayChange();
}

function pauseOld(index){
    document.getElementById('mainSongName').innerHTML = songs[index-1].songName;
    gif.style.opacity = 0;
    let song = document.getElementById(`${index}`);
    song.classList.remove('fa-circle-pause');
    song.classList.add('fa-circle-play');
    // audioElement.pause();
}

function playNew(index){
    gif.style.opacity = 1;
    document.getElementById('mainSongName').innerHTML = songs[index-1].songName;
    let song = document.getElementById(`${index}`)
    song.classList.remove('fa-circle-play');
    song.classList.add('fa-circle-pause');
    audioElement.src = songs[index-1].filePath;
    audioElement.currentTime = 0;
}

function playSame(index){
    document.getElementById('mainSongName').innerHTML = songs[index-1].songName;
    gif.style.opacity = 1;
    let song = document.getElementById(`${index}`)
    song.classList.remove('fa-circle-play');
    song.classList.add('fa-circle-pause');
}

function pauseSame(index){
    document.getElementById('mainSongName').innerHTML = songs[index-1].songName;
    gif.style.opacity = 0;
    let song = document.getElementById(`${index}`)
    song.classList.remove('fa-circle-pause');
    song.classList.add('fa-circle-play');
}

function mainPlayChange(){
    if(audioElement.paused){
        gif.style.opacity = 1;
        playSame(songIndex);
        mainPlay.classList.remove('fa-circle-play');
        mainPlay.classList.add('fa-circle-pause');
        audioElement.play();
    }
    else{
        gif.style.opacity = 0;
        pauseSame(songIndex);
        audioElement.pause();
        mainPlay.classList.remove('fa-circle-pause');
        mainPlay.classList.add('fa-circle-play');
    }
}

mainPlay.addEventListener('click',()=>{
    mainPlayChange();
})

audioElement.addEventListener('timeupdate',()=>{
    progressBar.value = (audioElement.currentTime/audioElement.duration)*100;
    if(progressBar.value == 100 && songIndex !=7){
        nextSong(songIndex);
    }
    // console.log(songIndex);
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = (audioElement.duration*progressBar.value)/100;
})

songItems.forEach((element,index)=>{
    document.getElementById(`${index+1}`).addEventListener('click',()=>{
            if(audioElement.paused){
                if(index+1 == songIndex){
                    playSame(index+1);
                }
                else{
                    playNew(index+1);
                }
            }
            else{
                if(index+1 == songIndex){
                    pauseSame(index+1);
                }
                else{
                    pauseOld(songIndex);
                    playNew(index+1);
                }
            }
            songIndex = index+1;
            mainPlayChange();  
    })
})

next.addEventListener('click',()=>{
    nextSong(songIndex);
})

previous.addEventListener('click',()=>{
    previousSong(songIndex);
})

