document.querySelector(".play").addEventListener("click",Play);
function Play(){
  var rn1=Math.floor(Math.random()*6);
  var rn2=Math.floor(Math.random()*6);
  var img1="images/dice"+(rn1+1)+".png";
  var img=["images/dice1.png","images/dice2.png","images/dice3.png","images/dice4.png","images/dice5.png","images/dice6.png"];
  document.getElementsByClassName("img1")[0].setAttribute("src",img1);
  document.getElementsByClassName("img2")[0].setAttribute("src",img[rn2]);
  if(rn1>rn2){
    document.querySelector(".result").innerHTML="🚩Player 1 Wins!";
  }
  else if(rn1===rn2){
    document.querySelector(".result").innerHTML="Draw!";
  }
  else{
    document.querySelector(".result").innerHTML="Player 2 Wins!🚩";
  }
}
