let data;
var startText;

function preload(){
	data = loadJSON('../data.json');	
}

function setup() {
  noCanvas();
  createP(data.finish)
  
  
}

function draw() {
  //background(30);
  
  
  //fill(dog.r, dog.g, dog.b);
  //text(dog.name, 130,200);
  
}


function start(){
  window.open("localhost:8000/qsort")
  
}