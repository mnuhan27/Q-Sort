
class QBox {
  constructor(bX, bY, bPos) {
    this.x = bX;
    this.y = bY;
    this.pos = bPos;
    this.dragging = false;
    this.rollover = false;
    
  }

  drawBox() {
    fill(255);
    stroke("black",0,0);
    


    if (this.rollover) {
      fill(0,255,0);
      //stroke(255,0,0);
      //imgScale = 80;
      text( this.pos,1200,200);
      //text(mouseX,1200,300);
      //text(mouseY,1200,400);
    }
    rectMode(CENTER);
    //fill(255);
    //stroke(this.color, 0, 0);
    fill(255);
    rect(this.x, this.y, 500, 200);

    if(this.pos == 1){
      textSize(30);
      fill(0);
      text("Least Agree",this.x - 50,this.y);

    }else if (this.pos == 2){
      textSize(30);
      fill(0);
      text("No Preference",this.x - 50,this.y);
    }else{
      textSize(30);
      fill(0);
      text("Most Agree",this.x -50,this.y);

    }
  }

  mouseIsOver() {
    //detects if picture is over box
    if (
      mouseX > this.x - 250 &&
      mouseX < this.x + 250 &&
      mouseY > this.y - 100 &&
      mouseY < this.y + 100
    ) {
      

      this.rollover = true;

      if(this.filled){
        this.rollover = false;
      }
      //console.log("Mouse Pressed");
      return true;
    }else{
      this.rollover = false;
    }



  }



}



class QImg{
  constructor(imgFile,imgPos,picNum){
    this.imgFile = imgFile;
    this.pos = imgPos;
    this.picNum = picNum;
    

  }  


}

var Qboxes = [];


let qImgArr = []


let img;

//variables for dragging image
var bx;
var by;
var boxSize = 320;
var overBox = false;
var locked = false;
var xOffset = 0.0;
var yOffset = 0.0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var picNum = getRandomInt(1, 45).toString();
var picName = picNum + ".jpg";

function shuffleNum(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

var numPicsArray = [];
var numPics = 36;

for (let i = 1; i <= numPics; i++) {
    numPicsArray.push(i);

}
//picOrder is an array with the random order of pictures
picOrder = shuffleNum(numPicsArray);
console.log(picOrder);

imgSet = []

imgLoadedArr = []

function imgLoaded(){
  imgLoadedArr.push(true);
}



function mouseDragged(){
  
     for (let i = 0; i < Qboxes.length; i++) {
      if (Qboxes[i].mouseIsOver()) {
        //imgScale = 80;
        Qboxes[i].mouseIsOver();
      } else {
        //imgScale = 320;
      }
    
}
}

function mousePressed() {
  
  if (overBox) {
    locked = true;
    //fill(255, 255, 255);
  } else {
    locked = false;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}


function mouseDragged() {
  if (locked) {
    bx = mouseX - xOffset;
    by = mouseY - yOffset;
    //imgScale = 80;

    for (let i = 0; i < Qboxes.length; i++) {
      if (Qboxes[i].mouseIsOver()) {
        //imgScale = 80;
        Qboxes[i].mouseIsOver();
      } else {
        //imgScale = 320;
      }
    }
    //higlight box where mouse is;
  }
}

bxSet = []
bySet = []


function mouseReleased() {
  locked = false;
  //add code to see if inside grid
  /* if(insideGrid){
        //drop into the box that mouse is over
        //resize image to fit box
    } */
  


  
  

}


let loadData = function(callback){

  data = loadJSON('../data.json');
  callback();
}

let loadPics = function(){
 
  for (let i = 0; i < picOrder.length; i++) {
  imgItem = loadImage("../assets/" + picOrder[i].toString() + ".jpg" );
  imgSet.push(imgItem);
} 

}

function preload(){

  loadData(loadPics);

 

/*  for (let i = 0; i < picOrder.length; i++) {
  imgItem = loadImage("../assets/" + picOrder[i].toString() + ".jpg" );
  imgSet.push(imgItem);
} 
  //console.log(imgLoadedArr)

  data = loadJSON('../data.json'); */
  

//data = loadJSON('./studies/data.json');

//this is running



  
}

//intial image positions
let imageX = 100;
let imageY = 100;
let diameter = 320;


function setup() {
  createCanvas(windowWidth, windowHeight);

  bx = 100;
  by = 50;

  for(let i = 0; i < 3; i++){
    
    Qboxes.push(new QBox(950,200 +  i*300, i +1));

    
  }

  shrinkButton = createButton('Shrink Main Image');
  shrinkButton.size(100);
  shrinkButton.position(1200,10);
  shrinkButton.mousePressed(shrinkImage); 

  enlargeButton = createButton('Enlarge Main Image');
  enlargeButton.size(100);
  enlargeButton.position(1200,60);
  enlargeButton.mousePressed(enlargeImage);

  finishButton = createButton('Finish Sort');
  finishButton.size(100);
  finishButton.position(1350,60);
  finishButton.mousePressed(finished);

  placeButton = createButton('Place Main Image');
  placeButton.size(100);
  placeButton.position(1350,10);
  placeButton.mousePressed(placeImage); 
  
  
  
}

var imgScale = 320;

function finished(){

  let presortData = {
    least: [],
    middle: [],
    most: []

  }

  for(let i = 0; i++; i , qImgArr.length){

    if(qImgArr[i].pos == 1){
      append(presortData.least,qImgArr[i].picNum);
    
    }else if(qImgArr[i] == 2){
      append(presortData.middle,qImgArr[i].picNum);
    }else{
      append(presortData.most,qImgArr[i].picNum);
    }

  }

  saveJSON(presortData,'presortData.json');


  
  if(qImgArr.length == data.boxes){
  window.location.replace('../qsort');
  }
}

function shrinkImage(){
  imgScale = 80;
  boxSize = 80;

}

function enlargeImage(){
  imgScale = 320;
  boxSize = 320;
}

imgX = []
imgY = []
imgPos = []
imgPlaced = []

var m = 0;

function placeImage(){

  //change main image to next image on list
  //on q-sort box center image over particular box and record position
  
  for (let i = 0; i < Qboxes.length; i++) {
    if (Qboxes[i].rollover){
      //there should only be one
      qImgArr.push(new QImg(imgSet[m],Qboxes[i].pos,picOrder[m]));
      

      // newRow('Photo ' + picOrder[m].toString(),Qboxes[i].pos);
      m+=1;
      bx  = 100
      by  = 50;
      imgScale = 320;
      boxSize = 320;
      Qboxes[i].rollover = false;
    }
  }
  //reset everything to next image
 /*  m+=1;
  bx  = 100
  by  = 50; */
  //image(imgSet[i],imgX[i],imgY[i]);
  
}


function draw() {
  background(255);
  for(let i = 0; i < Qboxes.length;i++){
    Qboxes[i].drawBox();
  }



    if (
    mouseX > bx - boxSize &&
    mouseX < bx + boxSize &&
    mouseY > by - boxSize &&
    mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      //fill(153);
    }
  } else {
    //fill(153);
    overBox = false;
  }

  rectMode(RADIUS);
  fill(125);
  image(imgSet[m], bx, by, imgScale, imgScale);
  
}