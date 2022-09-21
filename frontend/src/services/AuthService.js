import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8000/api/";

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "token/", {
            username,
            password
        }).then(response => {
            sessionStorage.setItem("token", response.data.access);
            sessionStorage.setItem("refresh", response.data.refresh);
            return response;
        });
    }

    register(email, username, password) {
        return axios.post(API_URL + "register/", {
            email,
            username,
            password
        });
    }

    logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh");
    }

    refreshToken() {
        return axios.post(API_URL + "token/refresh/", { refresh: sessionStorage.getItem("refresh") }, { headers: authHeader() })
            .then(response => {
                sessionStorage.setItem("token", response.data.access);
                sessionStorage.setItem("refresh", response.data.refresh);
            });
    }
}

export default new AuthService();