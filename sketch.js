//Create variables here
var  dog, happyDog, database, foodS, foodStock,fedTime, lastFed;
function preload()
{
  //load images here
  dog=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
}

function setup() {
  database=firebase.database();

  createCanvas(1000, 800);
  dogSprite=createSprite(250,250)
  dogSprite.scale=0.2;
  dogSprite.addImage(dog)

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  feed=createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  foodObj=new Food();
}


function draw() {  
  background(46, 139, 87)


  if(keyWentDown(UP_ARROW)){
writeStock(foodStock)
dogSprite.addImage(happyDog);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val()
  });
  foodObj.display();
  drawSprites();
  //add styles here
textSize(20)
fill("black")
  text("food remaining:"+foodStock,150,150)

fill(255,255,254)
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM",350,30 );
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30)
}else{
  text("Last Feed : "+ lastFed + " AM",350,30)
}
}

function readStock(data){
foodStock=data.val()
console.log(foodStock);
}

function writeStock(x){
if(x<=0){
x=0;
}else{
  x=x-1
}
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:FoodStock
  })
}



