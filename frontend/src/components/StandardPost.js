import Comment from "./Comment";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const StandardPost = () => {
    const [comment, setComment] = useState(""); 

    const mock = [
        {
            "id": 18,
            "author": {
                "id": 1,
                "user": {
                    "username": "tester",
                    "email": "testerJohn@test.com"
                },
                "bio": "BEST PROFILE",
                "fav_team": "Chelsea FC",
                "avatar": "http://localhost:8000/media/avatars/bg.png"
            },
            "visibility": "public",
            "type": "standard",
            "date": "2022-12-27T23:47:04.357478Z",
            "image": "http://localhost:8000/media/posts/England-Vs-Panama_FmBmNyL.jpg",
            "content": {
                "text": "the newest post",
                "likes": 0,
                "dislikes": 0
            }
        }
    ]

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
                    <span className="fs-3 fw-bold">
                        <img src={mock[0].author.avatar} alt="profile_img" width="60" height="60" className="rounded-circle"></img>
                        <span className="ms-2">{mock[0].author.user.username}</span>
                    </span>
                </div>
                <div className="row">
                    <span className="text-secondary">{formatDate(mock[0].date)}</span>
                </div>
                <div className="row">
                    <span className="fs-2">
                        {mock[0].content.text}
                    </span>
                </div>
                {
                    mock[0].image ?
                    <div className="row text-center mb-2">
                        <span>
                            <img src={mock[0].image} alt="post_img" className="w-75"></img>
                        </span>
                    </div> : <></>
                }
                <div className="row">
                    <span className="mb-2">
                        <button type="button" class="btn btn-success mx-2"><i className="bi bi-hand-thumbs-up"></i><span className="ms-2">{mock[0].content.likes}</span></button> 
                        <button type="button" class="btn btn-danger"><i className="bi bi-hand-thumbs-down"></i><span className="ms-2">{mock[0].content.dislikes}</span></button>
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