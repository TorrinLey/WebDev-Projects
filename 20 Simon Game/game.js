var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function() {
    if(!started) {
        //hide h1 title, initalize next sequence and turn boolean started to true
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

//use Jquery to detect buttons clicked and push clicked button by user into an array
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

//function to check user logic to game sequence
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

//function for getting the sequence of colors
function nextSequence(){
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

//use fade in and fade out to animate button flashing
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(120);

    playSound(randomChosenColour);
}

//function for playing sound based on button color
function playSound(name){
    var clickedAudio = new Audio("sounds/" + name + ".mp3");
    clickedAudio.play();
}

//function to animate user pressed button
function animatePress(currentColour){
$("#" + currentColour).addClass("pressed");


//js function to set animation duration for #pressed class
setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
},100);

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}