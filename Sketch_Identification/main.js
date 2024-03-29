function setup() 
{
    canvas=createCanvas(300,300);
    canvas.center();
    console.log("before mr");
    background("white");
    canvas.mouseReleased(classifyCanvas);
    console.log("after mr");
    synth=window.speechSynthesis;
}

function preload()
{
    classifier=ml5.imageClassifier('DoodleNet');
}

function clearCanvas()
{
    background("white");
}

function draw()
{
    strokeWeight(6);
    stroke("blue");

    if(mouseIsPressed)
    {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function classifyCanvas()
{
    console.log("classification started")
classifier.classify(canvas,gotResult);
}

function gotResult(error,results)
{
 if(error)
 {
    console.error(error);
 }
 else
 {
   console.log(results);
   document.getElementById("label").innerHTML="Label:"+results[0].label;
   document.getElementById("accuracy").innerHTML="Accuracy :"+ Math.round(results[0].confidence*100)+"%";
   utterThis=new SpeechSynthesisUtterance(results[0].label);
   synth.speak(utterThis);
   

 }
}