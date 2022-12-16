import UiStore from "./stores/ui";
import GlobalGameInfoStore from "./stores/globalGameInfo";
import UserStore from "./stores/user";
import GamesStore from "./stores/games";
import CurrentGameStore from "./stores/currentGame";

export const stores = {
    ui: new UiStore(),
    globalGameInfo: new GlobalGameInfoStore(),
    user: new UserStore(),
    games: new GamesStore(),
    currentGame: new CurrentGameStore(),
};
