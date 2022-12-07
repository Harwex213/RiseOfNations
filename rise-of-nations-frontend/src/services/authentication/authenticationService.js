import { apiClient, apiErrorSuspense } from "../../apiClient";
import { authenticationTransform } from "../../transform/authenticationTransform";
import { stores } from "../../store";

const globalState = stores.globalState;

export const authenticationService = {
    login: apiErrorSuspense(async (values) => {
        const valuesToSend = authenticationTransform.mapToLogin(values);
        const { payload: userIdentity } = await apiClient.authenticationClient.login(valuesToSend);
        const user = authenticationTransform.mapUserIdentity(userIdentity);
        globalState.setUserIdentity(user);
    }),
    register: apiErrorSuspense(async (values) => {
        const valuesToSend = authenticationTransform.mapToRegister(values);
        const { payload: userIdentity } = await apiClient.authenticationClient.register(valuesToSend);
        const user = authenticationTransform.mapUserIdentity(userIdentity);
        globalState.setUserIdentity(user);
    }),
    logout: async () => {
        try {
            await apiClient.authenticationClient.logout();
        } catch (e) {
            // ignored
        } finally {
            globalState.clearUserIdentity();
        }
    },
    describe: apiErrorSuspense(async () => {
        const { payload: userIdentity } = await apiClient.authenticationClient.describe();
        const user = authenticationTransform.mapUserIdentity(userIdentity);
        globalState.setUserIdentity(user);
    }),
    onUnauthorized: () => {
        globalState.clearUserIdentity();
    },
};
