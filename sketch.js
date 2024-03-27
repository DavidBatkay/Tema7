let sunSize = 50;
let planetSizes = [8, 12, 15, 18, 22];
let orbitSizes = [80, 120, 160, 200, 240];
let planetColors = ['#FF5733', '#33FF57', '#5733FF', '#FF33D1', '#33FFFF'];
let planetAngles = []; // Array to store random starting angles for each planet
let angleX = 0;
let angleY = 0;
let sensitivity = 0.01;
let zoom = -500;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Generate random starting angles for each planet
  for (let i = 0; i < planetSizes.length; i++) {
    planetAngles.push(random(TWO_PI)); // Random angle within 0 to 2*PI
  }
}

function draw() {
  background(0);
  
  // Apply zoom
  translate(0, 0, zoom);
  
  // Rotate the camera
  rotateX(angleX);
  rotateY(angleY);
  
  // Draw sun
  fill(255, 255, 0); // yellow
  noStroke();
  sphere(sunSize);

  // Draw orbits
  noFill();
  stroke(255, 150);
  for (let i = 0; i < orbitSizes.length; i++) {
    ellipse(0, 0, orbitSizes[i] * 2, orbitSizes[i] * 2);
  }

  // Draw planets
  for (let i = 0; i < planetSizes.length; i++) {
    let angle = planetAngles[i] + millis() * 0.0001; // Add time-based rotation to make them move
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
  return false; // Prevent default
}
