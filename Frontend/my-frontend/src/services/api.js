import axios from 'axios';
//מגדיר את כתובת הבסיס של ה-API
const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
export default apiClient;
