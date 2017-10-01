/**
 * @param position
 * @param board
 * @constructor
 */
function Knight(position, board) {
    this.position = position;
    this.board = board;
}

/**
 * @return {Array}
 */
Knight.prototype.makePossibleMoves = function (c) {
    var possible = [
        [1, 2],
        [2, 1],
        [-2, 1],
        [-1, 2],
        [1, -2],
        [2, -1],
        [-2, -1],
        [-1, -2]
    ];

    var moves = [],
        p;

    for (var i = 0; i < possible.length; i++) {

        p = new Position(
            this.position.x + possible[i][0], this.position.y + possible[i][1]
        );

        if (p.isPossible() && (this.board.isEmptyCell(p) || this.board.isOpponentPlayerColor(p, c))) {
            moves.push(p);
        }
    }


    return moves;
};

/**
 * @type {Knight}
 */
Knight.prototype.constructor = Knight;