class QBox {
  constructor(bX, bY, bPos, bColor,filled) {
    this.x = bX;
    this.y = bY;
    this.pos = bPos;
    this.color = bColor;
    this.dragging = false;
    this.rollover = false;
    this.filled = filled;
  }

  drawBox() {
    fill(255);
    stroke(this.color,0,0);
    if (this.rollover) {
      fill(0,255,0);
      //stroke(255,0,0);
      //imgScale = 80;
      text(this.pos,500,200);
    }
    rectMode(CENTER);
    //fill(255);
    //stroke(this.color, 0, 0);
    rect(this.x, this.y, 100, 100);
  }

  mouseIsOver() {
    //detects if picture is over box
    if (
      mouseX > this.x - 50 &&
      mouseX < this.x + 50 &&
      mouseY > this.y - 50 &&
      mouseY < this.y + 50
    ) {
      this.rollover = true;
      //console.log("Mouse Pressed");
      return true;
    }else{
      this.rollover = false;
    }



  }



}

class QImg{
  constructor(imgFile,imgX,imgY,imgPos){
    this.imgFile = imgFile;
    this.imgX = imgX;
    this.imgY = imgY;
    this.pos = imgPos;

  }

  show(){
    
    image(this.imgFile,this.imgX,this.imgY,80,80);
  }

  


}

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


function preload() {


img = loadImage("assets/" + picOrder[0].toString() + ".jpg");

 for (let i = 0; i < picOrder.length; i++) {
  imgItem = loadImage("assets/" + picOrder[i].toString() + ".jpg" );
  imgSet.push(imgItem);
} 
  //console.log(imgLoadedArr)

arrRightImg = loadImage("arrows/arrowright.png");
arrLeftImg = loadImage("arrows/arrowleft.png");

data = loadJSON('studies/data.json');

//dataBoxes = data.numBoxes;
//dataRLabel = data.rightArrowLabel.toString();
//dataLLabel = data.leftArrowLabel.toString();
  
}

img = imgSet[0];

//var img = imgSet[0];

var boxes = 36;
var dataRLabel = "Most Happy"
var dataLLabel = "Least Happy";

var rowBoxes = [1, 3, 5, 7, 9, 11, 13, 15, 17];
var rowTot = [1, 4, 9, 16, 25, 36, 49, 64, 81];

