import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const CreateStandardPostForm = (props) => {
    const [visibility, setVisibility] = useState("public");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let content = {
            "text": text,
        }

        let form_data = new FormData();
        form_data.append('author', props.userData.id);
        form_data.append('visibility', visibility);
        form_data.append('type', 'standard');
        if(image.name) {
            form_data.append('image', image, image.name);
        }
        form_data.append("content", JSON.stringify(content));
        UserService.createPost(form_data)
            .then(() => {
                if(visibility === "public") {
                    navigate("/main");
                }
                else {
                    navigate("/main/friends_dashboard");
                }
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formVisibility">
                <Form.Label>Visibility</Form.Label>
                <Form.Select onChange={event => setVisibility(event.target.value)}>
                    <option value="public">public</option>
                    <option value="friends">friends</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formText">
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" required onChange={event => setText(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" accept=".png,.jpg,.jpeg" onChange={event => setImage(event.target.files[0])}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );
}

export default CreateStandardPostForm;