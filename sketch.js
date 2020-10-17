var PLAY=1;
var END=0;
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup,bananaGroup;
var score=0,survivalTime;
var gameState=PLAY;

function preload()
{
  
    monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
    createCanvas(500,400);

    monkey=createSprite(50,320,20,40);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.15;

    ground=createSprite(400,380,900,50);
    ground.x=ground.width/2;
    ground.shapeColor="green";

    foodGroup=new Group();
    obstaclesGroup=new Group();
}


function draw() 
{
  background("aqua");
    
  fill("black");
  textSize(25);
  stroke("red");
  strokeWeight(2);
  text("Survival time:"+survivalTime,250,30);
  text("Score: "+score,100,30);
  
  if(gameState===PLAY)
  {
      if(keyDown("space")&& monkey.y>200)
      {
         monkey.velocityY=-14;
      }
    
      monkey.velocityY=monkey.velocityY+0.5;

      ground.velocityX=-5;
    
      if(ground.x<ground.width/4)
      {
         ground.x=ground.width/2;
      }
    
      if(monkey.isTouching(foodGroup))
      {
        foodGroup.destroyEach();
        score=score+2;
      }
    
      survivalTime=Math.ceil(frameCount/getFrameRate());
      bananas();
      obstacles();

      if(monkey.isTouching(obstaclesGroup))
      {
         gameState=END;
      }
  }
  else if(gameState===END)
  {
      ground.velocityX=0;
      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);
      textSize(50);
      stroke("yellow");
      strokeWeight(1);
      fill("purple");
      text("Game Over",120,200);
  }
  monkey.collide(ground);
  drawSprites();
}

function bananas()
{
  if(frameCount%80===0)
    {
      var banana=createSprite(500,250,20,20);
      
      banana.y=random(100,200);
      banana.scale=0.1;
      banana.rotation=-30;
      banana.addImage("banana",bananaImage);
      banana.velocityX=-5;
      banana.lifetime=140;
      
      foodGroup.add(banana);
    }
}

function obstacles()
{
  if(frameCount%300===0)
    {
      var obstacle=createSprite(500,330,20,20);
    
      obstacle.scale=0.2;
      obstacle.rotation=5;
      obstacle.addImage("stone",obstacleImage);
      obstacle.velocityX=-5;
      obstacle.lifetime=140;
      
      obstaclesGroup.add(obstacle);
    }
}




