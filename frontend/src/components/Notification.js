import { useState } from "react";
import UserService from "../services/UserService";

const Notification = (props) => {
    const [displayRequest, setDisplayRequest] = useState(true);

    const acceptFriendRequest = () => {
        UserService.acceptFriendRequest(props.data.sender, props.data.receiver);
        UserService.deleteNotification(props.data.id);
        setDisplayRequest(false);
    }

    return (
        <>
            {props.data.type === 'friend_request' && displayRequest ?
                <div className="row">
                    <span><b>{props.data.data.username}</b> sent you a friend request 
                        <button type="button" className="btn btn-primary mx-1" onClick={acceptFriendRequest} style={{ width: "100px" }}>
                            <span className="mx-auto"><i className="bi bi-check"></i>Accept</span>
                        </button>
                    </span>
                </div>
                : props.data.type === 'comment' ?
                <div className="row">
                    <span><b>{props.data.data.username}</b> commented: "{props.data.data.comment}"</span>
                </div>
                : props.data.type === 'like' ?
                <div className="row">
                    <span><b>{props.data.data.username}</b> {props.data.data.message}</span>
                </div>
                : props.data.type === 'dislike' ?
                <div className="row">
                    <span><b>{props.data.data.username}</b> {props.data.data.message}</span>
                </div>
                : 
                <></>
            }
        </>
    );
}

export default Notification;