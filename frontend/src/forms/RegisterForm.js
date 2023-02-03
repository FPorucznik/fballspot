import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
    const [validationMessages, setValidationMessages] = useState("");
    const navigate = useNavigate();

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
    }

    useEffect(() => {
        if (password !== passwordConfirm) {
            setPasswordCheckMessage("Passwords don't match");
        }
        else {
            setPasswordCheckMessage("");
        }
    }, [password, passwordConfirm]);

    const handleRedirect = () => {
        navigate("/login");
    }

    return (
        <>
            <div className="col">
                <Form className="d-inline" onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required onChange={event => setEmail(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" required onChange={event => setUsername(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPasswordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" required onChange={event => setPasswordConfirm(event.target.value)} />
                    </Form.Group>
                    <Button className="mb-2" variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
            <div className="col">
                <ul className="text-danger">{validationMessages}</ul>
                <Form>
                    <Form.Group className="mb-2" controlId="formMessage">
                        <Form.Label className="text-danger">{passwordCheckMessage}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formRedirect">
                        <Form.Label>Already have an account?</Form.Label>
                        <Button className="mb-2 mx-2 d-block" variant="primary" onClick={handleRedirect}>
                            Login
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default RegisterForm;