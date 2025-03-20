import api from "../api";
import { apiRoutes } from "../apiRoutes";

export const realmsClient = {
    getUserRealms: async () => {
        return api.get(apiRoutes.realms.getUserRealms);
    },
    getRealm: async ({ realmId }) => {
        return api.get(`${apiRoutes.realms.getRealm}/${realmId}`);
    },
    createRealm: async (values) => {
        return api.post(apiRoutes.realms.createRealm, {
            json: values,
        });
    },
    updateRealm: async ({ realmId, values }) => {
        return api.put(`${apiRoutes.realms.updateRealm}/${realmId}`, {
            json: values,
        });
    },
    deleteRealm: async ({ realmId }) => {
        return api.delete(`${apiRoutes.realms.deleteRealm}/${realmId}`);
    },
};
