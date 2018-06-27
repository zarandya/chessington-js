import Piece from './piece';
import Board from "../board";
import Square from "../square";
import Rook from "./rook";

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
        const enemyPieces = board.board
            .reduce((arr1, arr2) => arr1.concat(arr2), [])
            .filter(piece => piece != undefined && piece.player != this.player)
        return [
            // basic moves
            ...[
                new Square(location.row - 1, location.col - 1),
                new Square(location.row, location.col - 1),
                new Square(location.row + 1, location.col - 1),
                new Square(location.row - 1, location.col),
                new Square(location.row + 1, location.col),
                new Square(location.row - 1, location.col + 1),
                new Square(location.row, location.col + 1),
                new Square(location.row + 1, location.col + 1),
            ].filter(square => square.inRange())
                .filter(square => this.canIMoveThere(board, square)),

            // castling east
            ...this.checkCanCastle(board, enemyPieces, location, Square.at(location.row, 7),
                Square.at(location.row, 6), Square.at(location.row, 5), undefined),

            // castling west
            ...this.checkCanCastle(board, enemyPieces, location, Square.at(location.row, 0),
                Square.at(location.row, 2), Square.at(location.row, 3), Square.at(location.row, 1))
        ];
    }

    protected getAvailableMovesNoCheck(board: Board): Square[] {
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
            ].filter(square => square.inRange())
                .filter(square => this.canIMoveThere(board, square))
    }

    private checkCanCastle(board: Board, enemyPieces: (Piece|undefined)[], location: Square, rookStartingSquare: Square,
                           kingTargetSquare: Square, rookTargetSquare: Square,
                           rookMoveThroughSquare: Square|undefined): Square[]{
        if (!this.hasMoved) {
            const eastRook = board.getPiece(rookStartingSquare);

            //check if rook hasn't moved
            if (eastRook != undefined && (eastRook instanceof Rook) && !(eastRook as Rook).hasMoved) {

                if (board.getPiece(rookTargetSquare) == undefined && board.getPiece(kingTargetSquare) == undefined
                    && (rookMoveThroughSquare == undefined || board.getPiece(rookMoveThroughSquare) == undefined)) {

                    // check if king is being attacked
                    // move temporarily the rook into the king's place
                    board.setPiece(location, eastRook);
                    board.setPiece(rookTargetSquare, eastRook);
                    board.setPiece(kingTargetSquare, eastRook);

                    const canCastle = enemyPieces
                        .map(piece => Piece.getAvailableMovesNoCheckOn(board, piece as Piece)
                            .filter(square =>
                                square.equals(location) ||
                                square.equals(rookTargetSquare) ||
                                square.equals(kingTargetSquare)
                            )
                        )
                        .reduce((arr1, arr2) => arr1.concat(arr2), []).length == 0;

                    board.setPiece(location, this);
                    board.setPiece(rookTargetSquare, undefined);
                    board.setPiece(kingTargetSquare, undefined);

                    if (canCastle) {
                        return [kingTargetSquare];
                    }


                }
            }

        }
        return [];
    }

}
