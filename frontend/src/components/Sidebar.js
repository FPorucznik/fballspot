import { LinkContainer } from "react-router-bootstrap"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
    const [searchUserInput, setSearchUserInput] = useState("");
    const navigate = useNavigate();

    const logout = () => {
        props.logoutClick();
    }

    const handleSearch = () => {
        navigate(`/main/users/${searchUserInput}`);
    }

    const handleCreatePost = () => {
        navigate('/main/create-post');
    }

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex sticky-top flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <LinkContainer to="/main">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">FballSpot</span>
                    </a>
                </LinkContainer>
                <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                    <li className="d-flex nav-item">
                        <div className="d-flex input-group mb-3">
                            <input type="d-flex text" value={searchUserInput} onChange={event => setSearchUserInput(event.target.value)} className="form-control" placeholder="Search user" aria-label="Search user" aria-describedby="search" />
                            <button className="btn btn-primary" onClick={handleSearch} type="button" id="search"><i className="bi bi-search"></i></button>
                        </div>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-primary" onClick={handleCreatePost} style={{ width: "135px" }}>
                            <span><i className="bi bi-postcard px-1"></i>Create Post</span>
                        </button>
                    </li>
                    <li className="nav-item">
                        <LinkContainer to="/main">
                            <a href="/" className="nav-link align-middle px-0">
                                <i className="fs-4 bi bi-card-heading"></i><span className="ms-2 d-none d-sm-inline align-text-bottom">Main Dashboard</span>
                            </a>
                        </LinkContainer>
                    </li>
                    <li className="nav-item">
                        <LinkContainer to="/main/friends_dashboard">
                            <a href="/" className="nav-link align-middle px-0">
                                <i className="fs-4 bi bi-people"></i><span className="ms-2 d-none d-sm-inline align-text-bottom">Friends Dashboard</span>
                            </a>
                        </LinkContainer>
                    </li>
                    <li className="nav-item">
                        <LinkContainer to="/main/chats">
                            <a href="/" className="nav-link align-middle px-0">
                                <i className="fs-4 bi bi-chat-dots"></i><span className="ms-2 d-none d-sm-inline align-text-bottom">Chats</span>
                            </a>
                        </LinkContainer>
                    </li>
                    <li className="nav-item">
                        <LinkContainer to="/main/watchrooms">
                            <a href="/" className="nav-link align-middle px-0">
                                <i className="fs-4 bi bi-play-btn"></i><span className="ms-2 d-none d-sm-inline align-text-bottom">Watchrooms</span>
                            </a>
                        </LinkContainer>
                    </li>
                    <li className="nav-item">
                        <LinkContainer to={`/main/notifications/${props.username}`}>
                            <a href="/" className="nav-link align-middle px-0">
                                <i className="fs-4 bi bi-bell"></i>
                                <span className="ms-2 d-none d-sm-inline align-text-bottom">
                                    Notifications <span className="bg-danger rounded text-white p-1 mx-1">{props.notificationCount}</span>
                                </span>
                            </a>
                        </LinkContainer>
                    </li>
                </ul>
                <hr />
                <div className="dropdown pb-4 sticky-top">
                    <button className="btn btn-link d-flex align-items-center text-white text-decoration-none dropdown-toggle" type="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={props.avatar} alt="profile_img" width="30" height="30" className="rounded-circle"></img>
                        <span className="ms-2 d-none d-sm-inline align-text-bottom">{props.username}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser">
                        <li>
                            <LinkContainer to="/main/account">
                                <a className="dropdown-item" href="/">Profile</a>
                            </LinkContainer>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <button className="btn btn-link dropdown-item" onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;