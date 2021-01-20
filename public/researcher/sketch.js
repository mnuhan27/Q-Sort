let rightArrowLabel;
let leftArrowLabel;
let numBoxes;
let studyName;
let btn;
function setup() {
  noCanvas();
	rightArrowLabel = createInput('Right Arrow Label');
	leftArrowLabel = createInput('Left Arrow Label');
    numBoxes = createInput("Number of Boxes");
	btn = createButton('Save');
	btn.mousePressed(saveData);
 
}

function draw() {
  background(220);
}

function saveData(){
	let data = {};
	data.rightArrowLabel = rightArrowLabel.value();
	data.leftArrowLabel = leftArrowLabel.value();
    data.numBoxes = numBoxes;
	
	saveJSON(data, 'data.json');
}