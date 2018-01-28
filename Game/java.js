window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

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

function init()
{
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");
    
    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");
    
    map.width  = gameWidth;
    map.height = gameHeigth;
    pl.width   = gameWidth;
    pl.height  = gameHeigth;
    
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
}

function Player()
{
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.DrawY = 190;
    this.width = 110;
    this.height = 80;
    this.speed = 5;
    
    //Key
    this.isUp    = false; 
    this.isDown  = false;
    this.isLeft  = false;
    this.isRight = false;    
}

function Enemy()
{
    this.srcX = 0;
    this.srcY = 112;
    this.drawX = 900;
    this.DrawY = 120;
    this.width = 100;
    this.height = 50;
    this.speed = 8; 

}

Enemy.prototype.draw = function()
{
    ctxMap.drawImage (tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.DrawY, this.width, this.height);
}

Player.prototype.draw = function()
{
    clearctxPlayer();
    ctxPl.drawImage (tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.DrawY, this.width, this.height);
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
    
function draw()
{
    player.draw();
    enemy.draw();
}

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

function update()
{
    player.update();
}

function drawRect()
{
    ctxMap.fillStyle = "blue";
    ctxMap.fillRect (10, 10, 100, 100);
}

function clearRect()
{
    ctxMap.clearRect (0, 0, 1200, 650);
}

function clearctxPlayer()
{
    ctxPl.clearRect(0, 0, gameWidth, gameHeigth);
}

function drawBg()
{
    ctxMap.drawImage (background, 0, 0, 1200, 650, 0, 0, gameWidth, gameHeigth);
}


