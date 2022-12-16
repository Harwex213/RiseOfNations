import { apiClient, initSse, suspenseApiError } from "../../apiClient";
import { gamesTransform } from "../../transform/gamesTransform";
import { gameConstants, notificationEvents, notificationsApiRoutes } from "../../common/constants";
import { stores } from "../../store";
import { apiErrors, gameServiceMessages } from "../../common/localization";
import { chatMessagesTransform } from "../../transform/chatMessagesTransform";
import { gameModel } from "../../gameModel";

const events = notificationEvents.game;
const gameStore = stores.currentGame;
const userStore = stores.user;
const uiStore = stores.ui;
const connection = {
    eventSource: null,
    abortController: null,
};
const gameStatuses = gameConstants.statuses;

const createGame = (values) => {
    return initSse(connection, notificationsApiRoutes.createGame + "?" + new URLSearchParams(values));
};
const joinGame = (values) => {
    return initSse(connection, notificationsApiRoutes.joinGame + "?" + new URLSearchParams(values));
};

const closeConnection = () => {
    connection.abortController?.abort();
    connection.eventSource?.close();
    connection.eventSource = null;
};

const isPlayerKicked = (game) => game.players.findIndex((p) => p.id === userStore.user.id) === -1;
const updatePlayersSelectedRealms = (updatedGame) => {
    if (gameStore.info === null) {
        return;
    }

    for (let i = 0; i < updatedGame.players.length; i++) {
        const player = updatedGame.players[i];
        if (
            gameStore.info.players[i] &&
            player.selectedRealmId !== gameStore.info.players[i].selectedRealmId
        ) {
            gameService
                .getPlayerRealm({
                    playerId: player.id,
                    realmId: player.selectedRealmId,
                })
                .catch(() => {});
        }
    }
};
const handleNewGameData = ({ data }) => {
    const game = JSON.parse(data);
    const mappedGame = gamesTransform.mapGameFromApi(game);

    if (isPlayerKicked(mappedGame)) {
        closeConnection();
        gameStore.clearAll();
        uiStore.notifyError(gameServiceMessages.playerKicked);
        return;
    }

    if (mappedGame.status === gameStatuses.preparing) {
        updatePlayersSelectedRealms(mappedGame);
    }

    gameStore.setInfo(mappedGame);
};

const getFirstData = () =>
    new Promise((resolve, reject) => {
        try {
            connection.eventSource.addEventListener(
                events.onGameData,
                ({ data }) => {
                    gameStore.setIsFetching(false);
                    handleNewGameData({ data });
                    resolve();
                },
                { once: true }
            );
        } catch (e) {
            reject(e);
        }
    });

const connectToGame = (connectFunc, valuesMap) => async (values) => {
    try {
        if (connection.eventSource !== null) {
            return;
        }

        gameStore.setIsFetching(true);
        const mappedValues = valuesMap(values);
        const abortSignal = await connectFunc(mappedValues);

        connection.eventSource.addEventListener(
            events.onChatMessage,
            ({ data }) => {
                const message = chatMessagesTransform.mapSingleFromApi(JSON.parse(data));
                gameStore.addChatMessage(message);
            },
            {
                signal: abortSignal,
            }
        );

        await getFirstData();

        connection.eventSource.addEventListener(events.onGameData, handleNewGameData, {
            signal: abortSignal,
        });
    } catch (e) {
        closeConnection();
        throw new Error(apiErrors.cannotJoinGame);
    }
};

export const gameService = {
    createGame: connectToGame(createGame, gamesTransform.mapToCreateGame),
    joinGame: connectToGame(joinGame, gamesTransform.mapToJoinGame),
    leaveGame: async () => {
        closeConnection();
        gameStore.clearAll();
    },
    selectRealm: suspenseApiError(async (realm) => {
        const gameId = gameStore.info.id;
        await apiClient.gameClient.selectRealm({ gameId, selectedRealmId: realm.id });
    }),
    getPlayerRealm: suspenseApiError(async ({ playerId, realmId }) => {
        if (realmId === null) {
            return;
        }

        const { payload: realm } = await apiClient.realmsClient.getRealm({ realmId });
        gameStore.setPlayersRealm(playerId, realm);
    }),
    kickPlayer: suspenseApiError(async ({ playerId }) => {
        const gameId = gameStore.info.id;
        await apiClient.gameClient.kickPlayer({ gameId, kickingUserId: playerId });
    }),
    playerReady: suspenseApiError(async () => {
        const gameId = gameStore.info.id;
        await apiClient.gameClient.setPlayerReady({ gameId, value: true });
    }),
    playerNotReady: suspenseApiError(async () => {
        const gameId = gameStore.info.id;
        await apiClient.gameClient.setPlayerReady({ gameId, value: false });
    }),
    startGame: suspenseApiError(async () => {
        const gameId = gameStore.info.id;
        await apiClient.gameClient.startGame({ gameId });
    }),
    sendMessageToChat: suspenseApiError(async (message = "") => {
        const gameId = gameStore.info.id;
        await apiClient.gameClient.sendMessageToChat({
            gameId,
            message,
        });
    }),
    initializeGame: () => {
        gameModel.initModel();
    },
};
