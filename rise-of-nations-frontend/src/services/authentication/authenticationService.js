import { apiClient, suspenseApiError } from "../../apiClient";
import { authenticationTransform } from "../../transform/authenticationTransform";
import { stores } from "../../store";

const userStore = stores.user;

export const authenticationService = {
    login: suspenseApiError(async (values) => {
        const valuesToSend = authenticationTransform.mapToLogin(values);
        const { payload: userIdentity } = await apiClient.authenticationClient.login(valuesToSend);
        const user = authenticationTransform.mapUserIdentity(userIdentity);
        userStore.setUser(user);
    }),
    register: suspenseApiError(async (values) => {
        const valuesToSend = authenticationTransform.mapToRegister(values);
        const { payload: userIdentity } = await apiClient.authenticationClient.register(valuesToSend);
        const user = authenticationTransform.mapUserIdentity(userIdentity);
        userStore.setUser(user);
    }),
    logout: async () => {
        try {
            await apiClient.authenticationClient.logout();
        } catch (e) {
            // ignored
        } finally {
            userStore.clearUser();
        }
    },
    describe: suspenseApiError(async () => {
        const { payload: userIdentity } = await apiClient.authenticationClient.describe();
        const user = authenticationTransform.mapUserIdentity(userIdentity);
        userStore.setUser(user);
    }),
    onUnauthorized: () => {
        userStore.clearUser();
    },
};
