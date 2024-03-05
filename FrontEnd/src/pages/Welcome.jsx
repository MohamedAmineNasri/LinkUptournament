import { useSelector } from "react-redux"; 
import { selectCurrentToken, selectCurrentUser } from "../../Features/auth/authSlice"; 
import { Link, Navigate } from "react-router-dom"; 
import useLogout from "../hooks/useLogout";


const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const userRoles = user && user.roles ? user.roles : []; // Ensure user and roles exist

    const userWelcome = user ? `Welcome ${user.firstName} ${user.lastName}!` : 'Welcome';
    const tokenAbbr = token ? `${token.slice(0, 9)}...` : '';

    const logout = useLogout()
    const signout = async () => {
        await logout()
        Navigate('/signin');
    }

    const content = (
        <section className="welcome">
            <h1>{userWelcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <p><Link to="/">Go to Home</Link></p>
            <div >
                <button onClick={signout}>signout</button>
            </div>
        </section>
    );

    return content;
}

export default Welcome;