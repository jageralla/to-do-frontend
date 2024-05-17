import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const api = axios.create({
    baseURL: 'http://localhost:8000', // Adjust the base URL to your backend
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) { // expired token or unauthorized response
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);// retrieve the refresh token
            
            if(window.location.pathname === "/login" || window.location.pathname === "/register"){
                return Promise.reject(error); 
            }

            if (!refreshToken) {
                window.location.href = '/login'; // Redirect to login if no refresh token
                return Promise.reject(error);
            }

            try {
                const response = await axios.post('http://localhost:8000/api/token/refresh/', { // refresh the token
                    refresh: refreshToken,
                });

                if (response.status === 200) { // if successful, store the new access token to localstorage and the update the authorization header with the new token and do the request again
                    console.log("token renewed")
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                    return api(originalRequest);
                } else{
                    throw new Error("Token refresh failed with status: " + response.status);
                }
            } catch (error) {
                console.log("refresh token expired")
                window.location.href = '/login'; // Redirect to login if token refresh fails
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
