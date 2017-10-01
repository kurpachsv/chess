/**
 * @param position
 * @param board
 * @constructor
 */
function Queen(position, board) {
    this.position = position;
    this.board = board;
}

/**
 * @return {Array}
 */
Queen.prototype.makePossibleMoves = function () {
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
        for (var j = 1; j < 8; j++) {

            p = new Position(
                this.position.x + possible[i][0] * j,
                this.position.y + possible[i][1] * j
            );

            if (p.isPossible() && (this.board.isEmptyCell(p) || this.board.isComputerPlayerFigure(p))) {
                moves.push(p);
            }
        }
    }

    return moves;
};

/**
 * @type {Queen}
 */
Queen.prototype.constructor = Queen;