import axios from "axios";
import authHeader from "./AuthHeader";
import jwt_decode from "jwt-decode";
import AuthService from "./AuthService";

const API_URL = "http://localhost:8000/api/";

class UserService {
    getUserData() {
        const token = sessionStorage.getItem('token');
        return axios.get(API_URL + `user/${jwt_decode(token).user_id}`, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(error => {
                if (error.response.status === 401) {
                    AuthService.refreshToken();
                }
            });
    }

    updateUserProfile(bio, fav_team) {
        console.log(avatar, bio, fav_team);
    }
}

export default new UserService();