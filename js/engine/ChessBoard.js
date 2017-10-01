/**
 * @return {*}
 */
function getCleanCells() {
    var cells = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    return cells;
}


/**
 * @return {*}
 */
function getTheFirstMoveCells() {
    var cells = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ];
    return cells;
}

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
    this.theFirstMoveState = null;
    this.highlightCellsState = null;
    this.humanAttacksCellsState = null;
    this.computerAttacksCellsState = null;
}

/**
 * @return {null|*}
 */
ChessBoard.prototype.prepareBoard = function() {
    if (this.humanPlayerColor === PlayerColorsEnum.WHITE) { this.cellsState = getCellsForWhiteHumanPlayer(); }
    else { this.cellsState = getCellsForBlackHumanPlayer(); }

    this.theFirstMoveState = getTheFirstMoveCells();
    this.highlightCellsState = getCleanCells();

    return this.cellsState;
};

/**
 * @return {*}
 */
ChessBoard.prototype.cleanHighlightCell = function () {
    return this.highlightCellsState = getCleanCells();
};

/**
 * @return {*}
 */
ChessBoard.prototype.cleanHumanAttacksCells = function () {
    return this.humanAttacksCellsState = getCleanCells();
};

/**
 * @return {*}
 */
ChessBoard.prototype.cleanComputerAttacksCells = function () {
    return this.computerAttacksCellsState = getCleanCells();
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
ChessBoard.prototype.hasPlayerFigure = function (mouseCoordinates) {
    var p = Position.getPositionOnBoardsByMouseCoords(mouseCoordinates);
    return p.isPossible() && !this.isEmptyCell(p);
};

/**
 * @param c
 * @param p
 * @return {boolean}
 */
ChessBoard.prototype.hasQueen = function (c, p) {
    if (c === PlayerColorsEnum.WHITE && this.humanPlayerColor === PlayerColorsEnum.WHITE && p.y === 0) {
        return true;
    } else if (c === PlayerColorsEnum.WHITE && this.humanPlayerColor === PlayerColorsEnum.BLACK && p.y === 7) {
        return true;
    } else if (c === PlayerColorsEnum.BLACK && this.humanPlayerColor === PlayerColorsEnum.WHITE && p.y === 7) {
        return true;
    } else if (p.y === 0) {
        return true;
    }
    return false;
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
        getFigureColorByCode(this.cellsState[p.y][p.x]) !== null &&
        getFigureColorByCode(this.cellsState[p.y][p.x]) !== this.humanPlayerColor;
};

/**
 * @param p
 * @param c
 * @return {boolean}
 */
ChessBoard.prototype.isOpponentPlayerColor = function (p, c) {
    var opponentColor = c === PlayerColorsEnum.BLACK ? PlayerColorsEnum.WHITE : PlayerColorsEnum.BLACK;
    return !this.isEmptyCell(p) &&
        getFigureColorByCode(this.cellsState[p.y][p.x]) !== null &&
        getFigureColorByCode(this.cellsState[p.y][p.x]) === opponentColor;
};

/**
 * @param p
 * @param c
 * @return {boolean}
 */
ChessBoard.prototype.isPlayerColor = function (p, c) {
    return !this.isEmptyCell(p) &&
        getFigureColorByCode(this.cellsState[p.y][p.x]) !== null &&
        getFigureColorByCode(this.cellsState[p.y][p.x]) === c;
};

/**
 * @type {ChessBoard}
 */
ChessBoard.prototype.constructor = ChessBoard;
