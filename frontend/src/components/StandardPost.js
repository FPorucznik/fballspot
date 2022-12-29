import Comment from "./Comment";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const StandardPost = (props) => {
    const [comment, setComment] = useState(""); 

    const formatDate = (date) => {
        let day = date.substring(0, 10);
        let time = date.substring(11, 16);
        return `${day} ${time}`;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("adding comment");
    }

    return (
        <>
            <div className="container rounded mt-1 shadow-lg bg-white w-75 mb-4">
                <div className="row">
                    <span className="fs-3 fw-bold mt-2">
                        <img src={props.author.avatar} alt="profile_img" width="60" height="60" className="rounded-circle"></img>
                        <span className="ms-2">{props.author.user.username}</span>
                    </span>
                </div>
                <div className="row">
                    <span className="text-secondary">{formatDate(props.date)}</span>
                </div>
                <div className="row">
                    <span className="fs-2">
                        {props.content.text}
                    </span>
                </div>
                {
                    props.image ?
                    <div className="row text-center mb-2">
                        <span>
                            <img src={props.image} alt="post_img" className="w-75"></img>
                        </span>
                    </div> : <></>
                }
                <div className="row">
                    <span className="mb-2">
                        <button type="button" className="btn btn-success mx-2"><i className="bi bi-hand-thumbs-up"></i><span className="ms-2">{props.content.likes}</span></button> 
                        <button type="button" className="btn btn-danger"><i className="bi bi-hand-thumbs-down"></i><span className="ms-2">{props.content.dislikes}</span></button>
                    </span>
                    <span>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formText">
                                <Form.Control type="text" onChange={event => setComment(event.target.value)} placeholder="Write a comment" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                    Add comment
                            </Button>
                        </Form>
                    </span>
                </div>
                <div className="row">
                    <Comment />
                </div>
            </div>
        </>
    );
}

export default StandardPost;