import RegisterForm from "../forms/RegisterForm";

const Register = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col py-2 bg-secondary vh-100">
                    <div className="container rounded mt-5 shadow-lg bg-white w-50" style={{ height: "90vh" }}>
                        <div className="row">
                            <span className="fs-1 fw-bold d-block">Fballspot</span>
                            <span className="fs-3">Register</span>
                        </div>
                        <div className="row">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;