var carImg, car;
var roadBackGroundImg, road;
var strippedBarrierImg, barrier, strippedBarrier;
var verticalBarrierImg, barriersGroup;
var score = 0

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){

   carImg = loadImage("car.png");
   strippedBarrierImg = loadImage("StrippedBarrier.png");
   roadBackGroundImg = loadImage("Road.png");
   verticalBarrierImg = loadImage("Barrier.png");
   barriersGroup.add(barrier)

}

function setup() {

    createCanvas(600, 600);
  
    car = createSprite(220,480,20,50); 
    car.addImage("CarModel", carImg)  
    car.scale = 0.4;

    barriersGroup = new Group()

    road = createSprite(300,300,50,50);
    road.addImage("roadBackground", roadBackGroundImg);
    road.velocityY = 4;
    road.y = road.height /2;

    leftBoundary=createSprite(0,0,100,800);
    leftBoundary.visible = false;

    rightBoundary=createSprite(600,0,100,800);
    rightBoundary.visible = false;
}

function draw() {

  text("Score: "+ score, 500,50); 
    edges= createEdgeSprites();
    car.collide(leftBoundary);
    car.collide(rightBoundary);

    car.depth = road.depth;
    car.depth = car.depth + 1;

  if(gameState==PLAY){

    if(road.y > 400 ){
      road.y = height/2;
    }

    if (frameCount % 120 == 0){
    barrier = createSprite(Math.round(random(100,500)), (random(50,250)));
    barrier.addImage("Barrier", verticalBarrierImg);
    barrier.scale = 0.18
    barrier.lifetime = 100
    barrier.velocityY = road.velocityY
    }

    if (keyDown("left_arrow")){
        car.x = car.x-10
        }

      if (keyDown("right_arrow")){
          car.x = car.x+10
        }

    score = score + Math.round(getFrameRate()/60)  
    road.velocityY = (6 + 3*score/100);
    
    console.log(score)

    }
    else if (gameState === END) {
      

      }


    drawSprites()
  
  }