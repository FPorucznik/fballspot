import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const CreateSquadPostForm = (props) => {
    const [visibility, setVisibility] = useState("public");
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const initialTeamRatingsData = {
        "GKname": "",
        "LBname": "",
        "LCBname": "",
        "RCBname": "",
        "RBname": "",
        "LCMname": "",
        "CDMname": "",
        "RCMname": "",
        "LMname": "",
        "STname": "",
        "RMname": "",
        "GKrating": 1,
        "LBrating": 1,
        "LCBrating": 1,
        "RCBrating": 1,
        "RBrating": 1,
        "LCMrating": 1,
        "CDMrating": 1,
        "RCMrating": 1,
        "LMrating": 1,
        "STrating": 1,
        "RMrating": 1,
    }
    const [teamRatingsData, setTeamRatingsData] = useState(initialTeamRatingsData);

    const handleTeamRatingsChange = (event) => {
        setTeamRatingsData({...teamRatingsData, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let content = {
            "text": text,
            "ratings": teamRatingsData
        }

        let form_data = new FormData();
        form_data.append('author', props.userData.id);
        form_data.append('visibility', visibility);
        form_data.append('type', 'squad');
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
            <InputGroup className="mb-3">
                <InputGroup.Text>GK</InputGroup.Text>
                <Form.Control type="text" name="GKname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="GKrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>LB</InputGroup.Text>
                <Form.Control type="text" name="LBname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="LBrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>LCB</InputGroup.Text>
                <Form.Control type="text" name="LCBname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="LCBrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>RCB</InputGroup.Text>
                <Form.Control type="text" name="RCBname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="RCBrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>RB</InputGroup.Text>
                <Form.Control type="text" name="RBname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="RBrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>LCM</InputGroup.Text>
                <Form.Control type="text" name="LCMname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="LCMrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>CDM</InputGroup.Text>
                <Form.Control type="text" name="CDMname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="CDMrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>RCM</InputGroup.Text>
                <Form.Control type="text" name="RCMname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="RCMrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>LM</InputGroup.Text>
                <Form.Control type="text" name="LMname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="LMrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>ST</InputGroup.Text>
                <Form.Control type="text" name="STname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="STrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>RM</InputGroup.Text>
                <Form.Control type="text" name="RMname" placeholder="Player name" required onChange={handleTeamRatingsChange} />
                <Form.Control type="number" min={1} max={10} name="RMrating" placeholder="Player rating" required onChange={handleTeamRatingsChange} />
            </InputGroup>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );
}

export default CreateSquadPostForm;