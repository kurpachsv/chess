/**
 * @param color
 * @param positiion
 * @constructor
 */
function Pawn(color, positiion) {
    this.color = color;
    this.position = positiion;
}

/**
 * @return {Array}
 */
Pawn.prototype.makePossiblePositions = function () {
    var possible = [
        [0, 2],
        [0, 1],
        [-1, 1],
        [1, 1]
    ];

    var r = [];

    // ....

    return r;
};

/**
 * @type {Pawn}
 */
Pawn.prototype.constructor = Pawn;