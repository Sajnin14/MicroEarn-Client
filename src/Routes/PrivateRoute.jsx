import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    
    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if(user?.email){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.object,
}
export default PrivateRoute;