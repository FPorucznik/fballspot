import { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import AuthService from "../services/AuthService";
import CreateStandardPostForm from "../forms/CreateStandardPostForm";
import CreateResultPostForm from "../forms/CreateResultPostForm";
import CreateSquadPostForm from "../forms/CreateSquadPostForm";
import Form from 'react-bootstrap/Form';


const CreatePost = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [userData] = useOutletContext();
    const [postType, setPostType] = useState("");

    useEffect(() => {
        if (!AuthService.isLoggedIn()) {
            setLoggedOut(true);
        }
    }, []);

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1">Create post</span>
                            </div>
                            <div className="row">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formPostType">
                                        <Form.Select onChange={event => setPostType(event.target.value)}>
                                            <option>Select post type</option>
                                            <option value="standard">Standard</option>
                                            <option value="result">Result</option>
                                            <option value="squad">Squad</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="row">
                                {
                                    postType === "standard" ?
                                        <CreateStandardPostForm userData={userData} />
                                        : postType === "result" ?
                                            <CreateResultPostForm userData={userData} />
                                            : postType === "squad" ?
                                                <CreateSquadPostForm userData={userData} />
                                                : <></>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default CreatePost;