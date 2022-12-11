import { apiClient, suspenseApiError } from "../../apiClient";
import { realmsTransform } from "../../transform/realmsTransform";
import { stores } from "../../store";

const userStore = stores.user;

export const realmsService = {
    getRealms: suspenseApiError(async () => {
        const { payload } = await apiClient.realmsClient.getUserRealms();
        const userRealms = realmsTransform.mapRealmsFromApi(payload);
        userStore.setRealms(userRealms);
    }),
};
