import Piece from './piece';
import Square from "../square";
import Board from "../board";
import King from "./king";

export default class Knight extends Piece {
    constructor(player: string) {
        super(player);
    }

    getAvailableMovesNoCheck(board: Board): Square[] {
        const location = board.findPiece(this);
        return [
            new Square(location.row - 1, location.col - 2),
            new Square(location.row - 1, location.col + 2),
            new Square(location.row + 1, location.col - 2),
            new Square(location.row + 1, location.col + 2),
            new Square(location.row - 2, location.col - 1),
            new Square(location.row - 2, location.col + 1),
            new Square(location.row + 2, location.col - 1),
            new Square(location.row + 2, location.col + 1),
        ]   .filter(square => square.inRange())
            .filter(square => this.canIMoveThere(board, square))
    }
}
