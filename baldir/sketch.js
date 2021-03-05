function setup(){
  createCanvas(500,500);
}

player = new Player(250,250);
boxes = [
  new Box(-1000,400,2000,50),
  new Box(100,-300,50,700),
  new Box(300,-300,50,700),

  // new Box(250,350,50,50),
  // new Box(200,200,100,50),
  // new Box(400,390,100,10),
];
camera = new Camera();

function draw(){
  background(255);
  noFill();
  stroke(0);
  rect(0,0,width,height);
  area = [];
  for(let i = 0; i < boxes.length; i++){
    let box = boxes[i];
    if(collideRectRect(box.x,box.y,box.w,box.h,player.x-width/2,player.y-height/2,width,height)){
      area.push(i);
    }
  }

  //Class functions
  player.show();
  player.move();
  player.physics();
  player.collide();
  camera.move();
}
