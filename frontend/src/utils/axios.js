import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "https://url4uu.vercel.app/api" : "http://localhost:5001/api",
});

export default api;
