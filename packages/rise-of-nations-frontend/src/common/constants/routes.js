export const routes = {
    index: "/",
    defaultRoute: "/games",
    game: "/game",
    games: "/games",
    gamesNested: {
        index: "",
        preparing: "preparing",
    },
    profile: "/profile",
    realms: "/realms",
    realmsNested: {
        index: "",
        createRealm: "create-realm",
        updateRealm: ":updateRealmId",
    },
    login: "/signIn",
    registration: "/signUp",
};
