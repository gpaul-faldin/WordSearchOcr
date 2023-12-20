import * as cv from "@u4/opencv4nodejs";
import {moveMouse} from "robotjs";
import { createWorker } from "tesseract.js";

interface boardCell {
    letter: string;
    x: number;
    y: number;
}

export const parseBoard = async (
    boardMat: cv.Mat
): Promise<boardCell[][] | null> => {
    const parsedBoard: boardCell[][] = [];
    const worker = await createWorker("eng");
    await worker.setParameters({ tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ " });
    let gray = boardMat.cvtColor(cv.COLOR_BGR2GRAY);
    //gray = gray.threshold(150, 255, cv.THRESH_BINARY_INV);
    cv.imwrite(`./img/board-gray.png`, gray);

    const edges = gray.canny(0, 100);

    let contours = edges.findContours(cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
    contours = contours.sort((c0, c1) => c1.area - c0.area);

    let counter = 0;

    for (let index = 0; index < contours.length; index++) {
        const contour = contours[index];
        if (contour.area > 2000 && contour.area < 10000) {
            counter++;
            const { x, y, width, height } = contour.boundingRect();

            // Extract the region of interest (ROI) from the original image
            const roi = boardMat.getRegion(new cv.Rect(x, y, width, height));

            cv.imwrite(`./img/board-${counter}-contours.png`, roi);
            // Perform OCR on the extracted ROI
            const buffer = cv.imencode(".png", roi);
            const { data: { text } } = await worker.recognize(buffer);

            // Add the OCR result along with coordinates to parsedBoard
            parsedBoard.push([{ letter: text.trim(), x, y }]);

            const point1 = new cv.Point2(x, y);
            const point2 = new cv.Point2(x + width, y + height);
            boardMat.drawRectangle(point1, point2, new cv.Vec3(255, 255, 255), 1);
        }
    }
    cv.imwrite(`./img/board-contours.png`, boardMat);
    console.log(counter);
    await worker.terminate();
    return parsedBoard;
};
