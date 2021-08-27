Webcam.set({
    width : 350,
    height : 295,
    image_format : "png",
    png_quality : 777
});
camera = document.getElementById("camera");

Webcam.attach("camera")

function takesnap(){
    Webcam.snap(function(data_uri){
        document.getElementById("image").innerHTML = "<img id='finalimage' src='" + data_uri + "'>"
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Ezk9fJI4S/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}
function check(){
    img = document.getElementById("finalimage");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
if (error){
    console.error(error);
} else {
    console.log(results);
    document.getElementById("p1t").innerHTML = results[0].label;
    document.getElementById("p2t").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;
speak();
if(prediction_1 == "Thumbs Up"){
    document.getElementById("p1e").innerHTML= "&#128077";
}
if(prediction_1 == "Stop"){
    document.getElementById("p1e").innerHTML= "&#9995";
}
if(prediction_1 == "Thumbs Down"){
    document.getElementById("p1e").innerHTML= "&#128078";
}
if(prediction_2 == "Thumbs Up"){
    document.getElementById("p2e").innerHTML= "&#128077;";
}
if(prediction_2 == "Stop"){
    document.getElementById("p2e").innerHTML= "&#9995";
}
if(prediction_2 == "Thumbs Down"){
    document.getElementById("p2e").innerHTML= "&#128078";
}

}

}
var prediction_1, prediction_2;

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "And the second prediction" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

    