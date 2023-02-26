const classify = document.getElementById("classify");
const featureExtractor = ml5.featureExtractor("MobileNet", modelLoaded);

predict.onclick = function() {
    classifier.classify(gotResults);
  };