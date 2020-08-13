let img;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var imageNum = 45;
var picNum = getRandomInt(1, imageNum).toString();
var picName = picNum + '.jpg';


var imageSet = []

function preload() {

        var picName = i + '.jpg';
        imageSet[45] = loadImage('assets/' + picName);
    
    
}


function setup(){
    createCanvas(windowWidth, WindowHeight);

}

function draw(){
    rectMode(CENTER);
    
    for (let i = 0; i < 45; i++) {
        image(imageSet[i], 100 + 200*i, 100 + 200*i, 100, 100);
    }

    
}
    