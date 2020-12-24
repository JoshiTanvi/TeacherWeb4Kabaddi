var p1, p1animation, p1Score = 0;
var p2, p2animation, p2Score = 0;
var gameState,database;
var p1pos,p2pos;



function preload(){

    p1animation = loadAnimation("assests/player1a.png","assests/player1b.png", "assests/player1a.png");
    p2animation = loadAnimation("assests/player2a.png","assests/player2b.png", "assests/player2a.png");
}

function setup(){
database=firebase.database();
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
   
    var p1pos=database.ref('player1/position');
   p1pos.on("value",readpos1);

   var p2pos=database.ref('player2/position');
   p2pos.on("value",readpos2);

   gameState=database.ref('gameState/');
   gameState.on("value",readgs);

   p1score=database.ref('p1Score/');
   p1score.on("value",readscore1);

   p2score=database.ref('p2Score/');
   p2score.on("value",readscore2);

}

function draw(){
    background("green");

    if(gameState===0){
        textSize(20);
        fill("black");
        text("Press Space to Toss", 210, 100);

        if(keyDown("space")){
            rand=Math.round(random(1,2));

            if(rand===1){
                database.ref('/').update({
                   'gameState':1
                })
                alert("RED RIDE");
            }
            if(rand===2){
                database.ref('/').update({
                   'gameState':2
                })
                alert("YELLOW RIDE");
            }
            database.ref('player1/position').update({
                'x':150,
                'y':300
             })
             database.ref('player2/position').update({
                'x':500,
                'y':300
             })
            }
        }


        if(gameState===1){

            if(keyDown(LEFT_ARROW)){
                writepos1(-5,0);
            }
            else if(keyDown(RIGHT_ARROW)){
                writepos1(5,0);
            }
            else if(keyDown(UP_ARROW)){
                writepos1(0,-5);
            }
            else if(keyDown(DOWN_ARROW)){
                writepos1(0,5);
            }
            else if(keyDown("c")){
                writepos2(0,-5);
            }
            else if(keyDown("d")){
                writepos2(0,5);
            }

            
            if(p1.x>500){
                database.ref('/').update({
                    'p1Score':p1Score - 5,
                    'p2Score':p2Score + 5,
                    'gameState': 0
                })
                alert("RED WON");
            }
            if(p1.isTouching(p2)){
                database.ref('/').update({
                    'gameState': 0,
                    'p1Score':p1Score + 5,
                    'p2Score':p2Score - 5,
                    
                })
                alert("RED LOST");
            }
        }




        if(gameState===2){
            if(keyDown("a")){
                writepos2(-5,0);
            }
            else if(keyDown("b")){
                writepos2(5,0);
            }
            else if(keyDown("c")){
                writepos2(0,-5);
            }
            else if(keyDown("d")){
                writepos2(0,5);
            }


          /*  else if(keyDown(LEFT_ARROW)){
                writepos1(-5,0);
            }
            else if(keyDown(RIGHT_ARROW)){
                writepos1(5,0);
            }
            */


            else if(keyDown(UP_ARROW)){
                writepos1(0,-5);
            }
            else if(keyDown(DOWN_ARROW)){
                writepos1(0,5);
            }

            if(p2.x<150){
                database.ref('/').update({
                    'p1Score':p1Score + 5,
                    'p2Score':p2Score - 5,
                    'gameState': 0
                })
                alert("YELLOW WON");

}

if(p1.isTouching(p2)){
    database.ref('/').update({
        'gameState': 0,
        'p1Score':p1Score - 5,
        'p2Score':p2Score + 5,
        
    })
    alert("YELLOW LOST");
}

        }
    textSize(20);
    fill("yellow")
    text("Red " + p1Score, 350, 20);
    fill("red")
    text("Yellow " + p2Score, 150, 20);

    drawMidLine();
    drawYellowLine();
    drawRedLine();

    drawSprites();
}


function writepos1(x,y){
    database.ref('player1/position').set({
        'x': p1pos.x + x,
        'y': p1pos.y + y
    })
}


function writepos2(x,y){
    database.ref('player2/position').set({
        'x': p2pos.x + x,
        'y': p2pos.y + y
    })
}


function readpos1(data){
    position1=data.val();
    p1.x=position1.x;
    p1.y=position1.y
}


function readpos2(data){
    position2=data.val();
    p2.x=position2.x;
    p2.y=position2.y
}


function readgs(data){
    gameState=data.val();
}

function readscore1(data1){
 p1Score=data1.val();
}


function readscore2(data2){
    p2Score=data2.val();
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
