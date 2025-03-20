export const resources = {
    users: "Users",
    realms: "Realms",
    modificators: "Modificators",
    gameVariables: "GameVariables",
    gameParties: "GameParties",
};

export const routes = {
    toUsers: "/" + resources.users,
    toRealms: "/" + resources.realms,
    toModificators: "/" + resources.modificators,
    toGameVariables: "/" + resources.gameVariables,
    toGameParties: "/" + resources.gameParties,
};

export const apiRoutes = {
    images: {
        realms: process.env.REACT_APP_REALMS_IMAGES_URL,
        defaultRealmFlag: process.env.REACT_APP_NONE_REALM_IMAGE_URL,
    },
    authentication: {
        login: process.env.REACT_APP_API_URL + "/authentication/admin-login",
        logout: process.env.REACT_APP_API_URL + "/authentication/logout",
    },
};
