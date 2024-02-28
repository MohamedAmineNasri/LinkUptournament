import { useSelector } from "react-redux"; 
import { selectCurrentToken, selectCurrentUser } from "../../Features/auth/authSlice"; 
import { Link } from "react-router-dom"; 


const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}!` : 'Welcome'
    const tokenAbbr = token ? `${token.slice(0, 9)}...` : '';

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <p><Link to="/">Go to Home</Link></p>
        </section>
    )

    return content
}

export default Welcome