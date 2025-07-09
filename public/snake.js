let player_name = '';
while (!player_name) {
  player_name = prompt('请输入你的姓名:');
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 400;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'RIGHT';
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box
};
let score = 0;
let gameInterval;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

function draw() {
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#0f0' : '#fff';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'LEFT') snakeX -= box;
  if (direction === 'UP') snakeY -= box;
  if (direction === 'RIGHT') snakeX += box;
  if (direction === 'DOWN') snakeY += box;

  // 吃到食物
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById('score').innerText = '得分: ' + score;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
  } else {
    snake.pop();
  }

  // 新头部
  const newHead = { x: snakeX, y: snakeY };

  // 撞墙或撞自己
  if (
    snakeX < 0 || snakeX >= canvasSize ||
    snakeY < 0 || snakeY >= canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(gameInterval);
    setTimeout(() => {
      alert('游戏结束，得分: ' + score);
      submitScore();
    }, 100);
    return;
  }

  snake.unshift(newHead);
}

function collision(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) return true;
  }
  return false;
}

function submitScore() {
  console.log('submitScore');
  fetch('/api/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player_name, score })
  })
    .then(res => res.json())
    .then(data => alert('分数已提交！'))
    .catch(err => alert('提交失败: ' + err));
}

gameInterval = setInterval(draw, 200); 