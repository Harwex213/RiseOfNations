import { makeAutoObservable } from "mobx";

export default class GlobalGameInfoStore {
    gameVariables;
    modificators;

    constructor() {
        this.gameVariables = [];
        this.modificators = [];

        makeAutoObservable(this, {
            getModificator: false,
        });
    }

    setGameVariables(gameVariables) {
        this.gameVariables = gameVariables;
    }

    setModificators(modificators) {
        this.modificators = modificators;
    }

    getModificator(modificatorId) {
        return this.modificators.find((m) => m.id === modificatorId);
    }
}
