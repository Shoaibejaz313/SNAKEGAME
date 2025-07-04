const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx)
const scoretext = document.querySelector(".score");
const btn = document.querySelector("#resetbtn");
canvas.width = 1500;
canvas.height = 720;
const gamewidth = canvas.width;
const gameheight = canvas.height;
const boardbackgoround = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    //each object is the body part of the snake
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
]


window.addEventListener("keydown", changeDirection);
btn.addEventListener("click", resetGame);




gameStart();



function gameStart() {
    running = true;
    scoretext.textContent = score;
    createFood();
    drawFood();
    nextTick();
}
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
        }, 75)
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardbackgoround;
    ctx.fillRect(0, 0, gamewidth, gameheight);
}
function createFood() {
    function randomFood(min, max) {
        const rannum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return rannum;
    }
    foodX = randomFood(0, gamewidth - unitSize);
    foodY = randomFood(0, gameheight - unitSize);
}
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity }
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoretext.textContent = score;
        createFood();
    } else {
        snake.pop();
    }

}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}
function changeDirection(event) {
    console.log(event);
    const keypress = event.keyCode;
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    let gowUp = (yVelocity == -unitSize);
    let gowright = (xVelocity == unitSize);
    let gwodown = (yVelocity == unitSize);
    let gowleft = (xVelocity == -unitSize);

    switch (true) {
        case (keypress == right && !gowleft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keypress == left && !gowright):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keypress == up && !gwodown):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;

        case (keypress == down && !gowUp):
            yVelocity = unitSize;
            xVelocity = 0;
            break;

    }
}
function checkGameover() {
    if (snake[0].x < 0 || snake[0].x > canvas.width - unitSize || snake[0].y < 0 || snake[0].y > canvas.height) {
        running = false;
        displayGameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            running = false;
        }
    }
}
function displayGameOver() {
    if (running == false) {
        ctx.font = "200px MV Boli";
        ctx.fillStyle = "black"
        ctx.fillText("gameOver", canvas.width / 2 - 200, canvas.height / 2, 300);
    }
}
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [
        //each object is the body part of the snake
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 },
    ]

    gameStart();

}


