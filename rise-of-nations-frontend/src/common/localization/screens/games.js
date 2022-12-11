export const games = {
    gameList: {
        pageTitle: "Game rooms",
        pageSubtitle: "Choose game room to join in the left side list or create your own:",
        actions: {
            createGame: "Create room",
            joinGame: "Join",
        },
    },
    fieldLabels: {
        name: "Name",
        playersAmount: "Number of players",
        turnDuration: "Turn time duration",
    },
    fieldOptions: {
        playersAmount: (men) => `${men} men`,
        turnDuration: (minute) => `${minute} minutes`,
    },
};
