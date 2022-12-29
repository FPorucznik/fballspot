import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import StandardPost from "../components/StandardPost";
import UserService from "../services/UserService";

const MainDashboard = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState("");

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            UserService.getPosts("public", 1)
                .then(response => {
                    setNext(response.data.next);
                    setPosts(response.data.results);
                    setPage(2);
                });
        }
        else {
            setLoggedOut(true);
        }
    }, []);

    const handleLoadMore = () => {
        if (next) {
            UserService.getPosts("public", page)
            .then(response => {
                setNext(response.data.next);
                setPosts(current => [...current, ...response.data.results])
                setPage(page + 1);
            });
        }
    }

    return (
        <>
            {loggedOut ?
                <Navigate to="/login" /> :
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1">Main Dashboard</span>
                            </div>
                            {posts.map(data => <StandardPost {...data} key={data.id}/>)}
                            <div className="row text-center mx-auto w-25">
                                <button type="button" onClick={handleLoadMore} className="btn btn-primary">Load more</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default MainDashboard;