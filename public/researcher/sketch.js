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

    presortoption = createSelect();
    presortoption.option("Enable Pre-Sort");
    presortoption.option("Disable Pre-Sort");

    if(presortoption.value() == "Enable Pre-Sort"){
    exparm = createSelect();
    exparm.option("Experimental Arm 1");
    exparm.option("Experimental Arm 2");
    }

    
    presortFolder = createInput("Enter the Pre-Sort Folder Name");
    qsortFolder = createInput("Enter the Q-Sort Folder Name");

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
    if(presortoption.value() == "Enable Pre-Sort"){
      data.presort = true;
    }else{

      data.presort = false;
    }

    if(exparm.value() == "Experimental Arm 1"){
      data.exparm = 1;
    }else{
      data.exparm = 2;

    }

    data.presortFolder = presortFolder.value();
    data.qsortFolder = qsortFolder.value();
	
	saveJSON(data, 'data.json');
}

function mySelectEvent() {
  let item = boxes.value();
  background(200);
  text('It is a ' + item + '!', 50, 50);
}