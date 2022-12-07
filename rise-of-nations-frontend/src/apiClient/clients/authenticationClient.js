import api from "../api";
import { apiRoutes } from "../apiRoutes";

export const authenticationClient = {
    login: async (values) => {
        return api.post(apiRoutes.authentication.login, {
            json: values,
        });
    },
    register: async (values) => {
        return api.post(apiRoutes.authentication.register, {
            json: values,
        });
    },
    describe: async () => {
        return api.get(apiRoutes.authentication.describe, {
            retry: {
                limit: 0,
            },
        });
    },
    logout: async () => {
        return api.delete(apiRoutes.authentication.logout);
    },
};
