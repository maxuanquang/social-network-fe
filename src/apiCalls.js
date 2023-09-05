// import axios from "axios";
import { makeRequest } from "./axios";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await makeRequest.post("/users/login", userCredential);
        console.log(res)
        if (res.data.user.user_id !== 0) {
            console.log(res.headers)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: res.data.message });
        }
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};
