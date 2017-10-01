/**
 * @param position
 * @param board
 * @constructor
 */
function Pawn(position, board) {
    this.position = position;
    this.board = board;
}

/**
 * @param p
 * @return {boolean}
 */
Pawn.prototype.isNotFirstMove = function (p) {
    return p.isPossible() && !this.board.isEmptyCell(p) && this.board.theFirstMoveState[p.y][p.x] === 0;
};

/**
 * @param currentColor
 * @return {*}
 */
Pawn.prototype.getSign = function(currentColor) {
    var s;
    if (this.board.humanPlayerColor === PlayerColorsEnum.WHITE) { s = -2 * (currentColor === PlayerColorsEnum.WHITE) + 1; }
    else { s = 2 * (currentColor === PlayerColorsEnum.WHITE) - 1; }
    return s;
};

/**
 * @return {Array}
 */
Pawn.prototype.makePossibleMoves = function (c) {
    var possible = [
        [0, 2],
        [0, 1],
        [-1, 1],
        [1, 1]
    ];

    var moves = [],
        p,
        s = this.getSign(c);

    // если слева есть вражеская фигура
    p = new Position(this.position.x + possible[3][0] * s, this.position.y + possible[3][1] * s);

    if (p.isPossible() && this.board.isOpponentPlayerColor(p, c)) {
        moves.push(p);
    }

    // ...или если справа есть вражеская фигура
    p = new Position(
        this.position.x + possible[2][0] * s, this.position.y + possible[2][1] * s
    );

    if (p.isPossible() && this.board.isOpponentPlayerColor(p, c)) {
        moves.push(p);
    }

    if (!this.isNotFirstMove(p)) { // ...если еще не ходили

        p = new Position(
            this.position.x + possible[0][0] * s, this.position.y + possible[0][1] * s
        );

        if (p.isPossible() && this.board.isEmptyCell(p) &&
            /* ...и нет на пути вражеской фигуры */ this.board.isEmptyCell(new Position(p.x, p.y - s))) {
            moves.push(p);
        }
    }

    // ...или уже ходили
    p = new Position(
        this.position.x + possible[1][0] * s,
        this.position.y + possible[1][1] * s
    );

    if (p.isPossible() && this.board.isEmptyCell(p)) {
        moves.push(p);
    }

    return moves;
};

/**
 * @type {Pawn}
 */
Pawn.prototype.constructor = Pawn;