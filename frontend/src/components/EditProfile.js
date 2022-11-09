import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import UserService from '../services/UserService';

const MyVerticallyCenteredModal = (props) => {
    const [bio, setBio] = useState(props.bio)
    const [favTeam, setFavTeam] = useState(props.fav_team)
    const [avatar, setAvatar] = useState(props.avatar);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(avatar);
        //UserService.updateUserProfile(avatar, bio, favTeam);
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit profile details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAvatar" className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" accept=".png,.jpg,.jpeg" onChange={event => setAvatar(event.target.files[0].name)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" value={bio} onChange={event => setBio(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFavouriteTeam">
                        <Form.Label>Favourite Team</Form.Label>
                        <Form.Control type="text" value={favTeam} onChange={event => setFavTeam(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const EditProfile = (props) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                <div className="row text-start">
                    <span className="fw-bold fs-1">Your profile</span>
                    <button type="button" className="btn btn-primary mx-3" onClick={() => setModalShow(true)} style={{ width: "120px" }}>Edit profile</button>
                </div>
                <div className="row text-center">
                    <img src={props.userData.avatar} alt="User avatar" className="rounded-circle mx-auto shadow" height="160" width="" style={{ width: "200px" }}></img>
                    <span className="fw-bold fs-2">{props.userData.user.username}</span>
                </div>
                <div className="row text-center">
                    <span className="fs-6 fst-italic text-secondary mx-auto mt-1" style={{ width: "500px" }}>{props.userData.bio} bio goes here</span>
                </div>
                <div className="row text-center">
                    <span className="fs-6 mx-auto mt-2" style={{ width: "300px" }}>{props.userData.fav_team} fav team goes here</span>
                </div>
            </div>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} {...props.userData} />
        </>
    )
}

export default EditProfile;