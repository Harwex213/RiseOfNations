import UiStore from "./stores/ui";
import GameInfoStore from "./stores/gameInfo";
import UserStore from "./stores/user";

export const stores = {
    ui: new UiStore(),
    gameInfo: new GameInfoStore(),
    user: new UserStore(),
};
