let player, floor1, floor2, floor3, slime, paper, bound,trashcan;
let racoonIdle,  raccoonWalkSlow,  raccoonWalkFast,  slimepng,  block1,  block2,  block3, kill, papergif, trashcanimg, twerking, laughing, winscreen, losescreen, tryb, mainb;
let pve;
let gameState = 0;
let hP = 3;
let score = 0;
let slimeSpeed = 1.5;
let sound1,sound2, sound3, sound4;
let sound1Played = false;
let sound2Played = false;
let sound3Played = false;
let sound4Played = false;
// let title = true;

function preload() {
  raccoonIdle = loadImage("racoon/raccoon.gif");
  raccoonWalkSlow = loadImage("racoon/walk_slow.gif"); // slow walk
  raccoonWalkFast = loadImage("racoon/walk_fast.gif"); // fast walk

  slimepng = loadImage("enemy/slime_walk.gif");

  block1 = loadImage("platform/Block1.png");
  block2 = loadImage("platform/Block2.png");
  block3 = loadImage("platform/Block3.png");
  killimg = loadImage("platform/Spikes.png");

  papergif = loadImage("sprite/paper.gif");
  back = loadImage("bg/bg.png");
  main = loadImage("bg/Game_Start.png");
  play = loadImage("button/play.png");
  trashcanimg = loadImage("sprite/Trashcan.png");
  twerking = loadImage("racoon/twerk.gif");
  laughing = loadImage("racoon/laughing.gif");
  winscreen = loadImage("bg/Win.png");
  losescreen = loadImage("bg/Lost.png");
  tryb = loadImage("button/Tryagain.png");
  mainb = loadImage("button/Mainmenu.png");


  sound1 = loadSound("sound/sound1.wav");
  sound2 = loadSound("sound/bgsound.wav");
  sound3 = loadSound("sound/win.mp3");
  sound4 = loadSound("sound/fail.mp3");

}

function setup() {
  new Canvas(400, 400, "pixelated");

  world.gravity.y = 10;

//   gameSetup();

//   draw();
}

function draw() {
  background(225);

  if (gameState == 0) {
    startScreen();
  } else if (gameState == 1) {
    theGame();
  } else if (gameState == 2) {
    clearScreen();
    win();
  } else if (gameState == 3) {
    clearScreen();
    ded();
  }
}

//////// - START SCREEN - ///////////
function startScreen() {
  
  image(main, 0, 0, width, height);
  // image(play, 100, 100, width, height);
  textAlign(CENTER);
  textSize(15);
  fill(225);
  text("Click Any Key to Start",200,370,); 
  
  // clearScreen();
  //   state = "startScreen";
}

//////// - GAME CODE - ///////////
function theGame() {
  hehe();

  // https://openprocessing.org/sketch/1995592
  image(back, 48 - player.x / 5 - 100, 0); //background image
  back.resize(width * 2, height); //resize background image

  fill(255);
  text("Score:" + score, 50, 20); //referenced p5Play
  text("HP: " + player.hp, 50, 50); //GPT

  //camera code
  camera.x = player.x + 52;
  // camera.y = player.y;

  //referenced here https://openprocessing.org/sketch/1869796/
  if (
    groundSensor.overlapping(floor1) ||
    groundSensor.overlapping(floor2) ||
    groundSensor.overlapping(floor3) ||
    groundSensor.overlapping(kill) ||
    groundSensor.overlapping(slime)
  ) {
    console.log("is on ground");
    if (kb.presses("up") || kb.presses("space")) {
      player.vel.y = -4.5;
    }
  }
  player.overlaps(paper, collectPaper);
  //pve

  if (player.overlaps(slime)) player.hp -= 1;
  //print(player.hp); //Prof. Tyler

  if (player.overlaps(kill)) player.hp -= 3;

  if (kb.pressing("left")) {
    player.vel.x = -2;
    player.img = raccoonWalkFast;
    player.mirror.x = false;
  } else if (kb.pressing("right")) {
    player.vel.x = 2;
    player.img = raccoonWalkFast;
    player.mirror.x = true;
  } else {
    player.vel.x = 0;
    player.img = raccoonIdle;
  }
  
}

//////// - DMG PLAYER - ///////////
function minusHealth(slime, player) {
  hp--;

  // if (player.hp <= 0){
  //   player.hp = 0;
  // }
}

function killPlayer(kill, player){
  hp--;
}

//////// - COLLECT PAPER - ///////////
function collectPaper(player, paper) {
  paper.remove();
  score++;
}

function mousePressed() {
 
 if (gameState == 0) {
     if (!sound1Played) {
    sound1.loop();
    sound1Played = true;
  }
}
}

function keyPressed() {

 if (gameState == 0) {
      stopAllSounds();
    resetSoundFlags();
    gameSetup();
    gameState = 1;
  }

  if (gameState == 2 || gameState == 3) {
    if (keyCode === 65 || keyCode === LEFT_ARROW) {
      clearScreen();
      gameState = 0; // go to main menu
    } else if (keyCode === 68 || keyCode === RIGHT_ARROW) {
      clearScreen();
      gameSetup();
      gameState = 1; // restart the game
    }
  }
}


//////// - GAME WIN/LOSE - ///////////
function hehe() {
  if (player.hp <= 0) {
    gameState = 3;
  }

  if (player.overlaps(trashcan) && score >= 10) {
    gameState = 2;
  }//actual win

}

