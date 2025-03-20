export const gameInfoTransform = {
    mapFromApi: (gameInfo) => {
        const gameVariables = [];

        for (const gameVariable of gameInfo.gameVariables) {
            gameVariables[gameVariable.id] = gameVariable.defaultValue;
        }

        return {
            gameVariables,
            modificators: gameInfo.modificators,
        };
    },
};
