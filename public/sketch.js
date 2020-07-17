
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

function drawQSort(totalBoxes) {
    var rowIndex = 0;



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

    var remBoxes = totalBoxes - rowTot[rowIndex];


    console.log("the number of boxes in main drawing: " + rowTot[rowIndex]);
    console.log("There are " + remBoxes + " after main drawing ");

    if (remBoxes) {
        var remIndex;
        var remEven;

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

        for (let i = 0; i < rowPositions[remIndex].length; i++) {
            rect(windowWidth / 2 + 100 * rowPositions[remIndex][i], windowHeight / 2, 100, 100);
        }

        for (let i = 0; i < rowIndex; i++) {
            for (let k = 0; k < rowPositions[i].length; k++) {
                rect(windowWidth / 2 + 100 * rowPositions[remIndex][k], windowHeight / 2, 100, 100);

            }

        }

    }

    //console.log(remIndex);
    console.log("the number of boxes in second drawing: " + rowBoxes[remIndex]);
    console.log(remEven);

    for (let i = 0; i < rowIndex; i++) {
        for (let h = 0; h < rowPositions[i].length; h++) {
            rect(windowWidth / 2 + 100 * rowPositions[rowIndex][h] - 100*i + 500, 100 + 100*i, 100, 100);
            
        }
        
    }




}



function setup(){
    createCanvas(windowWidth, windowHeight);

}

function draw(){
    background(255);
    
    //rectMode(CENTER);
    //rect(windowWidth/2,windowHeight/2,100,100);
    drawQSort(boxes);
    
    
}