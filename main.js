Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
}); 
Webcam.attach("#camera");

function takesnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">'; 
    });
}

console.log("version of Ml5 Library-" + ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/g5VqO4yhK/model.json',modelLoaded);
function modelLoaded() {
    console.log("Model is loaded");
}
var prediction1 = "";
var prediction2 = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction1;
    speak_data_2 = "The second prediction is " + prediction2;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("result_name1").innerHTML = prediction1;
        document.getElementById("result_name2").innerHTML = prediction2;
        speak();
        if (prediction1 == "Happy") {
            document.getElementById("result_emoji1").innerHTML = "&#128522";
        }
        if (prediction1 == "Sad") {
            document.getElementById("result_emoji1").innerHTML = "&#128532";
        }
        if (prediction1 == "Angry") {
            document.getElementById("result_emoji1").innerHTML = "&#128548";
        }
        if (prediction2 == "Happy") {
            document.getElementById("result_emoji2").innerHTML = "&#128522";
        }
        if (prediction2 == "Sad") {
            document.getElementById("result_emoji2").innerHTML = "&#128532";
        }
        if (prediction2 == "Angry") {
            document.getElementById("result_emoji2").innerHTML = "&#128548";
        }
    }
}