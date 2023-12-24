import {boardCell} from "./parseBoard";

export interface direction {
    vertical: boardCell[];
    horizontal: boardCell[];
    diagonalRight: boardCell[];
    diagonalLeft: boardCell[];

}

export const parseCells = (
    board: boardCell[][],
    currentX: number,
    currentY: number
): direction | null => {
    const parsedCells: direction = {
        vertical: [],
        horizontal: [],
        diagonalRight: [],
        diagonalLeft: [],
    };

    let y = 0;
    let x = 0;

    //console.log(board[currentY][currentX])

    if (currentY === 0) {
        // Parse vertical cells
        while (currentY + y < board.length) {
            parsedCells.vertical.push(board[currentY + y][currentX]);
            y++;
        }

        if (parsedCells.vertical.length < board.length) {
            y = 0;
            while (currentY - y >= 0) {
                parsedCells.vertical.unshift(board[currentY - y][currentX]);
                y++;
            }
        }

        // Parse diagonal from the cell to the bottom left
        y = 0;
        x = 0;
        while (currentY + y >= 0 && currentX - x >= 0) {
            parsedCells.diagonalLeft.push(board[currentY + y][currentX - x]);
            y++;
            x++;
        }

    }

    if (currentX === 0) {
        // Parse horizontal cells
        x = 0;
        while (currentX + x < board[currentY].length) {
            parsedCells.horizontal.push(board[currentY][currentX + x]);
            x++;
        }
        if (parsedCells.horizontal.length < board[currentY].length) {
            x = 0;
            while (currentX - x >= 0) {
                parsedCells.horizontal.unshift(board[currentY][currentX - x]);
                x++;
            }
        }
    }

    if (currentY === 0 || currentX === 0) {
        // Parse diagonal from the cell to the bottom right
        y = 0;
        x = 0;
        while (currentY + y < board.length && currentX + x < board[currentY].length) {
            parsedCells.diagonalRight.push(board[currentY + y][currentX + x]);
            y++;
            x++;
        }
    }

    if (currentX === board[currentY].length - 1) {
        // Parse diagonal from the cell to the bottom left
        y = 0;
        x = 0;
        while (currentY + y < board.length && currentX - x >= 0) {
            parsedCells.diagonalLeft.push(board[currentY + y][currentX - x]);
            y++;
            x++;
        }
    }

    //console.log(parsedCells)
    if (parsedCells.vertical.length === 0 &&
        parsedCells.horizontal.length === 0 &&
        parsedCells.diagonalRight.length === 0 &&
        parsedCells.diagonalLeft.length === 0) {
        return null;
    }
    return parsedCells;
};
