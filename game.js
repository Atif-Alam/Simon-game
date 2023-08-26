// alert("working");
var buttonColors=["red","blue","green","yellow"];

var userClickedPattern=[];

var gamePattern=[];

var started=false;

var level=0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("succes");

        if(userClickedPattern.length === gamePattern.length){
        
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } 
    else{
        var a="wrong";
        playSound(a);
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
       
        // console.log("wrong");

        starOver();
    }

    

}



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// nextSequence();

function playSound(name){
    var a="sounds/"+name+".mp3";
    var aud=new Audio(a);
    aud.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function starOver(){
    level=0;
    gamePattern=[];
    
    started=false;
}