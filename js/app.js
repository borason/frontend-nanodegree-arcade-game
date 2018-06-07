class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Enemy extends Character {
  constructor(x, y, speed) {
    super(x, y);
    this.width = 100;
    this.height = 100;
    this.speed = Math.floor((Math.random() * 300) + 100);
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    this.x += this.speed * dt;
    this.reachedEndOfBoard();
    this.collisionDetector();
  }
  reachedEndOfBoard() {
  if (this.x > ctx.canvas.width) {
    this.x = 0;
    this.speed = Math.floor((Math.random() * 300) + 100);
    }
  }
  collisionDetector() {
    if (player.y <= (this.y + 20) && (this.x + 100 > player.x && this.x - 100 < player.x)) {
    console.log('collision');
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
class Player extends Character {
  constructor(x, y) {
    super(x, y);
    this.width = 100;
    this.height = 100;
    this.sprite = "images/char-boy.png";
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update() {

  }
  handleInput(keyCode) {
        switch(keyCode){
        case 'up':
            this.y -= (this.y > 0) ? 83 : 0;
            break;
        case 'down':
            this.y += (this.y < 300) ? 83 : 0;
            break;
        case 'right':
            this.x += (this.x < 400) ? 100 : 0;
            break;
        default:
            this.x -= (this.x > 0) ? 100 : 0;
    }
  }
}

// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
let allEnemies = [];

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 322);

let newEnemies = function () {
  const trafficLane = [60, 145, 228];
  for (let i = 0; i < 3; i ++) {
    allEnemies.push(new Enemy (0, trafficLane[i]));
  }
};

newEnemies();

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

