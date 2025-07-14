let gamePattern=[];
let userPattern=[];
let started=false;
let level=0;
const buttonColors=["green","red","yellow","blue"];

$(".start").click(function(){
    $(".start").addClass("starting")
    setTimeout(function(){
        $(".start").removeClass("starting")
    },150)
    if(started===false){
        nextSequence();
        started=true
    }
})

$(".level").html("<p>LEVEL</p><span>"+level+"</span>")

function nextSequence(){
    level++;
    userPattern=[];
    $(".level").html("<p>LEVEL</p><span>"+level+"</span>")
    let randomNumber=Math.floor(Math.random()*4)
    let randomColor=buttonColors[randomNumber]
    gamePattern.push(randomColor);

    $("."+randomColor+" img").addClass("active")
    setTimeout(function(){
        $("."+randomColor+" img").removeClass("active")
    },200)
}

$(".game-plate button").click(function(){
    let userChosenColor = $(this).attr("class");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);

    let _this = this; // ✅ Store reference to clicked button
    $(_this).find("img").addClass("active");
    setTimeout(function(){
        $(_this).find("img").removeClass("active");
    },150);

    checkAnswer(userPattern.length - 1);
});


function playSound(color){
    let audio=new Audio("sounds/"+color+".mp3")
    audio.play()
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("header").text("Game Over! Press START to Restart");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
      startOver();
    }, 1000);
  }
}


function startOver() {
 
  level = 0;
  gamePattern = [];
  started = false;
 $(".level").html("<p>LEVEL</p><span>" + level + "</span>");
 $("header").text("SIMON GAME")
}