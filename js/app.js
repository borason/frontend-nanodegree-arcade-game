// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 300) + 10);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log(this.x);
};

// Now write your own player class
const Player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = "images/char-boy.png";
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(){
    // console.log(this.x);
};

Player.prototype.render = function(){
    ctx.drawImage(this.sprite, this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    switch(keyCode){
        case 'up':
            this.y -= (this.y > 0) ? 85 : 0;
            break;
        case 'down':
            this.y += (this.y < 300) ? 85 : 0;
            break;
        case 'right':
            this.x += (this.x < 400) ? 100 : 0;
            break;
        default:
            this.x -= (this.x > 0) ? 100 : 0;
    }
};
// Now instantiate your objects.
let allEnemies = [];

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 320);


function spawnEnemies () {
  const trafficLane = [60, 145, 230];
  for (let i = 0; i < 3; i ++) {
    allEnemies.push(new Enemy (0, trafficLane[i]));
  }
};

let newEnemies = function(){setInterval(spawnEnemies(), 1000);};

newEnemies();

// let enemy1 = allEnemies.push(new Enemy (0, 60));

// let enemy2 = allEnemies.push(new Enemy (0, 145));

// let enemy3 = allEnemies.push(new Enemy (0, 230));

// allEnemies.push(new Enemy (0, 60));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


