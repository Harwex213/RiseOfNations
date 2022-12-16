import { stores } from "../../store";
import { notificationsApiRoutes, notificationEvents } from "../../common/constants";
import { gamesTransform } from "../../transform/gamesTransform";
import { initSse } from "../../apiClient";
import { apiErrors } from "../../common/localization";

const events = notificationEvents.gameList;
const gamesStore = stores.games;
const connection = {
    eventSource: null,
    abortController: null,
};

const subscribe = () => initSse(connection, notificationsApiRoutes.gameList);

export const gamesService = {
    subscribeToGameList: async () => {
        try {
            if (connection.eventSource !== null) {
                return;
            }

            gamesStore.setIsFetching(true);
            const abortSignal = await subscribe();

            connection.eventSource.addEventListener(
                events.onGameList,
                ({ data }) => {
                    gamesStore.setIsFetching(false);
                    const games = JSON.parse(data);
                    const mappedGames = gamesTransform.mapGamesFromApi(games);
                    gamesStore.setGames(mappedGames);
                },
                { once: true }
            );

            connection.eventSource.addEventListener(
                events.onGameCreated,
                ({ data }) => {
                    const game = JSON.parse(data);
                    const createdGame = gamesTransform.mapGameFromApi(game);
                    gamesStore.createGame(createdGame);
                },
                { signal: abortSignal }
            );

            connection.eventSource.addEventListener(
                events.onGameUpdated,
                ({ data }) => {
                    const game = JSON.parse(data);
                    const updatedGame = gamesTransform.mapGameFromApi(game);
                    gamesStore.updateGame(updatedGame);
                },
                { signal: abortSignal }
            );

            connection.eventSource.addEventListener(
                events.onGameDeleted,
                ({ data }) => {
                    const game = JSON.parse(data);
                    const deletedGame = gamesTransform.mapDeletedGameFromApi(game);
                    gamesStore.deleteGame(deletedGame);
                },
                { signal: abortSignal }
            );
        } catch (e) {
            gamesStore.setIsFetching(false);
            connection.eventSource.close();
            connection.eventSource = null;
            throw new Error(apiErrors.cannotFetchGameList);
        }
    },
    unsubscribeFromGameList: () => {
        if (connection.eventSource === null) {
            return;
        }

        connection.abortController.abort();
        connection.eventSource.close();
        connection.eventSource = null;
        gamesStore.clearGames();
    },
};
