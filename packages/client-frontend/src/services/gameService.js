import { apiClient, initSse, suspenseApiError } from "../apiClient";
import { gamesTransform } from "../transform/gamesTransform";
import {
    canvasConstants,
    gameConstants,
    notificationEvents,
    notificationsApiRoutes,
} from "../common/constants";
import { stores } from "../store";
import { apiErrors, gameServiceMessages } from "../common/localization";
import { chatMessagesTransform } from "../transform/chatMessagesTransform";
import { gameModel } from "../gameModel";

const events = notificationEvents.game;
const currentGame = stores.currentGame;
const canvasStore = stores.canvas;
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

const sendUserWin = async () => {
    const actions = currentGame.userTurnActions;
    const gameId = currentGame.info.id;
    await apiClient.gameClient.sendPlayerWin({
        gameId,
        values: { actions, winnerPlayerIndex: currentGame.userCountryIndex },
    });
    currentGame.clearTurnActions();
};

const isPlayerKicked = (game) => game.players.findIndex((p) => p.id === userStore.user.id) === -1;
const updatePlayersSelectedRealms = (updatedGame) => {
    if (currentGame.info === null) {
        for (const player of updatedGame.players) {
            if (player.selectedRealmId !== null) {
                gameService
                    .getPlayerRealm({
                        playerId: player.id,
                        realmId: player.selectedRealmId,
                    })
                    .catch(() => {});
            }
        }
        return;
    }

    for (let i = 0; i < updatedGame.players.length; i++) {
        const player = updatedGame.players[i];
        if (
            currentGame.info.players[i] &&
            player.selectedRealmId !== currentGame.info.players[i].selectedRealmId
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
const handlePlayersLeave = (newGameInfo) => {
    const model = currentGame.model;
    const oldGameInfo = currentGame.info;
    if (oldGameInfo.players.length === newGameInfo.players.length) {
        return;
    }

    const actualPlayers = [...newGameInfo.players];
    newGameInfo.players = oldGameInfo.players;

    for (let i = 0; i < oldGameInfo.players.length; i++) {
        const testedPlayer = oldGameInfo.players[i];
        const isPlayerDeleted = actualPlayers.findIndex((p) => p.id === testedPlayer.id) === -1;
        if (isPlayerDeleted === false) {
            continue;
        }

        if (testedPlayer.deleted) {
            continue;
        }

        newGameInfo.players[i].deleted = true;

        gameModel.cleanCountry(i);
        if (model.currentTurnPlayerIndex === i) {
            model.nextTurn();
        }
    }
};
const handleNewGameData = ({ data }) => {
    const game = JSON.parse(data);
    const mappedGame = gamesTransform.mapGameFromApi(game);

    if (isPlayerKicked(mappedGame)) {
        closeConnection();
        currentGame.clearAll();
        uiStore.notifyError(gameServiceMessages.playerKicked);
        return;
    }

    if (mappedGame.status === gameStatuses.started && mappedGame.players.length === 1) {
        sendUserWin().catch(() => {
            // TODO: send notification
        });
    }
    if (mappedGame.status === gameStatuses.preparing) {
        updatePlayersSelectedRealms(mappedGame);
    } else {
        handlePlayersLeave(mappedGame);
    }

    if (mappedGame.status === gameStatuses.finished) {
        console.log("time left!");
        currentGame.clearTimeout();
        currentGame.clearInterval();
    }
    currentGame.setInfo(mappedGame);
};
const handleNewTurn = ({ data }) => {
    const { userId, actions } = JSON.parse(data);

    if (userId !== userStore.user.id) {
        for (const action of actions) {
            gameModel.handleAction(action.action, action.values);
        }
    }

    currentGame.model.nextTurn();
};

const getFirstData = () =>
    new Promise((resolve, reject) => {
        try {
            connection.eventSource.addEventListener(
                events.onGameData,
                ({ data }) => {
                    currentGame.setIsFetching(false);
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

        currentGame.setIsFetching(true);
        const mappedValues = valuesMap(values);
        const abortSignal = await connectFunc(mappedValues);

        connection.eventSource.addEventListener(events.onNewTurn, handleNewTurn, { signal: abortSignal });

        connection.eventSource.addEventListener(
            events.onChatMessage,
            ({ data }) => {
                const message = chatMessagesTransform.mapSingleFromApi(JSON.parse(data));
                currentGame.addChatMessage(message);
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
        currentGame.clearAll();
    },
    selectRealm: suspenseApiError(async (realm) => {
        const gameId = currentGame.info.id;
        await apiClient.gameClient.selectRealm({ gameId, selectedRealmId: realm.id });
    }),
    getPlayerRealm: suspenseApiError(async ({ playerId, realmId }) => {
        if (realmId === null) {
            return;
        }

        const { payload: realm } = await apiClient.realmsClient.getRealm({ realmId });
        currentGame.setPlayersRealm(playerId, realm);
    }),
    kickPlayer: suspenseApiError(async ({ playerId }) => {
        const gameId = currentGame.info.id;
        await apiClient.gameClient.kickPlayer({ gameId, kickingUserId: playerId });
    }),
    playerReady: suspenseApiError(async () => {
        const gameId = currentGame.info.id;
        await apiClient.gameClient.setPlayerReady({ gameId, value: true });
    }),
    playerNotReady: suspenseApiError(async () => {
        const gameId = currentGame.info.id;
        await apiClient.gameClient.setPlayerReady({ gameId, value: false });
    }),
    startGame: suspenseApiError(async () => {
        const gameId = currentGame.info.id;
        await apiClient.gameClient.startGame({ gameId });
    }),
    sendMessageToChat: suspenseApiError(async (message = "") => {
        const gameId = currentGame.info.id;
        await apiClient.gameClient.sendMessageToChat({
            gameId,
            message,
        });
    }),
    initializeGame: () => {
        gameModel.initModel();
        const userId = userStore.user.id;
        const userCountryIndex = currentGame.info.players.findIndex((p) => p.id === userId);
        currentGame.setUserCountryIndex(userCountryIndex);

        if (currentGame.isUserTurn) {
            let time = currentGame.info.turnDuration * 60;
            stores.ui.setGameTimer(time);
            const timerInterval = setInterval(() => {
                time--;
                stores.ui.setGameTimer(time);
            }, 1000);
            currentGame.setInterval(timerInterval);
            const timerTimeout = setTimeout(() => {
                gameService.endTurn().catch(() => {});
            }, currentGame.info.turnDuration * 60 * 1000);
            currentGame.setTimeout(timerTimeout);
        }
    },
    canEndTurn: () => {
        if (currentGame.model === null) {
            return false;
        }

        const currentTurnPlayerIndex = currentGame.model.currentTurnPlayerIndex;
        return currentGame.userCountryIndex === currentTurnPlayerIndex;
    },
    endTurn: suspenseApiError(async () => {
        console.log("time left!");
        currentGame.clearTimeout();
        currentGame.clearInterval();

        const model = currentGame.model;
        const enemyUserCountries = [...model.countries];
        enemyUserCountries.splice(currentGame.userCountryIndex, 1);
        if (enemyUserCountries.every((c) => c.isIgnorable)) {
            await sendUserWin();
            return;
        }

        const actions = currentGame.userTurnActions;
        const gameId = currentGame.info.id;
        await apiClient.gameClient.endTurn({ gameId, values: { actions } });
        currentGame.clearTurnActions();
    }),
    onTryingCreateUnit: (unitType) => {
        if (
            canvasStore.currentAction === canvasConstants.actions.tryingCreateUnit &&
            canvasStore.creationUnitType === unitType
        ) {
            canvasStore.unsetAction();
            return;
        }

        const possibleTiles = gameModel.onTryingCreateUnit(currentGame.userCountryIndex);
        canvasStore.setTryingCreateUnit(possibleTiles, unitType);
    },
    onTryingCreateBuilding: (buildingType) => {
        if (
            canvasStore.currentAction === canvasConstants.actions.tryingCreateBuilding &&
            canvasStore.creationBuildingType === buildingType
        ) {
            canvasStore.unsetAction();
            return;
        }

        const possibleTiles = gameModel.onTryingCreateBuilding(currentGame.userCountryIndex);
        canvasStore.setTryingCreateBuilding(possibleTiles, buildingType);
    },
    onTryingMoveUnit: (unitTile) => {
        if (
            canvasStore.currentAction === canvasConstants.actions.tryingMoveUnit &&
            canvasStore.movingUnitTile.row === unitTile.row &&
            canvasStore.movingUnitTile.col === unitTile.col
        ) {
            canvasStore.unsetAction();
            return;
        }

        const possibleTiles = gameModel.onTryingMoveUnit(unitTile);
        canvasStore.setTryingMoveUnit(possibleTiles, unitTile);
    },
    onAction: (action, values) => {
        gameModel.handleAction(action, values);
        currentGame.addTurnAction(action, values);
    },
};
