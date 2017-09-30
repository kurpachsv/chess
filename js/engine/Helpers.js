/**
 * @return {Array.<*>}
 */
Array.prototype.clone = function() {
    return this.slice(0);
};

/**
 * @param figureCode
 * @return {*}
 */
function getFigureColorByCode(figureCode) {
    if (figureCode <= 0) {
        return null;
    }
    if (Math.floor((figureCode - 1) / 6) === 0) {
        return PlayerColorsEnum.WHITE;
    } else {
        return PlayerColorsEnum.BLACK;
    }
}
