peter_pan_song = "";
Harry_Potter_Theme_song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
song_peter_pan = "";

function setup() {
    canvas = createCanvas(550, 550);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_theme_song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 550, 550);

    fill('#ff9900');
    stroke('#ff0000');

    song_peter_pan = peter_pan_song.isPlaying();
    console.log(song_peter_pan);

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        //Harry_Potter_Theme_song.stop();
        if (song_peter_pan == false) {
            peter_pan_song.play();
        }
        else {
            document.getElementById("song_name").innerHTML = "Song Name: Peter Pan Song";
        }    
    }
}


function modelLoaded() {
    console.log("PoseNet Has Been Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
    
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " & Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right Wrist X = " + rightWristX + " & right Wrist Y = " + rightWristY);

        console.log("right Wrist X = " + rightWristX + " & right Wrist Y = " + rightWristY + " & Left Wrist X = " + leftWristX + " & Left Wrist Y = " + leftWristY);
    }
}
