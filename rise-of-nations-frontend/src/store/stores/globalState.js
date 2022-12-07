import { makeAutoObservable } from "mobx";

export default class GlobalState {
    user;
    fetchCounter;

    constructor() {
        this.user = {
            id: null,
            username: "Guest",
            isAuthenticated: false,
        };
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

    setUserIdentity(user) {
        this.user.id = user.id;
        this.user.username = user.username;
        this.user.isAuthenticated = true;
    }

    clearUserIdentity() {
        this.user.id = null;
        this.user.username = "Guest";
        this.user.isAuthenticated = false;
    }
}
