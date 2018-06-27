import Piece from './piece';
import Board from "../board";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player: string) {
        super(player);
    }

    getAvailableMovesNoCheck(board:Board): Square[] {
        const location = board.findPiece(this);
        return [
            ...this.moveStraightRelative(board, location, 1, 0),
            ...this.moveStraightRelative(board, location, -1, 0),
            ...this.moveStraightRelative(board, location, 0, 1),
            ...this.moveStraightRelative(board, location, 0, -1),
            ...this.moveStraightRelative(board, location, 1, 1),
            ...this.moveStraightRelative(board, location, 1, -1),
            ...this.moveStraightRelative(board, location, -1, 1),
            ...this.moveStraightRelative(board, location, -1, -1)
        ]
    }
}
