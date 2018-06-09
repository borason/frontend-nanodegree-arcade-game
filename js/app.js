'use strict';

// Variable declarations
let player;
let allEnemies;
let win = false;

// DOM selectors
const modalBox = document.querySelector('.modal-content');
const modal = document.querySelector('#win-modal');
const modalButton = document.querySelector('#modal-button');
const closeButton = document.querySelector('#close-button');
const restartButton = document.querySelector('#replay-button');
const bodySelector = document.querySelector('body');

// Function for when player runs into enemy
const collision = function() {
  // Flashes red background color upon collision
  bodySelector.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
  setTimeout(function() {
    bodySelector.style.backgroundColor = '#eef0d8';
  }, 100);
    player.x = 200;
    player.y = 405;
};

// Opens modal upon player reaching water
const openModal = function() {
  modalBox.classList.add('show-modal');
  modal.classList.add('overlay');
  modal.classList.remove('modal');
};

// Closes modal when clicking close button or play again button
const closeModal = function() {
  modalBox.classList.remove('show-modal');
  modal.classList.remove('overlay');
  modal.classList.add('modal');
  allEnemies = '';
  win = false;
  startGame();
}

// Starting function for game when page loads or player replays game
const startGame = function() {
  allEnemies = [];
  // Creates player at starting position
  player = new Player(200, 405);
  // Array that contains vertical position of each enemy lane
  const trafficLane = [60, 145, 228];

// IIFE creates three enemies: one per lane
  let spawnEnemies = function () {
    for (let i = 0; i < 3; i ++) {
      allEnemies.push(new Enemy (0, trafficLane[i]));
    }
  }();
  // Adds event listeners to modal buttons
  closeButton.addEventListener('click', closeModal);
  restartButton.addEventListener('click', closeModal);
}

// Super class for players and enemies
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Render function
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemy class
class Enemy extends Character {
  constructor(x, y, speed) {
    super(x, y);
    this.width = 100;
    this.height = 100;
// Assigns random speed to enemy
    this.speed = Math.floor((Math.random() * 300) + 50);
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    this.x += this.speed * dt;
    this.reachedEndOfBoard();
  }
  // Resets enemy to beginning of canvas and assigns new random speed
  reachedEndOfBoard() {
  if (this.x > ctx.canvas.width) {
    this.x = 0;
    this.speed = Math.floor((Math.random() * 300) + 50);
    }
  }
}

// Player class
class Player extends Character {
  constructor(x, y) {
    super(x, y);
    this.width = 80;
    this.height = 100;
    this.sprite = "images/char-boy.png";
  }
  update() {
    this.collisionDetector();
    // Determines win condition
    while (this.y < 0 && (win === false)) {
      openModal();
      win = true;
    }
  }
  // Detects collision between player and
  collisionDetector() {
    allEnemies.forEach(function (enemy){
      if (player.x < enemy.x + 80 &&
          player.x + 80 > enemy.x &&
          player.y < enemy.y + 60 &&
          60 + player.y > enemy.y) {
      collision();
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

window.onload = startGame();