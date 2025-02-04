import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    console.log(loading);
    const location = useLocation();
    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if(user?.email){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.object,
}
export default PrivateRoute;