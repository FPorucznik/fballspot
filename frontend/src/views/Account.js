import { useState, useEffect } from "react";
import UserService from '../services/UserService';
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import EditProfile from "../components/EditProfile";

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
                        <div className="col py-2 bg-secondary">
                            <EditProfile userData={userData} />
                        </div>
                    }
                </>
            }
        </>
    );
}

export default Account;