function win() {
  if (!sound3Played) {
    stopAllSounds();
    sound3.play();
    sound3Played = true;
  }
background(220);
  image(winscreen, 0, 0, width, height);
  image(twerking, 110, 200, 180, 180);
  image(tryb,135, 40, 250, 230);
  image(mainb,20, 81, 240,220)
  text("[⇦]",130,160);
  text("[⇨]",250,160);

  if (
    mouseX > 70 &&
    mouseX < 195 &&
    mouseY > 160 && 
    mouseY < 190 &&
    mouseIsPressed
  ) { gameState = 0;
  } else {
    
  }
   if (
    mouseX > 200 &&
    mouseX < 320 &&
    mouseY > 160 && 
    mouseY < 190 &&
    mouseIsPressed
  ) { gameState = 1;
  } else {
    
  }
}

function ded() {
  if (!sound4Played) {
    stopAllSounds();
    sound4.play();
    sound4Played = true;
  }
  background(0);
  image(losescreen, 0, 0, width, height);
   image(laughing, 110, 200, 180, 180);
  image(tryb,135, 40, 250, 230);
  image(mainb,20, 81, 240,220)
  text("[⇦]",130,160);
  text("[⇨]",250,160);

  if (
    mouseX > 70 &&
    mouseX < 195 &&
    mouseY > 160 && 
    mouseY < 190 &&
    mouseIsPressed
  ) { gameState = 0;
  } else {
    
  }
   if (
    mouseX > 200 &&
    mouseX < 320 &&
    mouseY > 160 && 
    mouseY < 190 &&
    mouseIsPressed
  ) { gameState = 1;
  } else {
    
  }
}


//////// - GAME SETUP - ///////////
function gameSetup() {
  if (!sound2Played) {
    sound2.loop();
    sound2Played = true;
  }
  score = 0;
  
  
  // player
  let playerX = 40;
  let playerY = 350;
  player = new Sprite(playerX, playerY, 25, 25);
  player.img = raccoonIdle;
  player.layer = 3; //so that it appears before the background
  player.rotationLock = true;
  player.friction = 0;
  player.hp = 3;

  //ground sensor
  groundSensor = new Sprite(playerX, playerY + 5, 20, 20, "n");
  groundSensor.mass = 0.01;
  groundSensor.visible = false;

  let j = new GlueJoint(player, groundSensor);
  j.visible = false;

  // enemy
  // slime = new Sprite(250,100,25,25);
  slime = new Group();
  let slimeX = 1;
  let slimeY = 10;
  slime.img = slimepng;
  slime.layer = 2;
  slime.rotationLock = true;
  slime.tile = "s";
  slime.collider = "dynamic";

  paper = new Group();
  paper.img = papergif;
  paper.layer = 2;
  paper.collider = "dynamic";
  // paper.addAni({ w: 16, h: 16, row: 0, frames: 2 });
  paper.tile = "p";

  // floor
  //   https://p5play.org/learn/sprite.html?page=1
  floor1 = new Group();
  floor1.layer = 2;
  floor1.img = block1;
  // floor.y = 190;
  floor1.w = 30;
  floor1.h = 15;
  floor1.collider = "static";
  floor1.tile = "1";

  floor2 = new Group();
  floor2.layer = 2;
  floor2.img = block2;
  floor2.w = 55;
  floor2.h = 15;
  floor2.collider = "static";
  floor2.tile = "2";

  floor3 = new Group();
  floor3.layer = 3;
  floor3.img = block3;
  floor3.w = 70;
  floor3.h = 15;
  floor3.collider = "static";
  floor3.tile = "3";

  kill = new Group();
  kill.layer = 3;
  kill.img = killimg;
  kill.w = 30;
  kill.h = 10;
  kill.collider = "static";
  kill.tile = "k";


  bound = new Group ();
  bound.layer = 3;
  bound.w = 10;  // smaller width for edge detection
  bound.h = 30;
  bound.collider = 'static';
  bound.tile = 'b'; // NEW tile character for bounds
  bound.visible = false;  // keep it invisible

  
  trashcan = new Group();
  trashcan.layer = 3;
  trashcan.img = trashcanimg;
  trashcan.collider = "dynamic";
  trashcan.tile = "t"

  new Tiles(
    [
      ".p..s...p........p......1.s.p...1",
      ".1..1...11..s....2..p.3.s.3.1....s",
      "..p2..3....p1.s12...1.s.1.....2..k",
      "ps1.p...2..2..3.p.2...3......3...",
      "12..1.....1.p...1...p..3...k....2",
      "..k..p..1...1k.3.k..2...t...1..3",
      ".....2.s..3.k...1..1.k..2..3..2",
      "....2.k3.1..p.1.2...s..2..p.1..",
      "3..2........3.......1.....3.", //last row
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", //30
    ],
    50, //x spacing
    40, //y spacing

    floor1.w * 2 - 10,
    floor1.h * 3
    // floor2.w * 4,
    // floor2.h * 3,
    // floor3.w * 10,
    // floor3.h * 3,
  );
}


//////// - SOUND RESET - ///////////
function resetSoundFlags() {
  sound1Played = false;
  sound2Played = false;
  sound3Played = false;
  sound4Played = false;
}

//////// - SOUND STOPPER - ///////////
function stopAllSounds() {
  sound1.stop(); // title
  sound2.stop(); // gameplay
  sound3.stop(); // win
  sound4.stop(); // lose
}

//////// - DESTROY SPRITES - ///////////
function clearScreen() {
  player.remove();
  groundSensor.remove();
  slime.removeAll();
  floor1.removeAll();
  floor2.removeAll();
  floor3.removeAll();
  kill.removeAll();
  paper.removeAll();
  trashcan.remove();
}
