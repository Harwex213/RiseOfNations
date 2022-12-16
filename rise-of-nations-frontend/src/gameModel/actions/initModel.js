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

export const initModel = () => {
    const startTime = performance.now();

    const gameInfo = stores.currentGame.info;
    const [tiles, countries] = generateMap({
        seed: gameInfo.id,
        playersAmount: gameInfo.players.length,
        mapSize: "small",
    });
    setCountriesGameVarsAndColor(countries);
    const model = new Model(tiles, countries);
    stores.currentGame.setModel(model);

    const endTime = performance.now();
    console.log(`Init model complete for ${endTime - startTime} ms.`);
};
