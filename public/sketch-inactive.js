
var boxes = 50;
var sum = 0;

for (let i = 1; i < boxes + 1; i++) {
    sum = sum + i;
    //console.log(sum);    
}

var mean = sum / boxes;

var rowBoxes  = [1,3,5,7,9,11,13,15,17];
var rowTot = [1,4,9,16,25,36,49,64,81];

var rowPositions = [
[0],
[-1,0,1],
[-2,-1,0,1,2],
[-3,-2,-1,0,1,2,3],
[-4,-3,-2,-1,0,1,2,3,4],
[-5,-4,-3,-2,-1,0,1,2,3,4,5],
[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],
[-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7],
[-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8]
]

function drawRow(totalBoxes){


    var rowIndex = 0;
    var remIndex = 0;

    for (let i = 0; i < rowTot.length; i++) {
        
        if (totalBoxes < rowTot[i]){
            rowIndex = i - 1;
        }
        else if (totalBoxes == rowTot[i]){
            rowIndex = i;
        }
        
    }

    var remBoxes = roTot[rowIndex] - totalBoxes;

    if (remBoxes % 2 == 0){
        drawCenterBox = True;
    }

    for (let i = 0; i < rowTot.length; i++) {
        
        if (remBoxes < rowTot[i]) {
            remIndex = i - 1;
        }
        else if (remBoxes == rowTot[i]) {
            remIndex = i;
        }
        
    }

    //first draw extra row
    for (let i = 0; i < rowPositions[remIndex].length; i++) {
        rect(windowWidth/2 + rowPositions[remIndex][i],windowHeight/2,100,100);
    }

    

    //console.log(rowIndex);


}


//drawRow(boxes);





function setup(){
    createCanvas(windowWidth, windowHeight);

}

function draw(){
    background(255);
    rectMode(CENTER);
    //rect(windowWidth/2,windowHeight/2,100,100);
    drawRow(boxes);
    
}