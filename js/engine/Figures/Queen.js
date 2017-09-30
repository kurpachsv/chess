/**
 * @param color
 * @param position
 * @constructor
 */
function Queen(color, position) {
    this.color = color;
    this.prosition = position;
}

/**
 * @return {Array}
 */
Queen.prototype.makePossiblePositions = function () {
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


    var r = [];

    // ...

    return r;
};

/**
 * @type {Queen}
 */
Queen.prototype.constructor = Queen;