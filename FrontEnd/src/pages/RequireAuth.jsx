import { Navigate, Outlet, useLocation  } from 'react-router-dom'
import { useSelector } from 'react-redux' 
import { selectCurrentToken, selectCurrentUser } from '../../Features/auth/authSlice' 

const RequireAuth = () => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
  
    // Check if the user is authenticated
    if (!user) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    // Render the protected route
    return <Outlet />;
  };

export default RequireAuth