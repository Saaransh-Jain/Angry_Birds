const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird1,bird2, slingshot;
var data;
var bg;
var score=0;
var gameState = "onSling";
var confsolver="bird1";
var flag=0;
function preload() {
    getBcg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);
    

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird1 = new Bird(200,50);
    bird2=new Bird(100,70);
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird1.body,{x:200, y:50});

}

function draw(){

    if(backgroundImg){
        background(backgroundImg);
    }
    strokeWeight(5);
    stroke("black");
    fill("white");
     textSize(45);
    text("Score = " + score,900,40);

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird1.display();
    bird2.display();
    platform.display();
    //log6.display();
    slingshot.display();  
    
    console.log(score)
    if(score===100 && flag===0){
        gameState="launched";
        confsolver="bird2";
        slingshot.attach(bird2.body);
        flag=1;
}

}
function mouseDragged(){
    if (gameState!=="launched" && confsolver==="bird1"){
        Matter.Body.setPosition(bird1.body, {x: mouseX , y: mouseY});
    }
    else {
     Matter.Body.setPosition(bird2.body, {x: mouseX , y: mouseY});
    }

}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";

    if(confsolver==="bird2"){
        bird1.trajectory=[]; 
    }

}

function keyPressed(){
    if(keyCode === 32 && bird1.body.speed<1){
    bird1.trajectory=[];
    Matter.Body.setPosition(bird1.body,{x:200,y:50})
    slingshot.attach(bird1.body);
    
    }
}

async function getBcg(){

data=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
var dataJson=await data.json();
var datetime=dataJson.datetime;
var time=datetime.slice(11,13);
console.log(time);

if(time>17||time<6){
bg="sprites/bg2.jpg";
}
else{
    bg="sprites/bg.png";
}

backgroundImg = loadImage(bg);
console.log(backgroundImg);
}
