import axios from "axios";
import authHeader from "./AuthHeader";
import jwt_decode from "jwt-decode";
import AuthService from "./AuthService";

const API_URL = "http://localhost:8000/api/";

class UserService {
    getUserData() {
        const token = sessionStorage.getItem('token');
        return axios.get(API_URL + `user/${jwt_decode(token).account_id}`, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(error => {
                if (error.response.status === 401) {
                    AuthService.refreshToken();
                }
            });
    }

    updateUserProfile(data) {
        const token = sessionStorage.getItem('token');
        return axios.put(API_URL + `user/update/${jwt_decode(token).account_id}`, data, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(error => {
                if (error.response.status === 401) {
                    AuthService.refreshToken();
                }
                console.log(error);
            });
    }

    searchUserProfile(username) {
        return axios.get(API_URL + `user/${username}`, { headers: authHeader() })
        .then(response => {
            return response;
        })
        .catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }
        });
    }

    getUserNotifications(username) {
        return axios.get(API_URL + `user/notifications/${username}`, { headers: authHeader() })
        .then(response => {
            return response;
        })
        .catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }
        });
    }

    getUserFriends(username) {
        return axios.get(API_URL + `user/friends/${username}`, { headers: authHeader() })
        .then(response => {
            return response;
        })
        .catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }
        });
    }

    sendFriendRequest(sender_id, receiver_id, sender_name) {
        const data = {
            'sender': sender_id,
            'receiver': receiver_id,
            'type': 'friend_request',
            'data': {
                'username': sender_name
            }
        }
        return axios.post(API_URL + `user/notifications/add/`, data, { headers: authHeader() })
        .then(response => {
            return response;
        })
        .catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }
            console.log(error);
        });
    }

    acceptFriendRequest(sender_id, receiver_id) {
        const data = {
            'accountOne': sender_id,
            'accountTwo': receiver_id
        }
        return axios.post(API_URL + `user/friends/add/`, data, { headers: authHeader() })
        .then(response => {
            return response;
        })
        .catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }
            console.log(error);
        });
    }

    deleteNotification(id) {
        return axios.delete(API_URL + `user/notifications/delete/${id}`, { headers: authHeader() })
        .then(response => {
            return response;
        })
        .catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }
            console.log(error);
        });
    }

    createPost(data) {
        return axios.post(API_URL + `posts/create/`, data, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(error => {
                if (error.response.status === 401) {
                    AuthService.refreshToken();
                }
                console.log(error);
            });
    }
}

export default new UserService();