import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import UserService from '../services/UserService';

const MyVerticallyCenteredModal = (props) => {
    const [bio, setBio] = useState(props.bio)
    const [favTeam, setFavTeam] = useState(props.fav_team)
    const [avatar, setAvatar] = useState(props.avatar);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const setModalVisibility = () => {
        props.setModalVisibility();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let form_data = new FormData();
        form_data.append('bio', bio);
        form_data.append('fav_team', favTeam);
        if(avatar.name) {
            form_data.append('avatar', avatar, avatar.name);
        }
        UserService.updateUserProfile(form_data)
            .then(() => {
                handleUserUpdateSubmit();
            });
    }

    const handleUserUpdateSubmit = () => {
        props.userUpdate();
        setShow(false);
        setModalVisibility();
    }

    return (
        <Modal show={show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit profile details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAvatar" className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" accept=".png,.jpg,.jpeg" onChange={event => setAvatar(event.target.files[0])} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" value={bio} onChange={event => setBio(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFavouriteTeam">
                        <Form.Label>Favourite Team</Form.Label>
                        <Form.Control type="text" value={favTeam} onChange={event => setFavTeam(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => setShow(false)}>
                        Save changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


const EditProfile = (props) => {
    const [modalShow, setModalShow] = useState(false);

    const setModalVisibility = () => {
        setModalShow(false);
    }

    return (
        <>
            <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100 text-center">
                <div className="row text-start">
                    <span className="fw-bold fs-1">Your profile</span>
                    <button type="button" className="btn btn-primary mx-3" onClick={() => setModalShow(true)} style={{ width: "120px" }}>Edit profile</button>
                </div>
                <img src={props.userData.avatar} alt="User avatar" className="rounded-circle shadow" height="160" style={{ width: "200px" }}></img>
                <div className="row text-center">
                    <span className="fw-bold fs-2">{props.userData.user.username}</span>
                </div>
                <div className="row text-center">
                    <span className="fs-6 fst-italic text-secondary mx-auto mt-1" style={{ width: "500px" }}>{props.userData.bio}</span>
                </div>
                <div className="row text-center">
                    <span className="fs-6 mx-auto mt-2" style={{ width: "300px" }}>{props.userData.fav_team}</span>
                </div>
            </div>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} {...props.userData} userUpdate={props.userUpdate} setModalVisibility={setModalVisibility}/>
        </>
    )
}

export default EditProfile;