// Returns an array containg each link
async function loadFile(file){
    let text = await file.text();
    let textSplitted = text.split("\n");
    for(let i = 0; i < textSplitted.length; i++){
        if(textSplitted[i].includes("\r")){
            textSplitted[i] = textSplitted[i].slice(0, -1);
        }
    }
    var totalVideos = document.getElementById("amount-of-videos");
    totalVideos.textContent = textSplitted.length;
    return textSplitted;
}

function getTotalAmountOfVideos(){
    var totalVideos = document.getElementById("amount-of-videos");
    return parseInt(totalVideos.textContent);
}

function getVideoValue() {
    var num = document.getElementById("video-number");
    return parseInt(num.textContent);
}

function increaseNumber(){
    var num = document.getElementById("video-number");
    if((getVideoValue() + 1) != getTotalAmountOfVideos()){
        num.textContent = parseInt(num.textContent) + 1;
    }
}

function decreaseNumber(){
    var num = document.getElementById("video-number");
    if(getVideoValue() != 0){
        num.textContent = parseInt(num.textContent) - 1;
    }
}

async function openUrl(){
    var files = document.getElementById("input-file");
    var file = await files.files[0];
    var list = await loadFile(file);

    console.log(list);
    window.open(list[getVideoValue()]);
}
