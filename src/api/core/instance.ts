import axios from "axios";

const DOMAIN = 'https://void.ndbtea.tech';

const authorized = axios.create({
    baseURL: DOMAIN + "/api",
});

authorized.interceptors.request.use((config) => {
    // TODO: Move local storage key to other place to not repeat it
    const token = localStorage.getItem("void-access-token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

authorized.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response),
);


const unauthorized = axios.create({
    baseURL: DOMAIN + "/api",
});

unauthorized.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response),
);

export { authorized, unauthorized };