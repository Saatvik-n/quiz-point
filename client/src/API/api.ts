import axios from "axios";

// Temporary measure
const apiUrl = 'https://quiz-point.onrender.com';

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export default axiosInstance;