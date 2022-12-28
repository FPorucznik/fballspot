const Comment = () => {
    const mockName = "johnny7";
    const mockAvatar = "http://localhost:8000/media/avatars/cave_c9z8JCb.png";
    const mockText = "nice post mate";

    return (
        <>
            <span className="fs-3 fw-bold">
                <img src={mockAvatar} alt="profile_img" width="30" height="30" className="rounded-circle"></img>
                <span className="ms-2">{mockName}</span>
            </span>
            <span>
                {mockText}
            </span>
        </>
    );
}

export default Comment;