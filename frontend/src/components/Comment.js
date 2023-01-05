const Comment = (props) => {
    return (
        <>
            <span className="fs-3 fw-bold">
                <img src={props.author.avatar} alt="profile_img" width="30" height="30" className="rounded-circle"></img>
                <span className="ms-2">{props.author.user.username}</span>
            </span>
            <span className="mb-2">
                {props.text}
            </span>
        </>
    );
}

export default Comment;