    let video;
    let buttonCapture;
    let selfies = [];
    let glitchOffsetX = 0;
    let glitchOffsetY = 0;
    let canvas;

    function setup() {
    // Create the canvas and place it inside a container for better styling and centering
    canvas = createCanvas(640, 480);
    const container = select('#sketch-container'); // Reference to the HTML container
    canvas.parent(container); // Attach canvas to the container

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the raw video feed

    // Create "Capture Selfie" button
    buttonCapture = createButton("Capture Selfie");
    buttonCapture.parent(container); // Place the button in the same container as canvas
    buttonCapture.size(150, 40);
    buttonCapture.style('background-color', '#FF4500');
    buttonCapture.style('color', '#FFF');
    buttonCapture.style('margin-top', '10px'); // Add spacing below canvas
    buttonCapture.mousePressed(captureSelfie); // Call function when pressed
    }

    function draw() {
    background(0);

    // Apply glitch effect
    video.loadPixels();
    for (let y = 0; y < video.height; y += 20) {
        for (let x = 0; x < video.width; x += 20) {
        let index = (x + y * video.width) * 4;

        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        let colorShift = frameCount % 255;
        r = (r + colorShift) % 255;
        g = (g + colorShift * 1.5) % 255;
        b = (b + colorShift * 0.5) % 255;

        let glitchX = (x + glitchOffsetX) % width;
        let glitchY = (y + glitchOffsetY) % height;

        fill(r, g, b);
        noStroke();
        rect(glitchX, glitchY, 20, 20);
        }
    }

    glitchOffsetX += 2;
    glitchOffsetY += 1;

    // Display captured selfies
    displaySelfies();
    }

    function captureSelfie() {
    const img = get();
    selfies.push(img);
    displaySelfies();
    saveCanvas(img, 'data_selfie_' + Date.now(), 'png');
    }

    function displaySelfies() {
    const selfieList = select('#selfie-list');
    if (!selfieList) {
        return;
    }

    selfieList.html('');
    for (let i = 0; i < selfies.length; i++) {
        let img = selfies[i];
        let imgElement = createImg(img.canvas.toDataURL(), 'Selfie ' + (i + 1));
        imgElement.size(150, 100);
        selfieList.child(imgElement);
    }
    }
