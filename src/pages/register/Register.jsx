import axios from "axios";
import "./register.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const paswordAgain = useRef()
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault()
        if (paswordAgain.current.value !== password.current.value) {
            paswordAgain.current.setCustomValidity("Passwords do not matched");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("http://192.168.0.200:8800/api/auth/register", user);
                history.push("http://192.168.0.200:8800/api/login")
            } catch (err) {
                console.log(err);
            }
        }
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
                            ref={username}
                            className="loginInput"
                        />
                        <input
                            placeholder="Email"
                            required
                            type="email"
                            ref={email}
                            className="loginInput"
                        />
                        <input
                            placeholder="Password"
                            required
                            type="password"
                            ref={password}
                            className="loginInput"
                        />
                        <input
                            placeholder="Password Again"
                            required
                            type="password"
                            ref={paswordAgain}
                            className="loginInput"
                        />
                        <button className="loginButton" type="submit">
                            Sign Up
                        </button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
