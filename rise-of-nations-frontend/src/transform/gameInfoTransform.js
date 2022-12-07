export const gameInfoTransform = {
    mapFromApi: (gameInfo) => ({
        gameVariables: gameInfo.gameVariables,
        modificators: gameInfo.modificators,
    }),
};
