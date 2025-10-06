let cols, rows;
let spacing = 40; 
let circles = [];
let enlargePercentage = 0.571; // Set percentage of circles to enlarge
let switchInterval = 60;
let monumentFont;       // regular font
let monumentBoldFont;   // bold font

function preload() {
  // Replace with working .ttf URLs hosted on GitHub Pages or raw.githubusercontent
  monumentFont = loadFont('https://raw.githubusercontent.com/kylaa1211/p5-fonts/main/PPMonumentNarrow-Regular.otf');
  monumentBoldFont = loadFont('https://raw.githubusercontent.com/kylaa1211/p5-fonts/main/PPMonumentNarrow-Black.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#e0d7d1');
  noStroke();

  cols = floor(width / spacing);
  rows = floor(height / spacing);

  // create grid of circles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * spacing + spacing / 2;
      let y = j * spacing + spacing / 2;
      circles.push(new Circle(x, y, i, j));
    }
  }

  pickEnlargedCircles();
}

function draw() {
  background('#d0cac3');

  // Every switchInterval frames, pick new enlarged circles
  if (frameCount % switchInterval === 0) {
    pickEnlargedCircles();
  }

  // Update and display all circles
  for (let c of circles) {
    c.update();
    c.display();
  }

  // Draw bottom-left message once
  fill('#3b302e');
  textFont(monumentBoldFont);
  textSize(width / 10); // responsive size
  textAlign(LEFT, BOTTOM);
  text("DO YOU \nFEEL SUPPORTED?", 20, height - 60);
}

function pickEnlargedCircles() {
  let numToEnlarge = floor(circles.length * enlargePercentage);

  // Reset all circles to base size
  for (let c of circles) {
    c.setTargetSize(c.baseSize);
  }

  // Randomly enlarge a subset
  let shuffled = [...circles].sort(() => random() - 0.5);
  for (let i = 0; i < numToEnlarge; i++) {
    shuffled[i].setTargetSize(random(10, 60)); // minimum 10 so very small circles aren't invisible
  }
}

class Circle {
  constructor(x, y, gridX, gridY) {
    this.x = x;
    this.y = y;
    this.gridX = gridX;
    this.gridY = gridY;
    this.baseSize = 6;
    this.size = this.baseSize;
    this.targetSize = this.baseSize;
  }

  setTargetSize(s) {
    this.targetSize = s;
  }

  update() {
    // Lerp to target size; enlarge slower, shrink slower
    if (this.targetSize > this.size) {
      this.size = lerp(this.size, this.targetSize, 0.08); // slower, smoother enlarge
    } else {
      this.size = lerp(this.size, this.targetSize, 0.02); // shrink slower
    }
  }

  display() {
    fill('#e7e874');
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circles = [];
  cols = floor(width / spacing);
  rows = floor(height / spacing);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * spacing + spacing / 2;
      let y = j * spacing + spacing / 2;
      circles.push(new Circle(x, y, i, j));
    }
  }
  pickEnlargedCircles();
}
