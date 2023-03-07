import { Model } from "../models";
import { generateMap } from "../internalActions/generateMap";
import { stores } from "../../store";
import { canvasConstants } from "../../common/constants";

const setCountriesGameVarsAndColor = (countries) => {
    const gameInfo = stores.currentGame.info;
    const gameVariables = stores.globalGameInfo.gameVariables;
    for (let i = 0; i < countries.length; i++) {
        const countryPlayerId = gameInfo.players[i].id;
        const countryPlayerRealm = stores.currentGame.getPlayerRealm(countryPlayerId);
        const modificator = stores.globalGameInfo.getModificator(countryPlayerRealm.modificatorId);

        const countryGameVariables = [...gameVariables];
        countryGameVariables[modificator.affectedGameVariableId] = modificator.modificatorValue;

        countries[i].setGameVariables(countryGameVariables);
        countries[i].setColor(canvasConstants.playerColors[i]);
    }
};

const getTilesArray = (tilesMatrix) => {
    const tiles = [];
    for (let i = 0; i < tilesMatrix.length; i++) {
        for (let j = 0; j < tilesMatrix[i].length; j++) {
            if (tilesMatrix[i][j] !== null) {
                tiles.push(tilesMatrix[i][j]);
            }
        }
    }
    return tiles;
};

export const initModel = () => {
    const startTime = performance.now();

    const gameInfo = stores.currentGame.info;
    const [tilesMatrix, countries] = generateMap({
        seed: gameInfo.id,
        playersAmount: gameInfo.players.length,
        mapSize: "small",
    });
    setCountriesGameVarsAndColor(countries);
    const tilesArray = getTilesArray(tilesMatrix);
    const model = new Model(tilesMatrix, tilesArray, countries);
    stores.currentGame.setModel(model);

    const endTime = performance.now();
    console.log(`Init model complete for ${endTime - startTime} ms.`);
};
