import {boardCell} from "./parseBoard";
import {checkWord} from "./checkWord";
import {parseCells} from "./parseCells";


export const searchWords =  (wordsArray: string[], boardCell: boardCell[][]):  null => {

    let y = 0;
    let x = 0;

    while (y < boardCell.length) {
        while (x < boardCell[y].length) {
            let parsedCells = parseCells(boardCell, x, y);
            if (parsedCells) {
                let words = checkWord(wordsArray, parsedCells);

                if (words) {
                    //console.log(words)
                    y
                    //return null;
                }
            }
            x++;
        }
        y++;
    }

    return null;
}