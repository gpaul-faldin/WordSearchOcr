import * as cv from "@u4/opencv4nodejs";
import { createWorker } from "tesseract.js";

export interface boardCell {
    letter: string;
    x: number;
    y: number;
}

export const parseBoard = async (
    boardMat: cv.Mat
): Promise<boardCell[][] | null> => {
    const parsedBoard: boardCell[][] = [];
    const worker = await createWorker("eng");
    await worker.setParameters({
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0",
    });
    let gray = boardMat.cvtColor(cv.COLOR_BGR2GRAY);
    // cv.imwrite(`./img/board-gray.png`, gray);

    const edges = gray.canny(0, 100);

    let contours = edges.findContours(cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
    contours = contours.sort((c0, c1) => {
        const rect0 = c0.boundingRect();
        const rect1 = c1.boundingRect();

        // Compare by Y coordinate first, then X coordinate
        if (rect0.y !== rect1.y) {
            return rect0.y - rect1.y;
        }
        return rect0.x - rect1.x;
    });

    let counter = 0;
    let currentY: number | null = null;
    let currentLine: boardCell[] = [];

    for (let index = 0; index < contours.length; index++) {
        const contour = contours[index];
        if (contour.area > 2000 && contour.area < 10000) {
            const { x, y, width, height } = contour.boundingRect();

            // Extract the region of interest (ROI) from the original image
            const roi = boardMat.getRegion(new cv.Rect(x, y, width, height));

            // cv.imwrite(`./img/board-${counter}-contours.png`, roi);

            // Perform OCR on the extracted ROI
            const buffer = cv.imencode(".png", roi);
            let { data: { text } } = await worker.recognize(buffer);
            if (text.trim() === '0')
                text = 'O';
            else if (text.trim() === '')
                text = 'I';

            // Check if the contour is on the same line or a new line
            if (currentY === null || Math.abs(currentY - y) < 10) {
                // Add the OCR result along with coordinates to the current line
                currentLine.push({ letter: text.trim(), x, y });
            } else {
                // Add the current line to parsedBoard and start a new line
                parsedBoard.push([...currentLine]);
                currentLine = [{ letter: text.trim(), x, y }];
            }

            counter++;
            currentY = y;

            const point1 = new cv.Point2(x, y);
            const point2 = new cv.Point2(x + width, y + height);
            boardMat.drawRectangle(point1, point2, new cv.Vec3(255, 255, 255), 1);
        }
    }

    // Add the last line to parsedBoard
    if (currentLine.length > 0) {
        parsedBoard.push([...currentLine]);
    }

    // cv.imwrite(`./img/board-contours.png`, boardMat);
    await worker.terminate();
    return parsedBoard;
};
