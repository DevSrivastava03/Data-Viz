let video;
let listOfColors = ["#FFD700", "#4A90E2", "#FF69B4", "#00CED1", "#9370DB", "#8A2BE2", "#FF4500", "#32CD32", "#696969", "#FF6347"];
let fr = 60;
let slider;  // Single slider for customization
let grid;
let bttnCapture;
let selfies = []; // Array to store captured selfies

function setup() {
  let canvas = createCanvas(750, 650);
  canvas.parent('sketch-container');
  frameRate(fr);

  // Create a single slider for color and size customization
  slider = createSlider(10, 60, 30, 1);
  slider.position(170, 355);
  slider.style('width', '150px');
  slider.style('background-color', '#FF4500'); // Orange color for the slider
  
  // Setup video capture
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  video.hide();

  // Initialize Circle Grid
  grid = new CircleGrid();

  // Create "Capture Selfie" button
  bttnCapture = createButton("CAPTURE SELFIE");
  bttnCapture.size(190, 60);
  bttnCapture.position(10, 190); // Fixed position at top-left corner
  bttnCapture.style("background-color", "#FF4500");
  bttnCapture.mousePressed(captureSelfie);
}

function draw() {
  background(0, 50);

  // Display the grid of circles based on video
  grid.display();
}

// Function to handle video readiness
function videoReady() {
  console.log('Video is ready');
}

// Function to capture a selfie, save it, and initiate download
function captureSelfie() {
  const img = get(); // Get the current canvas
  selfies.push(img); // Store the captured image
  displaySelfies(); // Call function to display selfies

  // Create a download link for the image
  let link = document.createElement('a');
  link.download = 'data_selfie_' + Date.now() + '.png';
  link.href = img.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  link.click(); // Programmatically click the link to trigger download
}

// Function to display selfies
function displaySelfies() {
  const selfieList = select('#selfie-list');
  selfieList.html(''); // Clear previous selfies

  for (let i = 0; i < selfies.length; i++) {
    let img = selfies[i];
    let imgElement = createImg(img.canvas.toDataURL(), 'Selfie ' + (i + 1));
    imgElement.size(200, 200); // Set the size of the displayed selfies
    selfieList.child(imgElement); // Add the selfie image to the selfie list
  }
}

// Circle class to create and display circles
class CircleClass {
  constructor(px, py, s) {
    this.positionX = px;
    this.positionY = py;
    this.size = s;
    this.c = listOfColors[int(random(0, listOfColors.length))];
  }

  display() {
    if (this.size > 15) {
      noStroke();
      fill(this.c);
    } else {
      noFill();
      strokeWeight(1);
      stroke(this.c);
    }
    circle(this.positionX, this.positionY, this.size);
  }
}

// CircleGrid class to create and manage the grid of circles
class CircleGrid {
  constructor() {
    this.gridSize = 30;
    this.circles = [];

    for (let y = 0; y < video.height; y += this.gridSize) {
      let row = [];
      for (let x = 0; x < video.width; x += this.gridSize) {
        row.push(new CircleClass(x + this.gridSize / 2, y + this.gridSize / 2, 30));
      }
      this.circles.push(row);
    }
  }

  display() {
    video.loadPixels();
    for (let i = 0; i < this.circles.length; i++) {
      for (let j = 0; j < this.circles[0].length; j++) {
        let index = (i * this.gridSize * video.width + j * this.gridSize) * 4;
        let r = video.pixels[index];
        
        // Adjust size based on slider
        this.circles[i][j].size = map(r, 0, 255, slider.value(), 0); // Use slider value to adjust circle size

        this.circles[i][j].display();
      }
    }

    // Randomly change color of a random circle
    let selection1 = int(random(this.circles.length - 1));
    let selection2 = int(random(this.circles[0].length - 1));
    let col = listOfColors[int(random(0, listOfColors.length))];
    this.circles[selection1][selection2].c = col;
  }
}