//index corresponds to list of box positions
var rowPositions = [
  [0],
  [-1, 0, 1],
  [-2, -1, 0, 1, 2],
  [-3, -2, -1, 0, 1, 2, 3],
  [-4, -3, -2, -1, 0, 1, 2, 3, 4],
  [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
  [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6],
  [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
  [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
];

//array to hold class of gridboxes
const Qboxes = [];
var rowIndex;
var remBoxes;
var remIndex;
var remEven;

function initQSort(totalBoxes) {
  rowIndex = 0;

  for (let i = 0; i < rowTot.length; i++) {
    if (rowTot[i] == totalBoxes) {
      rowIndex = i;
    } else if (rowTot[i] > totalBoxes) {
      rowIndex = i - 1;
      //console.log(rowIndex);
      break;
    }
  }

  remBoxes = totalBoxes - rowTot[rowIndex];

  //console.log("the number of boxes in main drawing: " + rowTot[rowIndex]);
  //console.log("There are " + remBoxes + " after main drawing ");

  if (remBoxes) {
    remIndex;
    remEven;

    for (let i = 0; i < rowTot.length; i++) {
      //if odd number of remaining boxes
      if (rowTot[i] == remBoxes) {
        remIndex = i;
      } else if (rowTot[i] >= remBoxes && remBoxes % 2 == 0) {
        remIndex = i - 1;
        console.log(remIndex);
        remEven = true;

        break;
      }
    }
    //draws required additional row
    for (let i = 0; i < rowPositions[remIndex].length; i++) {
      //rect(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth, 100 + 100 * remIndex - 100 * hIndex, 100, 100);

      //initialize Qbox class for each box
      Qboxes.push(
        new Qbox(
          100 * rowPositions[remIndex][i] - 100 * i + windowWidth,
          100 + 100 * remIndex,
          rowPositions[i][h],
          0,
          false
        )
      );
      //rect(100 * rowPositions[remIndex][i] - 100 * i + windowWidth, 100 + 100 * remIndex, 100, 100);
    }

    for (let i = 0; i <= rowIndex; i++) {
      if (i > rowIndex) {
        var hIndex = i - remIndex;
        for (let h = 0; h < rowPositions[i].length; h++) {
          //rectMode(CENTER);
          //fill(255);
          Qboxes.push(
            new Qbox(
              100 * rowPositions[rowIndex][h] - 100 * i + windowWidth,
              100 + 100 * remIndex - 100 * hIndex,
              rowPositions[i][h],
              0,
              false
            )
          );
          //rect(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth, 100 + 100 * remIndex - 100 * hIndex, 100, 100);
        }
      } else if (remIndex <= i) {
        var hIndex = i - remIndex + 1;
        for (let h = 0; h < rowPositions[i].length; h++) {
          //rectMode(CENTER);
          //fill(255);
          Qboxes.push(
            new Qbox(
              100 * rowPositions[rowIndex][h] - 100 * i + windowWidth,
              100 + 100 * remIndex + 100 * hIndex,
              rowPositions[i][h],
              0
            )
          );
          //rect(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth, 100 + 100 * remIndex + 100 * hIndex, 100, 100);
        }
      }
    }
  }
  //console.log(remIndex);
  /* console.log("the number of boxes in second drawing: " + rowBoxes[remIndex]);
    console.log(remEven); */
  else {
    //method for square number of boxes (2,49,36)
    for (let i = 0; i <= rowIndex; i++) {
      for (let h = 0; h < rowPositions[i].length; h++) {
        //initialize and draw boxes
        Qboxes.push(
          new QBox(
            100 * rowPositions[rowIndex][h] - 100 * i + windowWidth - 100,
            100 + 100 * i,
            rowPositions[i][h],
            0
          )
        );
        //rect(100 * rowPositions[rowIndex][h]  - 100*i + windowWidth - 100 , 100 + 100*i, 100, 100);
      }
    }

    //draws each instance of Qboxes
  }
}

console.log(Qboxes);

//intial image positions
let imageX = 100;
let imageY = 100;
let diameter = 320;

var xPosLogo  = 50;
var yPosLogo = 150;
var logoBoxSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bx = 100;
  by = 50;

 /*  rect(xPosLogo,yPosLogo,logoBoxSize,logoBoxSize);
  rect(xPosLogo + logoBoxSize,yPosLogo,logoBoxSize,logoBoxSize);
  rect(xPosLogo + 2*logoBoxSize,yPosLogo,logoBoxSize,logoBoxSize);
  rect(xPosLogo + logoBoxSize,yPosLogo - logoBoxSize,logoBoxSize,logoBoxSize);
  textSize(2.5*logoBoxSize);
  text("Q",xPosLogo - 10,yPosLogo + logoBoxSize); */

  initQSort(boxes);
  shrinkButton = createButton('Shrink Main Image');
  shrinkButton.size(100);
  shrinkButton.position(50,750);
   shrinkButton.mousePressed(shrinkImage); 

  enlargeButton = createButton('Enlarge Main Image');
  enlargeButton.size(100);
  enlargeButton.position(50,800);
  enlargeButton.mousePressed(enlargeImage);

  placeButton = createButton('Place Main Image');
  placeButton.size(100);
  placeButton.position(175,750);
  placeButton.mousePressed(placeImage); 



}

var imgScale = 320;

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
      append(qImgArr, new QImg(imgSet[m],Qboxes[i].x -40,Qboxes[i].y - 40,Qboxes[i].pos))
      Qboxes[i].filled = true;
      m+=1;
      bx  = 100
      by  = 50;
    }
  }
  //reset everything to next image
 /*  m+=1;
  bx  = 100
  by  = 50; */
  //image(imgSet[i],imgX[i],imgY[i]);
  
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

function draw() {

  /* shrinkButton.mousePressed(shrinkImage);
  enlargeButton.mousePressed(enlargeImage); */
 /*  for (let i = 0; i < Qboxes.length; i++) {
    console.log(Qboxes[i].mouseIsOver);
  } */
  background(255);

  //rectMode(CENTER);
  //rect(windowWidth/2,windowHeight/2,100,100);
  fill(255);

  //Draws the Q-Sort Grid
  for (let i = 0; i < Qboxes.length; i++) {
    Qboxes[i].drawBox();
  }

  for (let i = 0; i < qImgArr.length; i++) {
    qImgArr[i].show(); 
  }

  //display the indicator numbers
  for (let t = 0; t < rowPositions[rowIndex].length; t++) {
    fill(0);
    textSize(25);
    text(
      rowPositions[rowIndex][t].toString(),
      100 * rowPositions[rowIndex][t] -
        100 * (rowIndex + -1) +
        windowWidth -
        200,
      200 + rowIndex * 100
    );
  }

  //check if the mouse is over image

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

  image(arrRightImg, 
  100 * rowPositions[rowIndex][rowPositions[rowIndex].length - 1] -
        100 * (rowIndex + -1) +
        windowWidth -
        400,
        300 + rowIndex * 100,
  100, 100);

  image(arrLeftImg,
    100 * rowPositions[rowIndex][0] -
        100 * (rowIndex + -1) +
        windowWidth -
        200,
        300 + rowIndex * 100,
         100, 100);

  text(dataRLabel,
  100 * rowPositions[rowIndex][rowPositions[rowIndex].length - 1] -
        100 * (rowIndex + -1) +
        windowWidth -
        400,
        300 + rowIndex * 100
  );

  text(dataLLabel,
  100 * rowPositions[rowIndex][0] -
        100 * (rowIndex + -1) +
        windowWidth -
        200,
        300 + rowIndex * 100);



  //image(imgSet[0],bx + 100,by,imgScale,imgScale);
  //text(bx.toString(), 900, 100);
  //text(by.toString(),900,200);
}


/*if (mouseX between two x coordinates ){
  if(mouseY between two y coordinates){
    
  }
}



*/