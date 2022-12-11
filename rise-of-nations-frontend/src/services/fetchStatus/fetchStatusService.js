import { stores } from "../../store";

export const fetchStatusService = {
    onFetchStart: () => {
        stores.ui.increaseFetchCounter();
    },
    onFetchFinish: () => {
        stores.ui.decreaseFetchCounter();
    },
    onFetchUnreachable: () => {
        stores.ui.decreaseFetchCounter();
    },
};
