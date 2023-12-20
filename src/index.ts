import * as fs from 'fs';
import {printAndExit} from "./errorHandling";
import {captureRegionsReturnMat} from "./RegionCapture";
import {parseWords} from "./parseWords";
import {parseBoard} from "./parseBoard";


const Main = async (width: number, height: number) => {
    const {boardMat, wordsMat} = captureRegionsReturnMat(width, height);
    // const words = await parseWords(wordsMat);
    const board = await parseBoard(boardMat);
    console.log(board);
    return;
};


(async() => {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    if (!config)
        printAndExit('No config file found', 1);
    if (!config.width || !config.height)
        printAndExit('Config file must contain width and height', 2);

    fs.readdirSync('./img').forEach((file) => {
        fs.unlinkSync(`./img/${file}`);
    });
    await Main(config.width, config.height);
})();