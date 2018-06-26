import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from "./pieces/piece";

export default class Board {
    public currentPlayer: string;
    public board: Array<Array<Piece|undefined>>;

    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    createBoard():Array<Array<Piece|undefined>> {
        const board = new Array<Array<Piece|undefined>>(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square: Square, piece: Piece|undefined) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square: Square): Piece|undefined {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind: Piece): Square {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }
}
