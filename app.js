const myCanvas = document.getElementById("myCanvas");
const myCanvas_ctx = myCanvas.getContext("2d");
let playAgain = document.querySelector(".playAgain");
let axisX;
let axisY;
let appleX;
let appleY;
let score;
let snake;

const main = () => {
    if (gameOver()) {
        window.alert("Juego finalizado");
        score = 0;
        document.getElementById("playAgain").style.display = "block";
        return;
    }
    addApple();
    setTimeout(function () {
        clearCanvas();
        movement();
        snakeDraw();
        document.getElementById("score").innerHTML = "Puntuación: " + score;
        main();
    }, 120);
}
//Dibujar la pista
const clearCanvas = () => {
    myCanvas_ctx.fillStyle = 'white';
    myCanvas_ctx.strokestyle = 'black';
    myCanvas_ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
    myCanvas_ctx.strokeRect(0, 0, myCanvas.width, myCanvas.height);
}

//Dibujar la snake
const snakeDraw = () => {
    snake.forEach(function addSnake(add) {
        myCanvas_ctx.fillStyle = 'blue';
        myCanvas_ctx.strokestyle = 'blue';
        myCanvas_ctx.fillRect(add.x, add.y, 10, 10);
        myCanvas_ctx.strokeRect(add.x, add.y, 10, 10);
    });
}

const movement = () => {
    const add = { x: snake[0].x + axisX, y: snake[0].y + axisY };
    snake.unshift(add);
    //Comprobar si la snake se ha comido la manzana
    if (snake[0].x === appleX && snake[0].y === appleY) {
        score++;
        apple();
    } else {
        //Si no coinciden las coordenadas eliminar cola de snake para el desplazamiento 
        snake.pop();
    }
}
const direction = (event) => {
    const keyPressed = event.keyCode;

    //verificar en que dirección y sentido se mueve la snake
    const directionRight = axisX === 10;
    const directionDown = axisY === 10;
    const directionLeft = axisX === -10;
    const directionUp = axisY === -10;

    //cambiar dirección
    if (keyPressed === 37 && !directionRight) {
        axisX = -10;
        axisY = 0;
    }

    if (keyPressed === 38 && !directionDown) {
        axisX = 0;
        axisY = -10;
    }

    if (keyPressed === 39 && !directionLeft) {
        axisX = 10;
        axisY = 0;
    }

    if (keyPressed === 40 && !directionUp) {
        axisX = 0;
        axisY = 10;
    }
}


//Generar manzana random
const randomApple = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

const apple = () => {
    appleX = randomApple(0, myCanvas.width - 10);
    appleY = randomApple(0, myCanvas.height - 10);
    //Comprobar que las coordenadas de la manzana no coincidan con las del snake
    snake.forEach(function coincide(partSnake) {
        if (partSnake.x == appleX && partSnake.y == appleY) {
            apple();
        }
    });
}

//Dibujar manzana
const addApple = () => {
    myCanvas_ctx.fillStyle = 'red';
    myCanvas_ctx.strokestyle = 'red';
    myCanvas_ctx.fillRect(appleX, appleY, 10, 10);
    myCanvas_ctx.strokeRect(appleX, appleY, 10, 10);
}

const gameOver = () => {
    //Si la snake toca alguna parte de su cuerpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    ////Si la snake llega al límite de la pista
    const endLeft = snake[0].x < 0;
    const endRight = snake[0].x > myCanvas.width - 10;
    const endTop = snake[0].y < 0;
    const endBottom = snake[0].y > myCanvas.height - 10;

    return endLeft || endRight || endTop || endBottom
}

const replay = () => {
    snake = [{ x: 250, y: 250 }, { x: 240, y: 250 }, { x: 230, y: 250 }, { x: 220, y: 250 }, { x: 210, y: 250 }, { x: 200, y: 250 }];
    axisX = 10;
    axisY = 0;
    score = 0;
    document.getElementById("playAgain").style.display = "none";
    apple();
    main();
}
clearCanvas();
playAgain.addEventListener("click", replay);
document.addEventListener("keydown", direction);
