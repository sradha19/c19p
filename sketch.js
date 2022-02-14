var seaImg, sea;
var sharkImg, shark, sharkGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  seaImg = loadImage("assets/sea.png");
  sharkImg = loadImage("assets/shark.png");
  climberImg = loadImage("assets/climber.png");
  fishImg = loadImage("assets/fish.png");
}

function setup(){
  createCanvas(600,600);
  sea = createSprite(300,300);
  sea.addImage("sea",seaImg);
  sea.velocityY = 1;
  
  sharkGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  fish = createSprite(200,200,50,50);
  fish.scale = 0.3;
  fish.addImage("fish", fishImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      fish.x = fish.x - 3;
    }
    
    if(keyDown("right_arrow")){
      fish.x = fish.x + 3;
    }
    
    if(keyDown("space")){
      fish.velocityY = -10;
    }
    
    fish.velocityY = fish.velocityY + 0.8
    
    if(sea.y > 400){
      sea.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var shark = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    shark.x = Math.round(random(120,400));
    climber.x = shark.x;
    invisibleBlock.x = shark.x;
    
    shark.addImage(sharkImg);
    climber.addImage(climberImg);
    
    shark.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    fish.depth = fish.depth;
    fish.depth +=1;
   
    //assign lifetime to the variable
    shark.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    sharkGroup.add(shark);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
