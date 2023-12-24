import * as cv from "@u4/opencv4nodejs";

export const TestCapture = (): {
    boardMat: cv.Mat,
    wordsMat: cv.Mat
} => {
    const board = cv.imread("./img/board.png");
    const words = cv.imread("./img/words.png");

    return {boardMat: board, wordsMat: words};
}