import Comment from "./Comment";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import UserService from "../services/UserService";
import Toast from 'react-bootstrap/Toast';

const StandardPost = (props) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likeValue, setLikeValue] = useState(0);
    const [dislikeValue, setDislikeValue] = useState(0);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [likeBtnStyle, setLikeBtnStyle] = useState("");
    const [dislikeBtnStyle, setDislikeBtnStyle] = useState("");
    const [reacted, setReacted] = useState(false);

    const formatDate = (date) => {
        let day = date.substring(0, 10);
        let time = date.substring(11, 16);
        return `${day} ${time}`;
    }

    useEffect(() => {
        const checkLikes = () => {
            if (props.likes.some(like => like.user.username === props.userData.user.username)) {
                setLikeBtnStyle("active");
                setReacted(true);
            }
            else {
                setLikeBtnStyle("");
            }
        }
    
        const checkDislikes = () => {
            if (props.dislikes.some(dislike => dislike.user.username === props.userData.user.username)) {
                setDislikeBtnStyle("active");
                setReacted(true);
            }
            else {
                setDislikeBtnStyle("");
            }
        }
        checkLikes();
        checkDislikes();

        UserService.getComments(props.id)
        .then((response) => {
            setComments(response.data);
        });
    }, [props.likes, props.dislikes, props.userData.user.username, props.id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        UserService.createComment(props.userData.id, props.id, comment)
        .then(() => {
           console.log("added comment"); 

           UserService.sendCommentNotification(props.userData.id, props.author.id, props.userData.user.username, "comment", comment);

           UserService.getComments(props.id)
           .then((response) => {
               setComments(response.data);
           });
        });
    }

    const handleLike = (event) => {
        event.preventDefault();
        const likes = [...props.likes.map(like => like.id)];

        if (likes.includes(props.userData.id) || reacted) {
            setShow(true);
            setMessage("You already reacted to this post !");
        }
        else {
            likes.push(props.userData.id);
            setLikeBtnStyle("active");
            setLikeValue(1);

            let content = {
                "likes": likes,
                "dislikes": [...props.dislikes.map(dislike => dislike.id)],
                "author": props.author.id,
                "type": props.type,
                "visibility": props.visibility,
                "content": props.content
            }

            UserService.updatePost(props.id, content)
            .then(() => {
                setLikeValue(1);
                setReacted(true);
            });

            UserService.sendRatingNotification(props.userData.id, props.author.id, props.userData.user.username, "like", props.content.text);
        }
    }

    const handleDislike = (event) => {
        event.preventDefault();
        const dislikes = [...props.dislikes.map(dislike => dislike.id)];

        if (dislikes.includes(props.userData.id) || reacted) {
            setShow(true);
            setMessage("You already reacted to this post !");
        }
        else {
            dislikes.push(props.userData.id);
            setDislikeBtnStyle("active");
            setDislikeValue(1);

            let content = {
                "likes": [...props.likes.map(like => like.id)],
                "dislikes": dislikes,
                "author": props.author.id,
                "type": props.type,
                "visibility": props.visibility,
                "content": props.content
            }

            UserService.updatePost(props.id, content)
            .then(() => {
                setDislikeValue(1);
                setReacted(true);
            });

            UserService.sendRatingNotification(props.userData.id, props.author.id, props.userData.user.username, "dislike", props.content.text);
        }
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
                        <Toast onClose={() => setShow(false)} show={show} delay={2500} autohide>
                            <Toast.Body>{message}</Toast.Body>
                        </Toast>
                        <button type="button" className={"btn btn-outline-success mx-2 " + likeBtnStyle} onClick={handleLike}><i className="bi bi-hand-thumbs-up"></i><span className="ms-2">{props.likes.length + likeValue}</span></button> 
                        <button type="button" className={"btn btn-outline-danger " + dislikeBtnStyle} onClick={handleDislike}><i className="bi bi-hand-thumbs-down"></i><span className="ms-2">{props.dislikes.length + dislikeValue}</span></button>
                    </span>
                    <span>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formText">
                                <Form.Control type="text" onChange={event => setComment(event.target.value)} placeholder="Write a comment" required/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                    Add comment
                            </Button>
                        </Form>
                    </span>
                </div>
                <div className="row">
                    {comments.map(data => <Comment {...data} key={data.id}/>)}
                </div>
            </div>
        </>
    );
}

export default StandardPost;