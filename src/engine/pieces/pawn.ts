import Piece from './piece';
import Board from '../board';
import Square from "../square";
import Player from "../player";

export default class Pawn extends Piece {
    constructor(player: string) {
        super(player);
    }

    getAvailableMoves(board: Board):Array<Square> {
        const location = board.findPiece(this);
        const row = location.row + (this.player == Player.WHITE ? 1 : -1);
        if (row < 0 || row >= 8) {
            return [];
        }
        const col = location.col
        return [col - 1, col, col + 1]
            .filter(c => c >= 0 && c < 8)
            .filter(c => {
                const pieceThere = board.getPiece(Square.at(row, c));
                if (c == col) {
                    return pieceThere == undefined
                }
                if (pieceThere != undefined) {
                    return pieceThere.player != this.player;
                }
            })
            .map(c => new Square(row, c));
    }
}
