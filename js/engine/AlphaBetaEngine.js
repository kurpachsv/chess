// http://www.frayn.net/beowulf/theory.html

/**
 * @param chess
 * @constructor
 */
function AlphaBetaEngine(chess) {
    this.chess = chess;
    this.bestMove = null;
}

/**
 * @param depth
 * @return {null|*}
 */
AlphaBetaEngine.prototype.searchBestMove = function (depth) {
    this.alphaBeta(-Infinity, +Infinity, depth, depth, PlayerColorsEnum.BLACK);
    return this.bestMove;
};

/**
 * @param alpha
 * @param beta
 * @param maxDepth
 * @param currentDepth
 * @param player
 * @return {*}
 */
AlphaBetaEngine.prototype.alphaBeta = function (alpha, beta, maxDepth, currentDepth, player) {
    if (currentDepth === 0) {
        return this.evaluate(player);
    }

    var opponentPlayerColor = player === PlayerColorsEnum.WHITE ? PlayerColorsEnum.BLACK : PlayerColorsEnum.WHITE;
    var moves = this.generateAllMoves(player);
    if (moves) {
        var move = moves.pop();
        while (move && alpha < beta) {
            var temp = this.makeMove(move);
            var score = -this.alphaBeta(-beta, -alpha, maxDepth, currentDepth - 1, opponentPlayerColor);
            this.unmakeMove(move, temp);
            if (score > alpha) {
                alpha = score;
                if (maxDepth === currentDepth) {
                    this.bestMove = move; // Current choice of move
                }
            }
            move = moves.pop();
        }
    }

    return alpha;
};

/**
 * @param color
 * @return {Array}
 */
AlphaBetaEngine.prototype.generateAllMoves = function (color) {
    var ret = [];
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var s = this.chess.chessBoard.cellsState,
                f = s[j][i];
            if (getFigureColorByCode(f) === color) {
                var moves = this.chess.generateMoves(new Position(i, j), f);
                for (var ind = 0; ind < moves.length; ind++) {
                    if (moves[ind]) {
                        ret.push({
                            b : moves[ind],
                            p : new Position(i, j),
                            f : f,
                            c : color
                        });
                    }
                }
            }
        }
    }
    return ret;
};

/**
 * @param color
 * @return {number}
 */
AlphaBetaEngine.prototype.evaluate = function(color) {
    var w = 0;
    var sign = color === PlayerColorsEnum.BLACK ? 1 : -1;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var f = this.chess.chessBoard.cellsState[j][i];
            switch (f) {
                case 1: w += -1 * sign; break;
                case 7: w += sign; break;
                case 3: w += -3 * sign; break;
                case 9: w += 3 * sign; break;
                case 4: w += -3 * sign; break;
                case 10: w += 3 * sign; break;
                case 2: w += -5 * sign; break;
                case 8: w += 5 * sign; break;
                case 6: w += -9 * sign; break;
                case 12: w += 9 * sign; break;
                case 5: w += -1000 * sign; break;
                case 11: w += 1000 * sign; break;
            }
        }
    }
    return w;
};

/**
 * @param move
 * @return {*}
 */
AlphaBetaEngine.prototype.makeMove = function (move) {
    var s = this.chess.chessBoard.cellsState;

    var eat = s[move.b.y][move.b.x];
    s[move.b.y][move.b.x] = move.f;
    s[move.p.y][move.p.x] = 0;
    return eat;
};

/**
 * @param move
 * @param eat
 */
AlphaBetaEngine.prototype.unmakeMove = function (move, eat) {
    var s = this.chess.chessBoard.cellsState;

    s[move.b.y][move.b.x] = eat;
    s[move.p.y][move.p.x] = move.f;
};

/**
 * @type {AlphaBetaEngine}
 */
AlphaBetaEngine.prototype.constructor = AlphaBetaEngine;