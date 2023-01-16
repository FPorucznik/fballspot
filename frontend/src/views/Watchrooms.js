import { useState, useEffect } from "react";
import { Navigate, useOutletContext, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Watchrooms = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [userData] = useOutletContext();
    const navigate = useNavigate();
    const [showEnterForm, setShowEnterForm] = useState(false);
    const [roomNumber, setRoomNumber] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            console.log("logged in");
        }
        else {
            setLoggedOut(true);
        }
    }, []);

    const handleCreateWatchroom = () => {
        UserService.createWatchroom(userData.id)
            .then(response => {
                navigate(`/main/watchroom/${response.data.id}`);
            });
    }

    const handleJoinWatchroom = () => {
        setShowEnterForm(true);
    }

    const handleRoomDataInput = (event) => {
        event.preventDefault();
        UserService.getWatchroom(roomNumber)
            .then(response => {
                if (response) {
                    if (response.data.code !== roomCode) {
                        setMessage("Watchroom code is incorrect");
                    }
                    else {
                        let users = response.data.users.map(user => user.id);
                        users.push(userData.id);
                        let messages = response.data.messages.map(message => message.id);
                        const content = {
                            "host": response.data.host.id,
                            "code": response.data.code,
                            "users": users,
                            "messages": messages
                        }
                        UserService.updateWatchroom(response.data.id, content)
                            .then(() => {
                                navigate(`/main/watchroom/${response.data.id}`);
                            });
                    }
                }
                else {
                    setMessage("No watchroom found with given number");
                }
            });
    }

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    {userData &&
                        <div className="col py-2 bg-secondary">
                            <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                                <span className="fw-bold fs-1">Watchrooms</span>
                                <div className="row mt-5">
                                    <Button className="fw-bold w-50 mx-auto mb-5" variant="primary" onClick={handleCreateWatchroom}>
                                        Create Watchroom <i className="bi bi-play-btn mx-2"></i>
                                    </Button>
                                </div>
                                <div className="row">
                                    <Button className="fw-bold w-50 mx-auto mb-2" variant="primary" onClick={handleJoinWatchroom}>
                                        Join Watchroom <i className="bi bi-box-arrow-in-right mx-2"></i>
                                    </Button>
                                </div>
                                {
                                    showEnterForm &&
                                    <div className="row text-center">
                                        <span className="fw-bold mb-2">Enter watchroom number and code</span>
                                        <Form onSubmit={handleRoomDataInput} className="mx-auto w-50">
                                            <Form.Control className="mb-2" placeholder="Watchroom number" onChange={event => setRoomNumber(event.target.value)} required />
                                            <Form.Control className="mb-2" placeholder="Watchroom code" onChange={event => setRoomCode(event.target.value)} required />
                                            <Button className="mb-2" variant="primary" type="submit">
                                                Enter watchroom
                                            </Button>
                                        </Form>
                                        <span className="fw-bold">{message}</span>
                                    </div>
                                }

                            </div>
                        </div>
                    }
                </>
            }
        </>
    );
}

export default Watchrooms;