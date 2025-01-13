const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const box = 20; // Snake size
const canvasSize = 400;
let snake = [{ x: box * 5, y: box * 5 }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;

// Event listener for key presses
document.addEventListener("keydown", changeDirection);

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Move the snake
    const head = { ...snake[0] };
    switch (direction) {
        case "UP": head.y -= box; break;
        case "DOWN": head.y += box; break;
        case "LEFT": head.x -= box; break;
        case "RIGHT": head.x += box; break;
    }
    snake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        food = spawnFood();
    } else {
        snake.pop(); // Remove tail
    }

    // Check collision with walls or itself
    if (checkCollision(head)) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Spawn food at a random location
function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

// Check collision with walls or itself
function checkCollision(head) {
    // Collision with walls
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }
    // Collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Change direction of the snake
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    if (key === 38 && direction !== "DOWN") direction = "UP";
    if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    if (key === 40 && direction !== "UP") direction = "DOWN";
}

// Reset the game
function resetGame() {
    snake = [{ x: box * 5, y: box * 5 }];
    direction = "RIGHT";
    score = 0;
    document.getElementById("score").textContent = score;
    food = spawnFood();
}

// Run the game loop
setInterval(gameLoop, 100);
