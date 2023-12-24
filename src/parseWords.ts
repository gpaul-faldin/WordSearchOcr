import * as cv from "@u4/opencv4nodejs";
import {createWorker} from "tesseract.js";

export const parseWords = async (wordsMat: cv.Mat): Promise<string[]> => {
    const parsedWords: string[] = [];
    const splitHeight = 27;
    const startY = 15;
    let gray = wordsMat.cvtColor(cv.COLOR_BGR2GRAY);
    gray = gray.threshold(150, 255, cv.THRESH_BINARY_INV);
    const height = gray.rows;

    const worker = await createWorker("eng");
    await worker.setParameters({tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ "});

    for (let currentY = startY; currentY < height; currentY += splitHeight) {
        const endY = Math.min(currentY + splitHeight, height);
        const roi = gray.getRegion(new cv.Rect(0, currentY, gray.cols, endY - currentY));

        const buffer = cv.imencode('.png', roi)
        const {data: {text}} = await worker.recognize(buffer);

        if (text.length > 0)
            parsedWords.push(text.trimEnd().replace(/ /g, ''));
        // if (text.length > 0)
            // cv.imwrite(`./img/words-${currentY}-contours.png`, roi);

    }

    await worker.terminate();

    return parsedWords;
};
