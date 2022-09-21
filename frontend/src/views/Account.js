import { useState, useEffect } from "react";
import UserService from '../services/UserService';
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Account = () => {
    const [userData, setUserData] = useState();
    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        AuthService.logout();
        setUserData(null);
        setLoggedOut(true);
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            UserService.getUserPage()
                .then(response => {
                    setUserData(response.data);
                });
        }
        else {
            setLoggedOut(true);
        }
    }, []);

    return (
        <div>
            {userData &&
                <div>
                    <button onClick={logout}>Logout</button>
                    <h1>Your account</h1>
                    <img src={userData.avatar} alt="User avatar" />
                    <h2>Username: {userData.user.username}</h2>
                </div>
            }
            {loggedOut && <Navigate to="/login" />}
        </div>
    );
}

export default Account;