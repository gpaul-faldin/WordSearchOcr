import {boardCell} from "./parseBoard";
import {checkWord, WordPosition} from "./checkWord";
import {parseCells} from "./parseCells";


export const searchWords = (wordsArray: string[], boardCell: boardCell[][]): WordPosition[] => {

    let y = 0;
    let x = 0;
    let wordsPositions: Array<WordPosition> = [];

    while (y < boardCell.length) {
        x = 0;
        while (x < boardCell[y].length) {
            let parsedCells = parseCells(boardCell, x, y);
            if (parsedCells) {
                let words = checkWord(wordsArray, parsedCells);

                if (words) {
                    words.forEach((word) => {
                        wordsPositions.push(word)
                    })
                }
            }
            x++;
        }
        y++;
    }
    // console.log(wordsPositions)
    // console.log(wordsPositions.length)
    return wordsPositions;
}