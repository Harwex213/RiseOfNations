import { authenticationClient } from "./clients/authenticationClient";
import { gameInfoClient } from "./clients/gameInfoClient";
import { realmsClient } from "./clients/realmsClient";
import { apiErrors } from "../common/localization";

export const apiClient = {
    authenticationClient,
    gameInfoClient,
    realmsClient,
};

export const suspenseApiError =
    (action) =>
    async (...values) => {
        try {
            return await action(...values);
        } catch (e) {
            if (e.response) {
                if (e.response.payload?.errors) {
                    throw new Error(Object.values(e.response.payload.errors).join("\n"));
                }
                if (e.response.payload?.message) {
                    throw new Error(e.response.payload.message);
                }
                if (e.response.status === 401) {
                    throw new Error(apiErrors.unauthorized);
                }
                throw new Error(apiErrors.undefinedError);
            }
            throw new Error(apiErrors.connectionError);
        }
    };
