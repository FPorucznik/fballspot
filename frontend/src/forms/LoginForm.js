import React from "react";
import { useState } from "react";
import AuthService from '../services/AuthService';
import { Navigate, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const navigate = useNavigate();

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

    const handleRedirect = () => {
        navigate("/register");
    }

    return (
        <>
            {loggedIn && <Navigate to="/main" />}
            <Form className="d-inline" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" required onChange={event => setUsername(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={event => setPassword(event.target.value)} />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Log in
                </Button>
                <Form.Group className="mb-2" controlId="formMessage">
                    <Form.Label className="text-danger">{loginMessage}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRedirect">
                    <Form.Label>Don't have an account?</Form.Label>
                    <Button className="mb-3 mx-2 d-block" variant="primary" onClick={handleRedirect}>
                        Register
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default LoginForm;