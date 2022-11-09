import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const FriendsDashboard = () => {
    const [loggedOut, setLoggedOut] = useState(false);

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
                    <div className="col py-3">
                        <h1>Friends Dashboard</h1>
                    </div>
                </>
            }
        </>
    );
}

export default FriendsDashboard;