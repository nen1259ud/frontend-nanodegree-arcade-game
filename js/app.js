// Enemies our player must avoid
var Enemy = function (x, y, speed) {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy bug that is added to the playing field
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy of cockroach that is added to the playing field
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function (){
  // Checks for collisions between the player and the enemies
  //
  if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
      player.x = 202;
      player.y = 405;
      player.moves = 0;
  };
}

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class with parameters for x and y axis
class Player {
  constructor (x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.moves = 0;
  }

  // called ehen user has reached the top.
  // we popup a modal box show thw number of moves, reset the player and play again.
  resetPlayer(){
    //show the game over dialog then reset player and  hide it afer 2000ms
    document.getElementById('gameOverModal').style.display = "block";
    document.getElementById('moveScore').innerHTML = 'Completed in ' + this.moves + " Moves";
    setTimeout(() => {
      this.y = 405;
      this.x= 202;
      document.getElementById('gameOverModal').style.display = "none";
      this.moves = 0;
    }, 2000);
  }

  update(){

  }

  //renders the image that is set for the player
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // handles the movement of the player based on key pressed
  handleInput(e){
    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (e == 'left' && this.x > 0) {
        this.x -= 102;
        this.moves++;

    };
    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (e == 'right' && this.x < 400) {
        this.x += 102;
        this.moves++;
    };

    // Enables user on up arrow key to move upwards on the y axis by 83
    if (e == 'up' && this.y > 0) {
        this.y -= 83;
        this.moves++;
    };

    // Enables user on down arrow key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (e == 'down' && this.y < 400) {
        this.y += 83;
        this.moves++;
    };

    // Once the user reaches the top we reset the player
    if (this.y < 0) {
           this.resetPlayer();
        };
  }
}
// All enemies are placed in an array
var allEnemies = [];

// Location of the 3 enemies on the y axis
var enemyLocation = [63, 147, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200
// then enemies are randomly regenerated in the enemy update function
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The starting position of the player is located at x=200, y=405
var player = new Player(200, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
