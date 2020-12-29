//Variables for all the sprites.
var monkey , monkey_running;
var bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime;

function preload(){
//Loading all the animation and images.
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
//To set up all the variables.
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("rectangle",0,0,500,550);
  //monkey.debug = true;
  
  ground = createSprite(400,350,1000,10);
  
//To create groups.
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  survivalTime = 0;
}

function draw() {
  background("white");
  
//To display score with help of 'getFrameRate';
  textSize(20);
  fill("black");
  text("Survival Time= "+survivalTime,100,50);
  
  survivalTime = survivalTime + Math.round(getFrameRate()/61);
  
//To make the monkey jump if the space button is pressed.
  if(keyDown("space")){
     monkey.velocityY = -13;
  }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
//To give the monkey gravity.
  monkey.velocityY = monkey.velocityY + 0.8;

//So that the monkey won't fall through the ground.
  monkey.collide(ground);
  
  if (monkey.isTouching(obstacleGroup)){
      foodGroup.velocity = 0;
      obstacleGroup.velocity = 0;
      monkey.velocity = 0;
      ground.velocity = 0;
    
  }
  
  fruit()
  obstacle();
  
  drawSprites();
}

function fruit(){
//To create bananas after every 80 frames.
  if(frameCount % 80 === 0){
     var banana = createSprite(800,150,15,15);
     banana.y = Math.round(random(120,200));
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -5;
//To prevent a memory leak.
     banana.lifetime = 200;
    
     banana.depth = monkey.depth;
     monkey.depth = monkey.depth+1;
     
//To add the banana to the foodGroup.
     foodGroup.add(banana);
  }
}

function obstacle(){
//To create stones ater every 300 frames.
  if(frameCount % 300 === 0){
     var stone = createSprite(800,310,15,15);
     stone.x = Math.round(random(810,860));
     stone.addImage(obstacleImage);
     stone.scale = 0.2;
     stone.velocityX = -3;
    
     stone.setCollider("circle",0,0,200);
     //stone.debug = true;
    
     stone.lifetime = 500;
    
     obstacleGroup.add(stone);
  } 
}
