/**
 * @param chessBoard
 * @constructor
 */
function Chess(chessBoard) {
    this.chessBoard = chessBoard;
    this.engine = new AlphaBetaEngine(this);
}

/**
 * @return {null|*}
 */
Chess.prototype.think = function () {
    return this.engine.searchBestMove(6);
};

/**
 * @param c
 * @return {boolean}
 */
Chess.prototype.isGameOver = function (c) {
    var kingFigureCode = c === PlayerColorsEnum.WHITE ? 5 : 11;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (this.chessBoard.cellsState[i][j] === kingFigureCode) {
                return false;
            }
        }
    }
    return true;
};

/**
 * @param position
 * @param code
 * @return {Array}
 */
Chess.prototype.generateMoves = function (position, code) {
    var moves = [];
    var color = getFigureColorByCode(code);
    switch (code) {
        case 1:
        case 7: moves = (new Pawn(position, this.chessBoard)).makePossibleMoves(color); break;
        case 3:
        case 9: moves = (new Knight(position, this.chessBoard)).makePossibleMoves(); break;
        case 4:
        case 10: moves = (new Bishop(position, this.chessBoard)).makePossibleMoves(); break;
        case 2:
        case 8: moves = (new Rook(position, this.chessBoard)).makePossibleMoves(); break;
        case 6:
        case 12: moves = (new Queen(position, this.chessBoard)).makePossibleMoves(); break;
        case 5:
        case 11: moves = (new King(position, this.chessBoard)).makePossibleMoves(color); break;
    }
    return moves;
};

/**
 * @param c
 * @return {*}
 */
Chess.prototype.makeAttacks = function(c) {

    var attacksCellsState;
    if (c === PlayerColorsEnum.WHITE) { attacksCellsState = this.chessBoard.cleanHumanAttacksCells(); }
    else { attacksCellsState = this.chessBoard.cleanComputerAttacksCells(); }

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var f = this.chessBoard.cellsState[j][i];
            if (f <= 0) {
                continue;
            }
            if (getFigureColorByCode(f) !== c) {
                continue;
            }

            var moves = this.generateMoves(new Position(i,j), f);
            for (var k = 0; k < moves.length; k++) {
                attacksCellsState[moves[k].y][moves[k].x] = 1;
            }
        }
    }

    return attacksCellsState;
};


/**
 * @param c
 * @param s
 * @return {boolean}
 */
Chess.prototype.isCheckToTheKing = function(c, s) {
    var color = c === PlayerColorsEnum.WHITE ? PlayerColorsEnum.BLACK : PlayerColorsEnum.WHITE;
    var attacks = this.makeAttacks(color);
    var kingPosition = this.getKingPosition(c, s);

    return attacks[kingPosition.y][kingPosition.x] !== 0;
};

/**
 * @param c
 * @param s
 * @return {Position}
 */
Chess.prototype.getKingPosition =  function (c, s) {
    var kingFigureCode = c === PlayerColorsEnum.WHITE ? 5 : 11;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (s[j][i] === kingFigureCode) {
                return new Position(i, j);
            }
        }
    }
};

/**
 * @param c
 * @param p
 * @param m
 * @return {boolean}
 */
Chess.prototype.isPossibleMove = function (c, p, m) {
    var stage = this.chessBoard.cellsState.clone();

    var color = getFigureColorByCode(c);
    var temp = stage[m.y][m.x];
    stage[m.y][m.x] = c;
    stage[p.y][p.x] = 0;

    var result = !this.isCheckToTheKing(color, stage);

    stage[m.y][m.x] = temp;
    stage[p.y][p.x] = c;

    return result;
};

/**
 * @type {Chess}
 */
Chess.prototype.constructor = Chess;