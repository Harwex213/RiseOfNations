import ky from "ky";
import { authenticationService, fetchStatusService } from "../services";

const api = ky.create({
    prefixUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
    hooks: {
        beforeRequest: [
            () => {
                fetchStatusService.onFetchStart();
            },
        ],
        afterResponse: [
            () => {
                fetchStatusService.onFetchFinish();
            },
            async (request, options, response) => {
                if (response.status === 401 || response.status === 403) {
                    authenticationService.onUnauthorized();
                }
                const responseError = await response.text();
                response.payload = responseError === "" ? {} : JSON.parse(responseError);
                return response;
            },
        ],
    },
});

export default api;
