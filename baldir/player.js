class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dia = 30;
    this.rad = this.dia/2;
    this.vel = new pVector(0,0);
    this.acc = 0.05;
    this.touchGround = false;
    this.jumpStop = false;
    this.jumpReset = false;
    this.boxGrounds = [];
    this.jumpAmount = 0;
    this.touchWall = false;
    this.changeBack = false;
    //Changables
    this.jumpForce = 8;
    this.maxSpeed = 6;
    this.jumpTimes = 3;
  }
  show(){
    fill(0,255,0);
    noStroke();
    ellipse(width/2,height/2,this.dia,this.dia);
    fill(0,0,255);
    arc(width/2,height/2,this.dia,this.dia,0,TWO_PI*(this.jumpAmount/this.jumpTimes),PIE);
  }
  move(){
    if(keys[Keys.left]){
      this.x -= this.vel.x;
      if(this.vel.x < this.maxSpeed){
        this.vel.x += this.acc;
      }
    }
    if(keys[Keys.right]){
      this.x += this.vel.x;
      if(this.vel.x < this.maxSpeed){
        this.vel.x += this.acc;
      }
    }
  }
  physics(){
    if(this.changeBack){
      this.canJump = false;
      console.log(121);
      if(!this.touchWall){
        this.changeBack = false;
      }
    }
    if(!this.canJump){
      this.jumpReset = true;
    }
    if(this.touchGround){
      this.canJump = true;
    }
    if(!this.touchWall && this.jumpAmount <= this.jumpTimes){
      this.canJump = true;
    }
    if(!this.touchGround){
      if(this.vel.y < 10){
        this.vel.y += grav;
      }
    }
    else if(!keys[Keys.up] && this.touchGround){
      //Gets called when first touching ground
      this.vel.y = 0;
      this.jumpReset = true;
      this.jumpAmount = 0;
    }
    this.y += this.vel.y;
    if(this.jumpStop){
      this.vel.y /= 2;
      this.jumpStop = false;
    }
  }
  collide(){
    for(let i = 0; i < area.length; i++){
      let num = area[i];
      boxes[num].show();
      boxes[num].collide(i);
    }
    this.touchGround = false;
    if(this.boxGrounds.includes("bottom")){
      this.touchGround = true;
    }
    if(this.boxGrounds.includes("top")){
      this.jumpStop = true;
    }
    if(this.boxGrounds.includes("left") || this.boxGrounds.includes("right")){
      if(!this.canJump && !this.changeBack){
        this.canJump = true;
      }
      this.touchWall = true;
    }
    else{
      this.touchWall = false;
      if(!this.touchGround && this.jumpAmount >= this.jumpTimes){
        console.log(21);
        this.canJump = false;
      }
    }
  }
}

class Camera{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.scale = 1;
  }
  move(){
    this.x = player.x;
    this.y = player.y;
  }
}
