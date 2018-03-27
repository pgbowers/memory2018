var resetButton = document.getElementById("reset-button");
var firstSquare = null;

// put all available images into an array
var colors = [];
for (var i = 0; i < 13; i++) {
    colors.push('square-' + i);
}

function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
    this.setColor(color); // Set the color!
}
GameSquare.prototype.handleEvent = function (e) {
    switch (e.type) {
        case "click":
            if (this.isOpen || this.isLocked) {
                return;
            }
            this.isOpen = true;
            this.el.classList.add('flip');
            checkGame(this); // Check the game here
    }
}
GameSquare.prototype.reset = function () {
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
}
GameSquare.prototype.lock = function () {
    this.isOpen = true;
    this.isLocked = true;
}
GameSquare.prototype.setColor = function (color) {

    // remove old images from the squares
    this.el.children[0].children[1].classList.remove(this.color);
    this.color = color;
    // set new images to the squares
    this.el.children[0].children[1].classList.add(color);
}

var gameSquares = [];

function setupGame() {
    var array = document.getElementsByClassName("game-square");
    var randomColors = getSomeColors();

    for (var i = 0; i < array.length; i++) {

        var index = random(randomColors.length);
        var color = randomColors.splice(index, 1)[0];
        gameSquares.push(new GameSquare(array[i], color));
    }
}
setupGame();

function random(n) {
    return Math.floor(Math.random() * n);
}

function getSomeColors() {
    var colorscopy = colors.slice();
    var randomColors = [];
    for (var i = 0; i < 8; i++) {
        var index = random(colorscopy.length);
        randomColors.push(colorscopy.splice(index, 1)[0]);
    }
    return randomColors.concat(randomColors.slice());
}

function checkGame(gameSquare) {
    if (firstSquare === null) {
        firstSquare = gameSquare;
        return
    }
    if (firstSquare.color === gameSquare.color) {
        firstSquare.lock();
        gameSquare.lock();
    } else {
        var a = firstSquare;
        var b = gameSquare;

        // setTimeout is a Javascript method that takes a
        //function and a time parameter as arguments
        setTimeout(function () {
            a.reset();
            b.reset();
            firstSquare = null;
        }, 400); // how long to display the cards
    }
    firstSquare = null;
}

function randomizeColors() {
    var randomColors = getSomeColors();
    gameSquares.forEach(function (gameSquare) {
        var color = randomColors.splice(random(randomColors.length), 1)[0];
        gameSquare.setColor(color);
    })
}

function clearGame() {
    gameSquares.forEach(function (gameSquare) {
        gameSquare.reset();
    });
    setTimeout(function () {
        randomizeColors();
    }, 500);
}

resetButton.addEventListener("click", clearGame);
