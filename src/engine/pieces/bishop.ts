import Piece from './piece';
import Board from "../board";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player: string) {
        super(player);
    }

    getAvailableMovesNoCheck(board: Board): Square[] {
        const location = board.findPiece(this);
        return [
            ...this.moveStraightRelative(board, location, 1, 1),
            ...this.moveStraightRelative(board, location, 1, -1),
            ...this.moveStraightRelative(board, location, -1, 1),
            ...this.moveStraightRelative(board, location, -1, -1)
        ]
    }
}
