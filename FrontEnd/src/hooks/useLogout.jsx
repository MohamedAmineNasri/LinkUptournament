import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/user/logout', {
                withCredentials: true
            });

            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Refresh the page
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;