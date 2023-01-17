import { useState } from "react";
import UserService from "../services/UserService";

const Notification = (props) => {
    const [displayRequest, setDisplayRequest] = useState(true);
    const [displayNotification, setDisplayNotification] = useState(true);

    const acceptFriendRequest = () => {
        UserService.acceptFriendRequest(props.data.sender, props.data.receiver);
        UserService.deleteNotification(props.data.id);
        setDisplayRequest(false);
    }

    const deleteNotification = () => {
        UserService.deleteNotification(props.data.id);
        setDisplayNotification(false);
    }

    return (
        <>
            {props.data.type === 'friend_request' && displayRequest && displayNotification ?
                <div className="row">
                    <span><b>{props.data.data.username}</b> sent you a friend request
                        <button type="button" className="btn btn-primary mx-2" onClick={acceptFriendRequest} style={{ width: "100px" }}>
                            <span className="mx-auto"><i className="bi bi-check"></i>Accept</span>
                        </button>
                        <button type="button" className="btn btn-outline-secondary mx-2" onClick={deleteNotification} style={{ width: "50px" }}>
                            <span className="mx-auto"><i className="bi bi-x-lg"></i></span>
                        </button>
                    </span>
                </div>
                : props.data.type === 'comment' && displayNotification ?
                    <div className="row">
                        <span><b>{props.data.data.username}</b> commented: "{props.data.data.comment}"
                            <button type="button" className="btn btn-outline-secondary mx-2" onClick={deleteNotification} style={{ width: "50px" }}>
                                <span className="mx-auto"><i className="bi bi-x-lg"></i></span>
                            </button>
                        </span>
                    </div>
                    : props.data.type === 'like' && displayNotification ?
                        <div className="row">
                            <span className="mb-2"><b>{props.data.data.username}</b> liked Your post: "{props.data.data.message}"
                                <button type="button" className="btn btn-outline-secondary mx-2" onClick={deleteNotification} style={{ width: "50px" }}>
                                    <span className="mx-auto"><i className="bi bi-x-lg"></i></span>
                                </button>
                            </span>
                        </div>
                        : props.data.type === 'dislike' && displayNotification ?
                            <div className="row">
                                <span className="d-block"><b>{props.data.data.username}</b> disliked Your post: "{props.data.data.message}"
                                    <button type="button" className="btn btn-outline-secondary mx-2" onClick={deleteNotification} style={{ width: "50px" }}>
                                        <span className="mx-auto"><i className="bi bi-x-lg"></i></span>
                                    </button>
                                </span>
                            </div>
                            :
                            <></>
            }
        </>
    );
}

export default Notification;