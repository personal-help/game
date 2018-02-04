window.onload = init;

var map;
var ctxMap;

//PLAYER////////
var pl;
var ctxPl;
var healthPl;

var one;
var ctxOne;
var ctxOneP;
///////////////

//ENEMY////////
var en;
var ctxEn;
var healthEn;

var two;
var ctxTwo;
var ctxTwoP;
//////////////

var mapY = 0;
var mapY1 = 650;

var bot;
var ctxBot;

var onePlay;
var twoPlay;

var gameWidth = 1200;
var gameHeigth = 650;

var background = new Image();
background.src = "img/1.jpg";

var background1 = new Image();
background1.src = "img/1.jpg";

var tiles = new Image();
tiles.src = "img/ob.png";

var player;
var enemy;
var bots = []; 

var isPlaying;

var requestAnimFrame =  window.requestAnimationFrame || 
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

function init()//ИНИЦИАЛИЗАЦИЯ
{
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");
    
    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");
    
    en = document.getElementById("enemy");
    ctxEn = en.getContext("2d");
    
    one = document.getElementById("one");
    ctxOne = one.getContext("2d");
    
    two = document.getElementById("two");
    ctxTwo = two.getContext("2d");
    
    oneP = document.getElementById("oneP");
    ctxOneP = oneP.getContext("2d");
    
    twoE = document.getElementById("twoE");
    ctxTwoE = twoE.getContext("2d");
    
    bot = document.getElementById("bot");
    ctxBot = bot.getContext("2d");
    
    map.width  = gameWidth;
    map.height = gameHeigth;
    
    pl.width   = gameWidth;
    pl.height  = gameHeigth;
    
    en.width   = gameWidth;
    en.height  = gameHeigth;
    
    one.width   = gameWidth;
    one.height  = gameHeigth;
    
    two.width   = gameWidth;
    two.height  = gameHeigth;
    
    oneP.width  = gameWidth;
    oneP.height = gameHeigth;
    
    twoE.width  = gameWidth;
    twoE.height = gameHeigth
    
    bot.width   = gameWidth;
    bot.height  = gameHeigth;
    
    ctxOne.fillStyle = "blue";
    ctxOne.font = "bold 15pt Arial";
    
    ctxTwo.fillStyle = "black";
    ctxTwo.font = "bold 15pt Arial";
    
    ctxOneP.fillStyle = "blue";
    ctxOneP.font = "bold 50pt Arial";
    
    ctxTwoE.fillStyle = "black";
    ctxTwoE.font = "bold 50pt Arial";
    
    onePlay = document.getElementById("onePlay")
    twoPlay = document.getElementById("twoPlay")
    
    onePlay.addEventListener("click", onePlay, true);
    twoPlay.addEventListener("click", twoPlay, true);
    
    player = new Player();
    enemy = new Enemy();
    
    healthPl = 100;
    healthEn = 100;
    
    startLoop();
      
    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);
    
    document.addEventListener("keydown", checkKeyDown2, false);
    document.addEventListener("keyup", checkKeyUp2, false);
}

////PLAYER/////////////////////////////////////////////////////////////////////
function Player()
{
    this.srcX = 0;
    this.srcY = 0;
    
    this.drawX = 40;
    this.drawY = 190;
    
    this.width = 49;
    this.height = 100;
    
    this.speed = 10;
    
    //Key
    this.isUp    = false; 
    this.isDown  = false;
    this.isLeft  = false;
    this.isRight = false;    
}

