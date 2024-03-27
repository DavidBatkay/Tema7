let sunSize = 50;
let planetSizes = [8, 12, 15, 18, 22];
let orbitSizes = [80, 120, 160, 200, 240];
let planetColors = ['#FF5733', '#33FF57', '#5733FF', '#FF33D1', '#33FFFF'];
let planetAngles = []; 
let angleX = 0;
let angleY = 0;
let sensitivity = 0.01;
let zoom = -500;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  
  for (let i = 0; i < planetSizes.length; i++) {
    planetAngles.push(random(TWO_PI)); 
  }
}

function draw() {
  background(0);
  
 
  translate(0, 0, zoom);
  
  
  rotateX(angleX);
  rotateY(angleY);
  
  
  fill(255, 255, 0); 
  noStroke();
  sphere(sunSize);

  
  noFill();
  stroke(255, 150);
  for (let i = 0; i < orbitSizes.length; i++) {
    ellipse(0, 0, orbitSizes[i] * 2, orbitSizes[i] * 2);
  }

  
  for (let i = 0; i < planetSizes.length; i++) {
    let angle = planetAngles[i] + millis() * 0.0001; 
    let x = orbitSizes[i] * cos(angle);
    let y = orbitSizes[i] * sin(angle);

    push();
    translate(x, y);
    fill(planetColors[i]);
    sphere(planetSizes[i]);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
  angleX += (mouseY - pmouseY) * sensitivity;
  angleY += (mouseX - pmouseX) * sensitivity;
}

function mouseWheel(event) {
  zoom += event.delta;
  return false; 
}
