import { stores } from "../store";
import { apiClient, suspenseApiError } from "../apiClient";
import { gameInfoTransform } from "../transform/gameInfoTransform";

const gameInfoStore = stores.globalGameInfo;

export const gameInfoService = {
    getGameInfo: suspenseApiError(async () => {
        const { payload: gameInfo } = await apiClient.gameInfoClient.getGameInfo();
        const { gameVariables, modificators } = gameInfoTransform.mapFromApi(gameInfo);
        gameInfoStore.setGameVariables(gameVariables);
        gameInfoStore.setModificators(modificators);
    }),
};