Player.prototype.draw = function()
{
    clearctxPlayer();
    ctxPl.drawImage (tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

Player.prototype.update = function()
{
    if(healthPl < 1) {stopLoop(); end1();}
    
    if(this.drawX < 0) {this.drawX = 0;}
        if(this.drawX > 1150) {this.drawX = 1150;}
            if(this.drawY < 0) {this.drawY = 0;}
                if(this.drawY > 570) {this.drawY = 570;}
    
    for(var i = 0; i < bots.length; i++)
        {
            if(this.drawX >= bots[i].drawX &&
               this.drawY >= bots[i].drawY &&
               this.drawX <= bots[i].drawX + this.width &&
               this.drawY <= bots[i].drawY + this.height)
                {
                    healthPl--;
                }
        }
    
    this.chooseDir();
}

Player.prototype.chooseDir = function()
{
    if(this.isUp)    this.drawY -= this.speed;
    if(this.isDown)  this.drawY += this.speed;
    if(this.isRight) this.drawX += this.speed;
    if(this.isLeft)  this.drawX -= this.speed;
}

function checkKeyDown(e)
{
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    
    if(keyChar == "W")  {player.isUp    = true; e.preventDefault();}
    if(keyChar == "S")  {player.isDown  = true; e.preventDefault();}
    if(keyChar == "D")  {player.isRight = true; e.preventDefault();}
    if(keyChar == "A")  {player.isLeft  = true; e.preventDefault();}
}

function checkKeyUp(e)
{
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    
    if(keyChar == "W")  {player.isUp    = false; e.preventDefault();}
    if(keyChar == "S")  {player.isDown  = false; e.preventDefault();}
    if(keyChar == "A")  {player.isLeft  = false; e.preventDefault();}
    if(keyChar == "D")  {player.isRight = false; e.preventDefault();}
}

function clearctxPlayer()
{
    ctxPl.clearRect(0, 0, gameWidth, gameHeigth);
}

function info1()//ИМЯ
{
     ctxOne.clearRect(0, 0, gameWidth, gameHeigth);
     ctxOne.fillText("СИНИЙ: " + healthPl, 10, 20);
}

function end1()//ИМЯ
{
     ctxOneP.clearRect(0, 0, gameWidth, gameHeigth);
     ctxOneP.fillText("СИНИЙ ПРОИГРАЛ", 320, 200);
}
/////////////////////////////////////////////////////////////////////////////


///////ENEMY/////////////////////////////////////////////////////////////////
function Enemy()
{
    this.srcX   = 65;
    this.srcY   = 0;
    
    this.drawX  = 1110;
    this.drawY  = 150;
    
    this.width  = 49;
    this.height = 100;
    
    this.speed = 10; 

    //Key
    this.isUp    = false; 
    this.isDown  = false;
    this.isLeft  = false;
    this.isRight = false;
}

Enemy.prototype.draw = function()
{
    clearctxEn();
    ctxEn.drawImage (tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.chooseDir = function()
{
    if(this.isUp)    this.drawY -= this.speed;
    if(this.isDown)  this.drawY += this.speed;
    if(this.isRight) this.drawX += this.speed;
    if(this.isLeft)  this.drawX -= this.speed;
}

Enemy.prototype.update = function()
{
    if(healthEn < 1) {stopLoop(); end2();}
    
    if(this.drawX < 0) this.drawX = 0;
        if(this.drawX > 1150) this.drawX = 1150;
            if(this.drawY < 0) this.drawY = 0;
                if(this.drawY > 570) this.drawY = 570;
    
    for(var i = 0; i < bots.length; i++)
        {
            if(this.drawX > bots[i].drawX &&
               this.drawY > bots[i].drawY &&
               this.drawX < bots[i].drawX + this.width &&
               this.drawY < bots[i].drawY + this.height)
                {
                    healthEn--;
                }
        }
    
    this.chooseDir();
}

function checkKeyDown2(e)
{
    var keyID2 = e.keyCode || e.which;
    var keyChar2 = String.fromCharCode(keyID2);
    
    if(keyChar2 == "I")  {enemy.isUp    = true; e.preventDefault();}
    if(keyChar2 == "K")  {enemy.isDown  = true; e.preventDefault();}
    if(keyChar2 == "L")  {enemy.isRight = true; e.preventDefault();}
    if(keyChar2 == "J")  {enemy.isLeft  = true; e.preventDefault();}
}

function checkKeyUp2(e)
{
    var keyID2 = e.keyCode || e.which;
    var keyChar2 = String.fromCharCode(keyID2);
    
    if(keyChar2 == "I")  {enemy.isUp    = false; e.preventDefault();}
    if(keyChar2 == "K")  {enemy.isDown  = false; e.preventDefault();}
    if(keyChar2 == "J")  {enemy.isLeft  = false; e.preventDefault();}
    if(keyChar2 == "L")  {enemy.isRight = false; e.preventDefault();}
}

function clearctxEn()
{
    ctxEn.clearRect(0, 0, gameWidth, gameHeigth);
}

function info2()//ИМЯ
{
     ctxTwo.clearRect(0, 0, gameWidth, gameHeigth);
     ctxTwo.fillText("ЧЁРНЫЙ: " + healthEn, 1050, 20);
}

function end2()//ИМЯ
{
     ctxTwoE.clearRect(0, 0, gameWidth, gameHeigth);
     ctxTwoE.fillText("ЧЁРНЫЙ ПРОИГРАЛ", 320, 200);
}
///////////////////////////////////////////////////////////////////////////

//////BOT//////////////////////////////////////////////////////////////////
function Bot()
{
    this.srcX = 125;
    this.srcY = 0;
    
    this.drawX = Math.floor(Math.random() * gameWidth);
    this.drawY = Math.floor(Math.random() * gameHeigth) + gameHeigth;
    
    this.width = 25;
    this.height = 50;
    
    this.speed = 10;
}

Bot.prototype.draw = function()
{
    ctxBot.drawImage (tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

Bot.prototype.update = function()
{
    this.drawY -= this.speed;
    
    if(this.drawY < -100) 
    {
        this.drawY = Math.floor (Math.random() * gameHeigth) + gameHeigth; 
        this.drawX = Math.floor (Math.random() * gameWidth);
    }
}
   function clearctxBot()
{
    ctxBot.clearRect(0, 0, gameWidth, gameHeigth);
}

function spawnBot(count)//+BOTS
{
    for(var i = 0; i < count; i++)
        {
            bots[i] = new Bot();
        }
}
///////////////////////////////////////////////////////////////////////////

function update()//ОБНОВЛЕНИЕ
{
    moveBg();
    drawBg();
    info1();
    info2();
    
    player.update();
    enemy.update();
    
    for(var i = 0; i < bots.length; i++)
    {
        bots[i].draw();         
    }
}

////////////////////////////
////////////////////////////

function moveBg()
{
    var vel  = 4
    mapY  -= vel;
    mapY1 -= vel;
    
    if(mapY + gameHeigth < 5) mapY = gameHeigth;
    if(mapY1 + gameHeigth < 5) mapY1 = gameHeigth;
}
    
function draw()//ВЫЗОВ
{
    player.draw();
    enemy.draw();
    
    clearctxBot();
    
    for(var i = 0; i < bots.length; i++)
    {
        bots[i].update();         
    }
}

///////////////////////ЦИКЛ////////////////////////////////////////////////
function loop()
{
    if(isPlaying)
        {
            draw();
            update();
            requestAnimFrame(loop);
        }
}

function startLoop()
{
    isPlaying = true;   
    loop();
    
    spawnBot(9)
}

function stopLoop()
{
    isPlaying = false;
}
///////////////////////////////////////////////////////////////////////////


function drawRect()
{
    ctxMap.fillStyle = "#01796f";
    ctxMap.fillRect (0, 0, 1200, 650);
}

function clearRect()//ОЧИСТКА
{
    ctxMap.clearRect (0, 0, gameWidth, gameHeigth);
}

function drawBg()//ФОН
{
    ctxMap.clearRect (0, 0, gameWidth, gameHeigth);
    
    ctxMap.drawImage (background, 0, 0, 1200, 650, 0, mapY, gameWidth, gameHeigth);
    
    ctxMap.drawImage (background1, 0, 0, 1200, 650, 0, mapY1, gameWidth, gameHeigth);
}