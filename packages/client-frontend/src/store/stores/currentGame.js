import { makeAutoObservable } from "mobx";
import { gameConstants } from "../../common/constants";

export default class CurrentGameStore {
    ifFetching = false;
    info = null;
    model = null;
    playersRealms = {};
    chatMessages = [];
    userTurnActions = [];
    userCountryIndex = -1;
    timerTimeout = 0;
    timerInterval = 0;

    constructor() {
        makeAutoObservable(this, {
            getPlayerRealm: false,
            isModelSet: false,
        });
    }

    clearTimeout() {
        clearTimeout(this.timerTimeout);
    }

    clearInterval() {
        clearInterval(this.timerInterval);
    }

    setTimeout(timerTimeout) {
        this.timerTimeout = timerTimeout;
    }

    setInterval(timerInterval) {
        this.timerInterval = timerInterval;
    }

    setIsFetching(value) {
        this.isFetching = value;
    }

    get isInGame() {
        return this.info !== null;
    }

    setInfo(game) {
        this.info = game;
    }

    clearAll() {
        this.info = null;
        this.model = null;
        this.playersRealms = {};
        this.chatMessages = [];
        this.userTurnActions = [];
        this.userCountryIndex = -1;
    }

    getPlayerRealm(playerId) {
        return this.playersRealms[String(playerId)] ?? null;
    }

    get isModelSet() {
        return this.model !== null;
    }

    get isGameFinished() {
        return this.info.status === gameConstants.statuses.finished;
    }

    get isUserTurn() {
        return this.model !== null && this.userCountryIndex === this.model.currentTurnPlayerIndex;
    }

    get isUserDefeated() {
        return this.model !== null && this.model.countries[this.userCountryIndex].isIgnorable;
    }

    setPlayersRealm(playerId, realm) {
        this.playersRealms[String(playerId)] = realm;
    }

    addChatMessage(message) {
        this.chatMessages.push(message);
    }

    setModel(model) {
        this.model = model;
    }

    setUserCountryIndex(index) {
        this.userCountryIndex = index;
    }

    clearTurnActions() {
        this.userTurnActions = [];
    }

    addTurnAction(action, values) {
        this.userTurnActions.push({
            action,
            values,
        });
    }
}
