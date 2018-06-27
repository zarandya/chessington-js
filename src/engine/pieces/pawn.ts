import Piece from './piece';
import Board from '../board';
import Square from "../square";
import Player from "../player";
import King from "./king";

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
        const singleMoves = [col - 1, col, col + 1]
            .filter(c => c >= 0 && c < 8)
            .filter(c => {
                const pieceThere = board.getPiece(Square.at(row, c));
                if (c == col) {
                    return pieceThere == undefined
                }
                if (pieceThere != undefined) {
                    return pieceThere.player != this.player && !(pieceThere instanceof King);
                }
            })
            .map(c => new Square(row, c));
        if (this.player == Player.WHITE && row == 2 && board.getPiece(new Square(row, col)) == undefined) {
            const doubleMoveTarget = new Square(3, col);
            if (board.getPiece(doubleMoveTarget) == undefined) {
                return [...singleMoves, doubleMoveTarget];
            }
        }
        if (this.player == Player.BLACK && row == 5 && board.getPiece(new Square(row, col)) == undefined) {
            const doubleMoveTarget = new Square(4, col);
            if (board.getPiece(doubleMoveTarget) == undefined) {
                return [...singleMoves, doubleMoveTarget];
            }
        }
        return singleMoves;
    }
}
