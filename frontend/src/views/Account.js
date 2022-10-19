import { useState, useEffect } from "react";
import UserService from '../services/UserService';
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import Sidebar from "../components/Sidebar";

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        AuthService.logout();
        setUserData(null);
        setLoggedOut(true);
    }

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getUserPage()
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
                    <Sidebar logoutClick={logout} />
                    <div className="col py-3">
                        {userData &&
                            <div>
                                <h1>Your account</h1>
                                <img src={userData.avatar} alt="User avatar" />
                                <h2>Username: {userData.user.username}</h2>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default Account;