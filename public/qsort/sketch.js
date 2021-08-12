//data = require('./data.json');

dataBoxes = 49;
//dataRLabel = "Most Happy";
//dataLLabel = "Least Happy";

let data;



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
      text( this.pos,1200,200);
      //text(mouseX,1200,300);
      //text(mouseY,1200,400);
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
  constructor(imgFile,imgX,imgY,imgPos,picNum){
    this.imgFile = imgFile;
    this.imgX = imgX;
    this.imgY = imgY;
    this.pos = imgPos;
    this.picNum = picNum;
    this.selected = false;

  }

  show(){

    if(this.selected){
      fill('red');
      noStroke();
      rect(this.imgX + 40,this.imgY + 40,100,100);

    }else{
      noFill();

    }
   
    image(this.imgFile,this.imgX,this.imgY,80,80);
    stroke('black');
    strokeWeight(1);
    
    //text(this.imgX,this.imgX,this.imgY + 20);
    //text(this.imgY,this.imgX + 20,this.imgY + 20);
    //text(this.selected,this.imgX + 20 , this.imgY + 20);

  }

  clicked(){
    if(
      mouseX > this.imgX &&
      mouseX < this.imgX + 80 &&
      mouseY > this.imgY &&
      mouseY < this.imgY + 80
    ){
        this.selected = !this.selected;

        if(this.selected){
          selectedCount+=1;
          swapArray.push(this.picNum);
          
        }else {
          //swapping imaging
          selectedCount-=1;
          for (let i = 0; i < swapArray.length; i++) {
            if(swapArray[i] === this.picNum){
              swapArray.splice(i,1);
            }
            
          }
        
        }

        if(selectedCount == 2){
          for (let i = 0; i < qImgArr.length; i++) {
            if(qImgArr[i].picNum == swapArray[0] &&
              qImgArr[i].picNum != this.picNum
              ){

                hold.imgX = qImgArr[i].imgX;
                hold.imgY = qImgArr[i].imgY;
                hold.pos = qImgArr[i].pos;

                qImgArr[i].imgX = this.imgX;
                qImgArr[i].imgY = this.imgY;
                qImgArr[i].pos = this.pos;
                //table.addRow().setNum('Photo ' + picOrder[m],Qboxes[i].pos);
                table.addRow().setNum('Photo ' + qImgArr[i].picNum,this.pos);

                this.imgX = hold.imgX;
                this.imgY = hold.imgY;
                this.pos = hold.pos;
                table.addRow().setNum('Photo ' + this.picNum,hold.pos);
                
                //these are all working
                qImgArr[i].selected = false;
                this.selected = false;
                swapArray = [];
                selectedCount = 0;

                /* newRow('Photo ' + qImgArr[i].picNum.toString(),qImgArr[i].pos);
                newRow('Photo ' + this.picNum.toString(),this.pos); */


              

            }
            
          }

        }

        /* if(selectedCount == 3){

            selectedCount-=1;
            for (let i = 0; i < qImgArr.length; i++) {
              if(qImgArr[i].picNum == swapArray[0]){
                qImgArr[i].selected = false;
              }
              
            }
            swapArray.splice(0,1);
            
            
          
        } */

       
        

    }
    
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


//study-specific variable
var dataBoxes;
//var dataRLabel;
//var dataLLabel;

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
//var numPics = 36;

for (let i = 1; i <= 25; i++) {
    numPicsArray.push(i);

}
//picOrder is an array with the random order of pictures
picOrder = shuffleNum(numPicsArray);
console.log(picOrder);

imgSet = []
psset = [];
pssetOrder = [[],[],[]];

imgLoadedArr = []

function imgLoaded(){
  imgLoadedArr.push(true);
}


var table;

var presortMarker = ["Agree","Disagree","Unsure"]
var psMarkerPosition = 0;

var presortData;

function processData(presortObject){
presortData = presortObject;

for (let i = 0; i < 25; i++) {
  imgName = i + 1;
  imgItem = loadImage("../assets/" + imgName.toString() + ".jpg" );
  //console.log("../assets/" + presortData.most[i].toString() + ".jpg" );
  psset.push(imgItem);
  //pssetOrder[0].push(presortData.most[i]);
  
  
}

/* for (let i = 0; i < presortData.least.length; i++) {
  //imgItem = loadImage("../assets/" + presortData.least[i].toString() + ".jpg" );
  //psset[1].push(imgItem);
  pssetOrder[1].push(presortData.least[i])
}

for (let i = 0; i < presortData.middle.length; i++) {
  //imgItem = loadImage("../assets/" + presortData.middle[i].toString() + ".jpg" );
  //psset[2].push(imgItem);
  pssetOrder[2].push(presortData.middle[i])
} */

//console.log(psset);

}

function dataLoaded(dataObject){
  data = dataObject;
  if(data.presort & data.exparm == 2){
  loadJSON('../presortData.json',processData);
  console.log(data.exparm);


  }else{

    console.log("Control or EXP ARM 1")

    img = loadImage("../assets/" + picOrder[0].toString() + ".jpg");

    for (let i = 0; i < picOrder.length; i++) {
     imgItem = loadImage("../assets/" + picOrder[i].toString() + ".jpg" );
     imgSet.push(imgItem);
  }

}
}



function preload() {

//data = require('./studies/data.json')
//var data = loadJSON('data.json', gotData(), failData());

/*dataBoxes = data.numBoxes;
dataRLabel = data.rightLabel;
dataLLabel = data.leftLabel;*/



  //console.log(imgLoadedArr)

  data = loadJSON('../data.json',dataLoaded);

  dataRLabel = data.right;
  dataLLabel = data.left;
  



  

/* img = loadImage("../assets/" + picOrder[0].toString() + ".jpg");

 for (let i = 0; i < picOrder.length; i++) {
  imgItem = loadImage("../assets/" + picOrder[i].toString() + ".jpg" );
  imgSet.push(imgItem);
} 
 */
arrRightImg = loadImage("../arrows/arrowright.png");
arrLeftImg = loadImage("../arrows/arrowleft.png");

//data = loadJSON('./studies/data.json');

//this is running
table = loadTable('../data/data.csv', 'csv', 'header');

let newRow = table.addRow();



}

img = imgSet[0];

//var img = imgSet[0];

/* var boxes = 36;
var dataRLabel = "Most Happy"
var dataLLabel = "Least Happy";
 */
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
        //console.log(remIndex);
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

//console.log(Qboxes);

//intial image positions
let imageX = 100;
let imageY = 100;
let diameter = 320;

var xPosLogo  = 50;
var yPosLogo = 150;
var logoBoxSize = 50;

function setup() {
   /* for (let i = 0; i <= data.boxes; i++) {
    table.addColumn('Photo ' + i); */

    //data.exparm == 2 ? img = psset[psset[a][b]] : img = imgSet[0];

if(data.exparm == 2){
    for (let i = 0; i < presortData.most.length; i++) {
      pssetOrder[0].push(presortData.most[i]);
    }

    for (let i = 0; i < presortData.least.length; i++) {
      pssetOrder[1].push(presortData.least[i]);
    }

    for (let i = 0; i < presortData.middle.length; i++) {
      pssetOrder[2].push(presortData.middle[i]);
    }

    console.log(pssetOrder);
  }


  createCanvas(windowWidth, windowHeight);
  bx = 100;
  by = 50;

 /*  rect(xPosLogo,yPosLogo,logoBoxSize,logoBoxSize);
  rect(xPosLogo + logoBoxSize,yPosLogo,logoBoxSize,logoBoxSize);
  rect(xPosLogo + 2*logoBoxSize,yPosLogo,logoBoxSize,logoBoxSize);
  rect(xPosLogo + logoBoxSize,yPosLogo - logoBoxSize,logoBoxSize,logoBoxSize);
  textSize(2.5*logoBoxSize);
  text("Q",xPosLogo - 10,yPosLogo + logoBoxSize); */

  

  initQSort(data.boxes);
  shrinkButton = createButton('Shrink Main Image');
  shrinkButton.size(100);
  shrinkButton.position(1200,10);
  shrinkButton.mousePressed(shrinkImage); 

  enlargeButton = createButton('Enlarge Main Image');
  enlargeButton.size(100);
  enlargeButton.position(1200,60);
  enlargeButton.mousePressed(enlargeImage);

  placeButton = createButton('Place Main Image');
  placeButton.size(100);
  placeButton.position(1350,10);
  placeButton.mousePressed(placeImage); 

  finishButton = createButton('Finish Sort');
  finishButton.size(100);
  finishButton.position(1350,60);
  finishButton.mousePressed(finished);

  saveButton = createButton('Save Data as CSV');
  saveButton.size(100);
  saveButton.position(1350, 110);
  saveButton.mousePressed(saveCSV);



}

var imgScale = 320;

function finished(){
  window.open('localhost:8000/finish');
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
var a = 0;
var b = 0;


function placeImage(){

  //change main image to next image on list
  //on q-sort box center image over particular box and record position
  
  for (let i = 0; i < Qboxes.length; i++) {
    if (Qboxes[i].rollover){
      //there should only be one
      if(data.presort && data.exparm == 2){
         append(qImgArr, new QImg(psset[pssetOrder[a][b]],Qboxes[i].x -40,Qboxes[i].y - 40,Qboxes[i].pos,pssetOrder[a][b]));
         table.addRow().setNum('Photo ' + pssetOrder[a][b],Qboxes[i].pos);
       b+=1;

      }else{
      append(qImgArr, new QImg(imgSet[m],Qboxes[i].x -40,Qboxes[i].y - 40,Qboxes[i].pos,picOrder[m]));
      table.addRow().setNum('Photo ' + picOrder[m],Qboxes[i].pos);
      m < 25 ? m+=1 : null;
      }

      Qboxes[i].filled = true;
      // newRow('Photo ' + picOrder[m].toString(),Qboxes[i].pos);
      
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



var selectedCount = 0;
var swapArray = []
var hold = {
  imgX: 0,
  imgY: 0,
  pos: 0
}

imageSwapped = false;

 function swapPhotos(){
if(selectedCount === 2){
  imageSwapped = true;
  
  for (let i = 0; index < qImgArr.length; index++) {
    if(qImgArr[i].picNum == swapArray[0]){
      for (let l = 0; l < qImgArr.length; l++) {
        if(qImgArr[l].picNum == swapArray[1]){
         // text("Images Being Swapped",1200,350);


          /* hold.imgX = qImgArr[i].imgX;
          hold.imgY = qImgArr[i].imgY;
          hold.pos = qImgArr[i].pos; */

        /* [qImgArr[i].imgX, qImgArr[l].imgX] = [qImgArr[l].imgX, qImgArr[i].imgX];
        [qImgArr[i].imgY, qImgArr[l].imgY] = [qImgArr[l].imgY, qImgArr[i].imgY];
        [qImgArr[i].pos, qImgArr[l].pos] = [qImgArr[l].pos, qImgArr[i].pos];
 */

          /* qImgArr[i].imgX = qImgArr[l].imgX;
          qImgArr[i].imgY = qImgArr[l].imgY;
          qImgArr[i].pos = qImgArr[l].pos; */
          //qImgArr[i].selected = false;
          
         /*  qImgArr[l].imgX = hold.imgX;
          qImgArr[l].imgY = hold.imgY;
          qImgArr[l].pos = hold.pos */;
         // qImgArr[l].selected = false;

         /*  selectedCount = 0;
          swapArray = []; */


        }
        
      }
    }
    
  }


}  

} 



function saveCSV(){

  /* for (let i = 0; i < qImgArr.length; i++) {
    //newRow('Photo ' + qImgArr[i].picNum.toString(),qImgArr[i].pos);
    
  } */


  saveTable(table, '../data/data.csv')

  

}



function mousePressed() {
  
  for (let i = 0; i < qImgArr.length; i++) {
    qImgArr[i].clicked();
    
  } 
  


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

  if(data.presort && data.exparm == 2){

    fill(0);
    text(presortMarker[psMarkerPosition],450,400);
  
  }

  

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

  noTint();

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
  
  if(data.presort && data.exparm == 2){
    image(psset[pssetOrder[a][b]],bx,by,imgScale,imgScale);

  }else{
  
  m < 25 ? image(imgSet[m], bx, by, imgScale, imgScale) : null;
  }


  image(arrRightImg, 
  100 * rowPositions[rowIndex][rowPositions[rowIndex].length - 1] -
        100 * (rowIndex + -1) +
        windowWidth -
        400,
        220 + rowIndex * 100,
  100, 100);

  image(arrLeftImg,
    100 * rowPositions[rowIndex][0] -
        100 * (rowIndex + -1) +
        windowWidth -
        200,
        220 + rowIndex * 100,
         100, 100);

  text(data.left,
  100 * rowPositions[rowIndex][rowPositions[rowIndex].length - 1] -
        100 * (rowIndex + -1) +
        windowWidth -
        400,
        220 + rowIndex * 100
  );

  text(data.right,
  100 * rowPositions[rowIndex][0] -
        100 * (rowIndex + -1) +
        windowWidth -
        200,
        220 + rowIndex * 100);
        
  
text(selectedCount,1200,150);
//text(swapArray[0],1200,250);
//text(swapArray[1],1200,300);

if(imageSwapped){
  text("Images Being Swapped",1200,350);
}



  



  //image(imgSet[0],bx + 100,by,imgScale,imgScale);
  //text(bx.toString(), 900, 100);
  //text(by.toString(),900,200);
}


/*if (mouseX between two x coordinates ){
  if(mouseY between two y coordinates){
    
  }
}



*/