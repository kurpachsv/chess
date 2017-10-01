/**
 * @param position
 * @param board
 * @constructor
 */
function King(position, board) {
    this.position = position;
    this.board = board;
}

/**
 * @return {Array}
 */
King.prototype.makePossibleMoves = function () {
    var possible = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    var moves = [],
        p;

    for (var i = 0; i < possible.length; i++) {

        p = new Position(
            this.position.x + possible[i][0], this.position.y + possible[i][1]
        );

        if (p.isPossible() && (this.board.isEmptyCell(p) || this.board.isComputerPlayerFigure(p))) {
            moves.push(p);
        }
    }

    if (this.isPossibleCastlingToLeftCorner(this.board.humanPlayerColor)) {
        moves.push(this.getCastlingToLeftCornerKingPosition(this.board.humanPlayerColor));
    }

    if (this.isPossibleCastlingToRightCorner(this.board.humanPlayerColor)) {
        moves.push(this.getCastlingToRightCornerKingPosition(this.board.humanPlayerColor));
    }

    return moves;
};

/**
 * @param color
 * @return {boolean}
 */
King.prototype.isPossibleCastlingToRightCorner = function(color) {

    var b = this.board,
        s = b.cellsState,
        f = b.theFirstMoveState;

    if (this.board.humanPlayerColor === PlayerColorsEnum.WHITE) {
        return (color === PlayerColorsEnum.WHITE &&
            s[7][7] === 2 && f[7][7] === 1 &&
            s[7][4] === 5 && f[7][4] === 1 &&
            b.isEmptyCell(new Position(5, 7)) && b.isEmptyCell(new Position(6, 7))) ||
            (color === PlayerColorsEnum.BLACK &&
                s[0][7] === 8 && f[0][7] === 1 &&
                s[0][4] === 11 && f[0][4] === 1 &&
                b.isEmptyCell(new Position(5, 0)) && b.isEmptyCell(new Position(6, 0)));
    } else {
        return (color === PlayerColorsEnum.WHITE &&
            s[0][0] === 2 && f[0][0] === 1 &&
            s[0][3] === 5 && f[0][3] === 1 &&
            b.isEmptyCell(new Position(1, 0)) && b.isEmptyCell(new Position(2, 0))) ||
            (color === PlayerColorsEnum.BLACK &&
                s[7][7] === 8 && f[7][7] === 1 &&
                s[7][3] === 11 && f[7][3] === 1 &&
                b.isEmptyCell(new Position(4, 7)) && b.isEmptyCell(new Position(5, 7)) &&
                    b.isEmptyCell(new Position(6, 7)));
    }
};

/**
 * @param color
 * @return {boolean}
 */
King.prototype.isPossibleCastlingToLeftCorner = function (color) {

    var b = this.board,
        s = b.cellsState,
        f = b.theFirstMoveState;

    if (this.board.humanPlayerColor === PlayerColorsEnum.WHITE) {
        return (color === PlayerColorsEnum.WHITE &&
            s[7][0] === 2 && f[7][0] === 1 &&
            s[7][4] === 5 && f[7][4] === 1 &&
            b.isEmptyCell(new Position(1, 7)) && b.isEmptyCell(new Position(2, 7)) &&
            b.isEmptyCell(new Position(3, 7))) ||
            (color === PlayerColorsEnum.BLACK &&
                s[0][7] === 8 && f[0][7] === 1 &&
                s[0][4] === 11 && f[0][4] === 1 &&
                b.isEmptyCell(new Position(2, 0)) && b.isEmptyCell(new Position(3, 0)));
    } else {
        return (color === PlayerColorsEnum.WHITE &&
            s[0][0] === 2 && f[0][0] === 1 &&
            s[0][3] === 5 && f[0][3] === 1 &&
            b.isEmptyCell(new Position(1, 0)) && b.isEmptyCell(new Position(2, 0))) ||
            (color === PlayerColorsEnum.BLACK &&
                s[7][0] === 8 && f[7][0] === 1 &&
                s[7][3] === 11 && f[7][3] === 1 &&
                b.isEmptyCell(new Position(1, 7)) && b.isEmptyCell(new Position(2, 7)));
    }
};

/**
 * @param color
 */
King.prototype.doCatstlingToRightCorner = function(color) {
    var s = this.board.cellsState;
    if (this.board.humanPlayerColor === PlayerColorsEnum.WHITE) {
        if (color === PlayerColorsEnum.WHITE) {
            /* R */ s[7][7] = 0; s[7][5] = 2;
            /* K */ s[7][4] = 0; s[7][6] = 5;
        } else {
            /* R */ s[0][0] = 0; s[0][2] = 8;
            /* K */ s[0][4] = 0; s[0][1] = 11;
        }
    } else {
        if (color === PlayerColorsEnum.WHITE) {
            /* R */ s[0][0] = 0; s[0][2] = 2;
            /* K */ s[0][3] = 0; s[0][1] = 5;
        } else {
            /* R */ s[7][7] = 0; s[7][5] = 8;
            /* K */ s[7][3] = 0; s[7][6] = 11;
        }
    }
};

/**
 * @param color
 */
King.prototype.doCastlingToLeftCorner = function(color) {
    var s = this.board.cellsState;
    if (this.board.humanPlayerColor === PlayerColorsEnum.WHITE) {
        if (color === PlayerColorsEnum.WHITE) {
            /* R */ s[7][0] = 0;
            /* K */ s[7][1] = 2; s[7][4] = 0; s[7][2] = 5;
        } else {
            /* R */ s[0][7] = 0; s[0][5] = 8;
            /* K */ s[0][4] = 0; s[0][6] = 11;
        }
    } else {
        if (color === PlayerColorsEnum.WHITE) {
            /* R */ s[0][7] = 0; s[0][5] = 2;
            /* K */ s[0][3] = 0; s[0][6] = 5;
        } else {
            /* R */ s[7][0] = 0; s[7][2] = 8;
            /* K */ s[7][3] = 0; s[7][1] = 11;
        }
    }
};

/**
 * @param color
 * @return {Position}
 */
King.prototype.getCastlingToLeftCornerKingPosition = function (color) {
    if (this.board.humanPlayerColor === PlayerColorsEnum.WHITE) {
        if (color === PlayerColorsEnum.WHITE) { return new Position(1, 7); }
        else { return new Position(6, 0); }
    } else {
        if (color === PlayerColorsEnum.WHITE) { return new Position(6, 0);}
        else { return new Position(1, 7); }
    }
};

/**
 * @param color
 * @return {Position}
 */
King.prototype.getCastlingToRightCornerKingPosition = function (color) {
    if (this.board.humanPlayerColor === PlayerColorsEnum.WHITE) {
        if (color === PlayerColorsEnum.WHITE) { return new Position(6, 7); }
        else { return new Position(1, 0); }
    } else {
        if (color === PlayerColorsEnum.WHITE) { return new Position(1, 0); }
        else { return new Position(6, 7); }
    }

};

/**
 * @type {King}
 */
King.prototype.constructor = King;