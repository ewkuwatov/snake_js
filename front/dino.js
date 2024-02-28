document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const box = 20;
  let snake = [{x: 200, y: 200}];
  let food = {x: 0, y: 0};
  let dx = 0;
  let dy = 0;
  let score = 0;

  function drawSnake() {
    snake.forEach(part => {
      ctx.fillStyle = "green";
      ctx.fillRect(part.x, part.y, box, box);
    });
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
  }

  function drawScore() {
    document.getElementById("score").textContent = "Score: " + score;
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * canvas.width / box) * box;
    food.y = Math.floor(Math.random() * canvas.height / box) * box;
  }

  function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      generateFood();
    } else {
      snake.pop();
    }
  }

  function checkCollision() {
    if (
      snake[0].x < 0 ||
      snake[0].x >= canvas.width ||
      snake[0].y < 0 ||
      snake[0].y >= canvas.height ||
      snake.slice(1).some(part => part.x === snake[0].x && part.y === snake[0].y)
    ) {
      clearInterval(game);
      alert("Game Over! Your score is " + score);
    }
  }

  function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === "ArrowLeft" && dx !== box) { dx = -box; dy = 0; }
    if (keyPressed === "ArrowRight" && dx !== -box) { dx = box; dy = 0; }
    if (keyPressed === "ArrowUp" && dy !== box) { dx = 0; dy = -box; }
    if (keyPressed === "ArrowDown" && dy !== -box) { dx = 0; dy = box; }
  }

  generateFood();
  let game = setInterval(function() {
    draw();
    moveSnake();
    checkCollision();
  }, 100);

  document.addEventListener("keydown", changeDirection);
});
