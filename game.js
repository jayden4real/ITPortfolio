// This is the image for the ninja
const URL = new Image();
URL.src="https://codehs.com/uploads/6bdd899d1bdb09b38a1d3b1b6a22b2c0";
URL.onload = function() {

}

// This counts the amount of enemies on screen
var enemyCount = 0;
var enemies = [];

// This counts the amount of kills
var kills = 0;

// This gets the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// This stores the current kill counter text
var killCounterText;

// This stores the enemy counter text
var enemyCounterText;

// This makes the background green
function background() {
    ctx.fillStyle="lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// This gets a random X coordinate
function getRandomX() {
    var randomX = Math.random() * canvas.width - 40;
    return randomX;
}

// This gets a random Y coordinate
function getRandomY() {
    var randomY = Math.random() * canvas.height - 40;
    return randomY;
}

// This puts the game over screen if you have above 10 enemies on the screen
function gameOver() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game over! Too many enemies!", canvas.width / 2 - 200, canvas.height / 2);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("You killed " + kills + " enemies!", canvas.width / 2 - 80, canvas.height / 2 + 30);
    cancelAnimationFrame(gameLoop);
}

// This randomly places an enemy on the screen
function enemy() {
    if (enemyCount >= 10) {
        gameOver();
        return;
    }
    
    var randomX = getRandomX();
    var randomY = getRandomY();
    
    var enemyObj = {
        x: randomX,
        y: randomY,
        width: 80,
        height: 80,
        image: URL,
        draw: function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    };

    enemies.push(enemyObj);

    enemyCount++;
    enemyCounter();
}

// This creates the enemy counter
function enemyCounter() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Enemies: " + enemyCount, canvas.width - 140, 30);
}

// This creates the kill counter
function updateKillCounter() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Kills: " + kills, 10, 30);
}

// This is called whenever the mouse is pressed
function onMousePressed(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (mouseX >= enemy.x && mouseX <= enemy.x + enemy.width &&
            mouseY >= enemy.y && mouseY <= enemy.y + enemy.height) {
            enemies.splice(i, 1);
            enemyCount--;
            kills++;
            updateKillCounter();
            break;
        }
    }
}

// This function draws the enemies
function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    background();
    drawEnemies();
    enemyCounter();
    updateKillCounter();

    if (enemyCount < 10) {
        requestAnimationFrame(gameLoop);
    }
}


// This is the main function that calls all other functions
function main() {
    setInterval(enemy, 1000);
    gameLoop();
}

canvas.addEventListener('click', onMousePressed);

main();