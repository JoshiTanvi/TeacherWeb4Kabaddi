var p1, p1animation, p1Score = 0;
var p2, p2animation, p2Score = 0;


function preload(){

    p1animation = loadAnimation("assests/player1a.png","assests/player1b.png", "assests/player1a.png");
    p2animation = loadAnimation("assests/player2a.png","assests/player2b.png", "assests/player2a.png");
}

function setup(){

    createCanvas(600, 600);

    p1 = createSprite(100, 300, 10, 10);
    p1.shapeColor = "red"
    p1.addAnimation("walking", p1animation);
    p1.scale = 0.5;
    p1.setCollider("circle", 0, 0, 50);
    p1.debug = true;



    p2 = createSprite(500, 300, 10, 10);
    p2.shapeColor = "yellow"
    p2.addAnimation("walking", p2animation);
    p2.scale = -0.5;
    p2.setCollider("circle", 0, 0, 50);
    p2.debug = true;
   


}

function draw(){
    background("green");
    
    textSize(20);
    fill("black");
    text("Press Space to Toss", 210, 100);
    text("Red " + p1Score, 350, 20);
    text("Yellow " + p2Score, 150, 20);

    drawMidLine();
    drawYellowLine();
    drawRedLine();

    drawSprites();
}

function drawMidLine(){

    for(var i = 0; i< 600; i=i+21){
        line(300, i, 300, 10+i); 
    }
}

function drawYellowLine(){

    stroke("yellow");
    strokeWeight(3);
    for(var i = 0; i< 600; i=i+21){
        line(100, i, 100, 10+i); 
    }
}

function drawRedLine(){

    stroke("red");
    strokeWeight(3);
    for(var i = 0; i< 600; i=i+21){
        line(500, i, 500, 10+i); 
    }
}