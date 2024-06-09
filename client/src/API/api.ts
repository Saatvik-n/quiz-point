import axios from "axios";

// Temporary measure
const apiUrl =  import.meta.env.VITE_API_URL || 'https://quiz-point.onrender.com';

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export default axiosInstance;