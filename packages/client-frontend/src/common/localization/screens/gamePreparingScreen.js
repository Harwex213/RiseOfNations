export const gamePreparingScreen = {
    pageTitle: "Game is preparing",
    gameSettings: {
        title: "Game settings",
        name: (name) => `Name: ${name}`,
        playersAmount: (amount) => `Players amount: ${amount} men`,
        turnDuration: (duration) => `Turn duration: ${duration} minutes`,
    },
    chatSubtitle: "Chat",
    playerBox: {
        waitingForPlayer: "Waiting for player...",
        realmNotSelected: "Realm not selected",
        playerIsReadyLabel: "ready",
        actions: {
            start: "Start",
            ready: "Ready",
            unready: "Not Ready",
            leave: "Leave",
            kick: "Kick",
            selectRealm: "Select realm",
        },
    },
};
