import { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import AuthService from "../services/AuthService";
import EditProfile from "../components/EditProfile";

const Account = () => {
    const [userData, handleUserUpdate] = useOutletContext();
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        if (!AuthService.isLoggedIn()) {
            setLoggedOut(true);
        }
    }, []);

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    {userData &&
                        <div className="col py-2 bg-secondary">
                            <EditProfile userData={userData} userUpdate={handleUserUpdate} />
                        </div>
                    }
                </>
            }
        </>
    );
}

export default Account;