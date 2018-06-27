import Board from "../board";
import Square from "../square";

export default class Piece {
    constructor(public player: string) {
    }

    /**
     * Get the available moves of the piece, regarding that the move must not allow attacking the king
     * Only override it in King, otherwise use the NoCheck version
     * @param {Board} board The game board
     * @returns {Square[]}  The list of possible places to move
     */
    public getAvailableMoves(board: Board): Square[] {
        return this.checkChecker(board, this.getAvailableMovesNoCheck(board));
    }

    /**
     * Get the list of available moves. Ignores the criteria that the move must not allow attacking the king
     * This method must be overridden in every class except for the king to define moves
     * @param {Board} board The game board
     * @returns {Square[]}  The list of possible places to move
     */
    protected getAvailableMovesNoCheck(board: Board): Square[] {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    /**
     * This method exists to make the getAvailableMovesNoCheck method of other pieces to King
     * Get the list of available moves. Ignores the criteria that the move must not allow attacking the king
     * @param {Board} board The game board
     * @param {Piece} target    The chess piece to move
     * @returns {Square[]}  The list of possible places to move
     */
    protected static getAvailableMovesNoCheckOn(board: Board, target: Piece): Square[] {
        return target.getAvailableMovesNoCheck(board);
    }

    /**
     * Finds the list of possible places the piece can move to if it can move along a straight line
     * an unlimited number of steps, and can take one enemy piece. This method is used by rook, bishop, and queen
     * @param {Board} board The Game Board
     * @param {Square} location The location of the current piece
     * @param {number} rowDelta The number of cells to move in the vertical direction in each step
     * @param {number} colDelta The number of cells to move in the horizontal direction in each step
     * @returns {Square[]}  The list of possible places to move.
     */
    protected moveStraightRelative(board: Board, location: Square, rowDelta: number, colDelta: number): Square[] {
        let result: Square[] = []
        let currentSquare = Square.at(location.row + rowDelta, location.col + colDelta);
        while (currentSquare.inRange() && board.getPiece(currentSquare) == undefined) {
            result = [currentSquare].concat(result);
            currentSquare = Square.at(currentSquare.row + rowDelta, currentSquare.col + colDelta);
        }
        if (currentSquare.inRange() && this.isThereAPieceICanTake(board, currentSquare)) {
                result = [currentSquare].concat(result);
        }
        return result;
    }

    /**
     * Returns true if this is a king
     * @returns {boolean}   true if this is the king, false otherwise
     */
    isKing () {
        return false;
    }

    /**
     * Returns true if a square is free or contains an enemy piece that can be taken.
     * @param {Board} board The game board
     * @param {Square} square   The target square
     * @returns {boolean}   true if this piece can move to that square
     */
    protected canIMoveThere(board: Board, square: Square): boolean {
        const pieceThere = board.getPiece(square);
        return pieceThere == undefined || (pieceThere.player != this.player) && !pieceThere.isKing()
    }

    /**
     * Returns true if the target square contains an enemy piece that can be taken
     * @param {Board} board
     * @param {Square} square
     * @returns {boolean}
     */
    protected isThereAPieceICanTake(board: Board, square: Square): boolean {
        const pieceThere = board.getPiece(square);
        return pieceThere != undefined && (pieceThere.player != this.player) && !pieceThere.isKing()
    }

    /**
     * Moves this piece to target square
      * @param {Board} board    The game board
     * @param {Square} newSquare    The target square
     */
    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    /**
     * Filters a sequence of next moves of this piece for states that will allow the enemy to attack the King.
     * This method does not work for the King.
     * @param {Board} board The game board
     * @param {Square[]} steps  The list of possible next steps
     * @returns {Square[]}  The filtered list of possible next steps.
     */
    protected checkChecker(board: Board, steps: Square[]): Square[] {
        const location = board.findPiece(this);
        if (this.isKing()) {
            throw 'The King is more clever then this'
        }
        const kingArray = board.board.reduce((arr1, arr2) => [...arr1, ...arr2])
            .filter(piece => piece != undefined && piece.isKing() && piece.player == this.player);
        if (kingArray.length == 0) {
            // No king on board, use for debugging
            return steps;
        }
        else if (kingArray.length == 1) {
            const enemyPieces = board.board.reduce((arr1, arr2) => [...arr1, ...arr2])
                .filter(piece => piece != undefined && piece.player != this.player);
            const king = kingArray[0] as Piece
            const kingSquare = board.findPiece(king);
            board.setPiece(kingSquare, this);
            return steps.filter(step => {
                // TODO this will not work for En Passant
                const originalPieceThere = board.getPiece(step);
                board.setPiece(step, this);
                board.setPiece(location, undefined);
                const moveValid = enemyPieces
                    .filter(enemy => enemy != originalPieceThere)
                    .map(enemy => (enemy as Piece).getAvailableMovesNoCheck(board))
                    .reduce((prev, currentArray) => prev && currentArray.filter(x => kingSquare.equals(x)).length == 0, true);
                board.setPiece(step, originalPieceThere);
                board.setPiece(location, this);
                return moveValid;
            })
        }
        else {
            throw 'Multiple kings on board'
        }
    }
}
