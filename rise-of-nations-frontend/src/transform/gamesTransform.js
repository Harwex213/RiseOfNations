export const gamesTransform = {
    mapDeletedGameFromApi: (game) => ({ id: game.id }),
    mapGameFromApi: (game) => ({
        id: game.id,
        name: game.name,
        playersAmount: game.playersAmount,
        turnDuration: game.turnDuration,
        playerOwnerId: game.playerOwnerId,
        status: game.status,
        players: game.players.map((player) => ({
            id: player.id,
            username: player.username,
            isOwner: player.isOwner,
            isReady: player.isReady,
            selectedRealmId: player.selectedRealmId ?? null,
        })),
    }),
    mapGamesFromApi: (games) => games,
    mapToCreateGame: ({ name = "", playersAmount = 0, turnDuration = 0 }) => ({
        name,
        playersAmount,
        turnDuration,
    }),
    mapToJoinGame: ({ id = "" }) => ({
        gameId: id,
    }),
};
