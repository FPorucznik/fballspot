import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useState, useEffect } from "react";
import UserService from "../services/UserService";

const MainLayout = () => {
    const [userData, setUserData] = useState();
    const [notificationCount, setNotificationCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getUserData()
                .then(response => {
                    setUserData(response.data);
                    UserService.getUserNotifications(response.data.user.username)
                        .then(response => {
                            setNotificationCount(response.data.length);
                        });
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

    const handleUserUpdate = () => {
        UserService.getUserData()
            .then(response => {
                setUserData(response.data);
            })
            .catch(() => {
                AuthService.refreshToken();
            });
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar logoutClick={logout} username={userData && userData.user.username} avatar={userData && userData.avatar} notificationCount={notificationCount} />
                {userData &&
                    <Outlet context={[userData, handleUserUpdate]} />
                }
            </div>
        </div>
    )
}

export default MainLayout;