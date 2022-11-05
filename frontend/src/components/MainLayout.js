import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useState, useEffect } from "react";
import UserService from "../services/UserService";

const MainLayout = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

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
            navigate("/login");
        }
    }, [navigate]);

    const logout = () => {
        AuthService.logout();
        navigate("/login");
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar logoutClick={logout} username={userData && userData.user.username} avatar={userData && userData.avatar} />
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;