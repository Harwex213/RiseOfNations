export const routes = {
    index: "/",
    defaultRoute: "/games",
    games: "/games",
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
