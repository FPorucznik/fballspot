import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import Notification from "../components/Notification";

const Notifications = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const { username } = useParams();
    const [notificationData, setNotificationData] = useState();

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getUserNotifications(username)
                .then(response => {
                    setNotificationData(response.data);
                });
        }
        else {
            setLoggedOut(true);
        }
    }, [username]);

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1">Notifications</span>
                            </div>
                            {
                                Array.isArray(notificationData) ?
                                    notificationData.map((data) => <Notification data={data} key={data.id} />) :
                                    <></>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Notifications;