const label = document.getElementById("label");
const loading = document.getElementById("loading");
const classifier = ml5.imageClassifier('./models/model.json', modelLoaded);
let synth = window.speechSynthesis;
let score = 0;
const scoreElement = document.getElementById("score");

function speak(text) {
  if (synth.speaking) {
    console.log('prediction model has started');
    return;
  }
  if (text !== '') {
    let utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }
}

function modelLoaded() {
  loading.innerText = "Model loading complete.";
}

// Listen for when the user selects an image
const inputElement = document.getElementById("image");
inputElement.addEventListener("change", (e) => {
  const imageFile = e.target.files[0];

  // Remove the previously uploaded image element
  const imageContainer = document.getElementById("image-container");
  const lastUploadedImage = imageContainer.lastElementChild;

  if (lastUploadedImage) {
    imageContainer.removeChild(lastUploadedImage);
  }

  // Create a new image element and set the source to the selected file
  const img = new Image();
  img.src = URL.createObjectURL(imageFile);

  // When the image is loaded, classify the image and update the label
  img.onload = () => {
    classifier.classify(img, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      if (results[0].confidence >= 0.80) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
        label.innerText = `I'm ${(results[0].confidence * 100).toFixed(0)} sure this is a ${results[0].label}`;
        if (results[0].label === "duck") {
          speak("This looks like a duck!");
        } else if (results[0].label === "dog") {
          speak("This is a dog!");
        }
      } else {
        label.innerText = "This is something else";
        speak("This is something else");
      }
    });
  };

  // Add the image element to the DOM
  const uploadedImage = document.createElement("img");
  uploadedImage.src = URL.createObjectURL(imageFile);
  imageContainer.appendChild(uploadedImage);
});