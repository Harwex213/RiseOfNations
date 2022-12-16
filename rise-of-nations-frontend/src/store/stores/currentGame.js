import { makeAutoObservable } from "mobx";

export default class CurrentGameStore {
    ifFetching;
    info;
    model;
    playersRealms;
    chatMessages;

    constructor() {
        this.isFetching = false;
        this.info = null;
        this.model = null;
        this.playersRealms = {};
        this.chatMessages = [];
        makeAutoObservable(this, {
            getPlayerRealm: false,
        });
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
    }

    getPlayerRealm(playerId) {
        return this.playersRealms[String(playerId)] ?? null;
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
}
