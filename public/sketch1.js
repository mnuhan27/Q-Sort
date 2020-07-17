var columns = 60;
var rows = 40;
var size = 50;

function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(1);
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function draw() {
    rectMode(CENTER);
    noStroke();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            
            fill(0,0,randomIntFromInterval(0,255));
            rect(size * i + windowWidth / 2 - size / 2 * columns, size * j + windowHeight / 2 - size / 2 * rows, size, size, );
            fill(0, randomIntFromInterval(0, 255), randomIntFromInterval(0, 255));
            rect(size*i + windowWidth/2 - size/2*columns,size*j + windowHeight/2 -size/2*rows,size,size,50);
            
        }
        
    }
    
}