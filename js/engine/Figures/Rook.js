/**
 * @param position
 * @param board
 * @constructor
 */
function Rook(position, board) {
    this.position = position;
    this.board = board;
}

/**
 * @return {Array}
 */
Rook.prototype.makePossibleMoves = function (c) {
    var possible = [
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

            if (p.isPossible() && this.board.isOpponentPlayerColor(p, c)) {
                moves.push(p);
                break;
            } else if (p.isPossible() && (this.board.isPlayerColor(p, c))) {
                // pass
                break;
            } else if (p.isPossible() && this.board.isEmptyCell(p)) {
                moves.push(p);
            }
        }
    }

    return moves;
};

/**
 * @type {Rook}
 */
Rook.prototype.constructor = Rook;