import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/user/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log("json"+JSON.stringify(prev));
            console.log("response.data.accessToken"+response.data.accessToken);
            console.log("response.data.roles"+response.data.roles);
            return { 
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;