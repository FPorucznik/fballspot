import { useState, useEffect, useRef } from "react";
import { Navigate, useParams, useOutletContext } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { w3cwebsocket } from "websocket";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Message from "../components/Message";

const Chat = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const { id } = useParams();
    const [chatData, setChatData] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [userData] = useOutletContext();
    const [message, setMessage] = useState("");
    const client = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getChat(id)
                .then(response => {
                    response.data.messages = response.data.messages.reverse();
                    setChatData(response.data);
                    setChatMessages(response.data.messages);
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
            sender: userData.id,
            chat_id: id
        })
        );
        formRef.current.reset();
    }

    useEffect(() => {
        client.current.onmessage = (message) => {
            const receivedMessage = JSON.parse(message.data);
            setChatMessages(current => [receivedMessage.message, ...current]);
        }
    }, [chatMessages]);

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> : userData && chatData.users && chatMessages &&
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1 mb-1">Chat with {chatData.users[0].id === userData.id ? chatData.users[1].user.username : chatData.users[0].user.username}</span>
                            </div>
                            <div className="card mx-auto w-75" style={{ height: "400px", minWidth: "380px" }}>
                                <div className="card-body d-flex flex-row flex-column-reverse overflow-auto">
                                    {chatMessages.map(message => <Message userId={userData.id} author={message.author.id} text={message.text} key={message.id} />)}
                                </div>
                            </div>
                            <div className="mt-2 mx-auto w-75" style={{ minWidth: "380px" }}>
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