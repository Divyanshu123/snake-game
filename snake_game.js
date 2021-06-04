var squares = document.querySelectorAll("td");
var gameover=false;
var foodX=Math.floor(15*Math.random()),foodY=Math.floor(15*Math.random());
var width=15,height=15;
var x=Math.floor(width/2),y=Math.floor(height/2);
var i,j,k;
var prevX=[],prevY=[],ntail=0;
var dir = "STOP";
var score=0;
var pause="play";
var pdir="";
var flag=0;
// enum Direction{STOP,LEFT,RIGHT,UP,DOWN};
// Direction dir = STOP;
function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}
function draw(){
  for(i=0;i<height;i++){
    for(j=0;j<width;j++)
    {
      squares[width*i+j].style.backgroundColor="";
      squares[width*i+j].style.borderRadius="5px";
    }
  }
  for(i=0;i<height;i++)
  {
    for(j=0;j<width;j++)
    {
      if(i==y&&j==x){squares[width*i+j].style.backgroundColor="red";squares[width*i+j].style.borderRadius="10px";}
      if(i==foodY&&j==foodX){squares[width*i+j].style.backgroundColor="green";}
      for(k=0;k<ntail;k++)
      {
        if(prevX[k]==j && prevY[k]==i){squares[i*width+j].style.backgroundColor="red";}
      }
    }
  }
}
function decrementx(){dir="LEFT";flag=1;}
function incrementx(){dir="RIGHT";flag=1;}
function decrementy(){dir="UP";flag=1;}
function incrementy(){dir="DOWN";flag=1;}
function input(){
  document.querySelector("#left").addEventListener('click',decrementx);
  document.querySelector("#right").addEventListener('click',incrementx);
  document.querySelector("#up").addEventListener('click',decrementy);
  document.querySelector("#down").addEventListener('click',incrementy);
  document.querySelector("#center").addEventListener("click",pause_game);
}
document.querySelector("#left").addEventListener("mouseover",function(){
  document.querySelector("#left").style.backgroundColor="#96cee0";
});
document.querySelector("#left").addEventListener("mouseout",function(){
  document.querySelector("#left").style.backgroundColor=" #7ca17c";
});
document.querySelector("#right").addEventListener("mouseover",function(){
  document.querySelector("#right").style.backgroundColor="#96cee0";
});
document.querySelector("#right").addEventListener("mouseout",function(){
  document.querySelector("#right").style.backgroundColor=" #7ca17c";
});
document.querySelector("#up").addEventListener("mouseover",function(){
  document.querySelector("#up").style.backgroundColor="#96cee0";
});
document.querySelector("#up").addEventListener("mouseout",function(){
  document.querySelector("#up").style.backgroundColor=" #7ca17c";
});
document.querySelector("#down").addEventListener("mouseover",function(){
  document.querySelector("#down").style.backgroundColor="#96cee0";
});
document.querySelector("#down").addEventListener("mouseout",function(){
  document.querySelector("#down").style.backgroundColor=" #7ca17c";
});
document.querySelector("#center").addEventListener("mouseover",function(){
  document.querySelector("#center").style.color="white";
});
document.querySelector("#center").addEventListener("mouseout",function(){
  document.querySelector("#center").style.color="black";
});
function pause_game(){
  if(flag!=0){
    if(pause=="play"){
      flag=2;
      pdir=dir;
      dir="STOP";
      pause="pause";
      document.querySelector("#center").innerHTML="&#9658;";


    }
    else if(pause=="pause")
    {
      flag=1;
      dir=pdir;
      pause="play";
      document.querySelector("#center").innerHTML="&#9616;&#9616;";
    }
  }
}

function logic(){

  if(flag!=2){
    for(i=0;i<ntail-1;i++)
    {
      prevX[i]=prevX[i+1];
      prevY[i]=prevY[i+1];
    }
    prevX[ntail-1]=x;
    prevY[ntail-1]=y;
  }

  if(x==foodX && y==foodY){
    foodX=Math.floor(15*Math.random());
    foodY=Math.floor(15*Math.random());
    ntail++;
    prevX.push(x);prevY.push(y);
    score=score+10;
  }
  if(dir=="LEFT")
  {
    x--;
  }
  else if(dir=="RIGHT")
  {
    x++;
  }
  else if(dir=="UP")
  {
    y--;
  }
  else if(dir=="DOWN")
  {
    y++;
  }
  if(x==width) x=0;
  if(x==-1)x=width-1;
  if(y==-1)y=height-1;
  if(y==height)y=0;
  for(i=0;i<ntail;i++)
  {
    if(x==prevX[i]&&y==prevY[i]) gameover=true;
  }
  if(gameover==true) flag=0;
}
function restart(){

  score=0;
  gameover=false;
  dir="STOP";
  prevX=[];prevY=[];ntail=0;
  x=Math.floor(width/2);y=Math.floor(height/2);
  foodX=Math.floor(Math.random()*15);foodY=Math.floor(Math.random()*15);
  flag=0;
  main();
}
document.querySelector("#restart").addEventListener("click",restart);
async function main()
{
  draw();
  input();
  logic();
  if(gameover==true)document.querySelector("#gameover").textContent="GAME OVER";
  else document.querySelector("#gameover").textContent="";
  document.querySelector("#score").textContent="Score: "+score;
  if(gameover==true)document.querySelector("#restart").style.display="block";
  else document.querySelector("#restart").style.display="none";
  if(flag==1)document.querySelector("#center").innerHTML="&#9616;&#9616;";
  await sleep (200);
  if(gameover==false)main();

}
x
main();
