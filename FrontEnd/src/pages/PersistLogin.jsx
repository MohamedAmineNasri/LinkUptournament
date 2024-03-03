import { Outlet } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth()

    console.log('auuuuuuuuuth   '+auth.accessToken)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    
        // Use refresh token on page load
        verifyRefreshToken();
    }, []);
    
    return(
        <>
            {
                isLoading ? <p>Loading...</p> : <Outlet/>
            }
        </>
    )
}

export default PersistLogin