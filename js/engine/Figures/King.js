/**
 * @param color
 * @param position
 * @constructor
 */
function King(color, position) {
    this.color = color;
    this.position = position;
}

/**
 * @return {Array}
 */
King.prototype.makePossiblePositions = function () {
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
 * @type {King}
 */
King.prototype.constructor = King;