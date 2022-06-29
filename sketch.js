var carImg, car;
var roadBackGroundImg, road;
var strippedBarrierImg, barrier, strippedBarrier;
var verticalBarrierImg, barriersGroup;
var gameOverImg, resetImg, gameOver, restart;
var scoreDisplay;

var score = 0

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){

   carImg = loadImage("car.png");
   strippedBarrierImg = loadImage("StrippedBarrier.png");
   roadBackGroundImg = loadImage("Road.png");
   verticalBarrierImg = loadImage("Barrier.png");
   gameOverImg = loadImage("gameOver - Copy.png")
   resetImg = loadImage("restart - Copy.png")
  

}

function setup() {

    createCanvas(600, 600);
  
    car = createSprite(220,480,20,50); 
    car.addImage("CarModel", carImg)  
    car.scale = 0.4;
    car.debug=false

    barriersGroup = new Group()

    road = createSprite(300,300,50,50);
    road.addImage("roadBackground", roadBackGroundImg);
    road.velocityY = 4;
    road.y = road.height /2;

    leftBoundary=createSprite(0,0,100,800);
    leftBoundary.visible = false;

    rightBoundary=createSprite(600,0,100,800);
    rightBoundary.visible = false;

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(300,250);
    restart.addImage(resetImg);

    gameOver.visible = false;
    restart.visible = false;

    edges= createEdgeSprites();
}

function draw() {

  background(0)
  drawSprites();
    
    car.collide(leftBoundary);
    car.collide(rightBoundary);

    car.depth = road.depth;
    car.depth = car.depth + 1;

  if(gameState==PLAY){

    if(road.y > 400 ){
      road.y = height/2;
    }

    if (frameCount % 240 == 0){
    barrier = createSprite(Math.round(random(100,500)), Math.round(random(100,300)))  ;
    barrier.setCollider("rectangle",0,0,400,400)
    barrier.debug=false
    barrier.addImage("Barrier", verticalBarrierImg);
    barrier.scale = 0.18
    barrier.lifetime = 100
    barrier.velocityY = road.velocityY;

    barriersGroup.add(barrier)
    }

    if (keyDown("left_arrow")){
        car.x = car.x-10
      }

    if (keyDown("right_arrow")){
        car.x = car.x+10
      }

  score = score + Math.round(getFrameRate()/60)  
  road.velocityY = (6 + 3*score/100);
  
  //console.log(score)
  if(barriersGroup.collide(car)){
    gameState = END;
  }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    road.velocityY = 0;

    barriersGroup.setVelocityYEach(0);
    barriersGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }

  }


    
    stroke("white")

    text("SCORE : "+score,400,30)
   
    
 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  barriersGroup.destroyEach();
  
  score = 0;
  
}