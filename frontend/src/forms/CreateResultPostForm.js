import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const CreateResultPostForm = (props) => {
    const [visibility, setVisibility] = useState("public");
    const [text, setText] = useState("");
    const initialTeamsData = {
        "homeName": "",
        "homeGoals": 0,
        "awayName": "",
        "awayGoals": 0
    }
    const [teamsData, setTeamsData] = useState(initialTeamsData);
    const navigate = useNavigate();

    const handleTeamDataChange = (event) => {
        setTeamsData({...teamsData, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let content = {
            "text": text,
            "score": teamsData
        }

        let form_data = new FormData();
        form_data.append('author', props.userData.id);
        form_data.append('visibility', visibility);
        form_data.append('type', 'result');
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
                <Form.Control as="textarea" onChange={event => setText(event.target.value)}/>
            </Form.Group>
            <InputGroup className="mb-3">
                <InputGroup.Text>Home team name and goals</InputGroup.Text>
                <Form.Control type="text" name="homeName" placeholder="Home team name" required onChange={handleTeamDataChange} />
                <Form.Control type="number" name="homeGoals" placeholder="Home team goals" required onChange={handleTeamDataChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Away team name and goals</InputGroup.Text>
                <Form.Control type="text" name="awayName" placeholder="Away team name" required onChange={handleTeamDataChange} />
                <Form.Control type="number" name="awayGoals" placeholder="Away team goals" required onChange={handleTeamDataChange} />
            </InputGroup>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );
}

export default CreateResultPostForm;