import { useState, useEffect, useRef } from "react";
import { Navigate, useOutletContext, useNavigate, useParams, useFetcher } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import Button from 'react-bootstrap/Button';
import { w3cwebsocket } from "websocket";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import WatchroomMessage from "../components/WatchroomMessage";
import ReactPlayer from 'react-player'


const Watchroom = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [userData] = useOutletContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [watchroomData, setWatchroomData] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [playing, setPlaying] = useState(false);
    const client = useRef(null);
    const formRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getWatchroom(id)
                .then(response => {
                    response.data.messages = response.data.messages.reverse();
                    setWatchroomData(response.data);
                    setChatMessages(response.data.messages);
                });
        }
        else {
            setLoggedOut(true);
        }
    }, [id]);

    useEffect(() => {
        client.current = new w3cwebsocket(`ws://localhost:8000/ws/watchroom/${id}/`);

        return () => {
            client.current.close();
        }
    }, [id]);

    const sendMessage = (event) => {
        event.preventDefault();
        client.current.send(JSON.stringify({
            type: "watchroom_message",
            message: message,
            sender: userData.id,
            watchroom_id: id,
        })
        );
        formRef.current.reset();
    }

    useEffect(() => {
        client.current.onmessage = (message) => {
            const receivedMessage = JSON.parse(message.data);
            if (receivedMessage.message.type === "user_join") {
                UserService.getWatchroom(id)
                    .then(response => {
                        setWatchroomData(response.data);
                    });
                setPlaying(false);
                if (videoUrl) {
                    client.current.send(JSON.stringify({
                        type: "video_share",
                        message: videoUrl,
                        sender: "",
                        watchroom_id: "",
                    })
                    );
                }
            }
            else if (receivedMessage.message.type === "watchroom_load_video") {
                setVideoUrl(receivedMessage.message.message);
            }
            else if (receivedMessage.message.type === "watchroom_play_video") {
                setPlaying(true);
            }
            else if (receivedMessage.message.type === "watchroom_pause_video") {
                setPlaying(false);
            }
            else if (receivedMessage.message.type === "video_share") {
                setPlaying(false);
                setVideoUrl(`${receivedMessage.message.message}&start=0`);
            }
            else {
                setChatMessages(current => [receivedMessage.message, ...current]);
            }
        }
    }, [chatMessages, id, videoUrl]);

    useEffect(() => {
        client.current.onopen = () => {
            client.current.send(JSON.stringify({
                type: "user_join",
                message: "user joined the room",
                sender: "",
                watchroom_id: "",
            })
            );

        }
    }, []);

    const handleLoadUrl = (event) => {
        event.preventDefault();
        setVideoUrl(urlInput);

        client.current.send(JSON.stringify({
            type: "watchroom_load_video",
            message: urlInput,
            sender: userData.id,
            watchroom_id: id,
        })
        );
    }

    const playVideo = () => {
        setPlaying(true);

        client.current.send(JSON.stringify({
            type: "watchroom_play_video",
            message: "",
            sender: userData.id,
            watchroom_id: id,
            video_time: ""
        })
        );
    }

    const pauseVideo = () => {
        setPlaying(false);

        client.current.send(JSON.stringify({
            type: "watchroom_pause_video",
            message: "",
            sender: userData.id,
            watchroom_id: id,
        })
        );
    }

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> : userData && watchroomData.host && chatMessages && watchroomData.users &&
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <span className="fw-bold fs-1">{watchroomData.host.user.username}'s watchroom</span>
                            <div className="row mb-2">
                                <span>Watchroom number: {watchroomData.id}</span>
                                <span>Watchroom code: {watchroomData.code}</span>
                                {
                                    watchroomData.host.id === userData.id ?
                                        <Form onSubmit={handleLoadUrl}>
                                            <InputGroup className="mb-3 mx-auto w-50">
                                                <Form.Control placeholder="Paste URL here" aria-describedby="button_load_url" onChange={event => setUrlInput(event.target.value)} />
                                                <Button variant="primary" type="submit" id="button_load_url">
                                                    Load video<i className="bi bi-box-arrow-in-down mx-2"></i>
                                                </Button>
                                            </InputGroup>
                                        </Form> : <></>
                                }
                            </div>
                            <div className="row">
                                <div className="col px-5">
                                    {
                                        watchroomData.host.id === userData.id ?
                                            <>
                                                <Button className="mx-2 mb-2" variant="primary" onClick={playVideo}>Play<i className="bi bi-play mx-1"></i></Button>
                                                <Button className="mb-2" variant="primary" onClick={pauseVideo}>Pause<i className="bi bi-pause mx-1"></i></Button>
                                            </> : <></>
                                    }
                                    <ReactPlayer ref={playerRef} config={{
                                        youtube: { playerVars: { origin: "https://www.youtube.com" } }
                                    }} url={videoUrl} playing={playing} width={420} height={320} />
                                </div>
                                <div className="col">
                                    <div className="row mx-4">
                                        <span className="fw-bold">
                                            Users:
                                            {watchroomData.users.map(user =>
                                                <img src={user.avatar} alt="profile_img" width="30" height="30" className="rounded-circle mx-1" key={user.id}></img>)
                                            }
                                        </span>
                                    </div>
                                    <div className="card mx-auto w-75" style={{ height: "300px", minWidth: "380px" }}>
                                        <div className="card-body d-flex flex-row flex-column-reverse overflow-auto">
                                            {chatMessages.map(message => <WatchroomMessage userId={userData.id} author={message.author.id} text={message.text} username={message.author.user.username} key={message.id} />)}
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
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Watchroom;