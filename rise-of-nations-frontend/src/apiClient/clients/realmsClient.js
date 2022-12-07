import api from "../api";
import { apiRoutes } from "../apiRoutes";

export const realmsClient = {
    getUserRealms: async () => {
        return api.get(apiRoutes.realms.getUserRealms);
    },
};
