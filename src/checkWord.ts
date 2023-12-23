import {boardCell} from "./parseBoard";
import {direction} from "./parseCells";

export interface WordPosition {
    start: {x: number, y: number},
    end: {x: number, y: number}
}

const wordIsHere  = (word: string, boardCell: boardCell[]): boolean => {


    if (boardCell.length <= 0)
        return false;



    let string = "";
    for (let i = 0; i < boardCell.length; i++) {
        string += boardCell[i].letter;
    }

    let stringIndex = 0;
    let wordIndex = 0;
    while (string[stringIndex]) {
        if (string[stringIndex] === word[wordIndex]) {
            while (string[stringIndex] === word[wordIndex] && word[wordIndex] && string[stringIndex]) {
                stringIndex++;
                wordIndex++;
            }
            if (!word[wordIndex]){
                console.log("WORD FOUND")
                console.log(word)
                return true;
            }
            wordIndex = 0;
        }
        stringIndex++;
    }
    stringIndex-=1;
    while (string[stringIndex]) {
        if (string[stringIndex] === word[wordIndex]) {
            while (string[stringIndex] === word[wordIndex] && word[wordIndex] && string[stringIndex]) {
                stringIndex--;
                wordIndex++;
            }
            if (!word[wordIndex]){
                return true;
            }
            wordIndex = 0;
        }
        stringIndex--;
    }
    return false;
}

export const checkWord = (wordsArray: string[], boardCell: direction): Array<WordPosition> | null => {

    for (let i = 0; i < wordsArray.length; i++) {
        let word = wordsArray[i];



        // Check vertical
        if (wordIsHere(word, boardCell.vertical)) {
            console.log(wordIsHere(word, boardCell.vertical))
            console.log("WORD FOUND")
            console.log(word)
        }
        if (wordIsHere(word, boardCell.horizontal)){
            console.log(wordIsHere(word, boardCell.horizontal))
            console.log("WORD FOUND")
            console.log(word)
        }
        if (wordIsHere(word, boardCell.diagonalRight)){
            console.log(wordIsHere(word, boardCell.diagonalRight))
            console.log("WORD FOUND")
            console.log(word)
        }
        if (wordIsHere(word, boardCell.diagonalLeft)){
            console.log(wordIsHere(word, boardCell.diagonalLeft))
            console.log("WORD FOUND")
            console.log(word)
        }


        // console.log(wordIsHere(word, boardCell.vertical));
        // console.log(wordIsHere(word, boardCell.horizontal));
        // console.log(wordIsHere(word, boardCell.diagonalRight));
        // console.log(wordIsHere(word, boardCell.diagonalLeft));



    }
    return null;
}