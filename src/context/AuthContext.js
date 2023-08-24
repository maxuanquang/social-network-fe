import { useReducer } from "react";
import { createContext } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        _id: "64e575cae44b4335be9ec8e5",
        profilePicture: "",
        coverPicture: "",
        followers: [],
        followings: [],
        isAdmin: false,
        username: "jane1",
        email: "jane1@gmail.com",
        password:
            "$2b$10$NP9isTAnlaWB8GLCa/foQepoECEeLtd0M9ITemz7fqiQXCFEIMHcO",
        createdAt: { $date: { $numberLong: "1692759498049" } },
        updatedAt: { $date: { $numberLong: "1692759498049" } },
        __v: { $numberInt: "0" },
    },
    isFetching: false, // decide beginning and ending of the log in process
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
