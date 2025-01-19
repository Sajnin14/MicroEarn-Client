import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();
const auth = getAuth(app);



const AuthProvider = ({ children }) => {
   
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    // const [currentUserInfo, setCurrentUserInfo] = useState();
    // const axiosSecure = useAxiosSecure();

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (updateInfo) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, updateInfo)
    }

    
    const logout = () =>{
        setLoading(true);
        <Navigate to='/'></Navigate>
        return signOut(auth);
    }

    // useEffect(() => {
    //     axiosSecure.get(`/users/${user?.email}`)
    //     .then(res => {
    //         setCurrentUserInfo(res.data);
    //       })
    //   },[axiosSecure, user?.email])
      

    useEffect(() => {
        const stateChange = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setLoading(false);
                setUser(currentUser);
                
            }

            return stateChange();
        })
    },[])

    const authValue = {
       user,
       setUser,
       loading,
       createUser,
       loginUser,
       updateUser,
       logout,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object,
}
export default AuthProvider;