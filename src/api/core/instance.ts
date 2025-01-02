import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:6969/api",
});

export default instance;