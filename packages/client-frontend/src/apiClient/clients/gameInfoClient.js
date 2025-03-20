import api from "../api";
import { apiRoutes } from "../apiRoutes";

export const gameInfoClient = {
    getGameInfo: async () => {
        return api.get(apiRoutes.gameInfo.getGameInfo);
    },
};
