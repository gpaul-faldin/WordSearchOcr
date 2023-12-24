import * as fs from 'fs';
import {printAndExit} from "./errorHandling";
import {captureRegionsReturnMat} from "./RegionCapture";
import {parseWords} from "./parseWords";
import {parseBoard} from "./parseBoard";
import {searchWords} from "./searchWords";
import {TestCapture} from "./TestCapture";
import {CompleteGame} from "./Interactions";

let ENV = "prod"

const Main = async (width: number, height: number) => {
    const {boardMat, wordsMat} = ENV === "prod" ? captureRegionsReturnMat(width, height) : TestCapture();
    const words = await parseWords(wordsMat);
    const board = await parseBoard(boardMat);
    if (!board || !words)
        return printAndExit('Failed to parse board or words', 3);
    const Positions = searchWords(words, board)
    if (!Positions)
        return printAndExit('Failed to search words', 4);
    await CompleteGame(Positions)
    console.log("yey")
    return;
};

(async() => {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    if (!config)
        printAndExit('No config file found', 1);
    if (!config.width || !config.height)
        printAndExit('Config file must contain width and height', 2);

    ENV = process.argv[2] === 'dev' ? 'dev' : 'prod';

    if (ENV === 'prod') {
        fs.readdirSync('./img').forEach((file) => {
            fs.unlinkSync(`./img/${file}`);
        });
    }
    await Main(config.width, config.height);
})();