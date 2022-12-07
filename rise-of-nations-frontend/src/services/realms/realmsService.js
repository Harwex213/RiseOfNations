import { apiClient, apiErrorSuspense } from "../../apiClient";
import { realmsTransform } from "../../transform/realmsTransform";
import { stores } from "../../store";

const realmsStore = stores.realms;

export const realmsService = {
    getRealms: apiErrorSuspense(async () => {
        const { payload } = await apiClient.realmsClient.getUserRealms();
        const userRealms = realmsTransform.mapRealmsFromApi(payload);
        realmsStore.setRealms(userRealms);
    }),
};
