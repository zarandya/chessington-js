import Piece from './piece';
import Board from "../board";
import Square from "../square";

export default class King extends Piece {
    constructor(player: string) {
        super(player);
    }

    getAvailableMoves(board: Board): Square[] {
        const location = board.findPiece(this);
        return [
            new Square(location.row - 1, location.col - 1),
            new Square(location.row, location.col - 1),
            new Square(location.row + 1, location.col - 1),
            new Square(location.row - 1, location.col),
            new Square(location.row + 1, location.col),
            new Square(location.row - 1, location.col + 1),
            new Square(location.row, location.col + 1),
            new Square(location.row + 1, location.col + 1),
        ]   .filter(square => square.inRange())
            .filter(square => {
                const pieceThere = board.getPiece(square);
                return pieceThere == undefined || pieceThere.player != this.player && !(pieceThere instanceof King)
            })
    }
}
