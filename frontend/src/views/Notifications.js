import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

const Notifications = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const { username } = useParams();
    const [foundUserData, setFoundUserData] = useState();

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getUserNotifications(username)
                .then( response => {
                    console.log(response.data);
                    prepareListData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            setLoggedOut(true);
        }
    }, [username]);

    const prepareListData = (data) => {
        const listItems = data.map((d) => 
        (
            d.type === 'comment' ?
                <li key={d.id}>
                    {d.data.username} commented {d.data.message}
                </li>
            : d.type === 'friend_request' ?
                <li key={d.id}>
                    {d.data.username} sent you a friend request <button>Accept</button>
                </li>
            : d.type === 'like' ?
                <li key={d.id}>
                    {d.data.username} liked your post
                </li>
            :   <li key={d.id}>
                    {d.data.username} disliked your post
                </li>
        )
        );
        setFoundUserData(listItems);
    }

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    <div className="col py-3">
                        {foundUserData}
                    </div>
                </>
            }
        </>
    );
}

export default Notifications;