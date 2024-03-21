import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://0.0.0.0:19003/api/v1",
    withCredentials: true,
});
