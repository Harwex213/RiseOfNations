import { makeAutoObservable } from "mobx";

export default class UserStore {
    user;
    userRealms;

    constructor() {
        this.user = {
            id: null,
            username: "Guest",
            isAuthenticated: false,
        };
        this.userRealms = [];
        makeAutoObservable(this);
    }

    setRealms(realms) {
        this.userRealms = realms;
    }

    setUser(user) {
        this.user.id = user.id;
        this.user.username = user.username;
        this.user.isAuthenticated = true;
    }

    clearUser() {
        this.user.id = null;
        this.user.username = "Guest";
        this.user.isAuthenticated = false;
    }
}
