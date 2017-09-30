/**
 * @param color
 * @param position
 * @constructor
 */
function Rook(color, position) {
    this.color = color;
    this.position = position;
}

/**
 * @return {Array}
 */
Rook.prototype.makePossiblePositions = function () {
    var possible = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    var r = [];

    // ...

    return r;
};

/**
 * @type {Rook}
 */
Rook.prototype.constructor = Rook;