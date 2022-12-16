export const apiRoutes = {
    authentication: {
        login: "authentication/login",
        register: "authentication/register",
        describe: "authentication/describe",
        logout: "authentication/logout",
    },
    gameInfo: {
        getGameInfo: "gameInfo",
    },
    realms: {
        getUserRealms: "realms",
        getRealm: "realms",
    },
    game: {
        selectRealm: "game/select-realm",
        ready: "game/ready",
        leave: "game/leave",
        kick: "game/kick",
        start: "game/start",
        chat: "game/chat",
    },
};
