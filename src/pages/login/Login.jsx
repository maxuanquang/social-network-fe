import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
    const username = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            {
                user_name: username.current.value,
                password: password.current.value,
            },
            dispatch
        );
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on
                        Lamasocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            required
                            className="loginInput"
                            ref={username}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress
                                    color="white"
                                    size="20px"
                                ></CircularProgress>
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
