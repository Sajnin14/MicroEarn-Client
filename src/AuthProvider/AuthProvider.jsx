import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();
const auth = getAuth(app);



const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUser = (updateInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateInfo)
    }


    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const stateChange = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {

                const userEmail = { email: currentUser.email };
                axiosPublic.post('/jwt', userEmail)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setUser(currentUser);
                            setLoading(false);
                        }
                    })
            }

            else {
                localStorage.removeItem('access-token');
                setUser(currentUser);
                setLoading(false);
            }
        })


        return () => stateChange();
    }, [])

    const authValue = {
        user,
        setUser,
        loading,
        createUser,
        loginUser,
        googleSignIn,
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