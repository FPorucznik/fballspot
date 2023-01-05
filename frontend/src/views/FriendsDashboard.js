import { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import StandardPost from "../components/StandardPost";
import ResultPost from "../components/ResultPost";
import SquadPost from "../components/SquadPost";

const FriendsDashboard = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState("");
    const [userData] = useOutletContext();

    useEffect(() => {
        if (AuthService.isLoggedIn()) {

            UserService.getPosts("friends", 1, userData.id)
                .then(response => {
                    setNext(response.data.next);
                    setPosts(response.data.results);
                    setPage(2);
                });
        }
        else {
            setLoggedOut(true);
        }
    }, [userData.id]);

    const handleLoadMore = () => {
        if (next) {
            UserService.getPosts("friends", page, userData.id)
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
                <Navigate to="/login" /> : posts && userData &&
                <>
                    <div className="col py-2 bg-secondary">
                        <div className="container rounded mt-1 shadow-lg bg-white h-100 w-100">
                            <div className="row text-start">
                                <span className="fw-bold fs-1">Friends Dashboard</span>
                            </div>
                            {
                                posts.map(data => data.type === "standard" ? <StandardPost {...data} userData={userData} key={data.id}/>
                                : data.type === "squad" ? <SquadPost {...data} userData={userData} key={data.id}/> : <ResultPost {...data} userData={userData} key={data.id}/>)
                            }
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

export default FriendsDashboard;