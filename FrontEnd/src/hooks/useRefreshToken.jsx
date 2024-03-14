import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/user/refresh', {
                withCredentials: true
            });

            setAuth(prev => ({
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }));

            return response.data.accessToken;
        } catch (error) {
            // Handle the 401 Unauthorized error
            if (error.response && error.response.status === 401) {
                console.error('Refresh token failed with 401. Clearing local storage.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;