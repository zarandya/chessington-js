import Piece from './piece';
import Board from "../board";
import Square from '../square';

export default class Rook extends Piece {
    constructor(player: string) {
        super(player);
    }

    public hasMoved: boolean = false;

    moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.hasMoved = true;
    }

    getAvailableMoves(board: Board): Square[] {
        const location = board.findPiece(this);
        return [
            ...this.moveStraightRelative(board, location, 1, 0),
            ...this.moveStraightRelative(board, location, -1, 0),
            ...this.moveStraightRelative(board, location, 0, 1),
            ...this.moveStraightRelative(board, location, 0, -1),
        ]
    }
}
