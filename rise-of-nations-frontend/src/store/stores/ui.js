import { makeAutoObservable } from "mobx";

export default class UiStore {
    fetchCounter;
    notifyUi;

    constructor() {
        this.fetchCounter = 0;
        this.notifyUi = null;
        makeAutoObservable(this, {
            notifyError: false,
            notifySuccess: false,
        });
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

    setNotifyFunc(func) {
        this.notifyUi = func;
    }

    notifyError(message) {
        if (this.notifyUi !== null) {
            this.notifyUi(message, { variant: "error" });
        }
    }

    notifySuccess(message) {
        if (this.notifyUi !== null) {
            this.notifyUi(message, { variant: "success" });
        }
    }
}
