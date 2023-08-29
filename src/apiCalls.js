// import axios from "axios";
import { makeRequest } from "./axios";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await makeRequest.post("/auth/login", userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err })
    }
}