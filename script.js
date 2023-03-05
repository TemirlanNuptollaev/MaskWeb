let outputWight;
let outputHeight;

let faceTracker;
let videoInput;

let imgMask;
let imgFace;
let imgGlass;

let selected = -1;

function preload(){
  imgPop = loadImage("/img/Pop.png");
  imgMask = loadImage("/img/mask.png");
  imgGlass = loadImage("/img/glass.png");
  imgAnonimus = loadImage("/img/anonimus.png");
}

function setup(){
  const maxWidth = Math.min(windowWidth, windowHeight);
  pixelDensity(1);
  outputHeight = maxWidth * 0.75;
  outputWight = maxWidth;

  createCanvas(outputWight, outputHeight);
  
  videoInput = createCapture(VIDEO);
  videoInput.size(outputWight, outputHeight);
  videoInput.hide();

  const sel = createSelect();

  const selectList = ['Mask', 'Pop', "Glass", "Anonimus"];

  sel.option("select filter", -1);

  for(let i = 0; i < selectList.length; i++){
    sel.option(selectList[i],i);
  }
  sel.changed(applyFilter);

  faceTracker = new clm.tracker();
  faceTracker.init();
  faceTracker.start(videoInput.elt);

}

function applyFilter(){
  selected = this.selected();
}

function draw(){
  image(videoInput, 0, 0, outputWight, outputHeight);

  switch(selected){
    case "-1": break;
    case "0": drawMask(); break;
    case "1": drawPop(); break;
    case "2": drawGlass(); break;
    case "3": drawAnonimus(); break;
  }
}

function drawMask(){
  const positions = faceTracker.getCurrentPosition();
  if(positions !== false){
    push();
    const wx = Math.abs(positions[11][0] - positions[3][0]) * 2.5;
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) *1;
    translate(-wx/2, -wy/2);
    image(imgMask, positions[57][0], positions[57][1], wx, wy);
    pop();
  }
}


function drawPop(){
  const positions = faceTracker.getCurrentPosition();
  if(positions !== false){
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]) * 2;
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 2;
    translate(-wx/2, -wy/2);
    image(imgPop, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function drawGlass(){
  const positions = faceTracker.getCurrentPosition();
  if(positions !== false){
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]) * 1;
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) *1;
    translate(-wx/2, -wy/2);
    image(imgGlass, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}
function drawAnonimus(){
  const positions = faceTracker.getCurrentPosition();
  if(positions !== false){
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]) *  2;
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 2;
    translate(-wx/2, -wy/2);
    image(imgAnonimus, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}


function windowResized(){
  const maxWidth = Math.min(windowWidth, windowHeight);
  pixelDensity(1);
  outputHeight = maxWidth * 0.75;
  outputWight = maxWidth;
  resizeCanvas();
}