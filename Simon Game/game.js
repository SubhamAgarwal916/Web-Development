var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
//Genrate Random sequence
function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //add animation for button press
  $("#"+randomChosenColor).fadeOut(100).fadeIn(200);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level "+level);
}
//Add sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//add animation
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
},100);
};
//restart
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}

//Game logic
function checkAnswer(currentLevel){
  var result=true;
  if(gamePattern[currentLevel]!=userClickedPattern[currentLevel]){
    result=false;
  }
  if(result && currentLevel==gamePattern.length-1){
    userClickedPattern=[];
    setTimeout(nextSequence(),1000);
  }
  //game over
  if(!result){
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
//Start game
$(document).keypress(function() {
    if(level==0){
      nextSequence();
    }
});
//User input(main block)
$(".btn").click(function(){
  var userChosenColour= this.id;
  //Aternate code for above 2 lines:
  // $(".btn").click(function(event){
  //   var userChosenColour= event.target.id;});
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  currentLevel=userClickedPattern.length-1;
  checkAnswer(currentLevel);
});
