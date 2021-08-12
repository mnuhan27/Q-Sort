let data;
var startText;

function preload(){
	data = loadJSON('../data.json');	
}

function setup() {
  noCanvas();
  createP(data.start)
  startButton = createButton('Start the Sort');
  startButton.size(200);
  startButton.position(width/2,800);
  startButton.mousePressed(start);
  
}

function draw() {
  //background(30);
  
  
  //fill(dog.r, dog.g, dog.b);
  //text(dog.name, 130,200);
  
}


function start(){

  if(data.presort){
    if(data.exparm == 1){
    window.location.replace("../presort1")
    }else{
      window.location.replace("../presort2")
    }
  }else{
    window.location.replace("../qsort")

  }
  
  
}