/**
 * @param color
 * @param position
 * @constructor
 */
function Knight(color, position) {
    this.color = color;
    this.position = position;
}

/**
 * @return {Array}
 */
Knight.prototype.makePossiblePositions = function () {
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


    var r = [];

    // ...

    return r;
};

/**
 * @type {Knight}
 */
Knight.prototype.constructor = Knight;