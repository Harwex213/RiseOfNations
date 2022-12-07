import { makeAutoObservable } from "mobx";

export default class Realms {
    userRealms;

    constructor() {
        this.userRealms = [];
        makeAutoObservable(this);
    }

    setRealms(realms) {
        this.userRealms = realms;
    }
}
