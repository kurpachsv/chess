var Board = new ChessBoard(PlayerColorsEnum.WHITE);
Board.prepareBoard();
var Chess = new Chess(Board);


// ...

var figureSizeInPx = 63;
var hColors = ['red' /* 1 */, 'yellow' /* 2 */, 'green' /* 3 */, 'orange' /* 4 */];

// ...


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width  = 577;
canvas.height = 577;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "img/board.png";

// All Figures
var figuresReady = false;
var figuresImage = new Image();
figuresImage.onload = function () {
    figuresReady = true;
};
figuresImage.src = "img/sprites.png";

canvas.addEventListener("mousemove", function(e) {
    // ...
}, false);

canvas.addEventListener("click", function(e) {
    // ...
}, false);

// Reset the game
var reset = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Draw all figures on board

var drawAllChessFigures = function () {

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var f = Board.cellsState[j][i];
            if (f > 0) {
                ctx.drawImage(figuresImage,
                    figureSizeInPx * ((f - 1) % 6), // type
                    figureSizeInPx * Math.floor((f - 1) / 6), // color
                    figureSizeInPx, figureSizeInPx,
                    figureSizeInPx * i + Math.round(figureSizeInPx >> 1 + 0.5) + i, // x position
                    j * figureSizeInPx + Math.round(figureSizeInPx >> 1 + 0.5) + j, // y position
                    figureSizeInPx, figureSizeInPx);
            }
            /*var h = highlight.state[j][i];
            if (h > 0) {
                drawCellHighlight(i, j, colors[h - 1]); // highlight cell (green, red, etc)
            }*/

        }
    }
};

var drawCellHighlight = function (i, j, color) {
    ctx.beginPath();
    ctx.rect(figureSizeInPx * i + (figureSizeInPx >> 1) + 2 + i,
        figureSizeInPx * j + (figureSizeInPx >> 1) + 2 + j,
        figureSizeInPx,
        figureSizeInPx);
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (figuresReady) {
        drawAllChessFigures();
    }
};

// The main game loop
var main = function () {
    render();
    requestAnimationFrame(main); // Request to do this again ASAP
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.msRequestAnimationFrame ||
    w.mozRequestAnimationFrame;

// Let's play this game!
reset();
main();