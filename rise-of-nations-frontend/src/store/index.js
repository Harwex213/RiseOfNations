import GlobalState from "./stores/globalState";
import GameInfo from "./stores/gameInfo";
import Realms from "./stores/realms";

export const stores = {
    globalState: new GlobalState(),
    gameInfo: new GameInfo(),
    realms: new Realms(),
};
