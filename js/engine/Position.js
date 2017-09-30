/**
 * @param x
 * @param y
 * @constructor
 */
function Position(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * @param mouseCoordinates
 * @return {{x: number, y: number}}
 */
Position.getPositionOnBoardsByMouseCoords = function (mouseCoordinates) {
    return {
        x : Math.floor((2 + mouseCoordinates.x - (figureSizeInPx >> 1)) / (figureSizeInPx + 1)),
        y : Math.floor((2 + mouseCoordinates.y - (figureSizeInPx >> 1)) / (figureSizeInPx + 1))
    };
};

/**
 * @return {boolean}
 */
Position.prototype.isPossible = function () {
    return this.x >= 0 && this.x <= 7 &&
        this.y >= 0 && this.y <= 7;
};

/**
 * @type {Position}
 */
Position.prototype.constructor = Position;