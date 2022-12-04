import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    options.credentials = "include";
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider = simpleRestProvider(process.env.REACT_APP_REST_API_URL, httpClient);
