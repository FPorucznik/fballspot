const EditProfile = (props) => {
    return (
        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
            <div className="row text-start">
                <span className="fw-bold fs-1">Your profile</span>
                <button type="button" className="btn btn-primary mx-3"  style={{width: "120px"}}>Edit profile</button>
            </div>
            <div className="row text-center">
                <img src={props.userData.avatar} alt="User avatar" className="rounded-circle mx-auto shadow" height="160" width="" style={{width: "200px"}}></img>
                <span className="fw-bold fs-2">{props.userData.user.username}</span>
            </div>
            <div className="row text-center">
                <span className="fs-6 fst-italic text-secondary mx-auto mt-1" style={{width: "500px"}}>{props.userData.bio} bio goes here</span>
            </div>
            <div className="row text-center">
                <span className="fs-6 mx-auto mt-2" style={{width: "300px"}}>{props.userData.fav_team} fav team goes here</span>
            </div>
        </div>
    )
}

export default EditProfile;