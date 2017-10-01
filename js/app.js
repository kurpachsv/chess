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
    var mouseCoordinates = getMouseCoordinates(canvas, e);
    if (Board.hasPlayerFigure(mouseCoordinates)) {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = "default";
    }
}, false);

var redHighlight = 1;
var yellowHighlight = 2;
var greenHighlight = 3;
var orangeHighlight = 4;

var attach = false;
var saved = 0;
var prevPosition = {};

function getMouseCoordinates(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return new Position(e.clientX - rect.left, e.clientY - rect.top)
}

canvas.addEventListener('click', function(e) {
    var mouseCoordinates = getMouseCoordinates(canvas, e),
        moves = [],
        position = Position.getPositionOnBoardsByMouseCoords(mouseCoordinates);

    if (attach) {

        if (Chess.chessBoard.highlightCellsState[position.y][position.x] === greenHighlight) {

            var figure = Chess.chessBoard.cellsState[prevPosition.y][prevPosition.x];
            var c = getFigureColorByCode(saved);

            if (figure === 1 && Board.hasQueen(c, position)) {
                saved = 6;
            } else if (figure === 7 && Board.hasQueen(c, position)) {
                saved = 12;
            }

            var kingFigure = new King(position, Board);

            var castling = kingFigure.getCastlingToLeftCornerKingPosition(c);
            if (castling.x === position.x &&
                castling.y === position.y && kingFigure.isPossibleCastlingToLeftCorner(c)) {
                kingFigure.doCastlingToLeftCorner(c);
                attach = false;
                Chess.chessBoard.cleanHighlightCell();
                Chess.chessBoard.theFirstMoveState[prevPosition.y][prevPosition.x] = 0;
                return;
            }
            castling = kingFigure.getCastlingToRightCornerKingPosition(c);
            if (castling.x === position.x &&
                castling.y === position.y && kingFigure.isPossibleCastlingToRightCorner(c)) {
                kingFigure.doCatstlingToRightCorner(c);
                attach = false;
                Chess.chessBoard.cleanHighlightCell();
                Chess.chessBoard.theFirstMoveState[prevPosition.y][prevPosition.x] = 0;
                return;
            }


            Chess.chessBoard.cellsState[position.y][position.x] = saved;
            Chess.chessBoard.cellsState[prevPosition.y][prevPosition.x] = 0;
            attach = false;

            Chess.chessBoard.cleanHighlightCell();
            Chess.chessBoard.theFirstMoveState[prevPosition.y][prevPosition.x] = 0;

            if (Chess.isGameOver(PlayerColorsEnum.WHITE) || Chess.isGameOver(PlayerColorsEnum.BLACK)) {
                alert("Game Over!");
                return;
            }

            var t = Chess.think();

            Chess.chessBoard.cellsState[t.p.y][t.p.x] = 0;
            Chess.chessBoard.cellsState[t.b.y][t.b.x] = t.f;

            attach = false;
        }

    } else {

        Chess.chessBoard.cleanHighlightCell();

        if (Board.isHumanPlayerFigure(Position.getPositionOnBoardsByMouseCoords(mouseCoordinates))) {

            var f = Chess.chessBoard.cellsState[position.y][position.x];
            moves = Chess.generateMoves(position, f);

            var p = [];
            for (var i = 0; i < moves.length; i++) {
                if (Chess.isPossibleMove(f, position, moves[i])) {
                    p.push(moves[i]);
                }
            }

            if (p.length > 0) {

                for (var j = 0; j < p.length; j++) {
                    Chess.chessBoard.highlightCellsState[p[j].y][p[j].x] = greenHighlight;
                }

                Chess.chessBoard.highlightCellsState[position.y][position.x] = orangeHighlight;
                attach = true;
                saved = f;

                prevPosition.x = position.x;
                prevPosition.y = position.y;
            }

        }
    }
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
            var h = Chess.chessBoard.highlightCellsState[j][i];
            if (h > 0) {
                drawCellHighlight(i, j, hColors[h - 1]);
            }

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