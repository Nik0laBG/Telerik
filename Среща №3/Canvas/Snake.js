// JScript source code
var snakeGame = (function () {
    document.body.onkeyup = changeDirection;
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    var directions = [new Position(1, 0), new Position(-1, 0), new Position(0, 1), new Position(0, -1)];
    var currentDirection = directions[0];
    function changeDirection(event) {
        var keyCode = event.keyCode;
        if (keyCode == 37) {
            if (currentDirection != directions[0]) {
                currentDirection = directions[1];
            }
        }
        if (keyCode == 38) {
            if (currentDirection != directions[2]) {
                currentDirection = directions[3];
            }
        }
        if (keyCode == 39) {
            if (currentDirection != directions[1]) {
                currentDirection = directions[0];
            }
        }
        if (keyCode == 40) {
            if (currentDirection != directions[3]) {
                currentDirection = directions[2];
            }
        }
    }
    function moveSnake() {
        var food = new Position(generateNumber(0, 24), generateNumber(0, 24));
        snake = [new Position(0, 0), new Position(1, 0), new Position(2, 0)];
        var snakeHead = new Position(3, 0);
        var interval = setInterval(function () {
            var newSnakeHead = new Position(snakeHead.x + currentDirection.x, snakeHead.y + currentDirection.y);
            if (newSnakeHead.x >= 25 || newSnakeHead.x < 0 || newSnakeHead.y >= 25 || newSnakeHead.y < 0) {
                clearInterval(interval);
                addToLocalStorage(snake);
                displayTopScores();
            }
            for (var count = 0; count < snake.length; count++) {
                if (snake[count].x == newSnakeHead.x && snake[count].y == newSnakeHead.y) {
                    clearInterval(interval);
                    addToLocalStorage(snake);
                    displayTopScores();
                }
            }
            snake.push(snakeHead);
            snakeHead = newSnakeHead;
            if (snakeHead.x == food.x && snakeHead.y == food.y) {
                food = new Position(generateNumber(0, 24), generateNumber(0, 24));
            }
            else {
                snake.shift();
            }
            drawField();
            drawElement(food, 'green');
            for (var count = 0; count < snake.length; count++) {
                drawElement(snake[count], 'blue');
            }
            drawElement(snakeHead, 'red');
        }, 150);
    }
    function generateNumber(downLimit, upperLimit) {
        var number = 0;
        if (downLimit === 0) {
            number = Math.floor(Math.random() * (parseInt(upperLimit) + 1));
        }
        else if (downLimit === 1) {
            number = Math.floor((Math.random() * parseInt(upperLimit)) + 1);
        }
        else {
            number = downLimit + Math.floor(Math.random() * (parseInt(upperLimit) + 1));
        }
        return number;
    }
    function drawField() {
        var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    function drawElement(element, color) {
        var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = color;
        ctx.fillRect(element.x * 20, element.y * 20, 20, 20);
        ctx.strokeRect(element.x * 20, element.y * 20, 20, 20);
    }
    function addToLocalStorage(snake) {
        var GameOver = alert('GAME OVER !!!\nPress F5 to restart !');
    }
    return {
        moveSnake: moveSnake
    };
})();