export const resources = {
    users: "Users",
    realms: "Realms",
    modificators: "Modificators",
    gameVariables: "GameVariables",
};

export const routes = {
    toUsers: "/" + resources.users,
    toRealms: "/" + resources.realms,
    toModificators: "/" + resources.modificators,
    toGameVariables: "/" + resources.gameVariables,
};

export const apiRoutes = {
    authentication: {
        login: process.env.REACT_APP_API_URL + "/authentication/admin-login",
        logout: process.env.REACT_APP_API_URL + "/authentication/logout",
    },
};
