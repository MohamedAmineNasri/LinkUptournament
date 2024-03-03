import axios from 'axios';
const BASE_URL = 'http://localhost:8000';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// import axios from 'axios';

// const BASE_URL = 'http://localhost:8000';

// const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// });

// // Axios interceptor to handle response errors
// axiosInstance.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response.status === 403) {
//             // Handle token expiration and clear tokens/cookies
//             clearTokensAndCookies();
//             // Redirect to login page or handle token refresh
//             // Example: window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

// // Function to clear tokens and cookies
// const clearTokensAndCookies = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     // Clear cookies as well if necessary
// };

// export default axiosInstance;
