import { useState, useEffect, useRef } from "react";
import { Navigate, useParams, useOutletContext } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { w3cwebsocket } from "websocket";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Chat = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const { id } = useParams();
    const [chatData, setChatData] = useState([]);
    const [userData] = useOutletContext();
    const [message, setMessage] = useState("");
    const client = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getChat(id)
                .then(response => {
                    setChatData(response.data);
                });
        }
        else {
            setLoggedOut(true);
        }
    }, [id]);

    useEffect(() => {
        client.current = new w3cwebsocket(`ws://localhost:8000/ws/chat/${id}/`);

        return () => {
            client.current.close();
        }
    }, [id]);

    const sendMessage = (event) => {
        event.preventDefault();
        client.current.send(JSON.stringify({
            type: "chat_message",
            message: message,
            sender: userData.user.username,
        })
        );
        formRef.current.reset();
    }

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> : userData && chatData.users &&
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1">Chat with {chatData.users[0].id === userData.id ? chatData.users[1].user.username : chatData.users[0].user.username}</span>
                            </div>
                            <div className="row d-flex flex-column-reverse h-75 mx-2 mt-2 overflow-auto border border-dark rounded">
                                <div className="row">
                                </div>
                            </div>
                            <div className="row mx-2 mt-2">
                                <Form ref={formRef} onSubmit={sendMessage}>
                                    <InputGroup className="mb-3">
                                        <Form.Control placeholder="Type message" aria-describedby="button_send" onChange={event => setMessage(event.target.value)} />
                                        <Button variant="primary" type="submit" id="button_send">
                                            <i className="bi bi-send"></i>
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Chat;