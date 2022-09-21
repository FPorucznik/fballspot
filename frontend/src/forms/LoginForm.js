import React from "react";
import { useState } from "react";
import AuthService from '../services/AuthService';
import { Navigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthService.login(username, password)
            .then(
                () => {
                    setLoggedIn(true);
                }
            ).catch(error => {
                setLoginMessage(error.response.data.detail);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value)} required />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required />
                <input type="submit" value="Log in" />
            </form>
            <p>{loginMessage}</p>
            {loggedIn && <Navigate to="/account" />}
        </div>
    );
}

export default LoginForm;