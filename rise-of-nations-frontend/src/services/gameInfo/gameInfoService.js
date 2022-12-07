import { stores } from "../../store";
import { apiClient, apiErrorSuspense } from "../../apiClient";
import { gameInfoTransform } from "../../transform/gameInfoTransform";

const gameInfoStore = stores.gameInfo;

export const gameInfoService = {
    getGameInfo: apiErrorSuspense(async () => {
        const { payload: gameInfo } = await apiClient.gameInfoClient.getGameInfo();
        const { gameVariables, modificators } = gameInfoTransform.mapFromApi(gameInfo);
        gameInfoStore.setGameVariables(gameVariables);
        gameInfoStore.setModificators(modificators);
    }),
};
