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
    this.speed = Math.floor((Math.random() * 300) + 50);
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    this.x += this.speed * dt;
    this.reachedEndOfBoard();
  }
  reachedEndOfBoard() {
  if (this.x > ctx.canvas.width) {
    this.x = 0;
    this.speed = Math.floor((Math.random() * 300) + 50);
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
    this.width = 80;
    this.height = 100;
    this.sprite = "images/char-boy.png";
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update() {
    this.collisionDetector();
    if (this.y < 0) {
      win();
    }
  }
    collisionDetector() {
      allEnemies.forEach(function (enemy){
      if (player.x < enemy.x + 80 &&
          player.x + 80 > enemy.x &&
          player.y < enemy.y + 60 &&
          60 + player.y > enemy.y) {
      player.x = 200;
      player.y = 405;
      }
      });
    }
  handleInput(keyCode) {
        switch(keyCode){
        case 'up':
            this.y -= (this.y > 0) ? 83 : 0;
            break;
        case 'down':
            this.y += (this.y < 400) ? 83 : 0;
            break;
        case 'right':
            this.x += (this.x < 400) ? 100 : 0;
            break;
        default:
            this.x -= (this.x > 0) ? 100 : 0;
    }
  }
}

let win = function() {
  console.log('win');
}

// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
let allEnemies = [];

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 405);

const trafficLane = [60, 145, 228];

let spawnEnemies = function () {
  for (let i = 0; i < 3; i ++) {
    allEnemies.push(new Enemy (0, trafficLane[i]));
  }
};

spawnEnemies();

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

//Modal
// Get the modal
const modal = document.getElementById('winModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
