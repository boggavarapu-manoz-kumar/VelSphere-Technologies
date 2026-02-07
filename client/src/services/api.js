import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        // Smart Token Selection based on Route
        const isInternRoute = window.location.pathname.startsWith('/intern');
        let token = null;

        if (isInternRoute) {
            token = localStorage.getItem('internToken');
        } else {
            // Default to Admin/General token for non-intern routes
            token = localStorage.getItem('accessToken');
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
