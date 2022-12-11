import { makeAutoObservable } from "mobx";

export default class UiStore {
    fetchCounter;

    constructor() {
        this.fetchCounter = 0;
        makeAutoObservable(this);
    }

    get isFetching() {
        return this.fetchCounter > 0;
    }

    increaseFetchCounter() {
        this.fetchCounter = this.fetchCounter + 1;
    }

    decreaseFetchCounter() {
        this.fetchCounter = this.fetchCounter - 1;
    }
}
