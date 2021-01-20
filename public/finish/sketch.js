let data;
var startText;

function preload(){
	data = loadJSON('../data.json');	
}

function setup() {
  noCanvas();
  createP(data.finish)
  startButton = createButton('Start the Sort');
  startButton.size(200);
  startButton.position(width/2,200);
  startButton.mousePressed(start);
  
}

function draw() {
  //background(30);
  
  
  //fill(dog.r, dog.g, dog.b);
  //text(dog.name, 130,200);
  
}


function start(){
  window.open("localhost:8000/qsort")
  
}