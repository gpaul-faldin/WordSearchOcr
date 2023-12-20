import {getPixelColor, keyTap, mouseClick, moveMouse, screen} from 'robotjs';
import {printAndExit} from "./errorHandling";
import * as cv from "@u4/opencv4nodejs";

export const captureRegionsReturnMat = (width: number, height: number): {
    boardMat: cv.Mat,
    wordsMat: cv.Mat
} => {
    moveMouse(width - 50, height - 50);
    mouseClick();
    keyTap("pageup")
    keyTap("pageup")
    if (getPixelColor(397, 506) !== "ffeb3b")
        return printAndExit("Not in game", 3);
    moveMouse(397, 506);
    mouseClick();

    const board = screen.capture(82, 307, 624, 672);
    const words = screen.capture(708, 307, 180, 671);

    const boardMat = new cv.Mat(board.image, board.height, board.width, cv.CV_8UC4);
    const buff = Buffer.from(board.image);
    boardMat.setData(buff);
    cv.imwrite("./img/board.png", boardMat);
    const buff2 = Buffer.from(words.image);
    const wordsMat = new cv.Mat(words.image, words.height, words.width, cv.CV_8UC4);
    wordsMat.setData(buff2);
    cv.imwrite("./img/words.png", wordsMat);

    return {boardMat, wordsMat};

}