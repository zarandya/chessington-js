import Piece from './piece';
import Board from "../board";
import Square from "../square";

export default class King extends Piece {
    constructor(player: string) {
        super(player);
    }

    isKing() {
        return true;
    }

    public hasMoved: boolean = false;

    moveTo(board: Board, newSquare: Square) {
        if (!this.hasMoved) {
            if (newSquare.col == 6) {
                // castling east
                (board.getPiece(Square.at(newSquare.row, 7)) as Rook).moveTo(board, Square.at(newSquare.row, 5));
            }
            else if (newSquare.col == 2) {
                (board.getPiece(Square.at(newSquare.row, 0)) as Rook).moveTo(board, Square.at(newSquare.row, 3));
            }
        }
        super.moveTo(board, newSquare);
        this.hasMoved = true;
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
