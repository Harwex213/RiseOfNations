export const gameInfoTransform = {
    mapFromApi: (gameInfo) => ({
        gameVariables: gameInfo.gameVariables.map((gameVariable) => gameVariable.defaultValue),
        modificators: gameInfo.modificators,
    }),
};
