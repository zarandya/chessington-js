import Piece from './piece';
import Board from "../board";
import Square from "../square";
import King from "./king";

export default class Bishop extends Piece {
    constructor(player: string) {
        super(player);
    }

    getAvailableMoves(board: Board): Square[] {
        const location = board.findPiece(this);
        let result: Square[] = []

        let ne = 1;
        while (location.row + ne < 8 && location.col + ne < 8 && board.getPiece(Square.at(location.row + ne, location.col + ne)) == undefined) {
            result = [Square.at(location.row + ne, location.col + ne)].concat(result);
            ++ne;
        }
        if (location.row + ne < 8 && location.col + ne < 8) {
            const hitPiece = board.getPiece(Square.at(location.row + ne, location.col + ne));
            if (hitPiece == undefined) {
                console.error("This shall never happen");
            }
            else if (hitPiece.player != this.player && !(hitPiece instanceof King)) {
                result = [Square.at(location.row + ne, location.col + ne)].concat(result);
            }
        }

        let nw = 1;
        while (location.row + nw < 8 && location.col - nw >= 0 && board.getPiece(Square.at(location.row + nw, location.col - nw)) == undefined) {
            result = [Square.at(location.row + nw, location.col - nw)].concat(result);
            ++nw;
        }
        if (location.row + nw < 8 && location.col - nw >= 0) {
            const hitPiece = board.getPiece(Square.at(location.row + nw, location.col - nw));
            if (hitPiece == undefined) {
                console.error("This shall nwver happen");
            }
            else if (hitPiece.player != this.player && !(hitPiece instanceof King)) {
                result = [Square.at(location.row + nw, location.col - nw)].concat(result);
            }
        }

        let se = 1;
        while (location.row - se >= 0 && location.col + se < 8 && board.getPiece(Square.at(location.row - se, location.col + se)) == undefined) {
            result = [Square.at(location.row - se, location.col + se)].concat(result);
            ++se;
        }
        if (location.row - se >= 0 && location.col + se < 8) {
            const hitPiece = board.getPiece(Square.at(location.row - se, location.col + se));
            if (hitPiece == undefined) {
                console.error("This shall sever happen");
            }
            else if (hitPiece.player != this.player && !(hitPiece instanceof King)) {
                result = [Square.at(location.row - se, location.col + se)].concat(result);
            }
        }

        let sw = 1;
        while (location.row - sw >= 0 && location.col - sw >= 0 && board.getPiece(Square.at(location.row - sw, location.col - sw)) == undefined) {
            result = [Square.at(location.row - sw, location.col - sw)].concat(result);
            ++sw;
        }
        if (location.row - sw >= 0 && location.col - sw < 8) {
            const hitPiece = board.getPiece(Square.at(location.row - sw, location.col - sw));
            if (hitPiece == undefined) {
                console.error("This shall swver happen");
            }
            else if (hitPiece.player != this.player && !(hitPiece instanceof King)) {
                result = [Square.at(location.row - sw, location.col - sw)].concat(result);
            }
        }

        return result;
    }
}
