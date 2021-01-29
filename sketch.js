//Create variables here

var feed,addFood;
var fedTime,lastFed;
var foodObj;


var dog,happyDog,database,foodS,foodStock,dogImg,happyDogImg;
function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  happyDogImg=loadImage("happydog.png")
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
//engine=Engine.create();
//world=engine.world;

  
dog=createSprite(250,250,50,50);
dog.scale=0.25;
dog.addImage(dogImg);

foodStock=database.ref('Food');
foodStock.on("value",readStock);


feed=createButton("Feed the dog");
feed.position(680,95);
feed.mousePressed(feedDog);

addFood=createButton("Add food");
addFood.position(780,95);
addFood.mousePressed(addFoods)




}


function draw() {  
background(46,139,87);

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})

fill(255,255,254);
textSize(15);
if (lastFed>=12){
text("Last Feed: "+lastFed%12+"PM",300,30)
}
else if(lastFed===0) {
text("Last Feed:12AM ",300,30);
}
else{
  text("Last Feed: "+lastFed+"AM",300,30);
}

Food.display();
  drawSprites();
  //add styles here

}



function readStock(data){
foodS=data.val();
}

function writeStock(x){

if (x<=0){
x=0;
}
else{
  x=x-1;
}

database.ref('/').update({
  Food:x
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})

}




