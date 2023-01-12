import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const FriendChat = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("clicked ", props.user.user.username);
        navigate(`/main/chat/${props.id}`);
    }

    return (
        <>
            <div className="container rounded mt-1 shadow-lg bg-white mb-4">
                <div className="row">
                    <Button variant="outline-primary" onClick={handleClick}>
                        <span className="fs-3 fw-bold mt-2 mb-2">
                            <img src={props.user.avatar} alt="profile_img" width="60" height="60" className="rounded-circle"></img>
                            <span className="ms-2 text-dark">{props.user.user.username}</span>
                            <span><i className="bi bi-chat-dots mx-4"></i></span>
                        </span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default FriendChat;