import api from "../api";
import { apiRoutes } from "../apiRoutes";

export const gameClient = {
    selectRealm: async ({ gameId, selectedRealmId }) => {
        return api.put(`${apiRoutes.game.selectRealm}/${gameId}/${selectedRealmId}`);
    },
    setPlayerReady: async ({ gameId, value }) => {
        return api.put(`${apiRoutes.game.ready}/${gameId}/${value}`);
    },
    kickPlayer: async ({ gameId, kickingUserId }) => {
        return api.delete(`${apiRoutes.game.kick}/${gameId}/${kickingUserId}`);
    },
    startGame: async ({ gameId }) => {
        return api.put(`${apiRoutes.game.start}/${gameId}`);
    },
    sendMessageToChat: async (values) => {
        return api.post(apiRoutes.game.chat, {
            json: values,
        });
    },
    endTurn: async ({ gameId, values }) => {
        return api.post(`${apiRoutes.game.endTurn}/${gameId}`, {
            json: values,
        });
    },
    sendPlayerWin: async ({ gameId, values }) => {
        return api.post(`${apiRoutes.game.playerWin}/${gameId}`, {
            json: values,
        });
    },
};
