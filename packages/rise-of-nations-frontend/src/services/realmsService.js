import { apiClient, suspenseApiError } from "../apiClient";
import { realmsTransform } from "../transform/realmsTransform";
import { stores } from "../store";

const userStore = stores.user;

export const realmsService = {
    getRealms: suspenseApiError(async () => {
        const { payload } = await apiClient.realmsClient.getUserRealms();
        const userRealms = realmsTransform.mapRealmsFromApi(payload);
        userStore.setRealms(userRealms);
    }),
    getRealm: suspenseApiError(async ({ id }) => {
        return apiClient.realmsClient.getRealm({ realmId: id });
    }),
    createRealm: suspenseApiError(async (values) => {
        await apiClient.realmsClient.createRealm(values);
    }),
    updateRealm: suspenseApiError(async (values) => {
        await apiClient.realmsClient.updateRealm({ realmId: values.id, values });
    }),
    deleteRealm: suspenseApiError(async ({ id }) => {
        await apiClient.realmsClient.deleteRealm({ realmId: id });
    }),
};
