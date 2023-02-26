const video = document.getElementById("webcam");
const label = document.getElementById("label");
const videoStatus = document.getElementById("videoStatus");
const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const labelFourBtn = document.querySelector("#labelFour");
const labelFiveBtn = document.querySelector("#labelFive");
const amountOne = document.getElementById("amountOne");
const amountTwo = document.getElementById("amountTwo");
const amountThree = document.getElementById("amountThree");
const amountFour = document.getElementById("amountFour");
const amountFive = document.getElementById("amountFive");
const trainbtn = document.getElementById("train");
const loss = document.getElementById("loss");
const result = document.getElementById("result");
const confidence = document.getElementById("confidence");
const predict = document.getElementById("predict");
const save = document.getElementById("save");

let totalLoss = 0;
labelOneBtn.addEventListener("click", () => console.log("button 1"));
labelTwoBtn.addEventListener("click", () => console.log("button 2"));
labelThreeBtn.addEventListener("click", () => console.log("button 3"));
labelFourBtn.addEventListener("click", () => console.log("button 4"));
labelFiveBtn.addEventListener("click", () => console.log("button 5"));

trainbtn.addEventListener("click", () => console.log("train"));

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";

const featureExtractor = ml5.featureExtractor("MobileNet", modelLoaded);

const classifier = featureExtractor.classification(video, videoReady);


function modelLoaded() {
    loading.innerText = "Model loaded!";
    classifier.load('model.json');
  }
  

  // A function to be called when the video is finished loading
function videoReady() {
    videoStatus.innerText = "Video ready!";
  }

  labelOneBtn.onclick = function() {
    classifier.addImage("one");
    amountOne.innerText = Number(amountOne.innerText) + 1;
  };

  labelTwoBtn.onclick = function() {
    classifier.addImage("two");
    amountTwo.innerText = Number(amountTwo.innerText) + 1;
  };

  labelThreeBtn.onclick = function() {
    classifier.addImage("three");
    amountThree.innerText = Number(amountThree.innerText) + 1;
  };

  labelFourBtn.onclick = function() {
    classifier.addImage("four");
    amountFour.innerText = Number(amountFour.innerText) + 1;
  };

  labelFiveBtn.onclick = function() {
    classifier.addImage("five");
    amountFive.innerText = Number(amountFive.innerText) + 1;
  };

  trainbtn.onclick = function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        totalLoss = lossValue;
        loss.innerHTML = `Loss: ${totalLoss}`;
      } else {
        loss.innerHTML = `Done Training! Final Loss: ${totalLoss}`;
      }
    });
  };
  
  // Show the results
  function gotResults(err, modelLoaded) {
    // Display any error
    if (err) {
      console.error(err);
    }
    if (modelLoaded && modelLoaded[0]) {
      result.innerText = modelLoaded[0].label;
      confidence.innerText = modelLoaded[0].confidence;
      classifier.classify(gotResults);
    }
  };

  save.onclick = function() {
    featureExtractor.save();
  };
  
  // Start predicting when the predict button is clicked
  predict.onclick = function() {
    classifier.classify(gotResults);
  };