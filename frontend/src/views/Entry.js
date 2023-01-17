import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Entry = () => {
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate("/register");
    }

    const handleLoginRedirect = () => {
        navigate("/login");
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col py-2 bg-secondary vh-100">
                    <div className="container rounded mt-5 shadow-lg bg-white h-50 w-50">
                        <div className="row">
                            <span className="fs-1 fw-bold d-block mb-5">Welcome to Fballspot !</span>
                            <Button className="w-25 mx-auto" type="primary" onClick={handleRegisterRedirect}>
                                Register
                            </Button>
                            <Button className="w-25 mx-auto" type="primary" onClick={handleLoginRedirect}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entry;