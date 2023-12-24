import {boardCell} from "./parseBoard";
import {direction} from "./parseCells";

export interface WordPosition {
    start: { x: number, y: number },
    end: { x: number, y: number },
    word: string
}

const checkStringLeftToRight = (word: string, boardCell: boardCell[]): WordPosition | null => {

    let wordIndex = 0;
    let boardCellLetter = "";
    for (let i = 0; i < boardCell.length; i++) {
        boardCellLetter += boardCell[i].letter;
    }
    let boardCellLetterIndex = 0;

    let start: { x: number, y: number } = {x: -1, y: -1};
    let wordPosition: WordPosition | null = null;

    while (boardCellLetter[boardCellLetterIndex]) {
        if (boardCellLetter[boardCellLetterIndex] === word[wordIndex]) {
            start.x = boardCell[boardCellLetterIndex].x;
            start.y = boardCell[boardCellLetterIndex].y;
            while (boardCellLetter[boardCellLetterIndex] === word[wordIndex] &&
            word[wordIndex] &&
            boardCellLetter[boardCellLetterIndex]) {
                boardCellLetterIndex++;
                wordIndex++;
            }
            if (!word[wordIndex]) {
                wordPosition = {
                    start: start,
                    end: {x: boardCell[boardCellLetterIndex - 1].x, y: boardCell[boardCellLetterIndex - 1].y},
                    word: word
                }
                return wordPosition;
            }
            boardCellLetterIndex -= wordIndex;
            wordIndex = 0;
        }
        boardCellLetterIndex++;
    }
    return null;
};

const checkStringRightToLeft = (word: string, boardCell: boardCell[]): WordPosition | null => {

    let wordIndex = 0;
    let boardCellLetter = "";
    for (let i = 0; i < boardCell.length; i++) {
        boardCellLetter += boardCell[i].letter;
    }
    let boardCellLetterIndex = boardCellLetter.length - 1;

    let start: { x: number, y: number } = {x: -1, y: -1};
    let wordPosition: WordPosition | null = null;

    while (boardCellLetter[boardCellLetterIndex]) {
        if (boardCellLetter[boardCellLetterIndex] === word[wordIndex]) {
            start.x = boardCell[boardCellLetterIndex].x;
            start.y = boardCell[boardCellLetterIndex].y;
            while (boardCellLetter[boardCellLetterIndex] === word[wordIndex] &&
            word[wordIndex] &&
            boardCellLetter[boardCellLetterIndex]) {
                boardCellLetterIndex--;
                wordIndex++;
            }
            if (!word[wordIndex]) {
                wordPosition = {
                    start: start,
                    end: {x: boardCell[boardCellLetterIndex + 1].x, y: boardCell[boardCellLetterIndex + 1].y},
                    word: word
                }
                return wordPosition;
            }
            boardCellLetterIndex += wordIndex;
            wordIndex = 0;
        }
        boardCellLetterIndex--;
    }
    return null;

}

const wordIsHere = (word: string, boardCell: boardCell[]): WordPosition | null => {

    let wordPosition: WordPosition | null = null;

    if (boardCell.length <= 0)
        return null;

    let string = "";
    for (let i = 0; i < boardCell.length; i++) {
        string += boardCell[i].letter;
    }

    if (checkStringLeftToRight(word, boardCell)) {
        let wordPosition = checkStringLeftToRight(word, boardCell);
        if (wordPosition)
            return wordPosition;
    } else if (checkStringRightToLeft(word, boardCell)) {
        let wordPosition = checkStringRightToLeft(word, boardCell);
        if (wordPosition)
            return wordPosition;
    }

    return wordPosition;
}

export const checkWord = (wordsArray: string[], boardCell: direction): Array<WordPosition> => {

    const wordPositions: Array<WordPosition> = [];

    for (let i = 0; i < wordsArray.length; i++) {
        let word = wordsArray[i];

        if (wordIsHere(word, boardCell.vertical)) {
            let wordPosition = wordIsHere(word, boardCell.vertical);
            if (wordPosition)
                wordPositions.push(wordPosition)
        } else if (wordIsHere(word, boardCell.horizontal)) {
            let wordPosition = wordIsHere(word, boardCell.horizontal);
            if (wordPosition)
                wordPositions.push(wordPosition)
        } else if (wordIsHere(word, boardCell.diagonalRight)) {
            let wordPosition = wordIsHere(word, boardCell.diagonalRight);
            if (wordPosition)
                wordPositions.push(wordPosition)
        } else if (wordIsHere(word, boardCell.diagonalLeft)) {
            let wordPosition = wordIsHere(word, boardCell.diagonalLeft);
            if (wordPosition)
                wordPositions.push(wordPosition)
        }
    }
    return wordPositions;
}