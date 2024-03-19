import { Navigate, Outlet, useLocation  } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux' 
import { selectCurrentToken, selectCurrentUser } from '../../Features/auth/authSlice' 
import useAuth from '../hooks/useAuth';


const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const location = useLocation();

    // Check if the authentication state is still loading
    if (!token || !user || !user.roles || user.roles.length === 0) {
        return <Navigate to='/signin' state={{ from: location }} replace />;
    }

    // Check if the user has any allowed roles
    const hasAllowedRole = allowedRoles.some(role => user.roles.includes(role));

    // Redirect to /players if the user doesn't have the allowed role
    if (!hasAllowedRole) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
};


export default RequireAuth;