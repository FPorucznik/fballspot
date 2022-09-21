import { Link } from "react-router-dom"

const Entry = () => {
    return (
        <div>
            <h1>Welcome to FballSpot !</h1>
            <h2>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </h2>
        </div>
    )
}

export default Entry;