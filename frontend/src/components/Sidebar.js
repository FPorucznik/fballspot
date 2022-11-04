import { LinkContainer } from "react-router-bootstrap"

const Sidebar = (props) => {
    const logout = () => {
        props.logoutClick();
    }

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <LinkContainer to="/main">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">FballSpot</span>
                    </a>
                </LinkContainer>
                <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="main_dashboard">
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
                </ul>
                <hr />
                <div className="dropdown pb-4">
                    <button className="btn btn-link d-flex align-items-center text-white text-decoration-none dropdown-toggle" type="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg" alt="profile_img" width="30" height="30" className="rounded-circle"></img>
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