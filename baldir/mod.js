let keys = [];
let Keys = {
  up: 32, //space
  down: 83, //s
  left: 65, //a
  right: 68, //d
  changeView: 80, //p
}

let player;
let grav = 0.2;
let boxes = [];
let area = [];
let camera;
let view = 1;

function pVector(x,y){
  this.x = x;
  this.y = y;
}
function findAng(x1,y1,x2,y2){
  let theta = (y2 >= y1) ? atan((x2-x1)/(y2-y1))+(Math.PI) : atan((x2-x1)/(y2-y1))+(2*Math.PI);
  return -theta;
}
function clamp(min,max,value){
  if(value < min){
    return min;
  }
  else if(value < max){
    return value;
  }
  else{
    return max;
  }
}
function rectCircle(rectX,rectY,rectW,rectH,circX,circY,circDia){
  let x = clamp(rectX,rectX+rectW,circX);
  let y = clamp(rectY,rectY+rectH,circY);
  if(dist(x,y,circX,circY) <= circDia/2){
    return true;
  }
  return false;
}

function keyPressed(){
  keys[keyCode] = true;
  if(keyCode == Keys.left || keyCode == Keys.right){
    player.vel.x = 3;
  }

  //Jump
  if(player.canJump && keyCode == Keys.up && player.jumpReset){
    player.vel.y = -player.jumpForce;
    if(!(player.boxGrounds.includes("left") || player.boxGrounds.includes("right"))){
      player.jumpAmount ++;
    }
    if(player.jumpAmount >= player.jumpTimes){
      player.jumpReset = false;
    }
    if(player.touchWall){
      player.changeBack = true;
    }
  }
}
function keyReleased(){
  keys[keyCode] = false;
  if(keyCode == Keys.left || keyCode == Keys.right){
    player.vel.x = 3;
  }
  if(keyCode == Keys.up){
    player.jumpStop = true;
  }
}

function drawBox(x,y,w,h){
  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(x,y,w,h);
  line(x,y,x+w,y+h);
  line(x,y+h,x+w,y);
}
