/*pontos,
 botao restart,
 sons, 
if < tela game over,
*/

var END = 0;
var SERVE = 1;
var PLAY = 2;
var gameState = SERVE;
var score;

var fundo;
var pomba;
var pombaAnimation;
var restart, restartImg;

var canoB1;
var canoB2;
var canoB3;
var canoC1;
var canoC2;
var canoC3;

var GroupCano;
var GroupCanoC;
var obstacleB;
var obstacleC;

var smvoar;

function preload() 
{
  pombaAnimation = loadAnimation(
    "flappy-bird.png",
    "flappy-bird-2.png",
    "flappy-bird-3.png"
  );
  fundo = loadImage("Fundo.png");
  canoB1 = loadImage("Tubo_B2.png");
  canoC1 = loadImage("Tubo_C2.png");
  canoB2 = loadImage("Tubo_B3.png");
  canoC2 = loadImage("Tubo_C3.png");
  canoB3 = loadImage("Tubo_B4.png");
  canoC3 = loadImage("Tubo_C1.png");
  restartImg = loadImage("voltar-removebg-preview.png");
  smvoar = loadSound("bateasa.mp3");
}

function setup() 
{
  createCanvas(windowWidth, 600);
  pomba = createSprite(100, 300);
  pomba.scale = 0.5;
  pomba.addAnimation("voar", pombaAnimation);

  GroupCano = new Group();
  GroupCanoC = new Group();

  console.log("hello" + 5);

  score = 0;

  pomba.setCollider("circle", 0, 0, 40);
  pomba.debbug = true;

  restart = createSprite(900, 300);
  restart.addImage(restartImg);
  restart.scale = 0.5
}

function draw() 
{
  background(fundo);
  fill("black")
  textSize(25)
  text("Score; " + score, 10,20);

  if (gameState === SERVE) 
  {
    pomba.debug = false;
    restart.visible = false

    text("Procione ESPAÇO para começar", 700, 300);

    if (keyDown("space")) 
    {
      gameState = PLAY;
    }
  }

  if (gameState === PLAY) 
  {
    spawnObstacles();

    if (keyDown("space")) 
    {
      pomba.velocityY = -13;
      smvoar.play();
    }

    restart.visible = false

    pomba.velocityY = pomba.velocityY + 1;

    if (pomba.isTouching(GroupCano) || pomba.isTouching(GroupCanoC)) 
    {
      gameState = END;
    }
  }

  if (gameState === END) 
  {
    restart.visible = true
    pomba.velocityY = 0;
    pomba.velocityX = 0;
    GroupCano.setVelocityXEach (0);
    GroupCano.setLifetimeEach(-1);
    GroupCanoC.setVelocityXEach (0);
    GroupCanoC.setLifetimeEach(-1);

   if (mousePressedOver(restart))
    {
      reverso();
    }

  drawSprites();
  }
}

function spawnObstacles() 
{
  if (frameCount % 60 === 0) 
  {
    var obstacleB = createSprite(windowWidth, 600);
    var obstacleC = createSprite(windowWidth, 100);
    obstacleC.velocityX = -5;
    obstacleB.velocityX = obstacleC.velocityX;

    var rand = Math.round(random(1, 3));
    switch (rand) 
    {
      case 1:
        obstacleB.addImage(canoB1);
        obstacleC.addImage(canoC1);
        obstacleB.y = 450;
        obstacleC.y = 25;
        obstacleC.lifetime = 360;
        obstacleB.lifetime = 360;
        break;
      case 2:
        obstacleB.addImage(canoB2);
        obstacleC.addImage(canoC2);
        obstacleB.y = 570;
        obstacleC.y = 100;
        obstacleC.lifetime = 360;
        obstacleB.lifetime = 360;
        break;
      case 3:
        obstacleB.addImage(canoB3);
        obstacleC.addImage(canoC3);
        obstacleB.y = 460;
        obstacleC.y = 50;
        obstacleC.lifetime = 360;
        obstacleB.lifetime = 360;
        break;
      default:
        break;
    }
    GroupCano.add(obstacleB);
    GroupCanoC.add(obstacleC);
  }
}

function reverso() 
{
  gameState = SERVE;
  GroupCano.destroyEach();
  GroupCanoC.destroyEach();
  score = 0

}
