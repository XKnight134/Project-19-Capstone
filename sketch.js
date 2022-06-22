var carImg, car;
var roadBackGroundImg,road;
var strippedBarrierImg, barrier, strippedBarrier;
var verticalBarrierImg, barriersGroup;


function preload(){

   carImg = loadImage("car.png");
   strippedBarrierImg = loadImage("StrippedBarrier.png");
   roadBackGroundImg = loadImage("Road_Background.jpg");
   verticalBarrierImg = loadImage("Barrier.png");

}

function setup() {

    createCanvas(600, 600);
  
    car = createSprite(220,300,20,50); 
    car.addImage("CarModel", carImg)  
    car.scale = 0.25;

    //barriersGroup = newGroup()

    road = createSprite(300,300,50,50);
    road.addImage("roadBackground", roadBackGroundImg);
    //road.velocityY = 1;
    road.y = road.height /2;

    leftBoundary=createSprite(0,0,100,800);
    leftBoundary.visible = false;

    rightBoundary=createSprite(600,0,100,800);
    rightBoundary.visible = false;
}

function draw() {
    edges= createEdgeSprites();
    car.collide(leftBoundary);
    car.collide(rightBoundary);
    


    car.depth = road.depth;
    car.depth = car.depth + 1;

    if (frameCount % 240 == 0){
    barrier = createSprite(Math.round(random(120,500)), 250);
    barrier.addImage("Barrier", verticalBarrierImg);
    barrier.scale = 0.1
    barrier.lifetime = 100
    }

    if (keyDown("left_arrow")){
        car.x = car.x-5
      }

    if (keyDown("right_arrow")){
        car.x = car.x+5
      }
      



    

    drawSprites()
 
}