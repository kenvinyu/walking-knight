import Board from "../Board/Board";
import Coord from "../Board/Coord";

abstract class PathFinder {
    protected _board: Board;
    protected _start: Coord = { row: 0, col: 0 };
    protected _dest: Coord = { row: 0, col: 0 };

    public constructor(board: Board) {
        this._board = board;
    }

    private verify_coord(coord: Coord) {
        if (coord.row < 0 || coord.row >= this._board.height) {
            throw new Error(`Invalid row: row=${coord.row} board.height=${this._board.height}`);
        }

        if (coord.col < 0 || coord.col >= this._board.width) {
            throw new Error(`Invalid col: col=${coord.col} board.width=${this._board.width}`);
        }
    }

    public get start(): Coord {
        return this._start;
    }

    public set start(coord: Coord) {
        this.verify_coord(coord);
        this._start = coord;
    }

    public get dest(): Coord {
        return this._dest;
    }

    public set dest(coord: Coord) {
        this.verify_coord(coord);
        this._dest = coord;
    }

    public get board() {
        return this._board;
    }

    public abstract solve(): Board[][]
}

export default PathFinder;