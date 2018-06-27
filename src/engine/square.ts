export default class Square {
    constructor(public row: number, public col: number) {
    }

    static at(row, col) {
        return new Square(row, col);
    }

    equals(otherSquare) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }

    public inRange(): boolean {
        return (this.row >= 0 && this.row < 8 && this.col >= 0 && this.col < 8)
    }
}
