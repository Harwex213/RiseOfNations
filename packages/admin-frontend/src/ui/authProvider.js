import { apiRoutes } from "../common/constants";
import { authProviderMessages } from "../common/localization";

const urlRoutes = apiRoutes.authentication;

export const authProvider = {
    login: async ({ username, password }) => {
        try {
            const request = new Request(urlRoutes.login, {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: new Headers({ "Content-Type": "application/json" }),
                credentials: "include",
            });
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject(authProviderMessages.badCredentials);
            }
            const data = await response.text();
            sessionStorage.setItem("user", data);
        } catch (e) {
            throw new Error("Network error");
        }
    },
    logout: async () => {
        try {
            const request = new Request(urlRoutes.logout, {
                method: "DELETE",
                headers: new Headers({ "Content-Type": "application/json" }),
                credentials: "include",
            });
            await fetch(request);
        } catch (e) {
            // ignored
        }
        sessionStorage.removeItem("user");
    },
    checkAuth: async () => {
        const user = sessionStorage.getItem("user");
        if (!user) {
            throw new Error(authProviderMessages.unauthorized);
        }
        const parsed = JSON.parse(user);
        return {
            id: parsed.id,
            fullName: parsed.username,
        };
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            sessionStorage.removeItem("user");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getIdentity: async () => {
        const user = sessionStorage.getItem("user");
        if (!user) {
            throw new Error(authProviderMessages.undefinedIdentity);
        }
        const parsed = JSON.parse(user);
        return {
            id: parsed.id,
            fullName: parsed.username,
        };
    },
    getPermissions: () => Promise.resolve(""),
};
