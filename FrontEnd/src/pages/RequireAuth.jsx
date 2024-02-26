import { Navigate, Outlet, useLocation  } from 'react-router-dom'
import { useSelector } from 'react-redux' 
import { selectCurrentToken } from '../../Features/auth/authSlice' 

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    return (
        token
        ? <Outlet />
        : <Navigate to='/login' state={{ from: location}} replace />
        //To Do 
        //We can later add to Check Roles 
    )
}

export default RequireAuth