import { useState, useEffect } from "react";
import { Navigate, useParams, useOutletContext } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

const UserBrowse = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const { username } = useParams();
    const [foundUserData, setFoundUserData] = useState();
    const [userData] = useOutletContext();
    const [userFriends, setUserFriends] = useState();

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.searchUserProfile(username)
                .then(response => {
                    setFoundUserData(response.data[0]);
                })
                .catch(error => {
                    console.log(error);
                });
            if (userData) {
                UserService.getUserFriends(userData.user.username)
                .then(response => {
                    setUserFriends(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
        else {
            setLoggedOut(true);
        }
    }, [username, userData]);

    const sendFriendRequest = (event) => {
        event.currentTarget.disabled = true;
        UserService.sendFriendRequest(userData.id, foundUserData.id, userData.user.username);
    }

    const checkIfFriend = () => {
        for (var friend in userFriends) {
            if ((userFriends[friend]['accountOne'] === userData.id && userFriends[friend]['accountTwo'] === foundUserData.id) || (userFriends[friend]['accountOne'] === foundUserData.id && userFriends[friend]['accountTwo'] === userData.id)) {
                return false;
            }
        }
        return true;
    }

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100 text-center">
                            {foundUserData && userData ?
                                <>
                                    <div className="row text-start">
                                        <span className="fw-bold fs-1">Searched for user: {username}</span>
                                    </div>
                                    <img src={foundUserData.avatar} alt="User avatar" className="rounded-circle shadow" height="160" style={{ width: "200px" }}></img>
                                    <div className="row text-center">
                                        <span className="fw-bold fs-2">{foundUserData.user.username}</span>
                                    </div>
                                    <div className="row text-center">
                                        <span className="fs-6 fst-italic text-secondary mx-auto mt-1" style={{ width: "500px" }}>{foundUserData.bio}</span>
                                    </div>
                                    <div className="row text-center">
                                        <span className="fs-6 mx-auto mt-2" style={{ width: "300px" }}>{foundUserData.fav_team}</span>
                                    </div>
                                    {
                                        checkIfFriend() && userData.user.username !== foundUserData.user.username &&
                                        <div className="row text-center">
                                            <button type="button" className="btn btn-primary mx-auto" onClick={sendFriendRequest} style={{ width: "250px" }}>
                                                <span className="mx-auto"><i className="bi bi-person-plus px-2"></i>Invite to friends</span>
                                            </button>
                                        </div>
                                    }
                                </> :
                                <div className="row text-start">
                                    <span className="fw-bold fs-1">User: {username} not found</span>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default UserBrowse;