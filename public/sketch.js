class QBox {
    constructor(bX, bY, bPos, bColor) {
        this.x = bX;
        this.y = bY;
        this.pos = bPos;
        this.color = bColor;

    }

    drawBox() {
        rectMode(CENTER);
        fill(255);
        stroke(this.color, 0, 0);
        rect(this.x, this.y, 100, 100);
    }

    mouseIsOver() {
        //
        if (mouseX > this.x - 100 && mouseX < this.x + 100 &&
            mouseY > this.y - 100 && mouseY < this.y + 100) {

            this.color = 125;
            //console.log("Mouse Pressed");
            return true;
        } 
    }

}


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

var picNum = getRandomInt(1,45).toString();
var picName = picNum + '.jpg';

function preload(){
    img = loadImage('assets/' + picName);
}

var boxes = 49;

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
    [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
]


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
        }
        else if (rowTot[i] > totalBoxes) {
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
            }
            else if (rowTot[i] >= remBoxes && remBoxes % 2 == 0) {
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
            Qboxes.push(new Qbox(100 * rowPositions[remIndex][i] - 100 * i + windowWidth, 100 + 100 * remIndex,rowPositions[i][h], 0))
            //rect(100 * rowPositions[remIndex][i] - 100 * i + windowWidth, 100 + 100 * remIndex, 100, 100);
        }

        for (let i = 0; i <= rowIndex; i++) {

            if(i > rowIndex){
            var hIndex = i - remIndex;
            for (let h = 0; h < rowPositions[i].length; h++) {
                //rectMode(CENTER);
                //fill(255);
                Qboxes.push(new Qbox(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth, 100 + 100 * remIndex - 100 * hIndex,rowPositions[i][h], 0))
                //rect(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth, 100 + 100 * remIndex - 100 * hIndex, 100, 100);


            }
        }else if (remIndex <= i){
            var hIndex = i - remIndex + 1;
            for (let h = 0; h < rowPositions[i].length; h++) {
                //rectMode(CENTER);
                //fill(255);
                Qboxes.push(new Qbox(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth, 100 + 100 * remIndex + 100 * hIndex, rowPositions[i][h], 0));
                //rect(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth, 100 + 100 * remIndex + 100 * hIndex, 100, 100);


                }

        }

        }

    }
    //console.log(remIndex);
    /* console.log("the number of boxes in second drawing: " + rowBoxes[remIndex]);
    console.log(remEven); */
    else{
    //method for square number of boxes (2,49,36)
    for (let i = 0; i <= rowIndex; i++) {
        for (let h = 0; h < rowPositions[i].length; h++) {
            //initialize and draw boxes
            Qboxes.push(new QBox(100 * rowPositions[rowIndex][h] - 100 * i + windowWidth - 100, 100 + 100 * i,rowPositions[i][h],0));
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

function setup(){
    createCanvas(windowWidth, windowHeight);
    bx = width / 2.0;
    by = height / 2.0;

    initQSort(boxes);



}

function mousePressed() {
    if (overBox) {
        locked = true;
        fill(255, 255, 255);
    } else {
        locked = false;
    }
    xOffset = mouseX - bx;
    yOffset = mouseY - by;
    

    
};

function mouseDragged() {
    if (locked) {
        bx = mouseX - xOffset;
        by = mouseY - yOffset;
        
        //higlight box where mouse is;
    }

    

}

function mouseReleased() {
    locked = false;
    //add code to see if inside grid
    /* if(insideGrid){
        //drop into the box that mouse is over
        //resize image to fit box
    } */
}

function draw(){

    for (let i = 0; i < Qboxes.length; i++) {

        console.log(Qboxes[i].mouseIsOver);

    }
    background(255);
    
    //rectMode(CENTER);
    //rect(windowWidth/2,windowHeight/2,100,100);
    fill(255);

     for (let i = 0; i < Qboxes.length; i++) {

        Qboxes[i].drawBox();
    } 

    

    //display the indicator numbers
    for (let t = 0; t < rowPositions[rowIndex].length; t++) {
        fill(0);
        textSize(25);
        text((rowPositions[rowIndex][t]).toString(), 100 * rowPositions[rowIndex][t] - 100 * (rowIndex + -1) + windowWidth - 200, 200 + rowIndex * 100);

    }


    if (mouseX > bx - boxSize && mouseX < bx + boxSize &&
        mouseY > by - boxSize && mouseY < by + boxSize) {
        overBox = true;
        if (!locked) {
            
            fill(153);
        }
    } else {
        fill(153);
        overBox = false;
    }

    rectMode(RADIUS);
    fill(125);
    image(img,bx,by,320,320);

    
    
}