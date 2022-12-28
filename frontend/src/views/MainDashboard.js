import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import StandardPost from "../components/StandardPost";

const MainDashboard = () => {
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
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1">Main Dashboard</span>
                            </div>
                            <StandardPost />
                            <StandardPost />
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default MainDashboard;