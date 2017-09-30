/**
 * @return {*}
 */
function getCellsForWhiteHumanPlayer() {
    var cells = [
        [8, 9, 10, 12, 11, 10, 9, 8],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 4, 6, 5, 4, 3, 2]
    ];
    return cells;
}

/**
 * @return {*}
 */
function getCellsForBlackHumanPlayer() {
    var cells = [
        [2, 3, 4, 5, 6, 4, 3, 2],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [8, 9, 10, 11, 12, 10, 9, 8]
    ];
    return cells;
}

/**
 * @param humanPlayerColor
 * @constructor
 */
function ChessBoard(humanPlayerColor) {
    this.humanPlayerColor = humanPlayerColor;
    this.cellsState = null;
}

/**
 * @return {null|*}
 */
ChessBoard.prototype.prepareBoard = function() {
    if (this.humanPlayerColor === PlayerColorsEnum.WHITE) {
        this.cellsState = getCellsForWhiteHumanPlayer();
    } else {
        this.cellsState = getCellsForBlackHumanPlayer()
    }
    return this.cellsState;
};


/**
 * @param position
 * @return {boolean}
 */
ChessBoard.prototype.isEmptyCell = function (position) {
    return this.cellsState[position.y][position.x] <= 0;
};

/**
 * @param mouseCoordinates
 * @return {boolean}
 */
ChessBoard.hasPlayerFigure = function (mouseCoordinates) {
    var p = Position.getPositionOnBoardsByMouseCoords(mouseCoordinates);
    return p.isPossible() && !this.isEmptyCell(p);
};

/**
 * @param p
 * @return {boolean}
 */
ChessBoard.prototype.isHumanPlayerFigure = function (p) {
    return !this.isEmptyCell(p) &&
        getFigureColorByCode(this.cellsState[p.y][p.x]) !== null &&
        getFigureColorByCode(this.cellsState[p.y][p.x]) === this.humanPlayerColor;
};

/**
 * @param p
 * @return {boolean}
 */
ChessBoard.prototype.isComputerPlayerFigure = function (p) {
    return !this.isEmptyCell(p) &&
        getFigureColorByCode(Board.state[p.y][p.x]) !== null &&
        getFigureColorByCode(Board.state[p.y][p.x]) !== this.humanPlayerColor;
};

/**
 * @type {ChessBoard}
 */
ChessBoard.prototype.constructor = ChessBoard;
