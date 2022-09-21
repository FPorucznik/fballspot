import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
    const [validationMessages, setValidationMessages] = useState("");
    const [submit, setSubmit] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthService.register(email, username, password)
            .then(response => {
                setValidationMessages("Account created you can now log in");
            }).catch(error => {
                const messages = Object.entries(error.response.data).map(([key, value]) => {
                    if (key === "email") {
                        return <li key={key}>Email: {value}</li>
                    }
                    else if (key === "username") {
                        return <li key={key}>Username: {value}</li>
                    }
                    else {
                        return <li key={key}>Password: {value}</li>
                    }
                });
                setValidationMessages(messages);
            });

        setEmail("");
        setUsername("");
        setPassword("");
        setPasswordConfirm("");
    }

    useEffect(() => {
        if (password !== passwordConfirm) {
            setPasswordCheckMessage("Passwords don't match");
            setSubmit(true);
        }
        else {
            setPasswordCheckMessage("");
            setSubmit(false);
        }
    }, [password, passwordConfirm]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" value={email} onChange={event => setEmail(event.target.value)} required /><br />
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value)} required /><br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required /><br />
                <label htmlFor="passwordConfirm">Confirm password: </label>
                <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)} required /><br />
                <input type="submit" value="Register" disabled={submit} />
            </form>
            <p>{passwordCheckMessage}</p>
            <ul>{validationMessages}</ul>
        </div>
    );
}

export default RegisterForm;