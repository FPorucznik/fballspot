import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Watchrooms = () => {
    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        AuthService.logout();
        //setUserData(null); TODO after adding data fetching
        setLoggedOut(true);
    }

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            console.log("logged in");
        }
        else {
            setLoggedOut(true);
        }
    }, []);

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    <Sidebar logoutClick={logout} />
                    <div className="col py-3">
                        <h1>Watchrooms</h1>
                    </div>
                </>
            }
        </>
    );
}

export default Watchrooms;