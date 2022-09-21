export default function authHeader() {
    const token = sessionStorage.getItem('token');

    return token ? { Authorization: 'Bearer ' + token } : {};
}
