window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var en;
var ctxEn;

var drawBtn;
var clearBtn;

var gameWidth = 1200;
var gameHeigth = 650;

var background = new Image();
background.src = "img/1.jpg";

var tiles = new Image();
tiles.src = "img/ob.png";

var player;
var enemy;

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
    
    map.width  = gameWidth;
    map.height = gameHeigth;
    
    pl.width   = gameWidth;
    pl.height  = gameHeigth;
    
    en.width   = gameWidth;
    en.height  = gameHeigth;
    
    drawBtn = document.getElementById("drawBtn")
    clearBtn = document.getElementById("clearBtn")
    
    drawBtn.addEventListener("click", drawRect, false);
    clearBtn.addEventListener("click", clearRect, false);
    
    player = new Player();
    enemy = new Enemy();
    
    drawBg();
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
    this.drawX = 0;
    this.drawY = 190;
    this.width = 110;
    this.height = 80;
    this.speed = 7;
    
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
/////////////////////////////////////////////////////////////////////////////


///////ENEMY/////////////////////////////////////////////////////////////////
function Enemy()
{
    this.srcX = 0;
    this.srcY = 112;
    this.drawX = 1100;
    this.drawY = 120;
    this.width = 100;
    this.height = 50;
    this.speed = 7; 

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
///////////////////////////////////////////////////////////////////////////


function update()//ОБНОВЛЕНИЕ
{
    player.update();
    enemy.update();
}
    
function draw()//ВЫЗОВ
{
    player.draw();
    enemy.draw();
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
    ctxMap.clearRect (0, 0, 1200, 650);
}

function drawBg()//ФОН
{
    ctxMap.drawImage (background, 0, 0, 1200, 650, 0, 0, gameWidth, gameHeigth);
}