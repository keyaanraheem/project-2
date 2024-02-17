song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0
rightWristY = 0
scoreLeftWrist = 0
song1_status=""
function preload()
{
   song1 = loadSound("music.mp3");
   song2 = loadSound("music1.mp3")
}

function setup() {

    canvas= createCanvas(600, 500,);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on ('pose', gotPoses)
}

function modelLoaded()
{
    console.log('PoseNet is initialized')
}


function draw() {

    image(video, 0, 0, 600, 500);

    fill("blue")
    stroke("blue")

    song1_status = song1.isPlaying()
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20)
        song2.stop()
        if(song1_status == false)
        {
            song1.play()
            document.getElementById("song_name").innerHTML = "playing passacaglia"
        }
    }
}




function gotPoses(results)
{
    if(results.length >0 )
    {

        console.log(results);
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX =" + leftWristX +" leftWristY ="+ leftWristY )
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX =" + rightWristX +"rightWristY")
    }
}

