let tempo;
let name;
let btn;
function setup() {
  noCanvas();
	intro = createP("Q-Sort Researcher Side");
	start = createInput('Start Text');
	finish = createInput('Finish Text');
    right = createInput('Right Arrow Label');
    left = createInput('Left Arrow Label');
    boxes =createSelect();
    boxes.option(25);
    boxes.option(36);
    boxes.option(49);
    boxes.option(64);
    //boxes.selected(64);
    //boxes.changed(mySelectEvent);
    createDiv();
	btn = createButton('Save');
	btn.mousePressed(saveData);
}

function draw() {
  background(220);
}

function saveData(){
	let data = {};
	data.start = start.value();
	data.finish = finish.value();
    data.right = right.value();
    data.left = left.value();
    data.boxes = boxes.value();
	
	saveJSON(data, 'data.json');
}

function mySelectEvent() {
  let item = boxes.value();
  background(200);
  text('It is a ' + item + '!', 50, 50);
}