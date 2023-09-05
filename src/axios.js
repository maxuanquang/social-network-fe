import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://192.168.0.200:19003/api/v1",
    withCredentials: true,
});
