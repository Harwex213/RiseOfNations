import { stores } from "../../store";

export const fetchStatusService = {
    onFetchStart: () => {
        stores.globalState.increaseFetchCounter();
    },
    onFetchFinish: () => {
        stores.globalState.decreaseFetchCounter();
    },
    onFetchUnreachable: () => {
        stores.globalState.decreaseFetchCounter();
    },
};
