import { makeAutoObservable } from "mobx";

export default class UserStore {
    isFetchingDescribe;
    user;
    userRealms;

    constructor() {
        this.isFetchingDescribe = true;
        this.user = {
            id: null,
            username: "Guest",
            isAuthenticated: false,
        };
        this.userRealms = [];
        makeAutoObservable(this, {
            getRealm: false,
        });
    }

    setIsFetchingDescribe(value) {
        this.isFetchingDescribe = value;
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

    getRealm(id) {
        const index = this.userRealms.findIndex((r) => r.id === id);
        return index !== -1 ? this.userRealms[index] : null;
    }
}
