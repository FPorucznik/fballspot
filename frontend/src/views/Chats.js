import { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import FriendChat from "../components/FriendChat";

const Chats = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [userData] = useOutletContext();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getUserChats(userData.id)
                .then(response => {
                    setFriends(response.data.map(data => data.users[0].id === userData.id ? { 'id': data.id, 'user': data.users[1] } : { 'id': data.id, 'user': data.users[0] }));
                });
        }
        else {
            setLoggedOut(true);
        }
    }, [userData.user.username, userData.id]);

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> : userData && friends &&
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1">Chats</span>
                            </div>
                            {
                                friends.map(data => <FriendChat {...data} userData={userData} key={data.id} />)
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Chats;