import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const FriendsDashboard = () => {
    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        AuthService.logout();
        //setUserData(null); TODO after adding data fetching
        setLoggedOut(true);
    }

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    <Sidebar logoutClick={logout} />
                    <div className="col py-3">
                        <h1>Friends Dashboard</h1>
                    </div>
                </>
            }
        </>
    );
}

export default FriendsDashboard;