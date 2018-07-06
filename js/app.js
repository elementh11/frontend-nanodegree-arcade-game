// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Start location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
      this.x = this.x + (this.speed * dt);
    } else {
      this.x = -200;
    }
    // Handle player - enemy collision
    handleCollision();
  }

// Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }
  update(dt) {
    // Reset player position and handle a complete run
    if (player.y == -25) {
        player.x = 202;
        player.y = 375;
      handleWin();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(allowedKeys) {
    if (allowedKeys == 'left' && player.x > 0) {
      player.x -= 101;
    }
    if (allowedKeys == 'up' && player.y > 0) {
      player.y -= 80;
    }
    if (allowedKeys == 'right' && player.x < 404) {
      player.x += 101;
    }
    if (allowedKeys == 'down' && player.y < 375) {
      player.y += 80;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
allEnemies.push(new Enemy(-150, Math.floor((Math.random()*3))*80 + 55, 100));
allEnemies.push(new Enemy(-200, Math.floor((Math.random()*3))*80 + 55, 150));

// Place the player object in a variable called player
const player =  new Player(202, 375);

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

function handleCollision() {
  // Reset the game, update the score, and decrease the enemy speed
  allEnemies.forEach(function(enemy){
    if (player.y == enemy.y && enemy.x > (player.x - 50) && enemy.x < (player.x + 50)) {
        player.x = 202;
        player.y = 375;
        updateScores();
        score = 0;
        displayScore.innerText = 'Current Score: ' + score;
        let speedChange = runs * 10;
        allEnemies.forEach(function(enemy) {
          enemy.speed -= speedChange;
          enemy.x = -200;
        })
        runs = 0;
    }
  })
}

// Add game statistics
let displayScore = document.querySelector('.score');
let displayLevel = document.querySelector('.level');
let displayBestScore = document.querySelector('.best-score');
let score = 0;
let runs = 0;
let level = 0;
let bestScore = 0;
displayScore.innerText = 'Current Score: ' + score;
displayLevel.innerText = 'Runs Completed: ' + level;

function updateScores() {
  if (score > bestScore) {
    bestScore = score;
    displayBestScore.innerText = 'Best Score: ' + bestScore;
  }
}

// Handles a complete run
function handleWin() {
  // update the scores
  score += 100;
  level += 1;
  displayScore.innerText = 'Current Score: ' + score;
  displayLevel.innerText = 'Runs Completed: ' + level;
  runs += 1;
  // increase enemy speed
  allEnemies.forEach(function(enemy){
    enemy.speed += 10;
  });
  // add more enemies to the array
  // with random velocity and x, y coordinates
  if (runs == 1){
    allEnemies.push(new Enemy(
      -Math.floor((Math.random()*10))*10 - 100,
      Math.floor((Math.random()*3))*80 + 55,
      Math.floor((Math.random()*10))*10 + 100));
  }
  if (runs == 2){
    allEnemies.push(new Enemy(
      -Math.floor((Math.random()*10))*10 - 100,
      Math.floor((Math.random()*3))*80 + 55,
      Math.floor((Math.random()*10))*10 + 100));
  }
  if (runs == 4){
    allEnemies.push(new Enemy(
      -Math.floor((Math.random()*10))*10 - 100,
      Math.floor((Math.random()*3))*80 + 55,
      Math.floor((Math.random()*10))*10 + 100));
  }
  if (runs == 6){
    allEnemies.push(new Enemy(
      -Math.floor((Math.random()*10))*10 - 100,
      Math.floor((Math.random()*3))*80 + 55,
      Math.floor((Math.random()*10))*10 + 100));
  }
  if (runs == 8){
    allEnemies.push(new Enemy(
      -Math.floor((Math.random()*10))*10 - 100,
      Math.floor((Math.random()*3))*80 + 55,
      Math.floor((Math.random()*10))*10 + 100));
  }
  if (runs == 10){
    allEnemies.push(new Enemy(
      -Math.floor((Math.random()*10))*10 - 100,
      Math.floor((Math.random()*3))*80 + 55,
      Math.floor((Math.random()*10))*10 + 100));
    }
}
