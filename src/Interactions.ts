import {moveMouse, mouseClick, setMouseDelay} from "robotjs";
import {WordPosition} from "./checkWord";

const DEFINED_X_OFFSET = 85;
const DEFINED_Y_OFFSET = 310;

const moveAndClick = async (position: WordPosition) => {

    await moveMouse(position.start.x + DEFINED_X_OFFSET, position.start.y + DEFINED_Y_OFFSET);
    mouseClick();
    moveMouse(position.end.x + DEFINED_X_OFFSET, position.end.y + DEFINED_Y_OFFSET);
    mouseClick();
}

export const CompleteGame = async (positions: WordPosition[]): Promise<Boolean> => {

    setMouseDelay(5);

    for (let i = 0; i < positions.length; i++) {
        await moveAndClick(positions[i]);
        //return process.exit(0)
    }
    return true;
}