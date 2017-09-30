/**
 * @param color
 * @param position
 * @constructor
 */
function Bishop(color, position) {
    this.color = color;
    this.position = position;
}

/**
 * @return {Array}
 */
Bishop.prototype.makePossiblePositions = function () {
    var possible = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ];

    var r = [];

    // ...

    return r;
};

/**
 * @type {Bishop}
 */
Bishop.prototype.constructor = Bishop;