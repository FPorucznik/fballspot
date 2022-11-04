import { useState, useEffect } from "react";
import UserService from '../services/UserService';
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getUserData()
                .then(response => {
                    setUserData(response.data);
                })
                .catch(() => {
                    AuthService.refreshToken();
                });
        }
        else {
            setLoggedOut(true);
            setUserData(null);
        }
    }, []);

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    {userData &&
                        <>
                            <div className="col py-3">
                                <div>
                                    <h1>Your account</h1>
                                    <img src={userData.avatar} alt="User avatar" />
                                    <h2>Username: {userData.user.username}</h2>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    );
}

export default Account;