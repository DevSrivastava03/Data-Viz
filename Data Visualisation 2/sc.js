let video;
let selfies = []; // Declare the selfies array globally

function setup() {
  canvas = createCanvas(640, 480);
  canvas.parent('sketch-container');
  frameRate(60);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Create "Capture Selfie" button
  let bttnCapture = createButton("CAPTURE SELFIE");
  bttnCapture.addClass("custom-button"); // Assign the custom button class
  bttnCapture.addClass("horizontal-center"); // Center the button using CSS
  bttnCapture.mousePressed(captureSelfie);
  
  // Set size and style of the button
  bttnCapture.size(180, 70);
  bttnCapture.style("background-color", "#FF4500");
  bttnCapture.style("color", "#FFF");
  bttnCapture.position(670, 690); // Set x and y positions for the button

}

// Function to capture a selfie, save it, and initiate download
function captureSelfie() {
  const img = get(); // Capture the current canvas
  selfies.push(img); // Store the captured image in the array
  displaySelfies(); // Call function to display selfies

  // Create a download link for the image
  let link = document.createElement('a');
  link.download = 'data_selfie_' + Date.now() + '.png';
  link.href = img.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  link.click(); // Programmatically click the link to trigger download
}

// Function to display selfies
function displaySelfies() {
  const selfieList = select('#selfie-list'); // Select the selfie list container
  selfieList.html(''); // Clear previous selfies

  for (let i = 0; i < selfies.length; i++) {
    let img = selfies[i];
    let imgElement = createImg(img.canvas.toDataURL(), 'Selfie ' + (i + 1));
    imgElement.size(150, 100); // Set the size of the displayed selfies
    selfieList.child(imgElement); // Add the selfie image to the selfie list container
  }
}

function draw() {
  background(255);
  video.loadPixels();

  for (let y = 0; y < video.height; y += 15) {
    for (let x = 0; x < video.width; x += 15) {
      let index = (x + y * video.width) * 4;

      // Extract color components
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      // Perform abstract color manipulation
      r = (r + frameCount) % 255;
      g = (g + frameCount) % 255;
      b = (b + frameCount) % 255;

      // Draw the colored rectangle
      fill(r, g, b);
      noStroke();
      rect(x, y, 5, 5);
    }
  }
}
