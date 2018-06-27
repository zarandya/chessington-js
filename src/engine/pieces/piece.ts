import Board from "../board";
import Square from "../square";

export default class Piece {
    constructor(public player: string) {
    }

    getAvailableMoves(board: Board): Square[] {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

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

    isKing () {
        return false;
    }

    protected isThereAPieceICanTake(board: Board, square: Square): boolean {
        const pieceThere = board.getPiece(square);
        return pieceThere != undefined && (pieceThere.player != this.player) && !pieceThere.isKing()
    }


    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
